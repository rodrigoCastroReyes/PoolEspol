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
		var botones=document.querySelectorAll("button");
		for(var i=0;i<botones.length;i++){
			botones[i].disabled=true;
		}
	}
	if(perfil!=null){
		perfil.style.opacity=0.5;//pagina de perfil
		var botones=document.querySelectorAll("button");
		for(var i=0;i<botones.length;i++){
			botones[i].disabled=true;
		}
	}

	if(chat!=null){
		chat.style.opacity=0.5;
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
		var botones=document.querySelectorAll("button");
		for(var i=0;i<botones.length;i++){
			botones[i].disabled=false;
		}
	}
	if(perfil!=null){
		perfil.style.opacity=1;//pagina de perfil
		var botones=document.querySelectorAll("button");
		for(var i=0;i<botones.length;i++){
			botones[i].disabled=false;
		}
	}

	if(chat!=null){
		chat.style.opacity=1;
	}

}

function init(){
	aceptar_cierre.addEventListener('click',aceptarCierre,false);
	cancelar_cierre.addEventListener('click',cancelarCierre,false);
}

window.addEventListener('load',init,false);