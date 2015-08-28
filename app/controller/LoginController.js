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
		if(!user){
			//si no esta registrado lo redirecciona a index.html
			response.sendfile(html_dir + 'index.html');
		}else{			
			request.session.user=user.dataValues;
			response.redirect('/noticias');
		}
	}).catch(function(err){
		console.log(err);
		response.sendfile(html_dir + 'index.html');
	});
};
