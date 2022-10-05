import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {  getName, paging } from "../../redux/actions";
import s from './SearchBar.module.css'


export default function SearchBar (){
    const [name, setName] = useState("")
    const dispatch = useDispatch()

    function handleSubmit(e){
        e.preventDefault()
        if(name.length !== 0){

            dispatch(getName(name))

            dispatch(paging(1));
            setName("")
        }
        }

    function handleInput(e){
        e.preventDefault()   
        setName(e.target.value)
    }

    
return(
    <div className={s.container}>
        <div>
        <form onSubmit={(e) => handleSubmit(e)}>
            <input
            type='text'
            placeholder="Search Pokemon..."
            value={name}
            onChange={(e)=>handleInput(e)}
            className={s.input}
            />
        </form>
        </div>
    </div>
)
}