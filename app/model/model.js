//var pg = require('pg');
//var conString = "tcp://postgres:postgres@localhost:5432/PoolEspol";
var modelos = require('../model/PoolEspoldb.js');

/*
FUNCIONES PARA   INSERTAR DATOS EN LA BASE DE DATOS
*/
 exports.guardarCarro = function (datosCarro){
	modelos.Carro.create({placa: datosCarro.placa, 
							foto: datosCarro.foto, 
							capacidad: datosCarro.capacidad})
	.then(function (carro){
		console.log(carro);
	});
};

 exports.guardarUsuario = function(datosUsuario,response){
	modelos.Usuario.create({nick: datosUsuario.nick, 
							password: datosUsuario.password, 
							nombre: datosUsuario.nombre,
							apellidos: datosUsuario.apellidos,
							sexo: datosUsuario.sexo, 
							telefono: datosUsuario.telefono,
							id_carro: datosUsuario.id_carro,
							foto: datosUsuario.foto })
	.then(function (usuario){
		//console.log(usuario);
		response.json({mensaje:'Se ha Registrado con Exito'});	
		//response.redirect('/');
	});
};

 exports.guardarMensaje = function(datosUsuario,socket){
	modelos.Mensaje.create({fecha: datosUsuario.fecha, 
							hora: datosUsuario.hora, 
							contenido: datosUsuario.contenido, 
							leido: false,
							id_emisor: datosUsuario.id_emisor, 
							id_receptor: datosUsuario.id_receptor})
	.then( function (mensaje){
		console.log(mensaje);
		//el receptor del mensaje esta conectado, se le envia el mensaje en tiempo real
		console.log("aqui 1");
		if(socket!=null){
			console.log("si entro al if");
			modelos.Usuario.findOne({where:{id:mensaje.id_emisor}}).then(function(user){
				foto=user.dataValues.foto;
				nick=user.dataValues.nick;
				var datos={
					id_emisor:mensaje.id_emisor,
					id_receptor:mensaje.id_receptor,
					contenido:mensaje.contenido,
					foto:foto,
					nick:nick

				};
				socket.emit("enviarCliente",datos);
				modelos.Mensaje.findAll({
					where:{$or:{id_receptor:datosUsuario.id_receptor}}
				}).then(function(result){
					 var lista=[];
					 var usuarios=[];
					 for(var i =0 ; i< result.length; i++){
					 	//obtenego el id de la persona con la que tengo la conversacion
					 	var auxid;
					 	auxid=result[i].dataValues.id_emisor;
					 	if(result[i].dataValues.leido){
					 		continue;
					 	}
					 	ban=1;
					 	for(var j=0;j<lista.length;j++){
					 		if(lista[j]==auxid ){
					 			ban=0;
					 			break;
					 		}
					 	}
					 	//console.log(result[i].dataValues);
					 	if(ban==1 && auxid!=null){
					 		lista.push(auxid);
					 	}
					 	
					 }
					 socket.emit("nuevoMensaje",lista.length);
					 console.log(lista.length);
					 obtenerNumeroMensajesNoLeidosNoExport(datosUsuario.id_receptor,datosUsuario.id_emisor,socket);
				});

				

			});
		}
	});
};

 exports.guardarNotificacion = function(datosUsuario){
	return modelos.Notificacion.create({tipo: datosUsuario.tipo, 
								estado: datosUsuario.estado, 
								id_emisor: datosUsuario.idEmisor,
								usuarioruta: datosUsuario.idUsuarioRuta, 
								id_receptor:datosUsuario.idReceptor});
};

 exports.guardarAventon = function(InfoAventon){
	return modelos.Aventon.create({latitud: InfoAventon.ubicacion.x,
							longitud: InfoAventon.ubicacion.y,  
							fecha: InfoAventon.fecha, 
							hora: InfoAventon.hora, 
							id_usuario_pide: InfoAventon.idPublicador,
						    id_usuario_da: null});
};

 exports.guardarRuta = function(_ruta){
 	var puntosx = [];
 	var puntosy = [];
 		for (var i in _ruta.ruta) {
 			puntosx.push(_ruta.ruta[i].x);
 			puntosy.push(_ruta.ruta[i].y);
 		}
	return modelos.Ruta.create({fecha: _ruta.fecha,
						 costo: _ruta.precio, 
						 capacidad: _ruta.capacidad, 
						 hora: _ruta.hora, 
						 estado: "pendiente",
						 puntosx: puntosx, 
						 puntosy: puntosy, 
						 idcreador: _ruta.idPublicador});
};

 exports.guardarUsuarioRuta = function(usuario_Ruta){
	return modelos.Usuario_Ruta.create({id_usuario: usuario_Ruta.idEmisor,
								 id_ruta: usuario_Ruta.idRuta,
								 lat: usuario_Ruta.latitud, 
								 estado: usuario_Ruta.estado,
								 longit: usuario_Ruta.longitud});
};
/* 
FUNCIONES DE ACTUALIZAR 
*/
exports.actualizarDatosCarro = function (idcarro, datos_carro){

	modelos.Carro.update({ placa: datos_carro.placa,
						   capacidad: datos_carro.capacidad},
						   { where: {id_carro: idcarro}})
	.then(function (carro){
		console.log('ACTUALIZADO CORRECTAMENTE');
	});
};
exports.actualizarUsuario = function (idusuario,datos_usuario){
	modelos.Usuario.update({nick: datos_usuario.nick,  
							nombre: datos_usuario.nombre, 
							apellidos: datos_usuario.apellidos, 
							telefono: datos_usuario.telefono},
										{ where: { id: idusuario}})
	.then( function (usuario){
		console.log('ACTUALIZADO CORRECTAMENTE');
	});
};

