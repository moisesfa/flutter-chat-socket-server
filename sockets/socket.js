const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    //console.log(client.handshake.headers);
    //console.log(client.handshake.headers['x-tocken']);
    // Validar el tocken
    const [valido,uid] = comprobarJWT(client.handshake.headers['x-token']);
    //console.log(valido, uid);
    
    // Verificar autenticación 
    if (!valido) {
        return client.disconnect();
    }

    // Autenticado
    //console.log('Cliente autenticado');
    usuarioConectado(uid);

    // Ingresar al usuario en una sala particular con el uid de la base de datos
    client.join(uid);

    // Escuchar del cliente el mensaje personal 
    client.on('mensaje-personal', async (payload)=>{
        console.log(payload);
        // Grabamos el mensaje en la base de datos 
        await grabarMensaje(payload);
        // Ahora se lo emitimos al cliente 
        io.to(payload.para).emit('mensaje-personal', payload);
    });

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });

   /*  client.on('mensaje-ic', ( payload ) => {
        console.log('Mensaje recibido del cliente', payload);
        io.emit( 'mensaje-is', { server: 'Respuesta del servidor' } );
    }); */


});
