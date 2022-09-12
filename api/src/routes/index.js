const { Router } = require('express');
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const pokemons  = require('./pokemons');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', pokemons)

module.exports = router;
