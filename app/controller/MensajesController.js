var html_dir = './app/views/';
var db = require('../model/model.js');

exports.mensajes=function(request,response){
	//pasarle a la vista datos de: mensajes entre usuarios
	if(request.session.user){
		response.render('chat',{ title: 'Chat', 
			id : request.session.user.id,
			nickname: request.session.user.nick,
			foto: request.session.user.foto,
			idReceptor:0
		});
	}else{
		response.sendfile(html_dir + 'index.html');
	}
};

exports.enviarConversacion=function(request,response){
	console.log("si entre");
	if(request.session.user){
		idReceptor=request.query.id;
		console.log("emisor: "+request.session.user.id);
		console.log("receptor: "+idReceptor);
		db.obtenerConversacion(request.session.user.id,parseInt(idReceptor),response);
	}else{
		//response.sendfile(html_dir + 'index.html');
		response.json({error:'sesion caducada'});
	}
};

exports.nuevaConversacion=function(request,response){
	if(request.session.user){
		idReceptor=request.query.idReceptor;
		//mensajes(request,response);
		console.log("nueva conversacion");
		response.render('chat',{ title: 'Chat', 
			id : request.session.user.id,
			nickname: request.session.user.nick,
			foto: request.session.user.foto,
			idReceptor:idReceptor
		});
	}else{
		response.sendfile(html_dir + 'index.html');
	}
	
};

exports.obtenerPersona=function(request,response){
	console.log("obtenerPersona");
	if(request.session.user){
		idPersona=request.query.id;
		db.obtenerPersona(idPersona,request.session.user.id,response);
	}else{
		response.json({error:'sesion caducada'});
	}
	
};


exports.obtenerNoLeidos=function(request,response){
	console.log("obtenerNoLeidos");
	if(request.session.user){
		id=request.session.user.id,
		db.obtenerConversacionesPendientes(request.session.user.id,response);
	}else{
		response.json({error:'sesion caducada'});
	}
	
};

exports.leerMensajes=function(request,response){
	console.log("leerMensajes");
	if(request.session.user){
		id=request.query.id;
		console.log('emisor'+id+' receptor '+request.session.user.id)
		db.leerMensajes(id,request.session.user.id);
		response.json({id:id});
	}else{
		response.json({error:'sesion caducada'});
	}
	
};

exports.obtenerPersonaByNick=function(request,response){
	console.log("obtenerPersonaByNick");
	if(request.session.user){
		nick=request.query.nick;
		db.obtenerPersonaNick(nick,response);
	}else{
		response.json({error:'sesion caducada'});
	}
	
};

exports.obtenerPersonaByNombre=function(request,response){
	console.log("obtenerPersonaByNombre");
	if(request.session.user){
		nombre=request.query.nombre;
		db.obtenerPersonaNombre(nombre,response);
	}else{
		response.json({error:'sesion caducada'});
	}
	
};

exports.obtenerPersonaByApellido=function(request,response){
	console.log("obtenerPersonaByApellido");
	if(request.session.user){
		apellido=request.query.apellido;
		db.obtenerPersonaApellido(apellido,response);
	}else{
		response.json({error:'sesion caducada'});
	}
	
};

/*
exports.enviarConversaciones=function(request,response){
	console.log("esta es");
	console.log(request.session.user.id)
	db.obtenerConversaciones(request.session.user.id,response);	
	console.log("esta no es");
};

*/




