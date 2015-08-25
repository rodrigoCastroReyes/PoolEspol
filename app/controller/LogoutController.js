
exports.cerrar=function(request,response){

	request.session.destroy(function(err){
		if(err){
			console.log(err);
		}else{
			response.render('cerrar_sesion');
		}
	});
	response.render('cerrar_sesion');
}
