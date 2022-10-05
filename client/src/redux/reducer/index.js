import {CLEAR_PAGE, DELETE_POKEMON, FILTER_ATTACK, FILTER_CREATED, FILTER_TYPE, GET_DETAILS, GET_POKEMONS, GET_TYPES, ORDER_NAME, POST_POKEMON, SEARCH_BY_NAME, SET_CURRENT_PAGE} from '../actions/index'

const initialState = {
    pokemons: [],
    allPokemons: [], //se me ponen todos los pokemons
    types: [],
    detail: {},
    page: 1,
    order:{
        alphabeticalOrder: "All",
        orderByPopulation: "All",
    }
}


const rootReducer = (state = initialState, action)=>{
    switch (action.type) {
        case GET_POKEMONS:{
            return{
                ...state,
                allPokemons: action.payload,
                pokemons: action.payload
            }
        }
        case GET_TYPES:{
            return{
                ...state,
                types: action.payload
            }
        }
        case GET_DETAILS:{
            return{
                ...state,
                detail: action.payload
            }
        }
        case SEARCH_BY_NAME: 
        //console.log(action.payload)
        return{
            ...state,
            pokemons: action.payload
        }
        case FILTER_CREATED: {
            const pokemonsFilter = state.allPokemons;
            const createdFilter = action.payload === 'Created'? pokemonsFilter.filter( el => el.inDB):pokemonsFilter.filter( el => !el.inDB);
            return{
                ...state,
                pokemons: action.payload === 'All'?pokemonsFilter:createdFilter
            }
        }
        case CLEAR_PAGE:
            return{
                ...state,
                detail:{}
        }
        case SET_CURRENT_PAGE:
            return{
                ...state,
                page: action.payload
            }
        case FILTER_ATTACK:
            if(action.payload === 'All'){
                    return{
                            ...state,
                            pokemons: state.allPokemons
                        }
                    }

            let currentPokemons2;

            const aux2 = [...state.pokemons];

            if(action.payload === 'Max'){
                    aux2.sort((a,b) =>  (a.attack < b.attack ? 1 : -1))
                    currentPokemons2 = aux2
                        
                }
            
            else if(action.payload === 'Min'){
                    aux2.sort((a, b) => (a.attack > b.attack ? 1 : -1))
                        currentPokemons2 = aux2
                }
                return{
                        ...state,
                        pokemons: currentPokemons2
                    }
        case FILTER_TYPE:
            const allPokemons = state.allPokemons;
            
            const filterType = action.payload === 'All'?allPokemons:allPokemons.filter(pokemon => pokemon.types[0] === action.payload || pokemon.types[1] === action.payload)
          

            return{
                ...state,
                pokemons : filterType
            }

            case ORDER_NAME:
                if (action.payload === "All") {
                  return {
                    ...state,
                    pokemons: [...state.allPokemons],
                  };
                }
          
                let currentPokemons;
                const aux = [...state.pokemons];
                if (action.payload === "A - Z") {
                  aux.sort((a, b) => (a.name < b.name ? -1 : 1));
                  currentPokemons = aux;
                }
                if (action.payload === "Z - A") {
                  aux.sort((a, b) => (a.name > b.name ? -1 : 1));
                  currentPokemons = aux;
                }
                return {
                  ...state,
                  pokemons: currentPokemons,
                  order: { ...state.order, alphabeticalOrder: action.payload },
                };
            // case ORDER_NAME:
            //     const pokemonsName = state.allPokemons;
            //     let orderName = action.payload === 'A - Z'? pokemonsName.sort(function(a,b){
            //         if( a.name > b.name){
            //             return 1;
            //         }
            //         if(b.name > a.name){
            //             return -1;
            //         }return 0;
            //     }): pokemonsName.sort(function(a,b){
            //         if(a.name>b.name){
            //             return -1;
            //         }
            //         if(b.name>a.name){
            //             return 1;
            //         }return 0;
            //     })
            //     return{
            //         ...state,
            //         pokemons:orderName
            //     }

            case POST_POKEMON: return{
                ...state
            }

            case DELETE_POKEMON:
                return{
                    ...state,
                }
        default:
            return {...state};
    }
}



export default rootReducer;