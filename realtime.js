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
            for (var key in clients){
                if(key!=client.id)
                    clients[key].emit('actualizarRuta',infoRuta);//broadcast de la nueva ruta a los usuarios conectados
            }
        });

        client.on('solicitarRuta',function(solicitud){
            /*
            update usuario-ruta
            var idReceptor=solicitud.idReceptor;
            solicitud.idRuta 
            solicitud.idReceptor
            solicitud.latitud 
            solicitud.longitud */
            //buscar en clients: id==idReceptor para enviar notificacion
            //con el idReceptor recuperar: nickname, urlnickname del receptor de la notificacion
            var notificacion={};//construir la notificacion
            notificacion.idEmisor=1234;
            notificacion.publicador='Oswaldo';
            notificacion.urlNickname='imagenes/oswaldo.jpg';
            notificacion.tipo='Solicitud';
            client.broadcast.emit('actualizarNotificacion',notificacion);
        });

        client.on('nuevoAventon',function(infoAventon){
            for (var key in clients){
                if(key!=client.id)
                    clients[key].emit('actualizarAventon',infoAventon);//broadcast de la nueva ruta a los usuarios conectados
            }
        });

        client.on('aceptarAventon',function(aventon){
            /*update aventon
            var notificacion={};//construir la notificacion
            notificacion.idEmisor=aventon.emisor;
            notificacion.publicador='';
            notificacion.urlNickname='';
            client.broadcast.emit('actualizarNotificacion',notificacion);*/
            console.log(aventon);
        });    
    }); 
}

exports.socketNoticias=socketNoticias;