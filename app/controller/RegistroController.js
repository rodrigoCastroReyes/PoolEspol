var html_dir = './app/views/';
var db = require('../model/model.js');

exports.registrar = function(request, response){
	if(db.encontrarUsuario(request.body.usuario).then(function (user){
		if(user){
			console.log('EL USUARIO YA SE ENCUENTRA REGISTRADO');
			response.sendfile(html_dir + 'index.html');
		}else{
			request.session.user=user.dataValues;
			response.redirect('/perfil');
		}
};
