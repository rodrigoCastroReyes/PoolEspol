
var html_dir = './app/views/';
var db = require('../model/model');


exports.noticias=function(request,response){
	//pasarle a la vista los datos de : rutas y aventones, notificaciones mas recientes, datos del usuario
	
	if(request.session.user){
		console.log(request.session.user);
		response.render('noticias',{ title: 'Noticias', 
			id : request.session.user.id,
			nickname: request.session.user.nick,
			foto: request.session.user.foto
		});
	}else{
		response.sendfile(html_dir + 'index.html');
	}
}

exports.obtenerRutasNoticias = function(request, response){
	db.obtenerRutasNoticias(1, request, response);

}
