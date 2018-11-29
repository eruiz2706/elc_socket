
var express =require('express');
var app     =express();
var server  =require('http').Server(app);
var io      =require('socket.io')(server);

io.on('connection',socket=>{
    console.log('conexion activa'+' '+socket.handshake.address);

    /*captura la notificacion enviada por el cliente*/
    socket.on('notifi_cli',function(data){
      console.log("notifi_cli=>"+data);

      /*notificacion transmitida desde el servidor*/
      io.sockets.emit('notifi_serve',data);
    });
});

server.listen(8081,function(){
  console.log('servidor funcionando en 8081');
})
