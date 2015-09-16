var db = require('../model/model');
var html_dir = './app/views/';

exports.notificaciones = function(request,response){
	//pasarle a la vista las notificaciones
	if(request.session.user){
		response.render('notificaciones',{ title: 'Notificaciones', 
			id : request.session.user.id,
			nickname: request.session.user.nick,
			foto: request.session.user.foto
		});
	}else{
		response.sendfile(html_dir + 'index.html');
	}
};

exports.obtenerNotificaciones = function(request,response){
	if(request.query.paginacion == 1){
		db.obtenerNotificacionesPaginacion(request.session.user.id,response);
	}else{
		db.obtenerNotificacionesUsuario(request.session.user.id,response);	
	}
}