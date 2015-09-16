
var db = require('../model/model.js');
var html_dir = './app/views/';
var ac_usuario = new Object();
var ac_carro = new Object();

exports.perfil=function(request,response){
	//pasarle a la vista los datos de : rutas y aventones, datos del usuario
	if(request.session.user){
		db.consultarUsuario(request.session.user.id).then(function (usuario){
		 	console.log(usuario.nombre);
	     	console.log(usuario.apellidos);
	     	console.log(usuario.telefono);
	     	console.log(usuario.nick);
	    	   db.consultarUsuarioCarro(request.session.user.id_carro).then(function (usuariocarro){
			    	console.log(usuariocarro.Usuario_Carro);
			    	if(usuariocarro.Usuario_Carro === null){
			    		response.render('perfil',{
			    		id : usuario.id,
			    		nombre: usuario.nombre ,
			    		apellido:usuario.apellidos , 
			    		celular: usuario.telefono, 
			    		nickname: usuario.nick, 
			    		idcarro:0, 
			    		foto:usuario.foto,
			    		flag:usuario.id_carro});
			    	}else{
			    		response.render('perfil',{
			    		id : usuario.id,
			    		nombre: usuario.nombre ,
			    		apellido:usuario.apellidos , 
			    		celular: usuario.telefono, 
			    		nickname: usuario.nick,
			    		placa:usuariocarro.Usuario_Carro.placa ,
			    		cantidad:usuariocarro.Usuario_Carro.capacidad, 
			    		idcarro:usuariocarro.Usuario_Carro.id_carro, 
			    		foto:usuario.foto,
			    		flag:usuario.id_carro});
			    	}			    	
				});
		}); 
	}else{
		response.sendfile(html_dir + 'index.html');
	}
};

exports.actualizarPerfil = function(request,response){
	if(request.session.user){
		ac_usuario.nombre = request.body.nombre;
		ac_usuario.apellidos = request.body.apellidos;
		ac_usuario.telefono = request.body.telefonos;
		ac_usuario.nick = request.body.nick;
		db.actualizarUsuario(request.session.user.id,ac_usuario);
	}
};

exports.actualizarCarro = function(request,response){
	if(request.session.user){
		ac_carro.placa = request.body.placa;
		ac_carro.capacidad = request.body.capacidad;
		db.actualizarDatosCarro(request.session.user.id_carro,ac_carro);
	}
};

exports.obtenerMisRuta = function(request,response){
	if(request.session.user){
		db.obtenerRutasUsuario(request.session.user.id, request, response);
	}
}

exports.eliminarRuta = function (request, response){
	var ruta = request.query.id;
	db.actualizarEstadoRuta(ruta, "Eliminado");
	response.json({"idruta": ruta });
}