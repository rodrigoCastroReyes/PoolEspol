var db = require('../model/model');

exports.notificaciones = function(request,response){
	//pasarle a la vista las notificaciones
	response.render('notificaciones');
};

exports.obtenerNotificaciones = function(request,response){
	if(request.query.paginacion == 1){
		db.obtenerNotificacionesPaginacion(request.session.user.id,response);
	}else{
		
		console.log("estoy aca rftmadre");

		db.obtenerNotificacionesUsuario(request.session.user.id,response);	
	}
}