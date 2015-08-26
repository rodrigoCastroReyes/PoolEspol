var db = require('./app/model/model.js');



function crearObjetoMensaje(data){
   var mensaje;
   mensaje={fecha: new Date(),
            hora: new Date(),
            contenido: data.mensaje,
            id_emisor: data.idEmisor,
            id_receptor: data.idDestino

   };

   return mensaje;
}

function socketChat(http,sessionMiddleware){
    var clients={};//tabla de hash con referencia a las conecciones de los clientes
    var io = require('socket.io')(http);
    io.use(function(socket,next){
        sessionMiddleware(socket.request, socket.request.res, next);
    });
    
    io.on('connection', function(client) {  
        var session=client.request.session
        if(session.user){
            clients[session.user.id]=client; // se almacena la tupla (idUsuario,socketCliente)
            console.log('Usuario conectado');
            console.log(session.use.id);
            console.log(db.obtenerConversaciones(session.use.id));

            client.on('disconnect', function(){
                console.log('se desconecto');
            });

            client.on('enviarServidor',function(data){
                console.log(data);
                var mensaje= crearObjetoMensaje(data);
                db.guardarMensaje(mensaje);
                io.sockets.emit('enviarCliente',data);
                
            });
        }

           
    }); 
}



exports.socketChat=socketChat;

