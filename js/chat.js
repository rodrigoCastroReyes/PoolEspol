function procesarConversacion(event){
	var respond = event.target.responseText;
	var conver = JSON.parse(respond);
	var fotoEmisor=conver.fotoEmisor;
	var nickEmisor=conver.nickEmisor;
	var fotoReceptor=conver.fotoReceptor;
	var nickReceptor=conver.nickReceptor;
	var mensajes = conver.mensajes;
	var imagen;
	cabezeraMensaje.innerHTML="";
	areaMensajes.innerHTML="";
	imagen=document.createElement("img");
	imagen.setAttribute("src",fotoReceptor);
	imagen.setAttribute("class","fotoPerfil");
	cabezeraMensaje.appendChild(imagen);

	span=document.createElement("span");
	span.innerHTML=nickReceptor;
	span.setAttribute("class","texto_simple")
	cabezeraMensaje.appendChild(span);

	for(i=0;i<mensajes.length;i++){
		var contenedor=document.createElement("div");
		var contenerPerfil=document.createElement("div");
		var contenedorMensaje=document.createElement("div");
		imagen=document.createElement("img");
		var p1=document.createElement("p");
		var p2=document.createElement("p");
		tipo=mensajes[i].tipo;
		mensaje=mensajes[i].contenido;
		imagen.setAttribute("class","fotoPerfil");
		contenedorMensaje.setAttribute("class","mensaje");
		contenerPerfil.setAttribute("class","infoPer");
		if(tipo=="emisor"){
			contenedor.setAttribute("class","friend");
			imagen.setAttribute("src",fotoEmisor);
			p1.innerHTML=nickEmisor;
			contenedor.appendChild(contenerPerfil);
			contenedor.appendChild(contenedorMensaje);
		}else{
			contenedor.setAttribute("class","self");
			imagen.setAttribute("src",fotoReceptor);
			p1.innerHTML=nickReceptor;
			contenedor.appendChild(contenedorMensaje);
			contenedor.appendChild(contenerPerfil);
		
		}
		p2.innerHTML=mensaje;
		contenerPerfil.appendChild(imagen);
		contenerPerfil.appendChild(p1);
		contenedorMensaje.appendChild(p2);
		areaMensajes.appendChild(contenedor);		
	}
	
}

function cargarConversacion(cadena){
  
  var request = new XMLHttpRequest();
  request.open("GET",cadena,true);
  request.addEventListener('load',procesarConversacion ,false);
  request.send(null);

}

function mostrarChat(evt){
	personas.classList.remove("visible");
	personas.classList.add("invisible");
	cargarConversacion(this.dataset.conversacion);
	$('#conversacion').css("display","flex");

}

function regresar(evt){
	personas.classList.remove("invisible");
	personas.classList.add("visible");
	$('#conversacion').css("display","none");

}

function procesarConversaciones(event){
	var respond = event.target.responseText;
	var conver = JSON.parse(respond);
	var conversaciones=conver.conversaciones;
	for(i=0;i<conversaciones.length;i++){
		persona=conversaciones[i];
		div=document.createElement("div");
		div.setAttribute("class","persona");
		div.setAttribute("data-conversacion",persona.conversacion);

		imagen=document.createElement("img");
		imagen.setAttribute("src",persona.foto);
		imagen.setAttribute("class","fotoPerfil")
		
		h3=document.createElement("h3");
		h3.innerHTML=persona.nick;
		
		div.appendChild(imagen);
		div.appendChild(h3);
		personas.appendChild(div);
	}
	$('.persona').click(mostrarChat);
}


function cargarConversaciones(){
  
  var request = new XMLHttpRequest();
  request.open("GET","JSON/conversaciones.json",true);
  request.addEventListener('load',procesarConversaciones ,false);
  request.send(null);

}




function inicializar(){
	$('.persona').click(mostrarChat);
	$('.regresar').click(regresar);
	cargarConversaciones();
	$('#conversacion').css("display","none");
}







window.addEventListener('load', inicializar, false);