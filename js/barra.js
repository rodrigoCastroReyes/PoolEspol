function cargarPerfil(){
  window.location.href="perfil.html"; 
}

function cargarNoticias(){
  window.location.href="noticias.html"; 
}

function cargarMensajes(){
  window.location.href="chat.html"; 
}

function cargarNotificaciones(){
  window.location.href="notificaciones.html"; 
}

function salir(){
	
	menu_salir.style.display="flex";

	var rutas=document.getElementById("contenedor_rutas");
	var perfil=document.getElementById("contenedor_perfil")
	var chat=document.getElementById("contenido");

	if(rutas!=null){
		rutas.style.opacity=0.5;//pagina de noticias
		botonesOff();
	}
	if(perfil!=null){
		perfil.style.opacity=0.5;//pagina de perfil
		botonesOff()
	}

	if(chat!=null){
		chat.style.opacity=0.5;
		botonesOff()
	}
}

function aceptarCierre(){
	window.location.href="cerrar_sesion.html"; 
}

function cancelarCierre(){
	menu_salir.style.display="none";

	var rutas=document.getElementById("contenedor_rutas");
	var perfil=document.getElementById("contenedor_perfil")
	var chat=document.getElementById("contenido");

	if(rutas!=null){
		rutas.style.opacity=1;//pagina de noticias
		botonesOn()
	}
	if(perfil!=null){
		perfil.style.opacity=1;//pagina de perfil
		botonesOn()
	}

	if(chat!=null){
		chat.style.opacity=1;
		botonesOn()
	}
}

function botonesOn(){
	var botones=document.querySelectorAll("button");
	for(var i=0;i<botones.length;i++){
		botones[i].disabled=false;
	}
}

function botonesOff(){
	var botones=document.querySelectorAll("button");
	for(var i=0;i<botones.length;i++){
		botones[i].disabled=true;
	}
}



function init(){
	aceptar_cierre.addEventListener('click',aceptarCierre,false);
	cancelar_cierre.addEventListener('click',cancelarCierre,false);
}

window.addEventListener('load',init,false);