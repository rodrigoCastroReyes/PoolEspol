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

exports.masInformacion = function(request,response){
	var idNotificacion = request.query.id;
	db.unirNotificacionesUsuarioRuta(idNotificacion).then(function(result){
		if(result){
			console.log("resultado");
			if( result.dataValues.Notificacion_Usuario_Ruta != null ){
				var usuario_ruta = result.dataValues.Notificacion_Usuario_Ruta.dataValues;
				if(usuario_ruta.Ruta_Miembro!=null){
					var ruta = usuario_ruta.Ruta_Miembro.dataValues;
					var rutaJSON = {}
					var puntos = [];
					var limit = ruta.puntosx.length;
					for (var i =0; i< limit; i++ ){
						var punto = {x: ruta.puntosx[i], y: ruta.puntosy[i]};
						puntos.push(punto);
					}
					rutaJSON.ruta = puntos;
					response.json(rutaJSON);
				}else{
					response.json({});
				}
			}else{
				response.json({});
			}
		}
	});
}