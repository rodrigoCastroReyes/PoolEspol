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
			if (resp){
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
