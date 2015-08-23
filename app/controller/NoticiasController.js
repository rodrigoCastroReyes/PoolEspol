
exports.noticias=function(request,response){
	//pasarle a la vista los datos de : rutas y aventones, notificaciones mas recientes, datos del usuario
	response.render('noticias',{ title: 'Noticias', 
		id : request.session.user.id,
		nickname: request.session.user.nick,
		foto: request.session.user.foto
	});
}