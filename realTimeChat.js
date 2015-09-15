var db = require('./app/model/model.js');


function crearObjetoMensaje(data){
   
   console.log("culpable");
   mensaje={fecha: new Date(),
            hora: new Date(),
            contenido: data.mensaje,
            id_emisor: data.idEmisor,
            id_receptor: data.idDestino

   };
   console.log(mensaje.id_receptor);
   return mensaje;
}

function socketChat(io,sessionMiddleware){
    var clients={};//tabla de hash con referencia a las conecciones de los clientes
    //var io = require('socket.io')(http);
    io.use(function(socket,next){
        sessionMiddleware(socket.request, socket.request.res, next);
    });
    
    io.on('connection', function(client) {  
        var session=client.request.session
        if(session.user){
            clients[session.user.id]=client; // se almacena la tupla (idUsuario,socketCliente)
            console.log('Usuario conectado');
            console.log(session.user.id);
            

            client.on('solicitarConversaciones', function(){
                console.log('solicitarConversaciones');
                db.obtenerConversaciones(session.user.id,io);
            });

            client.on('disconnect', function(){
                console.log('se desconecto');
            });

            client.on('enviarServidor',function(data){
                console.log("soy el servidor me llego algo");
                console.log(data.idDestino);
                var socketDestino=clients[data.idDestino];
                mensaje=crearObjetoMensaje(data);
                //Sconsole.log(mensaje.dataValues);
                db.guardarMensaje(mensaje,socketDestino);
                //db.obtenerNumeroMensajesNoLeidos(data.idDestino,session.user.id,socketDestino);
            });

            client.on('SolicitarNoLeidos',function(data){
               db.obtenerNumeroMensajesNoLeidos(data.id_receptor,data.id_emisor,io);
            });
        }

           
    }); 
}



exports.socketChat=socketChat;

