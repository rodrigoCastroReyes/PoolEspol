
var modulo_guardado = require('./app/model/model.js');
var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var swig = require('swig');
var app = express();
//var favicon=require('serve-favicon')
//var cookieParser = require('cookie-parser');

app.set('port', 3000);
//app.use(favicon());
//app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static('./app/public'));
/*Template engine*/
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/app/views');

var routes=require('./app/router.js');
app.use('/',routes);

app.listen(app.get('port'));
//**********************************
/*
var carro = new Object();
carro.placa = "KJJSqAA";
carro.foto = "/user/document/picture";
carro.capacidad = 5;

var usuario = new Object();
usuario.nick = "kevin";
usuario.password = "kjdk";
usuario.nombre = "Kevin";
usuario.apellidos = "Ortiz Merchan";
usuario.sexo = "masculino";
usuario.telefono = '0997298159';
usuario.foto = "/user/document";

var mensaje = new Object();
mensaje.fecha = new Date();
mensaje.hora = new Date();
mensaje.contenido = "hola te ves bien";

var notificacion = new Object();
notificacion.tipo = "exclusivo";
notificacion.estado = "exclusivo";

var aventon = new Object();
aventon.longitud = 2.43444;
aventon.latitud = -3.0034334;
aventon.fecha = new Date();
aventon.hora = new Date();

var ruta = new Object();
ruta.fecha = new Date();
ruta.costo = 2.34;
ruta.capacidad = 3;
ruta.hora = new Date();
ruta.estado = "pendiente";
ruta.puntosx = [2.321111323,2.331111333,3.23333333,4.56666666];
ruta.puntosy = [1.221111333,2.331111123, 3,23333333, 1.34444444];

var usuarioruta = new Object();
usuarioruta.lat = 23.444;
usuarioruta.longit = 23.4444;
*/
/*
modulo_guardado.guardarCarro(carro); 
modulo_guardado.guardarUsuario(usuario);
modulo_guardado.guardarMensaje(mensaje);
modulo_guardado.guardarNotificaciones(notificacion);
modulo_guardado.guardarAventon(aventon);
modulo_guardado.guardarRuta(ruta);
modulo_guardado.guardarUsuarioRuta(usuarioruta);
*/



console.log("Pool Espol Aplication running in a port " + app.get('port'));