exports.actualizarFotoUsuario = function (idusuario,foto){
	return modelos.Usuario.update({foto:foto.ruta},
										{ where: { id: idusuario}})
	.then( function (usuario){
		console.log('ACTUALIZADO CORRECTAMENTE tu foto');
	});
};


exports.actualizarMensaje = function(idmensaje, datos_mensaje){
	modelos.Mensaje.update({contenido: datos_mensaje.contenido},
							{ where: { id_mensaje: idmensaje } })
	.then( function (mensaje){
		console.log('ACTUALIZADO CORRECTAMENTE');
	});
};


exports.actualizarNotificacion = function(datos_notificacion){
	return modelos.Notificacion.update({ estado: datos_notificacion.estado },
						 		{ where: {id_Notificacion: datos_notificacion.idNotificacion}});
};

exports.actualizarAventon = function(idaventon, datos_aventon){
 	return modelos.Aventon.update({id_usuario_da:datos_aventon.idEmisor},
 								  { where: {id_aventon: idaventon} });
};


exports.actualizarCapacidadRuta = function(idruta,cap){
	return modelos.Ruta.update({ capacidad: cap },
							   { where: {id_ruta: idruta} });
};

exports.actualizarUsuarioRuta = function(idusuarioruta,estado){
	return modelos.Usuario_Ruta.update({ 
								  estado: estado
								},
								{ where: {id_usuario_ruta: idusuarioruta}});
};

exports.actualizarEstadoRuta = function(idruta, std){
	return modelos.Ruta.update({ estado: std },
							   { where: {id_ruta: idruta} });
};

//Consultas chat
exports.obtenerConversaciones = function(id){
	return model.Mensaje.findAll({
		where:{id_emisor:id}
	});
};


exports.consultarUsuario = function (idusuario){
	return modelos.Usuario.findOne({where :{id: idusuario}});
};

exports.consultarUsuarioCarro = function (idcarro){
 			return modelos.Usuario.find({
	 			include: [{ model:modelos.Carro, as: 'Usuario_Carro'}],
	 			where : { id_carro:idcarro }
	 		});   	
};

//Usuario
exports.encontrarUsuario = function(nickname){
	return modelos.Usuario.findOne({
		where:{
			nick:nickname
		}
	});
}

