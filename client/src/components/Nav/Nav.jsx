import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
//import SearchBar from "../SearchBar/SearchBar";
import s from './Nav.module.css'
import pokemon from '../../img/logo.jpg'
import { filterAttack, filterCreated, filterType, getPokemons, orderName, paging } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Nav () {

    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);
    const navigate = useNavigate();
    
    /*
     function clearFilter(e){
        document.getElementById("rating").selectedIndex = 0; //selectedindex devuelve el indice de la opcion seleccionado en un select(desplegable)
        document.getElementById("az").selectedIndex = 0;
        document.getElementById("filter").selectedIndex = 0;
        document.getElementById("genre").selectedIndex = 0;
        document.getElementsByClassName("input")[0].value = "";
        dispatch(getVideoGames())
    }
    */

    function handleCreated(e){
        // console.log(e.target.value)
        dispatch(filterCreated(e.target.value))
        document.getElementById("Types").selectedIndex = 0
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
        if( window.location.pathname !== '/home'){
            navigate('/home')
        }
    }
    
    function handleType(e){
        e.preventDefault()
        dispatch(filterType(e.target.value))
        dispatch(paging(1))
        document.getElementById("dbOrApi").selectedIndex = 0
        
    }

    function handleName(e){
        e.preventDefault()
        dispatch(orderName(e.target.value))
        dispatch(paging(1))
        document.getElementById("dbOrApi").selectedIndex = 0
        document.getElementById("Types").selectedIndex = 0
        document.getElementById("Alphabet").selectedIndex = 0
    }


    return(
        <div className={s.container}>
            <Link to='/'> <img className={s.landing} src={pokemon} alt='Pokemon'/> </Link>     
           
            <Link onClick={(e) => handleClick(e)} className={s.home} > Home </Link>     

            <Link to='/create' className={s.create}> Create </Link>
            {
                window.location.pathname === '/home' ? 
            <div className={s.navRigth}>
                <p className={s.text}>Filter by:  </p>
                <select onChange={ e => handleType(e)} className={s.selectTypes} id='Types'>
                    <option value='All' className={s.textTypes}>Types</option>
                    {
                        types.map(type => 
                        <option value={type.name} key={type.name} className={s.textTypes}>
                            {type.name}
                        </option>)
                    }
                </select>

                <select onChange={e => handleCreated(e)} className={s.selectTypes} id='dbOrApi'>
                    <option value='All' className={s.textTypes}>Dd or Api</option>
                    <option value='Created' className={s.textTypes}>From DB</option>
                    <option value='Api' className={s.textTypes}>From Api</option>
                </select>

                <select onChange={e => handleAttack(e)} className={s.selectTypes} id='Attack'>
                    <option value='All' className={s.textTypes}>Attack</option>
                    <option value='Min' className={s.textTypes}>Min</option>
                    <option value='Max' className={s.textTypes}>Max</option>
                </select>

                <select onChange={e => handleName(e)} className={s.selectTypes} id='Alphabet'>
                    <option value='All' className={s.textTypes}>Alphabet</option>
                    <option value='A - Z' className={s.textTypes}>A - Z</option>
                    <option vale='Z - A' className={s.textTypes}>Z - A</option>
                </select>
            </div>
        : null
            }
        </div>
    )
}