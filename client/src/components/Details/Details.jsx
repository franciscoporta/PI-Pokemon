import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { clearPage, deletePokemon, getDetail, getPokemons, paging } from '../../redux/actions';
import Loading from '../Loading/Loading';
// import Nav from '../Nav/Nav'
import s from './Details.module.css'



export default function Details() {
    const dispatch = useDispatch();
    const detail = useSelector((state) => state.detail)
    // console.log(detail)
    const {id} = useParams();
    
    useEffect(() => {
        dispatch(getDetail(id))
        return(
            () => {
                dispatch(clearPage())
            })
    },
    [dispatch])


    const handleClick = (e) =>{
       
        
            dispatch(deletePokemon(detail.id));
            alert('pokemon successfully eliminated')
            
        
}

  return (
    <div>
        {/* <Nav/> */}
        <Link to='/home' className={s.home} > Home </Link>
        <br></br> <br></br>
        <div>
            {
                Object.keys(detail).length!==0?
                        <div >
                            <div> 
                                {detail.inDB?<button onClick={(e) => handleClick(e)}> X </button>:null
                                }
                                </div>
                            <p>Name: {detail.name.charAt(0).toUpperCase()+detail.name.slice(1)}</p>
                            <p>Hp: {detail.life}</p>
                            <p>Attack: {detail.attack}</p>
                            <p>Defense: {detail.defense}</p>
                            <p>speed: {detail.speed}</p>
                            <p>weight: {detail.weight}</p>
                            <p>Height: {detail.height}</p>
                            {
                                detail.inDB?<p>Types: {detail.types.map(m=>m.name.charAt(0).toUpperCase()+m.name.slice(1))}</p>
                                :<p>Types:{detail.types.map(m=>m[0].toUpperCase()+m.slice(1)+' ')}</p>
                            }
                        </div>:
                        <div>
                            <Loading/>
                        </div>
                }
        </div>
    </div>
  )
}
