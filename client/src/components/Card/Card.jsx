import React from "react";
import s from './Card.module.css'

function color (types){
    // console.log(types)
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
        <div className={s.cardsContainer} key={id}>
            <div className={s.card} style={color(types)}>
                <div className={s.cardInfo} >
                    <h3>{name.charAt(0).toUpperCase()+name.slice(1)}</h3>
                    <img className={s.pokemonImg} src={img} alt='Icono'/>
                    {
                        types && types.map(type => <span>{type.charAt(0).toUpperCase()+type.slice(1)}</span>)
                    }
                </div>
            </div>
        </div>
    )
}


