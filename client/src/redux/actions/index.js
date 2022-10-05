import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_TYPES = "GET_TYPES";
export const GET_DETAILS = 'GET_DETAILS';
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME';
export const FILTER_CREATED = 'FILTER_CREATED';
export const FILTER_ATTACK = 'FILTER_ATTACK';
export const CLEAR_PAGE = 'CLEAR_PAGE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const FILTER_TYPE = 'FILTER_TYPE';
export const ORDER_NAME = 'ORDER_NAME';
export const POST_POKEMON = 'POST_POKEMON';
export const DELETE_POKEMON = 'DELETE_POKEMON';

export const getPokemons = () => {
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/pokemons");
        return dispatch({
            type: GET_POKEMONS,
            payload: json.data
        });
    }
}


export const getTypes = () => {
    return async function (dispatch) {
      let json = await axios.get("http://localhost:3001/types");
      return dispatch({
        type: GET_TYPES,
        payload: json.data,
      });
    };
}



export const getDetail = (id) => {
  return async function(dispatch){
    let json = await axios.get(`http://localhost:3001/pokemons/${id}`);
    return dispatch({
      type: GET_DETAILS,
      payload: json.data,
    });
  }
}


export const getName = (name) =>{
  return async function(dispatch){
    try{
      const json = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
      let arr = []
      arr.push(json.data)
      return dispatch({
        type:SEARCH_BY_NAME,
        payload:arr
      })

    } catch(e){
      console.log(e)
    }
  }
}


export const filterCreated = (payload) => {
  return{
    type: FILTER_CREATED,
    payload
  }
}

export const filterAttack = (payload) => { 
  return{
    type: FILTER_ATTACK,
    payload
  }
}

export const clearPage = () => {
  return{
    type:CLEAR_PAGE
  }
}

export const paging = (payload) => { //payload va a entrar el numero de pagina, va a reducer
  return {
    type: SET_CURRENT_PAGE,
    payload
  };
}

export const filterType = (payload) => {
  return{
    type: FILTER_TYPE,
    payload
  }
}

export const orderName = (payload) => {
  return{
      type: ORDER_NAME,
      payload
  }
}

export const postPokemon = (payload) => {
  return async function (dispatch){
  let json = await axios.post("http://localhost:3001/pokemons", payload) //le paso el payload(lo que le paso por los inputs), se pasa asi, la ruta, payload
  return dispatch({
    type:POST_POKEMON,
    payload: json
  })
}
}


export const deletePokemon = (id) => {
  return async function (dispatch){
    let json = await axios.delete(`http://localhost:3001/pokemons/${id}`, id)
    return dispatch({
      type:DELETE_POKEMON,
      payload: json
    })
  }
}



