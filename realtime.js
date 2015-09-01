var db = require('./app/model/model.js');

var clients={};

function socketNoticias(io,sessionMiddleware){
    
    //tabla de hash con referencia a las conecciones de los clientes
    //var io = require('socket.io')(http);
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
                db.perteneceARuta(solicitud).then(function(results){//validar si el usuario ya se ha unido a esa ruta
                    if(results.length == 0){
                        //validar que el usuario no tenga una solicitud pendiente a esa ruta
                        db.solicituPendienteEnRuta(solicitud).then(function(solicitudes){
                            if(solicitudes.length == 0){
                                verificarCapacidadRuta(solicitud);
                            }else{
                                 if(clients[session.user.id]!=null){
                                    clients[session.user.id].emit('ErrorRuta',3);
                                }
                            }
                        });
                    }else{//si ya se ha unido a esa ruta se envia un mensaje
                        if(clients[session.user.id]!=null){
                            clients[session.user.id].emit('ErrorRuta',0);
                        }
                    }
                });
            });

            client.on('aceptarRuta',function(respuesta){
                db.encontrarRutaPorID(respuesta.idRuta).then(function(ruta){
                    if(ruta.capacidad > 0 ){//si la ruta aun tiene capacidad actualizar usuario ruta
                        aceptarSolicitudRuta(respuesta,ruta.capacidad);
                    }else{
                        respuesta.estado = 'Rechazada';
                        rechazarSolicitudRuta(respuesta);
                    }
                });
            });

            client.on('rechazarRuta',function(respuesta){
                rechazarSolicitudRuta(respuesta);
            });

            client.on('nuevoAventon',function(infoAventon){
                db.guardarAventon(infoAventon).then(function (result){
                    infoAventon.idAventon=result.dataValues.id_aventon;
                    for (var key in clients){
                        if(key!=session.user.id)
                            clients[key].emit('actualizarAventon',infoAventon);//broadcast de la nueva ruta a los usuarios conectados
                    }
                }); 
            });

            client.on('aceptarAventon',function(confirmacion){//comprobar que ese aventon no ha sido aceptado antes
                aceptarAventon(confirmacion);//actualizar el estado del aventon
            });
        }    
    }); 
}

exports.socketNoticias=socketNoticias;

exports.clients=clients;


//Aventones 
function aceptarAventon(confirmacion){
    db.obtenerAventonPorID(confirmacion.idAventon).then(function(aventon){
        if(aventon!=null){
            if(aventon.dataValues.id_usuario_da==null){
                db.actualizarAventon(confirmacion.idAventon,confirmacion).then(function(result){
                    db.encontrarUsuarioPorID(confirmacion.idEmisor).then(function(usuario){
                        if(usuario!=null){
                            //enviar y guardar notificacion
                            console.log(confirmacion);
                            var dueñoRuta=usuario.dataValues;
                            var notificacion={};//construir la notificacion
                            notificacion.idEmisor = confirmacion.idEmisor;
                            notificacion.idReceptor = confirmacion.idReceptor;
                            notificacion.idUsuarioRuta = null;
                            notificacion.estado = 'Aceptada';
                            notificacion.tipo='Informacion';
                            notificacion.publicador = dueñoRuta.nick;
                            notificacion.urlNickname = dueñoRuta.foto;
                            
                            db.guardarNotificacion(notificacion).then(function(result){
                                console.log(result);
                            });

                            console.log("aventon aceptado");
                            if(clients[confirmacion.idEmisor]!=null){//envia un mensaje al usuario
                                db.encontrarUsuarioPorID(confirmacion.idReceptor).then(function(result){
                                   //var = usuarioEmisor.dataValues.nick;
                                    clients[confirmacion.idEmisor].emit('AventonAceptado',
                                    { nickname : result.dataValues.nick }); 
                                });
                            }
                            //si el usuario esta conectado enviar la notificacion
                            if(clients[confirmacion.idReceptor]!=null)
                                clients[confirmacion.idReceptor].emit('actualizarNotificacion',notificacion);
                        }else{
                            console.log("no hay usuario")
                        }
                    });
                });
            }else{
                if(clients[confirmacion.idEmisor]!=null){
                    clients[confirmacion.idEmisor].emit('ErrorRuta',2);
                }
            }
        }
    });
}
//Rutas : 
//Solicitud Rutas
function aceptarSolicitudRuta(respuesta,capacidad){//usuario_ruta pasa de estado Pendiente a Aceptada
    db.actualizarUsuarioRuta(respuesta.idUsuarioRuta,respuesta.estado).then(
        function(usuarioruta){
            if(usuarioruta!=null){
                actualizarCapacidad(respuesta,capacidad); //actualizar la capacidad de la ruta  
            }
        }
    );
}

