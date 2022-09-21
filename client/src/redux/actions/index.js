import axios from 'axios';
const GET_POKEMONS = 'GET_POKEMONS';
const GET_TYPES = "GET_TYPES";
const GET_DETAILS = 'GET_DETAILS'

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





