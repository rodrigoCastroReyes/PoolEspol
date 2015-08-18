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
		console.log(carro.get('placa'));
		console.log(carro.get('capacidad'));
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
		console.log(usuario.get('nick'));
		console.log(usuario.get('nombre'));
		console.log(usuario.get('apellidos'));
		console.log(usuario.get('id_carro'));
		
	});
};

 exports.guardarMensaje = function(datosUsuario){
	modelos.Mensaje.create({fecha: datosUsuario.fecha, 
							hora: datosUsuario.hora, 
							contenido: datosUsuario.contenido, 
							id_emisor: datosUsuario.id_emisor, 
							id_receptor: datosUsuario.id_receptor})
	.then( function (mensaje){
		console.log(mensaje.get('fecha'));
		console.log(mensaje.get('hora'));
		console.log(mensaje.get('contenido'));
		console.log(mensaje.get('id_emisor'));
		console.log(mensaje.get('id_receptor'));
	});
};

 exports.guardarNotificaciones = function(datosUsuario){
	modelos.Notificacion.create({tipo: datosUsuario.tipo, 
								estado: datosUsuario.estado, 
								id_emisor: datosUsuario.id_emisor, 
								id_receptor:datosUsuario.id_receptor})
	.then( function (notificaciones){
		console.log(notificaciones.get('tipo'));
		console.log(notificaciones.get('estado'));
		console.log(notificaciones.get('id_emisor'));
		console.log(notificaciones.get('id_receptor'));
	});
};

 exports.guardarAventon = function(UsuarioAventon){

	modelos.Aventon.create({longitud: UsuarioAventon.longitud, 
							latitud: UsuarioAventon.latitud, 
							fecha: UsuarioAventon.fecha, 
							hora: UsuarioAventon.hora, 
							id_usuario_pide: UsuarioAventon.id_usuario_pide,
						    id_usuario_da: UsuarioAventon.id_usuario_da})
	.then( function (aventon){
		console.log(aventon.get('longitud'));
		console.log(aventon.get('latitud'));
		console.log(aventon.get('fecha'));
		console.log(aventon.get('hora'));
		console.log(aventon.get('id_usuario_pide'));
		console.log(aventon.get('id_usuario_da'));
	});
};

 exports.guardarRuta = function(_ruta){
 	var puntosx = [];
 	var puntosy = [];
 	puntosx[0]=_ruta.ruta[0].x;
 	puntosx[1]=_ruta.ruta[1].x;
 	puntosy[0]=_ruta.ruta[0].y;
 	puntosy[1]=_ruta.ruta[1].y;	
	modelos.Ruta.create({fecha: _ruta.fecha,
						 costo: _ruta.precio, 
						 capacidad: _ruta.capacidad, 
						 hora: _ruta.hora, 
						 estado: "satisfecho",
						 puntosx: puntosx, 
						 puntosy: puntosy, 
						 idcreador: _ruta.idcreador})
	.then( function (ruta){
		console.log(ruta.get('fecha'));
		console.log(ruta.get('costo'));
		console.log(ruta.get('capacidad'));
		console.log(ruta.get('idcreador'));
	});
};

 exports.guardarUsuarioRuta = function(usuario_Ruta){
	modelos.Usuario_Ruta.create({id_usuario: usuario_Ruta.id_usuario,
								 id_ruta: usuario_Ruta.id_ruta,
								 lat: usuario_Ruta.lat, 
								 longit: usuario_Ruta.longit})
	.then(function (usuarioruta){
		console.log(usuarioruta.get('lat'));
		console.log(usuarioruta.get('longit'));
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


exports.actualizarUsuario = function (idusuario, datos_usuario){
	modelos.Usuario.update({nick: datos_usuario.nick, 
							password: datos_usuario.password, 
							nombre: datos_usuario.nombre, 
							apellidos: datos_usuario.apellidos, 
							telefono: datos_usuario.telefono, 
							foto: datos_usuario.foto},
										{ where: { id: idusuario}})
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

/* 

tabla usuario
valor : id
retornar usuario

tabla : ruta
valor : id
retornar ruta

*/













