const { io } = require('../index');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

   /*  client.on('mensaje-ic', ( payload ) => {
        console.log('Mensaje recibido del cliente', payload);
        io.emit( 'mensaje-is', { server: 'Respuesta del servidor' } );
    }); */


});
