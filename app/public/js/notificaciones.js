var usuario;
var socket;

function mostrarNotificaciones(event){
	var respond = JSON.parse(event.target.responseText);
	var notificaciones=respond.notificaciones;
	for(var i=0;i<notificaciones.length;i++){
		agregarNotificacion(notificaciones[i]);//agrega una notificacion al contenedor de notificaciones
	}
}

function agregarNotificacion(InfoNotificacion){
	var contenedor=document.createElement('div');
	contenedor.setAttribute('class','Notificacion  Notificacion-grande');
	contenedor.setAttribute('data-idNotificacion',InfoNotificacion['idNotificacion']);
	var contFoto=crearFoto(InfoNotificacion);
	contFoto.setAttribute('margin-right','10px');
	var info=crearInfoNotificacion(InfoNotificacion);
	info.setAttribute('margin-left','10px');
	contenedor.appendChild(contFoto);
	contenedor.appendChild(info);
	contenedor.addEventListener('click',function(){
		var id = this.getAttribute('data-idNotificacion');
		var request = new XMLHttpRequest();
		request.open("GET","/masInformacion?id=" + id ,true);
		request.addEventListener('load',masInformacion,false);
		request.send(null);
	},false);
	Contenedor_Notificaciones.appendChild(contenedor);
}

function cerrarRutaNotificaciones(){
	$("#RutaNotificaciones").css('visibility','hidden');
    $("#RutaNotificaciones").css('opacity','0'); 
}

function masInformacion(event){
	var respond = JSON.parse(event.target.responseText);
	if(respond.ruta!=null){
		var ruta = respond.ruta;
		var infoRuta = {};
		infoRuta.ruta = ruta;
		var contenedorMapa = document.getElementById('MapaNotificacion');
		crearMapa(infoRuta,contenedorMapa);
		$("#RutaNotificaciones").css('visibility','visible');
    	$("#RutaNotificaciones").css('opacity','1'); 
    }else{
    	console.log("hola mundo");
    }
}	

function iniciar(){
	usuario = new Usuario(userid,userNick,userFoto);
	socket = io.connect();
	var request = new XMLHttpRequest();
	request.open("GET","/obtenerNotificaciones?paginacion=-1",true);
	request.addEventListener('load',mostrarNotificaciones ,false);
	request.send(null);
}

window.addEventListener('load',iniciar,false)