var ban=false;

function cargarNotificaciones(){
  window.location.href="/notificaciones"; 
}

function verTodasNotificacion(){
	var center=document.createElement('center');
	var enlace=document.createElement('a');
	enlace.setAttribute('class','Notificacion-Mas');
	enlace.id='mas';
	enlace.innerHTML="Ver todas";
	enlace.href="/notificaciones";
	center.appendChild(enlace);
	Menu_Notificaciones.appendChild(center);
}

function crearFoto(InfoNot){
	var contFoto=document.createElement('div');
	contFoto.setAttribute('class','Notificacion-Foto');
	var foto=document.createElement('img');
	foto.src=InfoNot['urlNickname'];
	contFoto.appendChild(foto);
	return contFoto;
}

function aceptarSolicitud(event){

}

function cancelarSolicitud(event){

}

function crearInfoNotificacion(InfoNot){
	var info=document.createElement('div');
	info.setAttribute('class','Notificacion-info');
	var contTitulo=document.createElement('div');
	var titulo=document.createElement('h3');
	titulo.setAttribute('class','Notificacion-titulo');

	if(InfoNot['tipo']=="Solicitud"){
		titulo.innerHTML=InfoNot['publicador'] + " ha solicitado unirse a tu ruta";
		contTitulo.appendChild(titulo);

		var contBotones=document.createElement('div');
		contBotones.setAttribute('class','Notificacion-Botones');

		var inputAceptar=document.createElement('input');
		inputAceptar.setAttribute('class','Notificacion-boton');
		inputAceptar.setAttribute('type','submit');
		inputAceptar.setAttribute('data-idEmisor',InfoNot['idEmisor']);
		inputAceptar.setAttribute('data-idUsuario-Ruta',InfoNot['idUsuarioRuta']);
		inputAceptar.setAttribute('data-idRuta',InfoNot['idRuta']);
		inputAceptar.setAttribute('id','btnAceptar');
		inputAceptar.setAttribute('value','Aceptar');
		inputAceptar.addEventListener('click',aceptarSolicitud,false);

		var inputCancelar=document.createElement('input');
		inputCancelar.setAttribute('class','Notificacion-boton');
		inputCancelar.setAttribute('type','submit');
		inputCancelar.setAttribute('id','btnCancelar');
		inputCancelar.setAttribute('value','Cancelar');
		inputCancelar.addEventListener('click',cancelarSolicitud,false);

		contBotones.appendChild(inputAceptar);
		contBotones.appendChild(inputCancelar);

		info.appendChild(contTitulo);
		info.appendChild(contBotones);
	}else{
		titulo.innerHTML=InfoNot['publicador'] + " ha aceptado llevarte";
		contTitulo.appendChild(titulo);
		info.appendChild(contTitulo);
	}

	return info;
}

function crearNotificacion(InfoNotificacion){
	var contenedor=document.createElement('div');
	contenedor.setAttribute('class','Notificacion');

	var contFoto=crearFoto(InfoNotificacion);//foto
	var info=crearInfoNotificacion(InfoNotificacion);//tipo de notificacion

	contenedor.appendChild(contFoto);
	contenedor.appendChild(info);
	Menu_Notificaciones.insertBefore(contenedor,Menu_Notificaciones.firstChild);
}

function procesarNotificaciones(event){
	var respond = JSON.parse(event.target.responseText);
	var notificaciones=respond.notificaciones;
	for(var i=0;i<notificaciones.length;i++){
		crearNotificacion(notificaciones[i]);
	}
	verTodasNotificacion();
}


function iniciar () {
	$("#notificaciones").click(function () {
		if(ban==false){
			$("#Menu_Notificaciones").show();
	    	ban=true;
	    }else{
	    	$("#Menu_Notificaciones").hide();
	    	ban=false;
	    }
	    return false;
	});
	$("#mas").click(function () {
		cargarNotificaciones();
	    return false;
	});
	var request = new XMLHttpRequest();
	request.open("GET","/obtenerNotificaciones?paginacion=1",true);
	request.addEventListener('load',procesarNotificaciones ,false);
	request.send(null);
}

window.addEventListener('load',iniciar,false);