import React from "react";
import s from './Card.module.css'

export default function Card ({name, img, types, id }) {
    return(
        <div className={s.cardsContainer}>
            <div className={s.card}>
                <div className={s.cardInfo}>
                    <h3>{name}</h3>
                    <img className={s.pokemonImg} src={img} alt='Icono'/>
                    {
                        types && types.map(type => <span>{type}</span>)
                    }
                </div>
            </div>
        </div>
    )
}