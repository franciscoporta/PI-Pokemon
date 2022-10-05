import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { paging } from '../../redux/actions';
import s from './Pagination.module.css'




export default function Pagination({allPokemons}) { //le paso por parametro el .length de allPokemons para que sea variable y no estatico la cantidad de paginas a mostrar
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);

  const pageNumber = Array(Math.ceil(allPokemons / 12)) // a la variable pageNumber, le estoy asignando un array que le estoy agregando X cantidad de lugares(Match.Ceil -> devuelve el numero entero mayor mas aproximado al numero) ->  el .length de allPokemons dividilo por 12, dando la cantidad de lugares a paginas que quiero
  .fill(0) //con el .fill lo que hago es llenar ese array con todas las posiciones que tenia con 0
  .map((e, i) => (e = i + 1))// en el map estoy asignandole valores a los lugares dados arriba

  const numOfPage = (pageNumber) => { //pregunto si el pageNumer es igual al estado global, da true, sino da false y va cambiando el estilo de los botones del paginado
     if(pageNumber === page)return true
     return false
    // return num === page
  }
  
  return(
    <div className={s.pagination}>
      <ul className={s.ul}>
        {
          pageNumber?.map((number) => (
            <li className={s.li} key={number}>
              {
              numOfPage(number)?
                <a className={s.a}  
                  onClick={() => dispatch(paging(number))}>
                  {number}
                </a>:
                <a className={s.a2}  
                  onClick={() => dispatch(paging(number))}>
                  {number}
                </a>
              }
            </li>
          //   <button
          //   key={number}
          //   value={number}
          //   className={s.a}
          //   disabled={number === page ? true : false}
          //   onClick={() => dispatch(paging(number))}
          // >
          //   {number}
          // </button>
          ))
        }
      </ul>
    </div>
  )};
  
  // export default function Pagination({pokemonsPerPage, allPokemons, paginated, numOfPage}) {
  //   const pageNumbers = []
  
  //   for(let i=0; i< Math.ceil(allPokemons/pokemonsPerPage); i++){
  //     pageNumbers.push(i + 1)
  //   }
  //   return (
  //     // <div className={s.pagination}> </div>
  //     <div className={s.pagination}>
  //         <ul className={s.ul}>
  //           {
  //             pageNumbers && pageNumbers.map(number => (
  //               <li className={s.li} key={number}>
  //                 {/* <a onClick={() => paginado(number)}>{number}</a> */}
  //                 {
  //                 numOfPage(number)?<a className={s.a} onClick={()=> paginated(number)}>{number}</a>:
  //                  <a className={s.a2} onClick={()=> paginated(number)}>{number}</a>
  //                 }
  //               </li>
  //             ))}
  //         </ul>
  //     </div>
  //   )
  // }