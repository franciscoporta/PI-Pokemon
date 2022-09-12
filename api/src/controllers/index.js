const axios = require('axios');
const {Pokemon, Type} = require('../db');



const getPokemones = async () => {
    const oneCallApi = await axios.get('https://pokeapi.co/api/v2/pokemon');
    const infoOneCall = await oneCallApi.data.results.map(m => {
        return axios.get(m.url)
    })

    const secondCallApi = await axios.get(oneCallApi.data.next);
    const infoSecondCall = await secondCallApi.data.results.map(m => {
        return axios.get(m.url)
    })

    const pokemons = [...infoOneCall,...infoSecondCall];

    const pokemonsFinal = await Promise.all(pokemons);

    const callFinal = await pokemonsFinal.map(p => {
        return {
            id: p.data.id,
            name: p.data.name,
            img: p.data.sprites.other.dream_world.front_default,
            attack: p.data.stats[1].base_stat,
            types: p.data.types.map(m=>m.type.name),
        }
    })
    // return llamadaFinal;

    let callDB = await Pokemon.findAll({
        attributes: ['name', 'img', 'id','inDB', 'attack'],
        include:{
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
              },
        }
    })

    const infoFinal = [...callFinal, ...callDB]

    return infoFinal;
   
}

//ACA ME TENGO QUE TRAER EL DETALLE DEL POKEMON DE LA BASE DE DATOS Y DE LA API
//LO QUE MUESTRO EN LA CARTA PRINCIPAL Y TODO EL RESTANTE
getPokemonesById = async () => {

}


module.exports= {
    getPokemones
}