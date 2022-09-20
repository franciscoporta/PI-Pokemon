const axios = require('axios');
const {Pokemon, Type} = require('../db');


//ACA ME TRAIGO TODOS LOS POKEMONS DE LA API Y DE LA DB
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

    //SOLO ME TRAIGO ESTA INFO PORQUE ES LO QUE MUESTRO EN LA CARTA PRINCIPAL
    const callFinal = await pokemonsFinal.map(p => {
        return {
            id: p.data.id,
            name: p.data.name,
            img: p.data.sprites.other['official-artwork'].front_default,
            attack: p.data.stats[1].base_stat,
            types: p.data.types.map(m => m.type.name),
        }
    })

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

    
    callDB = callDB.map(m => {
        return {
        ...m.dataValues, 
        types: m.types?.map(m => m.name)
    }})

    const infoFinal = [...callFinal, ...callDB]

    return infoFinal;
   
}

//ACA ME TRAIGO LOS POKEMONES DE LA API Y DE LA BD POR QUERY(NAME)
const getPokemonesByNameInApi = async (value) => {
    const callApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase().trim()}`);
    const infoPokemon =  {
            id:callApi.data.id,
            name:callApi.data.name,
            height:callApi.data.height,
            hp:callApi.data.stats[0].base_stat,
            attack: callApi.data.stats[1].base_stat,
            defense: callApi.data.stats[2].base_stat,
            speed: callApi.data.stats[5].base_stat,
            weight: callApi.data.weight,
            types: callApi.data.types.map(m=>m.type.name),
            img: callApi.data.sprites.other.dream_world.front_default,
    }

    return infoPokemon;
}

//ACA ME TRAIGO LOS POKEMONS DE LA DB Y DE LA API POR QUERY(NAME)
const getPokemonesByNameInApiOrDB = async (name) => {

    const callDB = Pokemon.findOne({
        where:{name:name.toLowerCase().trim()},
        attributes: ['id', 'name', 'life', 'attack', 'defense', 'speed', 'height', 'weight', 'img'],
        include:{
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
              },
        }
    })

    if(!callDB[0]) return await getPokemonesByNameInApi(name); 
    return callDB[0];

}

//ACA ME TENGO QUE TRAER EL DETALLE DEL POKEMON DE LA BASE DE DATOS Y DE LA API
//LO QUE MUESTRO EN LA CARTA PRINCIPAL(NAME-IMG-TYPE-ATAQUE) + DEF-VEL-ALT-PESO-VIDA

const getPokemonesByIdInApi = async (id) => {
    try{

        const callApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const infoApi = {
                id:callApi.data.id,
                name:callApi.data.name,
                height:callApi.data.height,
                hp:callApi.data.stats[0].base_stat,
                attack: callApi.data.stats[1].base_stat,
                defense: callApi.data.stats[2].base_stat,
                speed: callApi.data.stats[5].base_stat,
                weight: callApi.data.weight,
                types: callApi.data.types.map(m=>m.type.name),
                img: callApi.data.sprites.other.dream_world.front_default,
        }
        return infoApi;
    }catch(error){
        console.log(error)
    }
}

const getPokemonesByIdInApiOrDB = async (id) => {
    if(id.length > 5){ //Aca estoy validando si el ID es UUID O ID
        try {
            const callDB = await Pokemon.findByPk(id, {include: Type}); //Aca estoy buscando por ID
            return callDB;
        } catch (error) {
            console.log(error)
        }
    } else {
        return await getPokemonesByIdInApi(id);
    }
}

//ACA PRIMERO VOY A BUSCAR POR NOMBRE EN LA API, SI EXISTE TIRO FALASE, SI NO EXISTE TIRO TRUE

const validateApi = async (name) => { 
    try {
        let callApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase().trim()}`)
        //       .catch(()=>{ return false})
        //  if(callApi)return true
        if(callApi) return 'El pokemon ya existe';
    } catch (error) {
        console.log(error)
    }
}


const postPokemons = async (name, life, attack, defense, speed, height, weight, img, inDB, types) => {
    // const {name, life, attack, defense, speed, height, weight, img, types} = req.body;
    try {
        if(name){
            const validate = await Pokemon.findOne({
                where: {name: name.toLowerCase().trim()}
            });
            
            if(await validateApi(name)) return 'El pokemon existe';

            if(!validate){
                let pokemonCreate = await Pokemon.create({
                    name:name.toLowerCase().trim(),
                    life: life,
                    attack: attack,
                    defense: defense,
                    speed:speed,
                    height:height,
                    weight:weight,
                    img:img,
                    inDB: inDB,
                });
        
                let findType = await Type.findAll({
                    where: {
                        name: types,
                    }
                })

                pokemonCreate.addType(findType);
                return 'Pokemon created successfully'
            } else{
                return 'There is an existing pokemon with that name';
            }
        } else {
            return 'You must enter a name';
        }
        
    } catch (error) {
        console.log(error)
    }
}

const getTypes = async () => {

    let callDB = await Type.findAll();

    if(callDB.length === 0){

        const callApi = await axios.get('https://pokeapi.co/api/v2/type');
        let infoApi = await callApi.data.results.map( t => {
            return {
                name: t.name
            }
        })
        infoApi = await Type.bulkCreate(infoApi);
    }
    return callDB;
}



module.exports= {
    getPokemones,
    getPokemonesByNameInApiOrDB,
    getPokemonesByIdInApiOrDB,
    postPokemons,
    getTypes
}