const initialState = {
    pokemons: [],
    allPokemons: [], //se me ponen todos los pokemons
    types: [],
    detail: {},
}


const rootReducer = (state = initialState, action)=>{
    switch (action.type) {
        case "GET_POKEMONS":{
            return{
                ...state,
                pokemons: action.payload,
            }
        }
        case "GET_TYPES":{
            return{
                ...state,
                types: action.payload
            }
        }
        default:
            return {...state};
    }
}



export default rootReducer;