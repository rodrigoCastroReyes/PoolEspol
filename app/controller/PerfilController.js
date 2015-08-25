
var db = require('../model/model.js');

exports.perfil=function(request,response){
	//pasarle a la vista los datos de : rutas y aventones, datos del usuario
	db.consultarUsuario(request.session.user.id).then(function (usuario){
	 	console.log(usuario.nombre);
     	console.log(usuario.apellidos);
     	console.log(usuario.telefono);
     	console.log(usuario.nick);
    	   db.consultarUsuarioCarro(request.session.user.id_carro).then( function (usuariocarro){
		    	console.log(usuariocarro.Usuario_Carro);
		    	if(usuariocarro.Usuario_Carro === null){


		    		response.render('perfil',{nombre: usuario.nombre ,
		    		apellido:usuario.apellidos , 
		    		celular: usuario.telefono, 
		    		nickname: usuario.nick, 
		    		idcarro:0, 
		    		imagenPerfil:usuario.foto});

		    	}else{

		    		response.render('perfil',{nombre: usuario.nombre ,
		    		apellido:usuario.apellidos , 
		    		celular: usuario.telefono, 
		    		nickname: usuario.nick,
		    		placa:usuariocarro.Usuario_Carro.placa ,
		    		cantidad:usuariocarro.Usuario_Carro.capacidad, 
		    		idcarro:usuariocarro.Usuario_Carro.id_carro, 
		    		imagenPerfil:usuario.foto});
		    	}			    	
		
			});
	}); 
};