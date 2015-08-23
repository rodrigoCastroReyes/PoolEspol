var db = require('./app/model/model.js');

function socketNoticias(http){
    var clients={};//tabla de hash con referencia a las conecciones de los clientes
    var io = require('socket.io')(http);
    
    io.on('connection', function(client) {  
        console.log('Usuario conectado');
        clients[client.id]=client;// se almacena la tupla (idUsuario,socketCliente)

        client.on('disconnect', function(){
            console.log('se desconecto otro man');
        });

        client.on('nuevaRuta',function(infoRuta){
            db.guardarRuta(infoRuta);
            for (var key in clients){
                if(key!=client.id)
                    clients[key].emit('actualizarRuta',infoRuta);//broadcast de la nueva ruta a los usuarios conectados
            }
        });

        client.on('solicitarRuta',function(solicitud){ 
            db.enviarNotificacion(solicitud,client); 
        });

        client.on('nuevoAventon',function(infoAventon){
            db.guardarAventon(infoAventon);
            for (var key in clients){
                if(key!=client.id)
                    clients[key].emit('actualizarAventon',infoAventon);//broadcast de la nueva ruta a los usuarios conectados
            }
        });

        client.on('aceptarAventon',function(confirmacion){
            /*update aventon
            var notificacion={};//construir la notificacion
            notificacion.idEmisor=aventon.emisor;
            notificacion.publicador='';
            notificacion.urlNickname='';
            client.broadcast.emit('actualizarNotificacion',notificacion);*/
            db.enviarConfirmacion(confirmacion,client);
        });    
    }); 
}

exports.socketNoticias=socketNoticias;