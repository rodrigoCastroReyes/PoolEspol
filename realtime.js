var db = require('./app/model/model.js');

var clients={};

function socketNoticias(http,sessionMiddleware){
    //tabla de hash con referencia a las conecciones de los clientes
    var io = require('socket.io')(http);

    io.use(function(socket,next){
        sessionMiddleware(socket.request, socket.request.res, next);
    });

    io.on('connection', function(client) {  
        var session=client.request.session
        if(session.user){
            
            clients[session.user.id]=client;// se almacena : (idUsuario,socketCliente)
            
            client.on('disconnect', function(){
                console.log('se desconecto otro man');
            });

            client.on('nuevaRuta',function(infoRuta){
                db.guardarRuta(infoRuta).then( function (ruta){
                    infoRuta.idRuta=ruta.dataValues.id_ruta;
                    for (var key in clients){
                        if(key!=session.user.id)
                            clients[key].emit('actualizarRuta',infoRuta);//broadcast de la nueva ruta a los usuarios conectados
                    }
                });
            });

            client.on('solicitarRuta',function(solicitud){ 
                db.encontrarUsuarioPorID(solicitud.idEmisor).then(function(usuario){
                    if(usuario!=null){
                        //guardar la solicitud como pendiente
                        solicitud.estado = 'Pendiente';
                        db.guardarUsuarioRuta(solicitud).then(function (usuarioruta){
                            //cuando ya haya guardado la solicitud enviar y guardar la notificacion
                            var solicitante=usuario.dataValues;
                            var notificacion={};//construir la notificacion
                            notificacion.idEmisor = solicitud.idEmisor;
                            notificacion.idReceptor = solicitud.idReceptor;
                            notificacion.idUsuarioRuta= usuarioruta.id_usuario_ruta
                            notificacion.idRuta = solicitud.idRuta;
                            notificacion.publicador = solicitante.nick;
                            notificacion.urlNickname = solicitante.foto;
                            notificacion.estado = 'Pendiente';
                            notificacion.tipo = 'Solicitud';
                            
                            db.guardarNotificacion(notificacion);
                            
                            if(clients[solicitud.idReceptor]!=null)
                                clients[solicitud.idReceptor].emit('actualizarNotificacion',notificacion);
                        });
                    }
                });
            });

            client.on('nuevoAventon',function(infoAventon){
                db.guardarAventon(infoAventon);
                for (var key in clients){
                    if(key!=session.user.id)
                        clients[key].emit('actualizarAventon',infoAventon);//broadcast de la nueva ruta a los usuarios conectados
                }
            });

            client.on('aceptarAventon',function(confirmacion){
                //actualizar el estado del aventon
                db.actualizarAventon(confirmacion.idAventon,confirmacion).then(function(aventon){
                    db.encontrarUsuarioPorID(confirmacion.idEmisor).then(function(usuario){
                        if(usuario!=null){
                            //enviar y guardar notificacion
                            var dueñoRuta=usuario.dataValues;
                            var notificacion={};//construir la notificacion
                            notificacion.idEmisor = confirmacion.idEmisor;
                            notificacion.idReceptor = confirmacion.idReceptor;
                            notificacion.idUsuarioRuta = null;
                            notificacion.estado = 'Aceptada';
                            notificacion.tipo='Informacion';
                            notificacion.publicador = dueñoRuta.nick;
                            notificacion.urlNickname = dueñoRuta.foto;
                            console.log(notificacion);
                            //db.guardarNotificacion(notificacion);
                            //validar si el usuario esta conectado o no para enviar la notificacion
                            if(clients[confirmacion.idReceptor]!=null)
                                clients[confirmacion.idReceptor].emit('actualizarNotificacion',notificacion);
                        }
                    });
                });
            });
        }    
    }); 
}

exports.socketNoticias=socketNoticias;

exports.clients=clients;