exports.encontrarUsuarioPorID = function(id){
	return modelos.Usuario.findById(id);
}

exports.encontrarUsuarioRutaPorId = function (idUsuarioRuta){
	return modelos.Usuario_Ruta.findById(idUsuarioRuta);
}

var Sequelize = require('sequelize');

exports.obtenerEstadisticaUsuario = function(idUsuario){
	return modelos.Usuario.findAll({
		attributes : ['id', 'nick', 'foto' , [
			    	Sequelize.fn('count',
					Sequelize.col('id')), 'total']
		],
		include: [{
			model : modelos.Usuario_Ruta, as : 'Usuario_anade_usuariosRutas',
			attributes : [],
			where: {
				estado : 'Aceptada'
			},
			include : [{
				model : modelos.Ruta, as: 'Ruta_Miembro',
				attributes : [],
				where: {
					idcreador : idUsuario,
					estado : 'pendiente'
				}
			}]
			}
		],
		group : ['id'] ,
		order : ['total']
	});
}

exports.obtenerNotificacionesRechazadas = function(idUsuario){
	return modelos.Notificacion.count({
		where : {
			id_receptor : idUsuario,
			estado : 'Rechazada' ,
			tipo : 'Solicitud'
		},
		include : [{
			model : modelos.Usuario, as: 'Receptor_Notificado',
			id : idUsuario
		}]
	});
}


//Consultas Ruta

exports.encontrarRutaPorID = function (idRuta){
	return modelos.Ruta.findById(idRuta);
}

exports.consultarRuta = function (idruta){
	return modelos.Ruta.findOne({ where:{id_ruta:idruta}});
};

exports.perteneceARuta = function(solicitud){
	return modelos.Usuario_Ruta.findAll({
		where : {
			estado: 'Aceptada',
		},
		include : [
			{ model :  modelos.Usuario, as : 'Usuario_Miembro',
			  where :  { id : solicitud.idEmisor }
			},
			{ model : modelos.Ruta, as: 'Ruta_Miembro' ,
			  where :  { id_ruta : solicitud.idRuta }
			}
		],
	});
}

exports.solicituPendienteEnRuta = function(solicitud){
	return modelos.Usuario_Ruta.findAll({
		where : {
			estado: 'Pendiente',
		},
		include : [
			{ model :  modelos.Usuario, as : 'Usuario_Miembro',
			  where :  { id : solicitud.idEmisor }
			},
			{ model : modelos.Ruta, as: 'Ruta_Miembro' ,
			  where :  { id_ruta : solicitud.idRuta }
			}
		],
	});
}

//Carga de rutas y aventones desde la base de datos
function obtenerHora(){
  var d = new Date();
  var hora = d.getHours();
  var minuto = d.getMinutes();
  var txtHora = (hora<10)?("0" + hora):(hora);
  var txtMinuto = (minuto<10)?("0" + minuto):(minuto);
  return txtHora + ":" + txtMinuto;
}

function compararTiempo(Tiempo){ //devuelve false si el tiempo de la ruta/aventon es menor al tiempo actual

	var tiempo_Ruta = Tiempo.split(":");
	var tiempo_Actual = obtenerHora().split(":");

	if((tiempo_Actual[0] > tiempo_Ruta[0]) || (tiempo_Actual[1] > tiempo_Ruta[1]) ){
	 		return false; 
	}
	return true;

}

function compararFecha(Fecha){ 

	var dateObj = new Date(Fecha);
	var month = dateObj.getUTCMonth() + 1; 
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();

	var Current = new Date();
	var Cmonth = Current.getUTCMonth() + 1; 
	var Cday = Current.getUTCDate() -1 ;
	var Cyear = Current.getUTCFullYear();


	var dateRuta = new Date(year + "/" + month+ "/" + day);
	var dateCurrent = new Date(Cyear + "/" + Cmonth+ "/" + Cday);


	if(dateCurrent> dateRuta){
		return 0;
	}
	else if(dateCurrent == dateRuta){
		return 1;
	}
	return -1;
	

}

