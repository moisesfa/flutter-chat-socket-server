const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado } = require('../controllers/socket');


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

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });

   /*  client.on('mensaje-ic', ( payload ) => {
        console.log('Mensaje recibido del cliente', payload);
        io.emit( 'mensaje-is', { server: 'Respuesta del servidor' } );
    }); */


});
