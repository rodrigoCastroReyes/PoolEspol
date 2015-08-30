var html_dir = './app/views/';
var db = require('../model/model.js');
/*
exports.mensajes=function(request,response){
	//pasarle a la vista datos de: mensajes entre usuarios
	response.render('chat',{ title: 'Chat', 
		id : request.session.user.id,
		nickname: request.session.user.nick,
		foto: request.session.user.foto
	});
};

exports.enviarConversacion=function(request,response){
	idReceptor=request.query.id;
	console.log("emisor: "+request.session.user.id);
	console.log("receptor: "+idReceptor);
	db.obtenerConversacion(request.session.user.id,parseInt(idReceptor),response);	
};

exports.enviarConversaciones=function(request,response){
	console.log("esta es");
	console.log(request.session.user.id)
	db.obtenerConversaciones(request.session.user.id,response);	
	console.log("esta no es");
};

*/