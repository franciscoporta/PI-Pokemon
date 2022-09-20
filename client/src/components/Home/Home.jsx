import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes } from "../../redux/actions/index.js";
import Nav from "../Nav/Nav.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Card from '../Card/Card'
import s from './Home.module.css'


export default function Home (){
    const dispatch = useDispatch();
    const pokemons = useSelector(state => state.pokemons);
    const types = useSelector((state) => state.types)

    useEffect(()=>{
        dispatch(getPokemons());
        dispatch(getTypes())
    },[dispatch])

    return(
        <div>
        {/* ACA TENGO QUE MOSTRAR CARDSSSS */}
            {/* <Cards/> */}
            <Nav/>
            <div className={s.main}>
                <div className={s.menu}>
                <SearchBar/>
                </div>
                <div >
                    {
                        <div className={s.cards}>{
                            pokemons && pokemons.map(pokemon => (<Card
                                key={pokemon.id}
                                name={pokemon.name}
                                img={pokemon.img}
                                types={pokemon.types}
                                />))
                                }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}




