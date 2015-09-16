var socket;
function cargarPerfil(){
  window.location.href="/perfil"; 
}

function cargarNoticias(){
  window.location.href="/noticias"; 
}

function cargarMensajes(){
  window.location.href="/chat"; 
}

function cargarNotificaciones(){
  window.location.href="/notificaciones"; 
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

	if(chat!=null){//chat
		chat.style.opacity=0.5;
		botonesOff()
	}
}

function aceptarCierre(){
	window.location.href="cerrar_sesion"; 
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

	if(chat!=null){//chat
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

function connectSocketBarra(){
  socket = io.connect();
 
  socket.on('nuevoMensaje',function(n){
 		var s=document.createElement("span");
 		s.innerHTML=n;
 		$('.numeroNotificacion').remove()
 		s.setAttribute("class","numeroNotificacion");
 		menuMensaje.appendChild(s);
  });

 

}

function procesarNoLeidosBarra (event){
	var respond = event.target.responseText;
	var j= JSON.parse(respond);
	console.log(j);
	n=j.ids.length;
	if(n>0){
		var s=document.createElement("span");
		s.innerHTML=n;
		$('.numeroNotificacion').remove();
		s.setAttribute("class","numeroNotificacion");
		menuMensaje.appendChild(s);
	}else{
		$('.numeroNotificacion').remove();
	}

}


function obtenerNoLeidosBarra(){
	var request = new XMLHttpRequest();
	var url="/chat/nolidos";
	request.open("GET",url,true);
	request.addEventListener('load',procesarNoLeidosBarra ,false);
	request.send(null);
}


function init(){
	aceptar_cierre.addEventListener('click',aceptarCierre,false);
	cancelar_cierre.addEventListener('click',cancelarCierre,false);
	connectSocketBarra();
	obtenerNoLeidosBarra();
}

window.addEventListener('load',init,false);