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
	var contFoto=crearFoto(InfoNotificacion);
	contFoto.setAttribute('margin-right','10px');
	var info=crearInfoNotificacion(InfoNotificacion);
	info.setAttribute('margin-left','10px');
	contenedor.appendChild(contFoto);
	contenedor.appendChild(info);
	Contenedor_Notificaciones.appendChild(contenedor);
}

function iniciar(){
	var request = new XMLHttpRequest();
	request.open("GET","/obtenerNotificaciones?paginacion=-1",true);
	request.addEventListener('load',mostrarNotificaciones ,false);
	request.send(null);
}

window.addEventListener('load',iniciar,false)