function crearObjetoRuta(registro){
	
	var puntos = [];
	var limit = registro.puntosx.length;

	for (var i =0; i< limit; i++ ){
		var punto = {x: registro.puntosx[i], y: registro.puntosy[i]};
		puntos.push(punto);
	}

	var dateObj = new Date(registro.fecha);
	var month = dateObj.getUTCMonth() + 1; 
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();

	var stringFecha = day + "/" + month + "/" + year;
 

	var ruta = {idPublicador: registro.idcreador,
		 		publicador: registro.usuario.nick, 
		 		urlNickname: registro.usuario.foto,
		 		fecha: stringFecha,
		 		hora: registro.hora,
		 		precio: registro.costo,
		 		capacidad: registro.capacidad,
		 		idRuta: registro.id_ruta,
		 		ruta: puntos
		 		}
	return ruta;
}

exports.obtenerRutasNoticias = function (id_usuario, request, response){

	var tam = 5;
	var inicio = request.query.page;

	modelos.Ruta.findAll({
		include: [{ model: modelos.Usuario, required: true} ],
		where:{
			idcreador: { $ne: id_usuario },
			capacidad: { $ne: 0},
			estado: { $ne: "Eliminado"},
		},
		order: [['fecha', 'DESC'], ['hora' ,'DESC'] ]
	
	}).then(function (result){
	//console.log(result);
	var listRutas= [];
		 for(var i =0 ; i< result.length; i++){
		 	var registro = result[i].dataValues;


			if(compararFecha(registro.fecha) == 0){ //si la fecha actual es mayor a la fecha de la ruta
				continue;
			}

		 	if( compararFecha(registro.fecha) == 1 ){ // si las fechas son iguales
		 		
		 		if(!compararTiempo(registro.hora)){
			 		continue;
			 	}
		 	}
		 	var ruta = crearObjetoRuta(registro);
		 	listRutas.push(ruta);
		 }
		 
		 var count = Math.ceil(listRutas.length/tam);
		 
		 listRutas = listRutas.slice(inicio*tam, inicio*tam + tam);
		 listRutas = listRutas.reverse();
		 var j = {rutas:listRutas, numPage: count};
		 response.json(j);
	});

}

//Aventones

exports.obtenerAventonPorID = function(idAventon){
	return modelos.Aventon.findById(idAventon);
}

function crearObjetoAventon(registro){
	
	var dateObj = new Date(registro.fecha);
	var month = dateObj.getUTCMonth() + 1; 
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();

	var stringFecha = day + "/" + month + "/" + year;
	var aventon = {
		idPublicador: registro.id_usuario_pide,
		publicador: registro.publicador.nick,
		urlNickname: registro.publicador.foto,
		fecha: stringFecha,
		hora: registro.hora,
		idAventon: registro.id_aventon,
		ubicacion: {x: registro.latitud, y: registro.longitud}
	}
	return aventon;

}

exports.obtenerAventonesNoticias = function (id_usuario, request, response){

	var tam = 5;
	var inicio = request.query.page;

	modelos.Aventon.findAll({
		include: [{ model: modelos.Usuario , as: 'publicador' } ],
		where:{
			id_usuario_da: null,
			id_usuario_pide: {$ne: id_usuario}
		},
		order: [['fecha', 'DESC'], ['hora' ,'DESC'] ],
		
	}).then(function (result){
		var listAventones = [];

		for (var i =0; i< result.length; i++){
			var registro =  result[i].dataValues;

			if(compararFecha(registro.fecha) == 0){ //si la fecha actual es mayor a la fecha de la ruta
				continue;
			}

		 	if( compararFecha(registro.fecha) == 1 ){ // si las fechas son iguales
		 		
		 		if(!compararTiempo(registro.hora)){
			 		continue;
			 	}
		 	}

			var aventon = crearObjetoAventon(registro);
			listAventones.push(aventon);
		} 
		var count = Math.ceil(listAventones.length/tam);
		listAventones = listAventones.slice(inicio*tam, inicio*tam + tam);
		listAventones = listAventones.reverse();
		var j = {aventones:listAventones, numPage: count };
		 response.json(j);
	});

};

