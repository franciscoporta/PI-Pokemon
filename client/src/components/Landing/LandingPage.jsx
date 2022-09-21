import React from "react"
import s from './LandingPage.module.css'
import charizard from '../../img/charizard.jpg'
import pokemon from '../../img/logo.jpg'
import { Link } from "react-router-dom"


export default function LandingPage(){
    return(
        <div className={s.general}>
            <div className={s.landingLogo}>
                <img className={s.logo} src={pokemon} alt='pokemon'/>
            </div>
            <div className={s.landingMain}>
                <div className={s.landingLeft}>
                    {/* <h2 className={s.txt}> Welcome </h2> */}
                    <h1 className={s.landingTitle}>Gotta catch 'em all!</h1>
                    <p className={s.txt}>join the pokemon adventure</p>
                    <Link to='/home'>
                        <button className={s.button}> <div className={s.landingBtn}>Get Started </div></button>
                    </Link>
                </div>
                <div className={s.landingRight}>
                    <img className={s.img} src={charizard} alt="charizard"/>
                </div>
            </div>
        </div>
    )
}