var html_dir = './app/views/';
var db = require('../model/model.js');
var soap = require('soap');
var url = 'http://ws.espol.edu.ec/saac/wsandroid.asmx?WSDL';
var fs=require('fs');

exports.index = function(request, response){
	if(request.session.user){
		
		response.redirect('/noticias');
	}else{
		
		response.sendfile(html_dir + 'index.html');
	}
};

exports.login=function(request,response){
	   
	   
	   var args = {authUser: request.body.usuario, authContrasenia: request.body.contraseña};
	   var resp;
	   soap.createClient(url, function(err, client) {
	   	client.autenticacion(args, function(err, result){
	   		resp = result.autenticacionResult;
	   		console.log(resp);
			if (true || resp ){
				db.encontrarUsuario(request.body.usuario).then(function (user){
				if(!user){
					console.log('Ud no se encuentra registrado');
					//si no esta registrado lo redirecciona a index.html
					response.sendfile(html_dir + 'index.html');
				}else{			
					request.session.user=user.dataValues;
					response.redirect('/noticias');}
				}).catch(function(err){
					console.log(err);
					response.sendfile(html_dir + 'index.html');
				});
			}
			else{ 
				//window.alert("Ud. no es usuario Espol");
				console.log('Usuario o contraseña incorrecta, intente nuevamente');
				//window.alert("Ud. no es usuario Espol");
				response.sendfile(html_dir + 'index.html');
			}
	   	});
	   });
	   
};



exports.autenticar=function(request,response){
	   //var url = 'http://ws.espol.edu.ec/saac/wsandroid.asmx?WSDL';
	   var args = {authUser: request.body.usuario, authContrasenia: request.body.contraseña};
	   var resp;
	   console.log("autenticacion");
	   soap.createClient(url, function(err, client) {
	   	client.autenticacion(args, function(err, result){
	   		resp = result.autenticacionResult;
	   		console.log(resp);
			if (resp ){
				db.encontrarUsuario(request.body.usuario).then(function (user){
					console.log('user: '+user);
					if(user!=null){
						console.log('Ud ya se encuentra registrado');
						response.json({error:'Ud ya se encuentra registrado'});
						
					}else{	
						console.log("Autenticacion correcta");
						var args = {usuario: request.body.usuario};
						soap.createClient(url, function(err, client) {
							client.wsInfoUsuario(args, function(err, result) {
								console.log(result.wsInfoUsuarioResult.diffgram.NewDataSet.INFORMACIONUSUARIO);
								response.json(result.wsInfoUsuarioResult.diffgram.NewDataSet.INFORMACIONUSUARIO);
							});
						});
					}	
						
						//response.sendfile(html_dir + 'index.html');
				}).catch(function(err){
					console.log(err);
					//response.sendfile(html_dir + 'index.html');
				});
			}
			else{ 
				console.log('Usuario o contraseña incorrecta, intente nuevamente');
				response.json({error:'Usuario o contraseña incorrecta, intente nuevamente'});
			}
	   	});
	   });
};


exports.registrar= function(request,response){
	console.log("te vas a registar");
	console.log(request.body);
	var foto;
	console.log(request.body.foto);
	if(request.body.sexo=='masculino'){
		foto='imagenes/perfilHombre.jpg';
	}else{
		foto='imagenes/perfilMujer.jpg';
	}
	if(request.body.carro){
		console.log("tienes carro");
		
		var datos = {nick: request.body.nickname, 
			password: 'asasasasasasa',
			nombre: request.body.nombre,
			apellidos: request.body.apellido, 
			sexo: request.body.sexo, 
			telefono: request.body.telefono, 
			id_carro: request.body.placa, 
			foto: foto
		};
		//db.guardarUsuario(datos);
		var datos_carro = {placa: request.body.placa, 
			foto: foto, 
			capacidad: request.body.capacidad
		};
		//db.guardarCarro(datos_carro);
		db.guardarUsuarioConCarro(datos,datos_carro,response);
	}else{
		console.log("no tienes carro");
		var datos = {nick: request.body.nickname, 
			password: 'asasasasasasa', 
			nombre: request.body.nombre, 
			apellidos: request.body.apellido, 
			sexo: request.body.sexo, 
			telefono: request.body.telefono, 
			id_carro: null, 
			foto: foto};
		db.guardarUsuario(datos,response);
	}
	//console.log('Registrado Correctamente');
}
