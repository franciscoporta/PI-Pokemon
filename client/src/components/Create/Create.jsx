import React, { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate} from "react-router-dom"
import { getTypes, postPokemon } from "../../redux/actions"
//import Nav from "./Nav/Nav.jsx"
import s from './Create.module.css'


export default function Create () {
    const allTypes = useSelector((state) => state.types)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [input, setInput]= useState({
        name:'',
        life:'',
        attack:'',
        defense:'',
        speed:'',
        height:'',
        weight:'',
        img:'',
        types:[]
    })


    useEffect(() =>{
        dispatch(getTypes())
    },[dispatch])

    function handleInput (e){
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function handleSumbit(e){
        e.preventDefault()
        dispatch(postPokemon(input))
        alert('Pokemon creado con exito!!')
        navigate('/home')
    }

    function handleSelect(e){
        setInput({
            ...input,
            types:[...input.types, e.target.value]
        })
    }
    return(
        <div>
            <br/><br/>
            <div>
                <Link to='/home' className={s.home}> Home </Link>
                Creacion
            </div>
            <br/><br/><br/>
            <form onSubmit={(e) => handleSumbit(e)}>
                <label>
                    Name:
                <input
                type='text'
                name='name'
                value={input.name}
                placeholder="Name..."
                onChange={(e) => handleInput(e)}
                />
                </label>
                <label>
                    Life:
                    <input
                    type='number'
                    name='life'
                    value={input.life}
                    placeholder="1-100"
                    onChange={(e) => handleInput(e)}
                />
                </label>
                <label>
                    Attack:
                    <input
                    type='number'
                    name='attack'
                    value={input.attack}
                    placeholder="1-100"
                    onChange={(e) => handleInput(e)}
                />
                </label>
                <label>
                    Defense:
                    <input
                    type='number'
                    name='defense'
                    value={input.defense}
                    placeholder="1-100"
                    onChange={(e) => handleInput(e)}
                />
                </label>
                <label>
                    Speed:
                    <input
                    type='number'
                    name='speed'
                    value={input.speed}
                    placeholder="1-100"
                    onChange={(e) => handleInput(e)}
                />
                </label>
                <label>
                    Weigth:
                    <input
                    type='number'
                    name='weight'
                    value={input.weight}
                    placeholder="1-100"
                    onChange={(e) => handleInput(e)}
                />
                </label>
                <label>
                    Height:
                    <input
                    type='number'
                    name='height'
                    value={input.height}
                    placeholder="1-100"
                    onChange={(e) => handleInput(e)}
                />
                </label>
                <label>
                    Imagen:
                    <input
                    type='text'
                    name='img'
                    value={input.img}
                    placeholder="Url..."
                    onChange={(e) => handleInput(e)}
                />
                </label>
                <label>
                    Types:
                <select onChange={(e) => handleSelect(e)}> 
                    <option>Choose Types</option>
                    {allTypes?.map((types) => (
                        <option value={types.name} key={types.id}>
                            {types.name}
                        </option>
                    ))}
                </select>
                </label>
                <ul><li>{input.types.map((el) => el + ' ,')}</li></ul>
                <button type='submit'>Create Pokemon</button>
            </form>
        </div>
    )
}