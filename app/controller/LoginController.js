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
	   db.encontrarUsuario(request.body.usuario).then(function (user){
		console.log('mira mi nick '+user.nick);
		console.log('mira mi nombre '+user.nombre);
		if(!user){
			//si no esta registrado lo redirecciona a index.html
			console.log('estoy no registrado');

			response.sendfile(html_dir + 'index.html');
		}else{
			console.log('estoy registrado');			
			request.session.user=user.dataValues;
			console.log('conectado valor '+request.session.user);
			console.log('id '+request.session.user.id);
			response.redirect('/noticias');
		}
	}).catch(function(err){
		console.log(err);
		response.sendfile(html_dir + 'index.html');
	});
};
