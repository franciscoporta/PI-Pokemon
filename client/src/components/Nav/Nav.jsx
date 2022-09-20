import React from "react";
import { Link } from "react-router-dom";
//import SearchBar from "../SearchBar/SearchBar";
import s from './Nav.module.css'
import pokemon from '../../img/logo.jpg'

export default function Nav () {
    return(
        <div className={s.container}>
            <Link to='/'> <img className={s.landing} src={pokemon} alt='Pokemon'/> </Link>     
           
            <Link to='/home' className={s.home}> Home </Link>     

            <Link to='/create' className={s.create}> Create </Link>

            {/* <SearchBar/> */}
        </div>
    )
}