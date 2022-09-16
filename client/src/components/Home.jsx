import React from "react";
import { Link } from "react-router-dom";


export default function Home (){
    return(
        <div>
        {/* ACA TENGO QUE MOSTRAR CARDSSSS */}
            <Link to='/'> <h3>Landing</h3> </Link>
            {/* <Cards/> */}
            <h1>Home</h1>
        </div>
    )
}