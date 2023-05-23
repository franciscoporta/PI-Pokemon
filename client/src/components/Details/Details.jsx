import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { clearPage, deletePokemon, getDetail, getPokemons, paging } from '../../redux/actions';
import Loading from '../Loading/Loading';
import Nav from '../Nav/Nav'
import s from './Details.module.css'
import imagen404 from '../../img/imgDefault.jpg'



export default function Details() {
    const dispatch = useDispatch();
    const detail = useSelector((state) => state.detail)
    //console.log(detail)
    const navigate = useNavigate();
    const {id} = useParams();
    
    useEffect(() => {
        dispatch(getDetail(id))
        return(
            () => {
                dispatch(clearPage())
            })
    },
    [dispatch]);

    let type = detail.types

    function color (type){
        let style = {
            color:'#fba54c',
        }
        if(type[0] === 'fire'){
            style.color='#fba54c'
            return style
        }
        if(type[0] === 'grass'){
            style.color='#5fbd58'
            return style
        }
    
        if(type[0] === 'poison'){
            style.color='#b763cf'
            return  style;
        }
        if(type[1] === 'poison'){
            style.color='#b763cf'
            return  style;
        }
        if(type[0] === 'water'){
            style.color='deepskyblue'
            return  style;
        }
        if(type[0] === 'bug'){
            style.color='#cddc39'
            return  style;
        }
        if(type[1] === 'fairy'){
            style.color='#ffaec9'
            return style
        }
        if(type[0] === 'normal'){
            style.color='#99ee9e'
            return style;
        }
        if(type[0] === 'electric'){
            style.color='#f2d94e'
            return style;
        }
        if(type[0] === 'ground'){
            style.color='#da7c4d'
            return style;
        }
        if(type[0] === 'fairy'){
            style.color='#ffaec9'
            return style
        }
        return style
    }


    const handleClick = async (e) =>{
            dispatch(deletePokemon(detail.id));
            alert('pokemon successfully eliminated');
            await dispatch(getPokemons());
            dispatch(paging(1));
            navigate('/home')
        }

  return (
    <div className={s.container}>
        <Nav/>
            {
                Object.keys(detail).length!==0?
                        <div className={s.card}>
                            <div> 
                                {detail.inDB?<button onClick={(e) => handleClick(e)}> X </button>:null}
                            </div>

                            <div className={s.divImg}>
                                <img src={!detail.img ? imagen404 : detail.img} className={s.img} alt='icono'/>
                            </div>

                            <div className={s.divData}>
                                <h1 className={s.name} style={color(type)}>Name: {detail.name.charAt(0).toUpperCase()+detail.name.slice(1)}</h1>
                                <h3 className={s.data} style={color(type)}>Hp: {detail.life}</h3>
                                <h3 className={s.data} style={color(type)}>Attack: {detail.attack}</h3>
                                <h3 className={s.data} style={color(type)}>Defense: {detail.defense}</h3>
                                <h3 className={s.data} style={color(type)}>Speed: {detail.speed}</h3>
                                <h3 className={s.data} style={color(type)}>Weight: {detail.weight}</h3>
                                <h3 className={s.data} style={color(type)}>Height: {detail.height}</h3>
                                {detail.inDB?<h3 className={s.data} style={color(type)}>Types: {' '} + {detail.types.map(m=>m.name.charAt(0).toUpperCase()+m.name.slice(1))}</h3>:<h3 className={s.data} style={color(type)}>Types:{' '}{detail.types.map(m=>m[0].toUpperCase()+m.slice(1)+' ')}
                                </h3>
                                }
                            </div>
                        </div>:
                        <div>
                            <Loading/>
                        </div>
                }
    </div>
  )
}
