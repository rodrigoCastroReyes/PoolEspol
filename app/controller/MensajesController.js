var html_dir = './app/views/';
var db = require('../model/model.js');

exports.mensajes=function(request,response){
	//pasarle a la vista datos de: mensajes entre usuarios
	response.render('chat',{ title: 'Chat', 
		id : request.session.user.id,
		nickname: request.session.user.nick,
		foto: request.session.user.foto,
		idReceptor:0
	});
};



exports.enviarConversacion=function(request,response){
	console.log("si entre");
	idReceptor=request.query.id;
	console.log("emisor: "+request.session.user.id);
	console.log("receptor: "+idReceptor);
	db.obtenerConversacion(request.session.user.id,parseInt(idReceptor),response);	
};

exports.nuevaConversacion=function(request,response){
	idReceptor=request.query.idReceptor;
	//mensajes(request,response);
	console.log("nueva conversacion");
	response.render('chat',{ title: 'Chat', 
		id : request.session.user.id,
		nickname: request.session.user.nick,
		foto: request.session.user.foto,
		idReceptor:idReceptor
	});
	
};

exports.obtenerPersona=function(request,response){
	console.log("obtenerPersona");
	idPersona=request.query.id;
	db.obtenerPersona(idPersona,request.session.user.id,response);
	
};

exports.obtenerNoLeidos=function(request,response){
	console.log("obtenerNoLeidos");
	id=request.session.user.id,
	db.obtenerConversacionesPendientes(request.session.user.id,response);
	
};

exports.leerMensajes=function(request,response){
	console.log("leerMensajes");
	id=request.query.id;
	console.log('emisor'+id+' receptor '+request.session.user.id)
	db.leerMensajes(id,request.session.user.id);
	
};




/*
exports.enviarConversaciones=function(request,response){
	console.log("esta es");
	console.log(request.session.user.id)
	db.obtenerConversaciones(request.session.user.id,response);	
	console.log("esta no es");
};
*/

