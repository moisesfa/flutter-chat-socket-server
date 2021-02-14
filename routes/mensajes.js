/*
    path: /api/mensajes
*/

const { Router } = require ('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getMensajes } = require('../controllers/mensajes');

const router = Router();

// Petición de usuarios,
router.get('/:de', validarJWT, getMensajes );

module.exports = router;