exports.obtenerNumRutas = function(idUsuario){
	return modelos.Ruta.count({
		include: [{ model: modelos.Usuario, required: true} ],
		where:{
			idcreador: idUsuario,
			estado: {$ne: "Eliminado"}
		}
	});
}

exports.obtenerRutasUsuario = function (idUsuario, request, response ){
	modelos.Ruta.findAll({
		include: [{ model: modelos.Usuario, required: true} ],
		where:{
			idcreador: idUsuario,
			estado: {$ne: "Eliminado"}
		}
	}).then(function (result){
		var listRutas= [];
		for(var i =0 ; i< result.length; i++){
		 	var registro = result[i].dataValues;
		 	var ruta = crearObjetoRuta(registro);
		 	listRutas.push(ruta);
		}
		var j = {rutas:listRutas};
		response.json(j);
	});
}


exports.obtenerAventonesUsuario = function (id_usuario, request, response){

	var inicio = request.query.page;

	modelos.Aventon.findAll({
		include: [{ model: modelos.Usuario , as: 'publicador' } ],
		where:{
			id_usuario_pide: id_usuario
		},
		order: [['id_aventon', 'DESC' ]]
		
	}).then(function (result){
		var listAventones = [];

		for (var i =0; i< result.length; i++){
			var registro =  result[i].dataValues;
			var aventon = crearObjetoAventon(registro);
			listAventones.push(aventon);
		} 
		listAventones = listAventones.reverse();
		var j = {aventones:listAventones };
		 response.json(j);
	});


} 

//Querys Chat

exports.obtenerConversaciones = function(id,io){
	modelos.Mensaje.findAll({
		where:{$or:{id_emisor:id,id_receptor:id}}
	}).then(function(result){
		 var lista=[];
		 var usuarios=[];
		 for(var i =0 ; i< result.length; i++){
		 	//obtenego el id de la persona con la que tengo la conversacion
		 	var auxid;
		 	if(result[i].dataValues.id_emisor==id){
		 		auxid=result[i].dataValues.id_receptor;
		 	}else{
		 		auxid=result[i].dataValues.id_emisor;
		 	}
		 	var ban=1;
		 	for(var j=0;j<lista.length;j++){
		 		if(lista[j]==auxid ){
		 			ban=0;
		 			break;
		 		}
		 	}
		 	//console.log(result[i].dataValues);
		 	if(ban==1 && auxid!=null){
		 		lista.push(auxid);
		 		modelos.Usuario.findAll({where:{id:auxid}}).then(function (dato){
		 			//enviamos el objeto {id,nick,foto}
		 			var datosUsuario={
		 				id:dato[0].id,
		 				nick:dato[0].nick,
		 				foto:dato[0].foto,
		 				id_dueno:id
		 			}
		 			console.log(datosUsuario);
		 			io.sockets.emit('enviarDatosConversacion',datosUsuario);
		 			//usuarios.push(datosUsuario);
		 		});
		 	}
		 }
	});
}

exports.obtenerConversacionesPendientes = function(id,response){
	modelos.Mensaje.findAll({
		where:{$or:{id_receptor:id}}
	}).then(function(result){
		 var lista=[];
		 var usuarios=[];
		 for(var i =0 ; i< result.length; i++){
		 	//obtenego el id de la persona con la que tengo la conversacion
		 	var auxid;
		 	auxid=result[i].dataValues.id_emisor;
		 	if(result[i].dataValues.leido){
		 		continue;
		 	}
		 	ban=1;
		 	for(var j=0;j<lista.length;j++){
		 		if(lista[j]==auxid ){
		 			ban=0;
		 			break;
		 		}
		 	}
		 	//console.log(result[i].dataValues);
		 	if(ban==1 && auxid!=null){
		 		lista.push(auxid);
		 	}
		 	
		 }
		 response.json({ids:lista});
	});
}

