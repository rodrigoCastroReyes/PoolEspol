var ban=false;
var socket;

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
	//Menu_Notificaciones.appendChild(center);
}

function crearFoto(InfoNot){
	var contFoto=document.createElement('div');
	contFoto.setAttribute('class','Notificacion-Foto');
	var foto=document.createElement('img');
	foto.src=InfoNot['urlNickname'];
	contFoto.appendChild(foto);
	return contFoto;
}

function borrarNotificacion(idNotificacion){
	var lstNotificaciones = Menu_Notificaciones.childNodes;

	for(var i=0 ; i < lstNotificaciones.length ; i++){
		var notificacionInfo = lstNotificaciones[i];
		if( notificacionInfo.getAttribute('class') == 'Notificacion'){
			if(idNotificacion == notificacionInfo.getAttribute('data-idNotificacion')){
				notificacionInfo.parentNode.removeChild(notificacionInfo);
				break;
			}
		}
	}
	if(Menu_Notificaciones.childNodes.length == 0){
		sinNotificaciones();
	}
}

function aceptarSolicitud(event){
	var respuesta = {};
	respuesta.idNotificacion = this.getAttribute('data-idNotificacion');
	respuesta.idEmisor = usuario.id;
	respuesta.idReceptor = this.getAttribute('data-idEmisor');
	respuesta.idUsuarioRuta = this.getAttribute('data-idUsuario-Ruta');
	respuesta.idRuta = this.getAttribute('data-idRuta');
	respuesta.estado = 'Aceptada';
	respuesta.tipo = 'Informacion';
	borrarNotificacion(respuesta.idNotificacion);
	socket.emit('aceptarRuta',respuesta);
}

function rechazarSolicitud(event){
	var respuesta = {};
	respuesta.idNotificacion = this.getAttribute('data-idNotificacion');
	respuesta.idEmisor = usuario.id;
	respuesta.idReceptor = this.getAttribute('data-idEmisor');
	respuesta.idUsuarioRuta = this.getAttribute('data-idUsuario-Ruta');
	respuesta.idRuta = this.getAttribute('data-idRuta');
	respuesta.estado = 'Rechazada';
	respuesta.tipo = 'Informacion';
	borrarNotificacion(respuesta.idNotificacion);
	socket.emit('rechazarRuta',respuesta);
}

function crearInfoNotificacion(InfoNot){
	var info=document.createElement('div');
	info.setAttribute('class','Notificacion-info');
	var contTitulo=document.createElement('div');
	var titulo=document.createElement('h3');
	titulo.setAttribute('class','Notificacion-titulo');

	if(InfoNot['tipo']=="Solicitud"){
		if(InfoNot['estado'] == 'Pendiente'){
			titulo.innerHTML=InfoNot['publicador'] + " ha solicitado unirse a tu ruta";
			contTitulo.appendChild(titulo);

			var contBotones=document.createElement('div');
			contBotones.setAttribute('class','Notificacion-Botones');

			var inputAceptar=document.createElement('input');
			inputAceptar.setAttribute('class','Notificacion-boton');
			inputAceptar.setAttribute('type','submit');
			inputAceptar.setAttribute('data-idNotificacion',InfoNot['idNotificacion']);
			inputAceptar.setAttribute('data-idEmisor',InfoNot['idEmisor']);
			inputAceptar.setAttribute('data-idUsuario-Ruta',InfoNot['idUsuarioRuta']);
			inputAceptar.setAttribute('data-idRuta',InfoNot['idRuta']);
			inputAceptar.setAttribute('id','btnAceptar');
			inputAceptar.setAttribute('value','Aceptar');
			inputAceptar.addEventListener('click',aceptarSolicitud,false);

			var inputRechazar=document.createElement('input');
			inputRechazar.setAttribute('class','Notificacion-boton');
			inputRechazar.setAttribute('type','submit');
			inputRechazar.setAttribute('data-idNotificacion',InfoNot['idNotificacion']);
			inputRechazar.setAttribute('data-idEmisor',InfoNot['idEmisor']);
			inputRechazar.setAttribute('data-idUsuario-Ruta',InfoNot['idUsuarioRuta']);
			inputRechazar.setAttribute('data-idRuta',InfoNot['idRuta']);
			inputRechazar.setAttribute('id','btnCancelar');
			inputRechazar.setAttribute('value','Rechazar');
			inputRechazar.addEventListener('click',rechazarSolicitud,false);

			contBotones.appendChild(inputAceptar);
			contBotones.appendChild(inputRechazar);

			info.appendChild(contTitulo);
			info.appendChild(contBotones);
		}
		if(InfoNot['estado'] == 'Aceptada'){
			titulo.innerHTML= "Has aceptado a " + InfoNot['publicador'] + " en tu ruta";
			contTitulo.appendChild(titulo);
			info.appendChild(contTitulo);
		}
		if(InfoNot['estado'] == 'Rechazada'){
			titulo.innerHTML= "Has rechazado la solicitud de " + InfoNot['publicador'];
			contTitulo.appendChild(titulo);
			info.appendChild(contTitulo);
		}
	}else{
		if(InfoNot['estado'] == 'Aceptada'){
			titulo.innerHTML=InfoNot['publicador'] + " ha aceptado llevarte";
			contTitulo.appendChild(titulo);
			info.appendChild(contTitulo);
		}else{
			titulo.innerHTML=InfoNot['publicador'] + " ha rechazado tu solicitud";
			contTitulo.appendChild(titulo);
			info.appendChild(contTitulo);
		}
	}
	return info;
}

function crearNotificacion(InfoNotificacion){
	var contenedor=document.createElement('div');
	contenedor.setAttribute('class','Notificacion');
	contenedor.setAttribute('data-idNotificacion',InfoNotificacion['idNotificacion']);
	
	var contFoto=crearFoto(InfoNotificacion);//foto
	var info=crearInfoNotificacion(InfoNotificacion);//tipo de notificacion

	contenedor.appendChild(contFoto);
	contenedor.appendChild(info);
	Menu_Notificaciones.appendChild(contenedor);
}

function procesarNotificaciones(event){
	var respond = JSON.parse(event.target.responseText);
	var notificaciones=respond.notificaciones;

	if(notificaciones.length == 0){
		sinNotificaciones();
	}else{
		$('#Menu_Notificaciones').empty();
		for(var i=0;i<notificaciones.length;i++){
			crearNotificacion(notificaciones[i]);
		}
	}
	verTodasNotificacion();
}

function sinNotificaciones(){
	var contenedor= document.createElement('div');
	contenedor.setAttribute('class','Notificacion');
	contenedor.setAttribute('id','sinNotificaciones');

	var text = document.createElement('span');
	text.innerHTML = "No tiene notificaciones pendientes";
	text.setAttribute('class','Notificacion-titulo');
	contenedor.appendChild(text);

	Menu_Notificaciones.insertBefore(contenedor,Menu_Notificaciones.firstChild);
}

function quitarSinNotificaciones(){
	var cont = document.getElementById('sinNotificaciones');
	if(cont!=null) 
		cont.parentNode.removeChild(cont);
}


function iniciar () {
	socket = io.connect();
	
	socket.on('actualizarNotificacion',function(notificacion){
    	quitarSinNotificaciones();
    	crearNotificacion(notificacion);
 	});
	
	$("#notificaciones").click(function () {
		if(ban==false){
			$("#Menu_Notificaciones").show();
			$("#Notificaciones_Ver_todas").show();
	    	ban=true;
	    }else{
	    	$("#Notificaciones_Ver_todas").hide();
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