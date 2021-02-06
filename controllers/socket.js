const Usuario = require ('../models/usuario');

// Funcion que se dispara cuando se conecta alguien y retorna el usuario
const usuarioConectado = async ( uid = '') => {
    const usuario = await Usuario.findById(uid);
    usuario.online = true;
    // Lo guardo en la base de datos
    usuario.save();
    return usuario;
}

const usuarioDesconectado = async ( uid = '') => {
    const usuario = await Usuario.findById(uid);
    usuario.online = false;
    // Lo guardo en la base de datos
    usuario.save();
    return usuario;
}

module.exports = {
 usuarioConectado,
 usuarioDesconectado
}