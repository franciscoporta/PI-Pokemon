import React, { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate} from "react-router-dom"
import { getTypes, postPokemon } from "../../redux/actions"
import Nav from '../Nav/Nav'
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
        <div className={s.container}>

            <Nav/>

            <div className={s.divContainer}>

            <form onSubmit={(e) => handleSumbit(e)} className={s.cont}>
                <div className={s.formRow}>
                <label className={s.text}>
                        Name:
                <input
                type='text'
                name='name'
                value={input.name}
                placeholder="    Name..."
                onChange={(e) => handleInput(e)}
                className={s.input}
                />
                </label>


                 <label className={s.text}>
                      Life:
                    <input
                    type='number'
                    name='life'
                    value={input.life}
                    placeholder="    1-100"
                    onChange={(e) => handleInput(e)}
                    className={s.input}
                    />
                    </label>
 

                    <label className={s.text}>
                     Attack:
                    <input
                    type='number'
                    name='attack'
                    value={input.attack}
                    placeholder="1-100"
                    onChange={(e) => handleInput(e)}
                    className={s.input}
                    />
                    </label>


                    <label className={s.text}>
                      Defense:
                    <input
                    type='number'
                    name='defense'
                    value={input.defense}
                    placeholder="    1-100"
                    onChange={(e) => handleInput(e)}
                    className={s.input}
                    />
                    </label>
                </div>

                <div className={s.formRowRigth}>

                    <label className={s.text}>
                        Speed:
                    <input
                    type='number'
                    name='speed'
                    value={input.speed}
                    placeholder="    1-100"
                    onChange={(e) => handleInput(e)}
                    className={s.input}
                    />
                    </label>

                    <label className={s.text}>
                        Weigth:
                    <input
                    type='number'
                    name='weight'
                    value={input.weight}
                    placeholder="    1-100"
                    onChange={(e) => handleInput(e)}
                    className={s.input}
                    />
                    </label>


                <label className={s.text}>
                    Height:
                    <input
                    type='number'
                    name='height'
                    value={input.height}
                    placeholder="    1-100"
                    onChange={(e) => handleInput(e)}
                    className={s.input}
                    />
                    </label>

                <label className={s.text}>
                    Imagen:
                    <input
                    type='text'
                    name='img'
                    value={input.img}
                    placeholder="    Url..."
                    onChange={(e) => handleInput(e)}
                    className={s.input}
                    />
                    </label>
                <label className={s.text}>
                    Types:
                <select onChange={(e) => handleSelect(e)} className={s.selectType}> 
                    <option>Choose Types</option>
                    {allTypes?.map((types) => (
                        <option className={s.textTypes} value={types.name} key={types.id}>
                            {types.name}
                        </option>
                    ))}
                </select>
                </label>
                {
                    input.types.length ? <ul><li className={s.ulTypes}>{input.types.map((el) => el + ', ')}</li></ul> : null
                }
                </div>

                <button type='submit' className={s.button}>Create Pokemon</button>
            </form>
            </div>
        </div>
    )
}