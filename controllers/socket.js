const Usuario = require ('../models/usuario');
const Mensaje = require ('../models/mensaje');

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

const grabarMensaje = async ( payload ) => {

    /* 
     payload:
        de: ''
        para: ''
        mensaje: ''
    */

    try {
        const mensaje = new Mensaje( payload );
        await mensaje.save();
        return true;
    } catch (error) {
        return false;
    }

}

module.exports = {
 usuarioConectado,
 usuarioDesconectado,
 grabarMensaje
}