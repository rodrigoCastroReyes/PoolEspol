
//var modulo_guardado = require('./app/model/model.js');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var swig = require('swig');
var app = express();
var http=require('http').Server(app);
var realtime=require('./realtime.js');
var routes=require('./app/router.js');
//var favicon=require('serve-favicon')
//var cookieParser = require('cookie-parser');

app.set('port', 4000);
//app.use(favicon());
//app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
/*Statics*/
app.use(express.static('./app/public'));
/*Template engine*/
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/app/views');
app.use('/',routes);

http.listen(app.get('port'),function(){
    console.log("Pool Espol Aplication running in a port " + app.get('port'));
});

/*
var modulo_guardado=require('./app/model/model.js');
var usuario = new Object();
usuario.nick = "kevin";
usuario.password = "kjdk";
usuario.nombre = "Kevin";
usuario.apellidos = "Ortiz Merchan";
usuario.sexo = "masculino";
usuario.telefono = '0997298159';
usuario.foto = "/user/document";
modulo_guardado.guardarUsuario(usuario);*/

realtime.socketNoticias(http);