import React from "react"
import { Link } from "react-router-dom"
//import Nav from "./Nav/Nav.jsx"
import s from './Create.module.css'


export default function Create () {
    return(
        <div>
            {/* <Nav/> */}
                <Link to='/home' className={s.home}> Home </Link>
                Creacion
        </div>
    )
}