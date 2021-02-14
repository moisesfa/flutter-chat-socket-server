const { response } = require ('express');
const Usuario = require('../models/usuario');

const getUsuarios = async ( req, res = response  ) => {

    // Implementar paginaciones 
    const desde = Number (req.query.desde) || 0;

    // Obtenemos los usuarios de la base de datos ordenados por conexión 
    // Todos menos el propio usuario
    const usuarios = await Usuario
        .find({_id: {$ne: req.uid}})
        .sort('-online')
        .skip(desde)
        .limit(20);

    res.json({
        ok: true,
        usuarios 
    });

}

module.exports = {
    getUsuarios
}