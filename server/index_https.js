var fs = require( 'fs' );
var app = require('express')();
var https        = require('https');
var server = https.createServer({
    key: fs.readFileSync('/etc/httpd/ssl/private.key').toString(),
    cert: fs.readFileSync('/etc/httpd/ssl/a10c328810ab1d53.crt').toString()
},app);
server.listen(8081,function(){
console.log('servidor funcionando en 8081');
});

var io = require('socket.io').listen(server);

io.on('connection',socket=>{
    console.log('conexion activa'+' '+socket.handshake.address);

    /*captura la notificacion enviada por el cliente*/
    socket.on('notifi_cli',function(data){
      console.log("notifi_cli=>"+data);

      /*notificacion transmitida desde el servidor*/
      io.sockets.emit('notifi_serve',data);
    });

    socket.on('private_message_cli', function ( data ) {
                  socket.broadcast.emit( 'private_message_serve',data);
      console.log("private_message_serve=>"+data.mensaje);
         });
});
