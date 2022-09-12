const { getPokemones } = require('../controllers');

const router = require('express').Router();

router.get('', async (req, res) => {
        try {
            const infoApi = await getPokemones();
            if(infoApi){
                res.json(infoApi)
            } else {
                console.log('404, no se trajeron pokemones')
            }
            
        } catch (error) {
            console.log(error)
        }
    })

module.exports = router;