exports.obtenerNumeroMensajesNoLeidos = function(id_receptor,id_emisor,io){
	obtenerNumeroMensajesNoLeidosNoExport(id_receptor,id_emisor,io);
}

obtenerNumeroMensajesNoLeidosNoExport= function(id_receptor,id_emisor,io){
	modelos.Mensaje.findAll({
		where:{id_receptor:id_receptor,id_emisor:id_emisor,leido:false}
	}).then(function(result){
		io.emit('enviarNumeroNoLeido',{id:id_emisor,num:result.length});
	});
}

exports.obtenerConversacion = function(id_emisor,id_receptor,response){
	//response.json({idEmisor:id_emisor,idReceptor:id_receptor});
	var json={
		id:null,
		foto: null,
		nick:null,
		mensajes:[]
	};
	modelos.Usuario.findOne({where:{id:id_receptor}}).then(function(user){
		
		modelos.Mensaje.findAll({where :{ $or:[
										{id_emisor:id_receptor,id_receptor:id_emisor},
										{id_emisor:id_emisor,id_receptor:id_receptor}
										]
									},order: [['fecha', 'ASC'], ['hora' ,'ASC'] ]
		}).then(function (dato){
			
			for(i=0;i<dato.length;i++){
				if(dato[i].dataValues.id_emisor==id_emisor){
					tipo="receptor";
					console.log('emisor '+dato[i].dataValues.id_emisor+" "+id_emisor)
				}
				else{
					tipo="emisor";
					console.log('receptor '+dato[i].dataValues.id_emisor+" "+id_emisor)
				}
				var mensaje={
					tipo:tipo,
					contenido:dato[i].dataValues.contenido,
					leido:dato[i].dataValues.leido
				};

				json.mensajes.push(mensaje);
				console.log(mensaje);
			}
			json.id=user.dataValues.id;
			json.foto=user.dataValues.foto;
			json.nick=user.dataValues.nick;
			response.json(json);
			
		});
	});
}

exports.obtenerPersona=function(id,idDueno,response){
	modelos.Usuario.findOne({where:{id:id}}).then(function(user){
		var datosUsuario={
			id:user.dataValues.id,
			nick:user.dataValues.nick,
			foto:user.dataValues.foto,
			id_dueno:idDueno
		}
		response.json({conversaciones:[datosUsuario]});
	});
}

exports.leerMensajes=function(id_emisor,id_receptor){
	modelos.Mensaje.update({leido: true},
							{ where: { id_emisor: id_emisor,id_receptor:id_receptor } })
	.then( function (mensaje){

	});
}

exports.consultarUsuario = function (idusuario){
	return modelos.Usuario.findOne({where :{id: idusuario}});
};

//aqui hago un join

exports.consultarUsuarioCarro = function (idcarro){
 			return modelos.Usuario.find({
	 			include: [{model:modelos.Carro, as: 'Usuario_Carro'}],
	 			where : {id_carro:idcarro}
	 		});   	
};

exports.consultarRuta = function (idruta){
	return modelos.Ruta.findOne({ where:{id_ruta:idruta}});
};

exports.consultarNotificacion = function (idnotificacion){
	return modelos.Notificacion.findOne({ where:{id_Notificacion: idnotificacion}});
};

//obtiene las tres notificaciones mas reciente del usuario
exports.obtenerNotificacionesPaginacion = function(idReceptor,response){
	modelos.Notificacion.findAll({
		where : {
			id_receptor: idReceptor,
		},
		include : [
			{ model :  modelos.Usuario , as: 'Emisor_Notifica' } ,
			{ model : modelos.Usuario_Ruta, as: 'Notificacion_Usuario_Ruta'}
		],
		order: [['id_notificacion', 'DESC'], ['tipo' ,'ASC'] ],
		limit: 3
	}).then(function(results){
		//console.log(results);
		var listNot = crearListaNotificaciones(results);
		response.json({notificaciones: listNot});
	});
}

