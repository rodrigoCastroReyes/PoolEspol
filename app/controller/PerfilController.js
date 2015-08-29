
var db = require('../model/model.js');
var ac_usuario = new Object();
var ac_carro = new Object();

exports.perfil=function(request,response){
	//pasarle a la vista los datos de : rutas y aventones, datos del usuario
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
		    		foto:usuario.foto});
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
		    		foto:usuario.foto});
		    	}			    	
			});
	}); 
};

exports.actualizarPerfil = function(request,response){
	ac_usuario.nombre = request.body.nombre;
	ac_usuario.apellidos = request.body.apellidos;
	ac_usuario.telefono = request.body.telefonos;
	ac_usuario.nick = request.body.nick;
	db.actualizarUsuario(request.session.user.id,ac_usuario);
};

exports.actualizarCarro = function(request,response){
	ac_carro.placa = request.body.placa;
	ac_carro.capacidad = request.body.capacidad;
	db.actualizarDatosCarro(request.session.user.id_carro,ac_carro);
};

exports.obtenerMisRuta = function(request,response){

	db.obtenerRutasUsuario(request.session.user.id, request, response);

}