import React from "react";
import { Link } from "react-router-dom";
import s from './Card.module.css'
import page404 from '../../img/imgDefault.jpg'

function color (types){
    let style = {
        backgroundColor:'#fba54c',
    }
    if(types[0] === 'fire'){
        style.backgroundColor='#fba54c'
        return style
    }
    if(types[0] === 'grass'){
        style.backgroundColor='#5fbd58'
        return style
    }

    if(types[0] === 'poison'){
        style.backgroundColor='#b763cf'
        return  style;
    }
    if(types[1] === 'poison'){
        style.backgroundColor='#b763cf'
        return  style;
    }
    if(types[0] === 'water'){
        style.backgroundColor='deepskyblue'
        return  style;
    }
    if(types[0] === 'bug'){
        style.backgroundColor='#cddc39'
        return  style;
    }
    if(types[1] === 'fairy'){
        style.backgroundColor='#ffaec9'
        return style
    }
    if(types[0] === 'normal'){
        style.backgroundColor='#99ee9e'
        return style;
    }
    if(types[0] === 'electric'){
        style.backgroundColor='#f2d94e'
        return style;
    }
    if(types[0] === 'ground'){
        style.backgroundColor='#da7c4d'
        return style;
    }
    if(types[0] === 'fairy'){
        style.backgroundColor='#ffaec9'
        return style
    }
    return style
}


export default function Card ({name, img, types, id }) {
    return(
        <div className={s.cardsContainer}>
            <Link key={id} to={'/details/'+id} className={s.link} >
                <div className={s.card} style={color(types)} key={id}>
                    <div className={s.cardInfo} key={id}>
                        <h3>{name.charAt(0).toUpperCase()+name.slice(1)}</h3>
                        <img className={s.pokemonImg} src={img ? img : page404} alt='Icono'/>
                        {
                            types && types.map(type => <span >{type.charAt(0).toUpperCase()+type.slice(1)} </span>)
                        }
                    </div>
                </div>
            </Link>
        </div>
    )
}


