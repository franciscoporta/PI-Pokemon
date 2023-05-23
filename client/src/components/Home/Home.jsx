import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes } from "../../redux/actions/index.js";
import Nav from "../Nav/Nav.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Card from '../Card/Card'
import s from './Home.module.css'
import Loading from "../Loading/Loading.jsx";
import Pagination from "../Pagination/Pagination.jsx";






export default function Home (){
    const dispatch = useDispatch();
    const allPokemons = useSelector(state => state.pokemons);
    
    const currentPage = useSelector(state => state.page); //me traigo mi estado de pagina global iniciado en 1
    
    
    
    //preparo mi array
    //firstIndex           lastIndex
    // 12 * 1 = 12       12 - 12 = 0
    // 12 * 2 = 24       24 - 12 = 12
    const lastIndex = 12 * currentPage; //ultimo indice, multiplico la cantidad de cartas que voy a querer x pag * la pagina en donde estoy -> 12 * 1 = 12 || 12 * 2 = 24
    const firstIndex = lastIndex - 12; // primer indice, resto el ultimo indice menos la cantidad de cartas que quiero mostrar en la pantalla -- 12 - 12 = 0 || 12 - 24 = 14
    const pokemonsInPage = allPokemons.slice(firstIndex, lastIndex); //corto mi array de pokemones por mis indices, en cada vuelta se van a ir mostrando 12 pokemones
    
    
    
    useEffect(() => { 
        dispatch(getPokemons());
        dispatch(getTypes())
    },[dispatch])
    
    return(
        <div>
            <Nav/>
            <div className={s.main}>
                <div className={s.menu}>
                <SearchBar />
                </div>
                <div >
                        <div className={ pokemonsInPage.length!==0 ? s.cards : s.loading} >
                            {
                                pokemonsInPage.length!==0?pokemonsInPage.map(pokemon => (
                                        <Card
                                            key={pokemon.id}
                                            id={pokemon.id}
                                            name={pokemon.name}
                                            img={pokemon.img}
                                            types={pokemon.types}
                                            />
                                            ))
                                            :<Loading/>    
                                        }
                                       
                        </div>
                    <div>
                        <Pagination
                        allPokemons={allPokemons?.length} //a mi paginado le paso el length de mi array de pokemones para luego hacer la logica y que vayan variando la cantidad de paginas a mostrar luego
                    />
                        {/* <Pagination 
                        pokemonsPerPage={pokemonsPerPage}
                        allPokemons={allPokemons.length}
                        paginated={paginated}
                        numOfPage={numOfPage}
                        /> */}
                        </div>
                </div>
            </div>
        </div>
    )
}



// const [currentPage, setCurrent] = useState(1) //1era estado local -> me guardo la pagina actual en este estado
// const [pokemonsPerPage, setPokemonsPerPage] = useState(12) // 12 porque es la cantidad de pokemos que tengo que mostrar por pagina -> me guardo la cantidad de pokemones que voy a poner por pagina
// const indexOfLastPokemons = currentPage * pokemonsPerPage //en un princicio va a ser 12 esta constante 1 * 12
// const indexOfFirstPokemon = indexOfLastPokemons - pokemonsPerPage //
// const currentPokemons = allPokemons?.slice(indexOfFirstPokemon, indexOfLastPokemons) //me guardo todos los pokemones
// const paginated = (pageNumber) => {
//     setCurrent(pageNumber)
// }

// const numOfPage = (num) => {
//     // if(num===currentPage)return true
//     // return false
//     return num === currentPage
// }

