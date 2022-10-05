const { getPokemones, getPokemonesByNameInApi, getPokemonesByNameInApiOrDB, getPokemonesByIdInApiOrDB, postPokemons } = require('../controllers');

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
            const {name} = req.query;
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

router.delete('/:id',async(req,res)=>{
    try{
        let {id}= req.params;
        await Pokemon.destroy({
            where:{id}
        })
        res.status(201).json('pokemons deleted')
    }catch(err){
        res.status(418).json(console.log(err))
    }
})


module.exports = router;