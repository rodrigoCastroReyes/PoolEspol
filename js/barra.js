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
	//contenedor_rutas.style.opacity=0.5;
}

function aceptarCierre(){
	window.location.href="cerrar_sesion.html"; 
}

function cancelarCierre(){
	//contenedor_rutas.style.opacity=1;
	menu_salir.style.display="none";
}

function init(){
	aceptar_cierre.addEventListener('click',aceptarCierre,false);
	cancelar_cierre.addEventListener('click',cancelarCierre,false);
}

window.addEventListener('load',init,false);