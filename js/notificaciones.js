var ban=false;

function cargarNotificaciones(){
  window.location.href="notificaciones.html"; 
}

function crearNotificacion(InfoNotificacion){
	var contenedor=document.createElement('div');
	contenedor.setAttribute('class','Notificaciones');

	var contFoto=document.createElement('div');
	contFoto.setAttribute('class','Notificaciones-Foto');
	var foto=document.createElement('img');
	foto.src=InfoNotificacion['urlNickname'];
	contFoto.appendChild(foto);

	var info=document.createElement('div');
	var contTitulo=document.createElement('div');
	var titulo=document.createElement('h3');
	titulo.setAttribute('class','Notificaciones-titulo');
	titulo.innerHTML=InfoNotificacion['publicador'] + " ha solicitado un aventon";
	contTitulo.appendChild(titulo);

	var contBotones=document.createElement('div');
	contBotones.setAttribute('class','Notificaciones-Botones');

	var inputAceptar=document.createElement('input');
	inputAceptar.setAttribute('class','Notificaciones-boton');
	inputAceptar.setAttribute('type','submit');
	inputAceptar.setAttribute('id','btnAceptar');
	inputAceptar.setAttribute('value','Aceptar');

	var inputCancelar=document.createElement('input');
	inputCancelar.setAttribute('class','Notificaciones-boton');
	inputCancelar.setAttribute('type','submit');
	inputCancelar.setAttribute('id','btnCancelar');
	inputCancelar.setAttribute('value','Cancelar');

	contBotones.appendChild(inputAceptar);
	contBotones.appendChild(inputCancelar);

	info.appendChild(contTitulo);
	info.appendChild(contBotones);

	contenedor.appendChild(contFoto);
	contenedor.appendChild(info);

	Contenedor_Notificaciones.appendChild(contenedor);

}

function verTodasNotificacion(){
	var center=document.createElement('center');
	var enlace=document.createElement('a');

	enlace.setAttribute('class','Notificaciones-Mas');
	enlace.id='mas';
	enlace.innerHTML="Ver todas";
	enlace.href="notificaciones.html";
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