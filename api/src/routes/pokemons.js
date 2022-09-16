const { getPokemones, getPokemonesByNameInApi, getPokemonesByNameInApiOrDB, getPokemonesByIdInApiOrDB, postPokemons } = require('../controllers');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const {name} = req.query;
        try {
            if(!name) return res.status(201).json(await getPokemones());
            return res.status(200).json(await getPokemonesByNameInApiOrDB(name));  
        } catch (error) {
            console.log(error)
        }
    })


router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const info = await getPokemonesByIdInApiOrDB(id);
        if(info) res.json(info);
    } catch (error) {
        console.log(error);
    }
})

router.post('/', async (req,res) => {
    const {name, life, attack, defense, speed, height, weight, img, inDB, types} = req.body;
    try {
        const info = await postPokemons(name, life, attack, defense, speed, height, weight, img, inDB,types);
        res.json(info)
        
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;