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
                db.guardarRuta(infoRuta);
                for (var key in clients){
                    if(key!=client.id)
                        clients[key].emit('actualizarRuta',infoRuta);//broadcast de la nueva ruta a los usuarios conectados
                }
            });

            client.on('solicitarRuta',function(solicitud){ 
                db.encontrarUsuarioPorID(solicitud.idEmisor).then(function(usuario){
                    if(usuario!=null){
                        var solicitante=usuario.dataValues;
                        var notificacion={};//construir la notificacion
                        notificacion.idEmisor = solicitud.idEmisor;
                        notificacion.idReceptor = solicitud.idReceptor;
                        notificacion.idRuta = solicitud.idRuta;
                        notificacion.publicador = solicitante.nick;
                        notificacion.urlNickname = solicitante.foto;
                        notificacion.tipo = 'Solicitud';
                        for (var key in clients){
                            if( key == solicitud.idReceptor){
                                clients[key].emit('actualizarNotificacion',notificacion);
                            }
                        }
                        //guardar notificacion
                        //guardar en tabla usuario-ruta
                        /*update usuario-ruta
                        solicitud.idRuta 
                        solicitud.idReceptor
                        solicitud.latitud 
                        solicitud.longitud */ 
                    }
                });
            });

            client.on('nuevoAventon',function(infoAventon){
                db.guardarAventon(infoAventon);
                for (var key in clients){
                    if(key!=client.id)
                        clients[key].emit('actualizarAventon',infoAventon);//broadcast de la nueva ruta a los usuarios conectados
                }
            });

            client.on('aceptarAventon',function(confirmacion){
                //confirmacion.idAventon update el estado del aventon
                /*db.actualizarAventon(confirmacion.idAventon, datos_aventon);*/
                //validar si el usuario esta conectado o no
                db.encontrarUsuarioPorID(confirmacion.idEmisor).then(function(usuario){
                    if(usuario!=null){
                        var dueñoRuta=usuario.dataValues;
                        var notificacion={};//construir la notificacion
                        //notificacion.idEmisor=confirmacion.idEmisor;
                        //notificacion.idReceptor=confirmacion.idReceptor;
                        notificacion.publicador=dueñoRuta.nick;
                        notificacion.urlNickname=dueñoRuta.foto;
                        notificacion.tipo='Informacion';
                        for (var key in clients){
                            if( key == confirmacion.idReceptor){
                                clients[key].emit('actualizarNotificacion',notificacion);
                            }
                        }
                    }
                });
            });
        }    
    }); 
}

exports.socketNoticias=socketNoticias;

exports.clients=clients;