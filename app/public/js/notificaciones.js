var ban=false;

function cargarNotificaciones(){
  window.location.href="/notificaciones"; 
  //var notificaciones=JSON.parse(sessionStorage.getItem('notificaciones'))
  //console.log(notificaciones);
}

function crearFoto(InfoNot){
	var contFoto=document.createElement('div');
	contFoto.setAttribute('class','Notificacion-Foto');
	var foto=document.createElement('img');
	foto.src=InfoNot['urlNickname'];
	contFoto.appendChild(foto);
	return contFoto;
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

		inputAceptar.setAttribute('id','btnAceptar');
		inputAceptar.setAttribute('value','Aceptar');

		var inputCancelar=document.createElement('input');
		inputCancelar.setAttribute('class','Notificacion-boton');
		inputCancelar.setAttribute('type','submit');
		inputCancelar.setAttribute('id','btnCancelar');
		inputCancelar.setAttribute('value','Cancelar');

		contBotones.appendChild(inputAceptar);
		contBotones.appendChild(inputCancelar);

		info.appendChild(contTitulo);
		info.appendChild(contBotones);
	}else{
		titulo.innerHTML=InfoNot['publicador'] + "ha aceptado tu solicitud";
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
	Contenedor_Notificaciones.insertBefore(contenedor,Contenedor_Notificaciones.firstChild);
}

function crearNotificacionGrande(InfoNotificacion){

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


function verTodasNotificacion(){
	var center=document.createElement('center');
	var enlace=document.createElement('a');

	enlace.setAttribute('class','Notificacion-Mas');
	enlace.id='mas';
	enlace.innerHTML="Ver todas";
	enlace.href="/notificaciones";
	center.appendChild(enlace);
	Contenedor_Notificaciones.appendChild(center);
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
			$("#Contenedor_Notificaciones").show();
	    	ban=true;
	    }else{
	    	$("#Contenedor_Notificaciones").hide();
	    	ban=false;
	    }
	    return false;
	});
	$("#mas").click(function () {
		cargarNotificaciones();
	    return false;
	});

	var request = new XMLHttpRequest();
	request.open("GET","JSON/notificaciones.json",true);
	request.addEventListener('load',procesarNotificaciones ,false);
	request.send(null);
}

window.addEventListener('load',iniciar,false);