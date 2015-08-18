var db = require('../model/model');

var html_dir = './app/views/';

exports.Index = function(request, response){
	response.sendfile(html_dir + 'index.html');
};

exports.LogIn=function(request,response){
	//Autenticacion con PoolEspol : acceso a base de datos,etc
	response.redirect('/noticias');
}

exports.Noticias=function(request,response){
	//pasarle a la vista los datos de : rutas y aventones, notificaciones mas recientes, datos del usuario
	response.render('noticias',{ title: 'Noticias' } );
}

exports.Perfil=function(request,response){
	//pasarle a la vista los datos de : rutas y aventones, datos del usuario
	response.render('perfil');
};

exports.Mensajes=function(request,response){
	//pasarle a la vista datos de: mensajes entre usuarios
	response.render('chat');
};

exports.Notificaciones=function(request,response){
	//pasarle a la vista las notificaciones
	response.render('notificaciones');
};

exports.Cerrar=function(request,response){
	response.render('cerrar_sesion');
}

exports.Other = function(request, response){
	console.log("Got response: " + response.statusCode);
	db.guardarRuta(request.body);
    console.log(request.body);
	console.log("entre");
};