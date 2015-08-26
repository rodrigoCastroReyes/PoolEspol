//var pg = require('pg');
//var conString = "tcp://postgres:postgres@localhost:5432/PoolEspol";
var modelos = require('../model/PoolEspoldb.js');

exports.encontrarUsuario = function(nickname){
	return modelos.Usuario.findOne({
		where:{
			nick:nickname
		}
	});
}

/*Querys*/
exports.encontrarUsuarioPorID=function(id){
	return modelos.Usuario.findById(id);
}

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

 exports.guardarUsuario = function(datosUsuario){
	modelos.Usuario.create({nick: datosUsuario.nick, 
							password: datosUsuario.password, 
							nombre: datosUsuario.nombre,
							apellidos: datosUsuario.apellidos,
							sexo: datosUsuario.sexo, 
							telefono: datosUsuario.telefono,
							id_carro: datosUsuario.id_carro,
							foto: datosUsuario.foto })
	.then(function (usuario){
		console.log(usuario);	
	});
};

 exports.guardarMensaje = function(datosUsuario){
	modelos.Mensaje.create({fecha: datosUsuario.fecha, 
							hora: datosUsuario.hora, 
							contenido: datosUsuario.contenido, 
							id_emisor: datosUsuario.id_emisor, 
							id_receptor: datosUsuario.id_receptor})
	.then( function (mensaje){
		console.log(mensaje);
	});
};

 exports.guardarNotificaciones = function(datosUsuario){
	modelos.Notificacion.create({tipo: datosUsuario.tipo, 
								estado: datosUsuario.estado, 
								id_emisor: datosUsuario.id_emisor, 
								id_receptor:datosUsuario.id_receptor})
	.then( function (notificaciones){
		console.log(notificaciones);
	});
};

 exports.guardarAventon = function(InfoAventon){
	modelos.Aventon.create({latitud: InfoAventon.ubicacion.x,
							longitud: InfoAventon.ubicacion.y,  
							fecha: InfoAventon.fecha, 
							hora: InfoAventon.hora, 
							id_usuario_pide: InfoAventon.idPublicador,
						    id_usuario_da: null})
	.then( function (aventon){
		console.log(aventon);
	});
};

 exports.guardarRuta = function(_ruta){
 	var puntosx = [];
 	var puntosy = [];
 		for (var i in _ruta.ruta) {
 			puntosx.push(_ruta.ruta[i].x);
 			puntosy.push(_ruta.ruta[i].y);
 		}
	modelos.Ruta.create({fecha: _ruta.fecha,
						 costo: _ruta.precio, 
						 capacidad: _ruta.capacidad, 
						 hora: _ruta.hora, 
						 estado: "pendiente",
						 puntosx: puntosx, 
						 puntosy: puntosy, 
						 idcreador: _ruta.idPublicador})
	.then( function (ruta){
		console.log(ruta);
	});
};

 exports.guardarUsuarioRuta = function(usuario_Ruta){
	modelos.Usuario_Ruta.create({id_usuario: usuario_Ruta.id_usuario,
								 id_ruta: usuario_Ruta.id_ruta,
								 lat: usuario_Ruta.lat, 
								 longit: usuario_Ruta.longit})
	.then(function (usuarioruta){
		console.log(usuarioruta);
	});
};
/* 
FUNCIONES DE ACTUALIZAR 
*/
exports.actualizarCarro = function (idcarro, datos_carro){

	modelos.Carro.update({ placa: datos_carro.placa,
						   foto: datos_carro.foto,
						   capacidad: datos_carro.capacidad},
						   { where: {id_carro: idcarro}})
	.then(function (carro){
		console.log('ACTUALIZADO CORRECTAMENTE');
	});
};
exports.actualizarUsuario = function (datos_usuario){
	modelos.Usuario.update({nick: datos_usuario.nick,  
							nombre: datos_usuario.nombre, 
							apellidos: datos_usuario.apellidos, 
							telefono: datos_usuario.telefono, 
							foto: datos_usuario.foto},
										{ where: { id: datos_usuario.id}})
	.then( function (usuario){
		console.log('ACTUALIZADO CORRECTAMENTE');
	});
};


exports.actualizarMensaje = function(idmensaje, datos_mensaje){
	modelos.Mensaje.update({contenido: datos_mensaje.contenido},
							{ where: { id_mensaje: idmensaje } })
	.then( function (mensaje){
		console.log('ACTUALIZADO CORRECTAMENTE');
	});
};


exports.actualizarNotificaciones = function(idnotificacion, datos_notificacion){
	modelos.Notificacion.update({tipo: datos_notificacion.tipo, 
								 estado: datos_notificacion.estado},
						 		 { where: {id_Notificacion: idnotificacion}})
	.then( function (notificacion){
		console.log('ACTUALIZADO CORRECTAMENTE');
	});
};



exports.actualizarAventon = function(idaventon, datos_aventon){
 	modelos.Aventon.update({longitud: datos_aventon.longitud,
 							latitud: datos_aventon.latitud,
 							fecha: datos_aventon.fecha,
 							hora: datos_aventon.hora},
 							{ where: {id_aventon: idaventon}})
 	.then( function (aventon){
 			console.log('Actualizado con exito');
 	});
};


exports.actualizarRuta = function(idruta, datos_ruta){
	modelos.Ruta.update({costo: datos_ruta.costo, 
						capacidad: datos_ruta.capacidad,
						estado: datos_ruta.estado,
						puntosx: datos_ruta.puntosx,
  						puntosy: datos_ruta.puntosy},
						{where: {id_ruta: idruta}})
	.then(function (ruta){
			console.log('ENTROOOOOO');			
	});
};

exports.actualizarUsuarioRuta = function(idusuarioruta, datos_usuario_ruta){

	modelos.Usuario_Ruta.update({ lat: datos_usuario_ruta.lat,
								  longit: datos_usuario_ruta.longit},
								{ where: {id_usuario_ruta: idusuarioruta}})
	.then( function (usuarioruta){
		 console.log('ACTUALIZADO CORRECTAMENTE');
	});
};

exports.obtenerRutasNoticias = function (id_usuario, request, response){

	modelos.Ruta.findAll({
		include: [{ model: modelos.Usuario, required: true} ],
		where:{
			fecha :{ $gt: new Date()  },
			idcreador: { $ne: id_usuario }
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

};

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
/* 

tabla usuario
valor : id
retornar usuario

tabla : ruta
valor : id
retornar ruta

*/

//Querys Chat

exports.obtenerConversaciones = function(id){
	return model.Mensaje.findAll({
		where:{id_emisor:id}
	});
};


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











