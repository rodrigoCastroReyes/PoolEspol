var modulo_guardado=require('./app/model/model.js');

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var swig = require('swig');
var session = require('express-session');
//var cookieParser = require('cookie-parser');

var app = express();
var http=require('http').Server(app);

var redis = require('redis');
var client = redis.createClient();
var redisStore=require('connect-redis')(session);

var realtime=require('./realtime.js');
var routes=require('./app/router.js');
var realTimeChat=require('./realTimeChat.js');

app.set('port', 5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var sessionMiddleware = session({
	secret: 'bobneuman',
	store: new redisStore({
			host:'localhost',
			port: 6379,
			client:client,
			ttl: 10*60}),
	saveUninitialized: false,
	resave: false
});

app.use(sessionMiddleware);

/*Statics*/
app.use(express.static('./app/public'));
/*Template engine*/
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/app/views');
app.use('/',routes);
app.use(function (req,res,next){
	res.status(404);
	res.render('Pagina404',{Mensaje:"El recurso que intenta acceder no se encuentra disponible"});
});

app.use(function (req,res,next){
	res.status(500);
	res.render('Pagina500',{Mensaje:"A ocurrido un error interno, se debio cerrar la pagina"});
});

http.listen(app.get('port'),function(){
    console.log("Pool Espol Aplication running in a port " + app.get('port'));
});

var io = require('socket.io')(http);
realTimeChat.socketChat(io,sessionMiddleware);
realtime.socketNoticias(io,sessionMiddleware);