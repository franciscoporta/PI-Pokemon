const router = require('express').Router();
const { getTypes } = require("../controllers");


router.get('/', async (req,res) => {
    try {
        res.json(await getTypes());
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;