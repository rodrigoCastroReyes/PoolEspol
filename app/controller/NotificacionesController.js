var db = require('../model/model');

exports.notificaciones = function(request,response){
	//pasarle a la vista las notificaciones
	response.render('notificaciones',{ title: 'Notificaciones', 
		id : request.session.user.id,
		nickname: request.session.user.nick,
		foto: request.session.user.foto
	});
};

exports.obtenerNotificaciones = function(request,response){
	if(request.query.paginacion == 1){
		db.obtenerNotificacionesPaginacion(request.session.user.id,response);
	}else{
		db.obtenerNotificacionesUsuario(request.session.user.id,response);	
	}
}