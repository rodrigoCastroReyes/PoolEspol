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

var routes=require('./app/router');
app.use('/',routes);

app.listen(app.get('port'));
console.log("Pool Espol Aplication running in a port " + app.get('port'));