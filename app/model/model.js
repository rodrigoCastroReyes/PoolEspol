//var pg = require('pg');
//var conString = "tcp://postgres:postgres@localhost:5432/PoolEspol";
var modelos = require('../model/PoolEspoldb.js');


exports.guardarRutas = function(datos){ //recibe un objeto ruta
	//var client = new pg.Client(conString);
	//client.connect();

	//var query = 'INSERT INTO public.Ruta' + "VALUES( 1, " + datos.fecha + "," + datos.precio  + "," +  datos.hora + ", pendiente, " + "null," + "1203" ;

	//var query = "insert into " + "public.Ruta" + " values( 1, null, 12, 1, null, 'activo', null ,1203 )"; 
	//client.query(query);
	

	
	modelos.Ruta.create( {id_ruta: 1, fecha: new Date(2015, 8, 12 ), hora: datos.hora , costo : parseFloat(datos.costo), 
		capacidad: parseInt(capacidad), estado: "pendiente", puntosx: null, puntosy: null, idcreador:1
	  });

	
	console.log("Guardado");
	}




	


