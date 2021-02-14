const { response } = require ('express');
const Mensaje = require('../models/mensaje');

const getMensajes = async ( req, res = response  ) => {

    const miUid = req.uid;
    const mensajesDe = req.params.de;

    // Cargar los últimos 30 mensajes 
    const ult30men = await Mensaje.find({
        // Recuperamos los mensajes que yo he enviciado a un usuario 
        // y los que el usuario me ha envida a mi de manera descendente
        $or:[{de:miUid, para: mensajesDe}, {de:mensajesDe, para:miUid}]
    }).sort({createdAt: 'desc' }).limit(30);

    res.json({
        ok: true,
        mensajes: ult30men
    });


}

module.exports = {
    getMensajes
}