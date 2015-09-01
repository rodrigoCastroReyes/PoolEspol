var html_dir = './app/views/';
var db = require('../model/model.js');


exports.index = function(request, response){
	if(request.session.user){
		
		response.redirect('/noticias');
	}else{
		
		response.sendfile(html_dir + 'index.html');
	}
};

exports.login=function(request,response){
	   var soap = require('soap');
	   var url = 'http://ws.espol.edu.ec/saac/wsandroid.asmx?WSDL';
	   var args = {authUser: request.body.usuario, authContrasenia: request.body.contraseña};
	   var resp;
	   soap.createClient(url, function(err, client) {
	   	client.autenticacion(args, function(err, result){
	   		resp = result.autenticacionResult;
	   		console.log(resp);
			if (resp || true ){
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
				console.log('Ud no es usuario Espol');
				//window.alert("Ud. no es usuario Espol");
				response.sendfile(html_dir + 'index.html');
			}
	   	});
	   });
	   
};



exports.autenticar=function(request,response){
	   var soap = require('soap');
	   var url = 'http://ws.espol.edu.ec/saac/wsandroid.asmx?WSDL';
	   var args = {authUser: request.body.usuario, authContrasenia: request.body.contraseña};
	   var resp;
	   console.log(args);
	   soap.createClient(url, function(err, client) {
	   	client.autenticacion(args, function(err, result){
	   		resp = result.autenticacionResult;
	   		console.log(resp);
			if (resp){
				db.encontrarUsuario(request.body.usuario).then(function (user){
				if(!user){
					console.log("Autenticacion correcta");
				}else{			
					console.log('Ud ya se encuentra registrado');}
					//response.sendfile(html_dir + 'index.html');
				}).catch(function(err){
					console.log(err);
					response.sendfile(html_dir + 'index.html');
				});
			}
			else{ 
				console.log('Ud no es usuario Espol');
				response.sendfile(html_dir + 'index.html');
			}
	   	});
	   });
};

exports.registrar= function(request,response){
		if(request.body.carro=='si'){
			var datos = {nick: 'request.body', password: 'asasasasasasa', nombre: request.body.nombre, apellidos: request.body.apellido, sexo: request.body.sexo, telefono: request.body.telefono, id_carro: request.body.placa, foto: 'asasasasasasa'};
			db.guardarUsuario(datos);
			var datos_carro = {
placa: request.body.placa, foto: 'asasasasasasa', capacidad: request.body.capacidad};
			db.guardarCarro(datos_carro);
		}else{
			var datos = {nick: 'request.body', password: 'asasasasasasa', nombre: request.body.nombre, apellidos: request.body.apellido, sexo: request.body.sexo, telefono: request.body.telefono, id_carro: null, foto: 'asasasasasasa'};
			db.guardarUsuario(datos);
		}
		console.log('Registrado Correctamente');
}
