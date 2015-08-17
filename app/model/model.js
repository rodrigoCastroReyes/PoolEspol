//var pg = require('pg');
//var conString = "tcp://postgres:postgres@localhost:5432/PoolEspol";
var modelos = require('../model/PoolEspoldb.js');


exports.guardarRutas = function(datos){ //recibe un objeto ruta
	//var client = new pg.Client(conString);
	//client.connect();

	//var query = 'INSERT INTO public.Ruta' + "VALUES( 1, " + datos.fecha + "," + datos.precio  + "," +  datos.hora + ", pendiente, " + "null," + "1203" ;

	//var query = "insert into " + "public.Ruta" + " values( 1, null, 12, 1, null, 'activo', null ,1203 )"; 
	//client.query(query);
	

	
	modelos.Ruta.create( {id_ruta: 1, fecha: new Date(2015, 8, 12 ), hora: datos.hora , costo : parseFloat(datos.costo), 
		capacidad: parseInt(capacidad), estado: "pendiente", puntosx: null, puntosy: null, idcreador:1
	  });

	
	console.log("Guardado");
	}




	
/*
FUNCIONES PARA   INSERTAR , ACTUALIZAR


*/
 exports.guardarCarro = function (datosCarro){
	modelos.Carro.create({placa: datosCarro.placa, foto: datosCarro.foto, capacidad: datosCarro.capacidad})
	.then(function (carro){
		console.log(carro.get('placa'));
		console.log(carro.get('capacidad'));
	});
}

 exports.guardarUsuario = function(datosUsuario){
	modelos.Usuario.create({nick: datosUsuario.nick, password: datosUsuario.password, nombre: datosUsuario.nombre, apellidos: datosUsuario.apellidos, sexo: datosUsuario.sexo, telefono: datosUsuario.telefono, id_carro: datosUsuario.id_carro, foto: datosUsuario.foto })
	.then(function (usuario){
		console.log(usuario.get('nick'));
		console.log(usuario.get('nombre'));
		console.log(usuario.get('apellidos'));
		console.log(usuario.get('id_carro'));
		
	});
}

 exports.guardarMensaje = function(datosUsuario){
	modelos.Mensaje.create({fecha: datosUsuario.fecha, hora: datosUsuario.hora, contenido: datosUsuario.contenido, id_emisor: datosUsuario.id_emisor, id_receptor: datosUsuario.id_receptor})
	.then( function (mensaje){
		console.log(mensaje.get('fecha'));
		console.log(mensaje.get('hora'));
		console.log(mensaje.get('contenido'));
		console.log(mensaje.get('id_emisor'));
		console.log(mensaje.get('id_receptor'));
	});
}

 exports.guardarNotificaciones = function(datosUsuario){
	modelos.Notificacion.create({tipo: datosUsuario.tipo, estado: datosUsuario.estado, id_emisor: datosUsuario.id_emisor, id_receptor:datosUsuario.id_receptor})
	.then( function (notificaciones){
		console.log(notificaciones.get('tipo'));
		console.log(notificaciones.get('estado'));
		console.log(notificaciones.get('id_emisor'));
		console.log(notificaciones.get('id_receptor'));
	});
}

 exports.guardarAventon = function(UsuarioAventon){

	modelos.Aventon.create({longitud: UsuarioAventon.longitud, latitud: UsuarioAventon.latitud, fecha: UsuarioAventon.fecha, hora: UsuarioAventon.hora, id_usuario_pide: UsuarioAventon.id_usuario_pide, id_usuario_da: UsuarioAventon.id_usuario_da})
	.then( function (aventon){
		console.log(aventon.get('longitud'));
		console.log(aventon.get('latitud'));
		console.log(aventon.get('fecha'));
		console.log(aventon.get('hora'));
		console.log(aventon.get('id_usuario_pide'));
		console.log(aventon.get('id_usuario_da'));
	});
}

 exports.guardarRuta = function(_ruta){
	modelos.Ruta.create({fecha: _ruta.fecha, costo: _ruta.costo, capacidad: _ruta.capacidad, hora: _ruta.hora, estado: _ruta.estado, puntosx: _ruta.puntosx, puntosy: _ruta.puntosy, idcreador: _ruta.idcreador})
	.then( function (ruta){
		console.log(ruta.get('fecha'));
		console.log(ruta.get('costo'));
		console.log(ruta.get('capacidad'));
		console.log(ruta.get('idcreador'));
	});
}

 exports.guardarUsuarioRuta = function(usuario_Ruta){
	modelos.Usuario_Ruta.create({id_usuario: usuario_Ruta.id_usuario, id_ruta: usuario_Ruta.id_ruta, lat: usuario_Ruta.lat, longit: usuario_Ruta.longit})
	.then(function (usuarioruta){
		console.log(usuarioruta.get('lat'));
		console.log(usuarioruta.get('longit'));
	});
}