//obtiene todas las notificaciones del usuario
exports.obtenerNotificacionesUsuario = function(idReceptor,response){
	modelos.Notificacion.findAll({
		where : {
			id_receptor: idReceptor
		},
		include : [
			{ model :  modelos.Usuario , as: 'Emisor_Notifica' } ,
			{ model : modelos.Usuario_Ruta, as: 'Notificacion_Usuario_Ruta'}
		],
		order: [['id_notificacion', 'DESC'], ['tipo' ,'ASC'] ]
	}).then(function(results){
		console.log(results);
		var listNot = crearListaNotificaciones(results);
		response.json({notificaciones: listNot});
	});
}

function crearListaNotificaciones(results){
	var listNot = [];
	if(results!=null){
		for(var i = 0 ; i < results.length ; i++){
			var result = results[i].dataValues;
			var notificacion = {};
			if(results[i].Emisor_Notifica!=null){
				var emisor = results[i].Emisor_Notifica.dataValues;
				notificacion.publicador = emisor.nick;
		  		notificacion.urlNickname = emisor.foto;
			}
			if(results[i].Notificacion_Usuario_Ruta!=null){
				var ruta = results[i].Notificacion_Usuario_Ruta.dataValues;
				notificacion.idRuta = ruta.id_ruta;
			}
			notificacion.idNotificacion = result.id_Notificacion;
			notificacion.idEmisor = result.id_emisor;
			notificacion.idUsuarioRuta = result.usuarioruta;	
		  	notificacion.tipo = result.tipo;
		  	notificacion.estado = result.estado;	  		
		  	listNot.push(notificacion);
		}
	}
	return listNot;
}

exports.obtenerPasajerosRuta  = function(request, response){
	idRuta = request.query.id;
	console.log(idRuta);

	modelos.Usuario_Ruta.findAll({
		include: [{ model: modelos.Usuario , as: 'pasajeros', required: true } ],
		where:{
			id_ruta: idRuta,
			estado: "Aceptada",
		},
		
	}).then(function (result){

		listPasajeros = [];
		for(var i = 0; i< result.length; i++){
			var registro = result[i].dataValues;
			var pasajero = {
				nickname: registro.pasajeros.nick,
    			id_usuario: registro.pasajeros.id,
    			urlfoto: registro.pasajeros.foto,
    			latitud: registro.lat,
    			longitud: registro.longit 
			};
			listPasajeros.push(pasajero);
		}
		var j = {pasajeros: listPasajeros };
		response.json(j);

	});


}


exports.guardarUsuarioConCarro=function(datosUsuario,datosCarro,response){
	modelos.Carro.create({placa: datosCarro.placa, 
							foto: datosCarro.foto, 
							capacidad: datosCarro.capacidad})
	.then(function (carro){
		console.log(carro);
		modelos.Usuario.create({nick: datosUsuario.nick, 
							password: datosUsuario.password, 
							nombre: datosUsuario.nombre,
							apellidos: datosUsuario.apellidos,
							sexo: datosUsuario.sexo, 
							telefono: datosUsuario.telefono,
							id_carro: carro.dataValues.id_carro,
							foto: datosUsuario.foto })
		.then(function (usuario){
			response.json({mensaje:'Se ha Registrado con Exito'});	
			//response.redirect('/');
		});
	});

}


exports.actualizarEstadoUsuarioRuta = function(idRuta, idPasajeros, std){

	return modelos.Usuario_Ruta.update({ 
			 
			  estado: std
			},
			{ where: {
				id_ruta: idRuta,

				id_usuario: {in: idPasajeros}
			}

			}

			);


}


exports.consultarUsuarioRutaPorIDruta = function(idruta){
	return modelos.Usuario_Ruta.findAll({
		where:{
			id_ruta: idruta,
		}
		
	});

}


exports.guadarNotificaciones = function(listNotificaciones){
	return modelos.Notificacion.bulkCreate(listNotificaciones);

}