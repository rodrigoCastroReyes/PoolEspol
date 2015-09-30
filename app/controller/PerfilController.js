
var db = require('../model/model.js');
var html_dir = './app/views/';
var ac_usuario = new Object();
var ac_carro = new Object();
var formidable = require('formidable');
var imagePath = new Object();
var ubicacion = new Object();
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

exports.obtenerMisAventones = function(request,response){
	if(request.session.user){
		db.obtenerAventonesUsuario(request.session.user.id, request, response);
	}else{
		response.sendfile(html_dir + 'index.html');
	}
}

exports.obtenerRutasUnidas = function(request, response){
	if(request.session.user){
		db.obtenerRutasUnidas(request.session.user.id, request, response);
	}else{
		response.sendfile(html_dir + 'index.html');
	}
}

exports.obtenerAventonesDados = function(request, response){
	
	if(request.session.user){
		db.obtenerAventonesDados(request.session.user.id, request, response);
	}
}

exports.eliminarRuta = function (request, response){
	var ruta = request.query.id;
	db.actualizarEstadoRuta(ruta, "Eliminado");
	response.json({"idruta": ruta });
}

exports.transmisionPerfil = function (request,response){
	   var incoming = new formidable.IncomingForm();
      //Carpeta donde se guardarán los archivos.
      console.log(request);
      var rutasimagen = 'app/public/imagenes/';
      incoming.uploadDir = rutasimagen;
      incoming.parse(request);
      incoming.on('file', function(field, file){
         console.log('Archivo recibido');
      });
      incoming.on('fileBegin', function(field, file){
         if(file.name){
            file.path =file.path+file.name;

            
            imagePath.ruta = file.path;
           	ubicacion.ruta = imagePath.ruta.slice(11);
            db.actualizarFotoUsuario(request.session.user.id,ubicacion).then(function (datos){
            	console.log('entraste muy bien');
            	request.session.user.foto = ubicacion.ruta;
            	 response.render('noticias',{ title: 'Noticias', 
					id : request.session.user.id,
					nickname: request.session.user.nick,
					foto: request.session.user.foto,
					flag:request.session.user.id_carro});
            });


         }
      });
      incoming.on('end', function(){
         console.log("se tuvo que haber guardado");

      

      });
     
    

	

     
};

 
