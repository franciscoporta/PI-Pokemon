import React from "react";
import { Link } from "react-router-dom";
//import SearchBar from "../SearchBar/SearchBar";
import s from './Nav.module.css'
import pokemon from '../../img/logo.jpg'
import { filterAttack, filterCreated, filterType, getPokemons, orderName, paging } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Nav () {

    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);
    
    

    function handleCreated(e){
        // console.log(e.target.value)
        dispatch(filterCreated(e.target.value))
    }


    function handleAttack(e){
        e.preventDefault()  
        dispatch(filterAttack(e.target.value))
        dispatch(paging(1))
    }

    function handleClick(e){
        e.preventDefault()
        dispatch(getPokemons())
        dispatch(paging(1))
    }
    
    function handleType(e){
        e.preventDefault()
        dispatch(filterType(e.target.value))
        dispatch(paging(1))
    }

    function handleName(e){
        e.preventDefault()
        dispatch(orderName(e.target.value))
        dispatch(paging(1))
    }


    return(
        <div className={s.container}>
            <Link to='/'> <img className={s.landing} src={pokemon} alt='Pokemon'/> </Link>     
           
            <Link onClick={(e) => handleClick(e)} className={s.home} > Home </Link>     

            <Link to='/create' className={s.create}> Create </Link>
            <div className={s.menuRight}>
            <div>
                <select onChange={ e => handleType(e)}>
                    <option value='All'>All</option>
                    {
                        types.map(type => 
                        <option value={type.name} key={type.name}>
                            {type.name}
                        </option>)
                    }
                </select>
                <label>
                Show Pokemons
                <select onChange={e => handleCreated(e)}>
                    <option value='All'>All</option>
                    <option value='Created'>From DB</option>
                    <option value='Api'>From Api</option>
                </select>
                </label>
                <select onChange={e => handleAttack(e)}>
                    <option value='All'>By Attack</option>
                    <option value='Min'>Min</option>
                    <option value='Max'>Max</option>
                </select>
                <select onChange={e => handleName(e)}>
                    <option value='All'>All</option>
                    <option value='A - Z'>A - Z</option>
                    <option vale='Z - A'>Z - A</option>
                </select>
            </div>
        </div>
            {/* <SearchBar/> */}
        </div>
    )
}