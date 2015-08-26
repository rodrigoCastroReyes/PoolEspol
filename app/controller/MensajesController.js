var html_dir = './app/views/';
var db = require('../model/model.js');

exports.mensajes=function(request,response){
	//pasarle a la vista datos de: mensajes entre usuarios
	response.render('chat',{ title: 'Chat', 
		id : request.session.user.id,
		nickname: request.session.user.nick,
		foto: request.session.user.foto
	});
};

exports.enviarConversaciones=function(request,response){
	

};


exports.enviarConversacion=function(request,response){

};

