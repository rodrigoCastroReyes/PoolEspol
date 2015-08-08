var pg = require('pg');
var conString = "tcp://postgres:obayona@localhost:5432/PoolEspol";



exports.guardarRutas = function(datos){ //recibe un objeto ruta
	var client = new pg.Client(conString);
	client.connect();

	//var query = 'INSERT INTO public.Ruta' + "VALUES( 1, " + datos.fecha + "," + datos.precio  + "," +  datos.hora + ", pendiente, " + "null," + "1203" ;

	var query = "insert into " + "public.Ruta" + " values( 1, null, 12, 1, null, 'activo', null ,1203 )"; 
	client.query(query);
	console.log("Guardado");

}
