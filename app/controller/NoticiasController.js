
var html_dir = './app/views/';
var db = require('../model/model');

exports.noticias=function(request,response){
	//pasarle a la vista los datos de : rutas y aventones, notificaciones mas recientes, datos del usuario
	if(request.session.user){
		console.log(request.session.user);
		response.render('noticias',{ title: 'Noticias', 
			id : request.session.user.id,
			nickname: request.session.user.nick,
			foto: request.session.user.foto,
			flag:request.session.user.id_carro
		});
	}else{
		response.sendfile(html_dir + 'index.html');
	}
}

exports.obtenerUsuarioInfo = function(request,response){
	db.obtenerEstadisticaUsuario(request.query.publicador).then(function(result){
		var data = [];
		for(var i = 0 ; i<result.length; i++){
			console.log(result[i].dataValues);
			data.push(result[i].dataValues);
		}
		db.consultarUsuario(request.query.publicador).then(function(result){
			if(result!=null){
				var usuario = result.dataValues;
				db.obtenerNotificacionesRechazadas(request.query.publicador).then(function(count){
					var notRechazadas = count ;
					db.obtenerNumRutas(request.query.publicador).then(function(num){
						response.json({ data : data , usuario : usuario, 
										numRechazadas : notRechazadas , numRutas : num });
					})
				});
			}
		});
	});
}

exports.obtenerRutasNoticias = function(request, response){
	db.obtenerRutasNoticias(request.session.user.id, request, response);
}


exports.obtenerAventonesNoticias = function(request, response){
	db.obtenerAventonesNoticias(request.session.user.id, request, response);
}

exports.obtenerPasajeros = function(request, response){
	db.obtenerPasajerosRuta(request, response);
}