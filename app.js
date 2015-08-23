//var modulo_guardado = require('./app/model/model.js');

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var swig = require('swig');
var session = require('express-session');


var app = express();
var http=require('http').Server(app);

var redis = require('redis');
var client = redis.createClient();
var redisStore=require('connect-redis')(session);

var realtime=require('./realtime.js');
var routes=require('./app/router.js');

app.set('port', 4000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var sessionMiddleware = session({
	secret: 'bobneuman',
	store: new redisStore({
			host:'localhost',
			port: 6379,
			client:client,
			ttl: 260 }),
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
http.listen(app.get('port'),function(){
    console.log("Pool Espol Aplication running in a port " + app.get('port'));
});

realtime.socketNoticias(http,sessionMiddleware);

/*
var insert=require('./insert.js');
insert.insertarUsuarios();*/