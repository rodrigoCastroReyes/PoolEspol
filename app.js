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
//hago referencia al archivo PoolEspoldb y puedo acceder a las clases exportables
var modelos = require('./app/model/PoolEspoldb.js');
//crea una nueva instancia del modelo carro y se les pasa los valores para guardarlo en el modelo y posteriormente en la base
//Nota este metodo crea un nuevo dato cada vez que ejecute el archivo app.js
modelos.Carro.create({id_carro: 41, placa: "YOMNPAA", foto: "mi foto", capacidad: 3}).then(function (carro){
	console.log("objeto OK GUARDADO "+ carro.get('placa')+ " "+ carro.get('foto'));
	console.log("capacidad "+ carro.get('capacidad'));

	console.log("capacidad "+ carro.get('id_carro'));

});

modelos.Usuario.create({id:43, nick:"kevinsoft" , password:"kevin", nombre:"kevinAndres", apellidos: "Ortiz Merchan", sexo:"masculino", telefono:"26-23-45", id_carro:6 ,foto:"user/document/daw/foto"}).then(function (usuario){
	console.log("Usuario Guardado Correctamente");
	console.log("nombre : " + usuario.get('nombre'));
});


modelos.Ruta.create( {id_ruta: 7, fecha: new Date(2015, 8, 12 ), hora: new Date(), costo : 23.32, capacidad: 3, estado: "pendiente", puntosx: ['-2.2323232323232','-3.344343434343'], puntosy: ['-3.55555556677','-5.2323243434'], idcreador:5}).then(function (ruta){
	  		console.log(ruta.get('puntosx'));
	  		console.log(ruta.get('puntosy'));
	  		console.log(ruta.get('costo'));
	  });


modelos.Aventon.create({id_aventon:3, longitud:23.45, latitud: 232.45, fecha: new Date(), hora: new Date(), id_usuario_da:2, id_usuario_pide:2}).then(function (aventon){
		console.log(aventon.get('longitud'));
		console.log(aventon.get('latitud'));
		console.log(aventon.get('fecha'));
		console.log(aventon.get('hora'));
			
});

modelos.Notificacion.create({id_Notificacion:3, tipo: 'urgente', estado:'ocupado', id_emisor:1, id_receptor:2}).then(function (Notificacion){

	console.log(Notificacion.get('id_Notificacion'));
	console.log(Notificacion.get('tipo'));

});



modelos.Mensaje.create({id_mensaje:3, fecha: new Date(), hora: new Date(), contenido:"hola a todos", id_emisor:3, id_receptor:2}).then(function (Mensaje){

	console.log(Mensaje.get('fecha'));
	console.log(Mensaje.get('contenido'));
	console.log(Mensaje.get('hora'));

});

modelos.Usuario_Ruta.create({id_usuario_ruta:4, id_usuario:3, id_ruta:3, lat: 2.232323, longit: 3.32332}).then(function (Usuario_Ruta){
	console.log(Usuario_Ruta.get('id_usuario'));
	console.log(Usuario_Ruta.get('id_ruta'));



});

console.log("Pool Espol Aplication running in a port " + app.get('port'));