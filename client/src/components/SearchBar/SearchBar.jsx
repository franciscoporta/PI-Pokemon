import React from "react";
import { useState } from "react";
import s from './SearchBar.module.css'


export default function SearchBar (){
    const [name, setName] = useState("")

    function handleInput(e){
        e.preventDefault()   
        setName(e.target.value)
    }
    
return(
    <div className={s.container}>
        <form /*onSubmit={(e) => handleSubmit(e)}*/>
            <input
            type='text'
            placeholder="Search Pokemon..."
            value={name}
            onChange={(e)=>handleInput(e)}
            className={s.input}
            />
        </form>
    </div>
)
}