function rechazarSolicitudRuta(respuesta){//usuario_ruta pasa de estado Pendiente a Rechazada
    db.actualizarUsuarioRuta(respuesta.idUsuarioRuta,respuesta.estado).then(
        function(usuarioruta){
            contestarSolicitud(respuesta);
        }
    );
}

function verificarCapacidadRuta(solicitud){
    db.encontrarRutaPorID(solicitud.idRuta).then(function(ruta){//validar si esa ruta tiene capacidad
        if( ruta.capacidad > 0 ){
            guardarSolicitud(solicitud);
        }else{
            if(clients[session.user.id]){
                clients[session.user.id].emit('ErrorRuta',1);
            }
        }
    });
}

function actualizarCapacidad(respuesta,capacidad){
    //disminuye en uno la capacidad de la ruta
    var cap = capacidad-1;//decrementa la capacidad de la ruta
    console.log("actualizar capacidad");
    db.actualizarCapacidadRuta(respuesta.idRuta,cap).then(function(ruta){
        contestarSolicitud(respuesta);//envia una notificacion al usuario informando que han decidido llevarlo en esta ruta
    });
}

function contestarSolicitud(respuesta){
    //envia una notificacion al usuario que ha hecho una solicitud
    db.encontrarUsuarioPorID(respuesta.idEmisor).then(
    function(usuario){
        var dueñoRuta = usuario.dataValues;
        var notificacion = {};//construir la notificacion

        notificacion.idNotificacion = respuesta.idNotificacion;
        notificacion.idEmisor = respuesta.idEmisor;
        notificacion.idReceptor = respuesta.idReceptor;
        notificacion.idUsuarioRuta = respuesta.idUsuarioRuta;
        notificacion.estado = respuesta.estado;
        notificacion.tipo = respuesta.tipo;
        notificacion.publicador = dueñoRuta.nick;
        notificacion.urlNickname = dueñoRuta.foto;
        //actualiza el estado y tipo de notificacion
        db.actualizarNotificacion(notificacion).then(function(result){
            db.guardarNotificacion(notificacion).then(function(result){
                console.log(result);
            });
            if(clients[respuesta.idReceptor]!=null) //si el usuario esta conectado enviar la notificacion
                clients[respuesta.idReceptor].emit('actualizarNotificacion',notificacion);
        });
    }); 
}

function guardarSolicitud(solicitud){
    //encontrar el usuario que genero la solicitud    
    db.encontrarUsuarioPorID(solicitud.idEmisor).then(
        function(usuario){
        if(usuario!=null){
            //guardar la solicitud como pendiente
            solicitud.estado = 'Pendiente';
            db.guardarUsuarioRuta(solicitud).then(function (usuarioruta){
                if(usuarioruta!=null){
                    //cuando se haya guardado la solicitud enviar y guardar la notificacion
                    var solicitante=usuario.dataValues;
                    var notificacion={};//construir la notificacion
                    notificacion.idEmisor = solicitud.idEmisor;
                    notificacion.idReceptor = solicitud.idReceptor;
                    notificacion.idUsuarioRuta = usuarioruta.id_usuario_ruta
                    notificacion.idRuta = solicitud.idRuta;
                    notificacion.publicador = solicitante.nick;
                    notificacion.urlNickname = solicitante.foto;
                    notificacion.estado = 'Pendiente';
                    notificacion.tipo = 'Solicitud';
                    //guardar notificacion
                    db.guardarNotificacion(notificacion).then(function(not){
                        notificacion.idNotificacion = not.id_Notificacion;
                        //mostrar notificacion si el usuario esta conectado
                        if(clients[solicitud.idReceptor]!=null)
                            clients[solicitud.idReceptor].emit('actualizarNotificacion',notificacion);
                    });
                }
            });
        }
    });
}
