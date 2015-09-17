var socket;

function procesarConversacion(event){
	var respond = event.target.responseText;
	var conver = JSON.parse(respond);
	console.log(conver);
	if(conver.error){
		window.location.href="/"; 
		return;
	}
	
	var fotoEmisor=conver.foto;
	var nickEmisor=conver.nick;
	var fotoReceptor=userFoto;
	var nickReceptor=userNick;
	var mensajes = conver.mensajes;
	var imagen;
	cabezeraMensaje.innerHTML="";
	areaMensajes.innerHTML="";
	imagen=document.createElement("img");
	imagen.setAttribute("src",fotoEmisor);
	imagen.setAttribute("class","fotoPerfil");
	cabezeraMensaje.appendChild(imagen);

	span=document.createElement("span");
	span.innerHTML=nickEmisor;
	span.setAttribute("class","texto_simple")
	cabezeraMensaje.appendChild(span);
	cabezeraMensaje.setAttribute("data-id",conver.id);

	for(i=0;i<mensajes.length;i++){
		var contenedor=document.createElement("div");
		var contenerPerfil=document.createElement("div");
		var contenedorMensaje=document.createElement("div");
		imagen=document.createElement("img");
		//var p1=document.createElement("p");
		var p2=document.createElement("p");
		tipo=mensajes[i].tipo;
		mensaje=mensajes[i].contenido;
		imagen.setAttribute("class","fotoPerfil");
		contenedorMensaje.setAttribute("class","mensaje");
		contenerPerfil.setAttribute("class","infoPer");
		if(tipo=="emisor"){
			contenedor.setAttribute("class","friend");
			imagen.setAttribute("src",fotoEmisor);
			//p1.innerHTML=nickEmisor;
			contenedor.appendChild(contenerPerfil);
			contenedor.appendChild(contenedorMensaje);
		}else{
			contenedor.setAttribute("class","self");
			imagen.setAttribute("src",fotoReceptor);
			//p1.innerHTML=nickReceptor;
			contenedor.appendChild(contenedorMensaje);
			contenedor.appendChild(contenerPerfil);
		
		}
		p2.innerHTML=mensaje;
		contenerPerfil.appendChild(imagen);
		//contenerPerfil.appendChild(p1);
		contenedorMensaje.appendChild(p2);
		areaMensajes.appendChild(contenedor);		
	}
	$("#areaMensajes").animate({ scrollTop: areaMensajes.scrollHeight}, 1000);
	
}

function cargarConversacion(id){
  
  var request = new XMLHttpRequest();
  var url="/chat/conversacion?id="+id;
  request.open("GET",url,true);
  request.addEventListener('load',procesarConversacion ,false);
  request.send(null);

}

function mostrarChat(evt){
	personas.classList.remove("visible");
	personas.classList.add("invisible");
	cargarConversacion(this.dataset.id);
	leerMensajes(this.dataset.id);
	$('#conversacion').css("display","flex");
	
	//obtenerNoLeidosBarra();

}

function regresar(evt){
	personas.classList.remove("invisible");
	personas.classList.add("visible");
	$('#conversacion').css("display","none");

}

function procesarDatosConversacionAjax(event){
	var respond = event.target.responseText;
	var c = JSON.parse(respond);
	if(c.error){
		window.location.href="/"; 
		return;
	}
	conversaciones=c.conversaciones;
	for(i=0;i<conversaciones.length;i++){
		div=document.createElement("div");
		div.setAttribute("class","persona");
		div.setAttribute("data-id",conversaciones[i].id);

		imagen=document.createElement("img");
		imagen.setAttribute("src",conversaciones[i].foto);
		imagen.setAttribute("class","fotoPerfil")
		
		h3=document.createElement("h3");
		h3.innerHTML=conversaciones[i].nick;
		
		

		div.appendChild(imagen);
		div.appendChild(h3);
		div.setAttribute('data-leido','si');
		personas.appendChild(div);
	}
	aux=$('.persona');
	aux[aux.length-1].addEventListener('click',mostrarChat);

}

/*
function cargarConversaciones(){
  
  var request = new XMLHttpRequest();
  var url="/chat/persona?id="+idReceptor;
  request.open("GET",url,true);
  request.addEventListener('load',procesarDatosConversacionAjax ,false);
  request.send(null);

}
*/
function CargarPersona(id){
	pers=$('.persona');
	ban=0;
	for(i=0;i<pers.length;i++){
		p=pers[i];
		if(p.dataset.id==idReceptor){
			ban=1;
			break;
		}
	}
	if(ban==0){
		var request = new XMLHttpRequest();
		var url="/chat/persona?id="+id;
		request.open("GET",url,true);
		request.addEventListener('load',procesarDatosConversacionAjax ,false);
		request.send(null);
	}

}
function procesarNoLeidos(event){
	var respond = event.target.responseText;
	var j= JSON.parse(respond);
	if(j.error){
		window.location.href="/"; 
		return;
	}
	console.log(j);
	ids=j.ids;
	for(i=0;i<ids.length;i++){
		p=$('.persona[data-id='+ids[i]+']');
		console.log(p[0]);
		var data={id_receptor:userId ,id_emisor:ids[i]};
		console.log(data);
		socket.emit('SolicitarNoLeidos',data);
	}
}

function obtenerNoLeidos(){
	var request = new XMLHttpRequest();
	var url="/chat/nolidos";
	request.open("GET",url,true);
	request.addEventListener('load',procesarNoLeidos ,false);
	request.send(null);
}
function eliminarNotificacionPersona(id){
	console.log(id);
	$('.persona[data-id='+id+']')[0].setAttribute('data-leido','si');
	p=$('.persona[data-id='+id+'] span');
	console.log(p);
	p.remove();
}

function actualizarLeidos(event){
	var respond = event.target.responseText;
	var j= JSON.parse(respond);
	if(j.error){
		window.location.href="/"; 
		return;
	}
	eliminarNotificacionPersona(j.id);
	obtenerNoLeidosBarra();

}

function leerMensajes(id){
	console.log(id);
	var request = new XMLHttpRequest();
	var url="/chat/leermensajes?id="+id;
	request.open("GET",url,true);
	request.addEventListener('load',actualizarLeidos ,false);
	request.send(null);
}


function procesarDatosConversacion(persona){
	pers=$('.persona');
	ban=0;
	for(i=0;i<pers.length;i++){
		p=pers[i];
		if(p.dataset.id==persona.id){
			ban=1;
			break;
		}
	}
	if(ban==0){
		div=document.createElement("div");
		div.setAttribute("class","persona");
		div.setAttribute("data-id",persona.id);

		imagen=document.createElement("img");
		imagen.setAttribute("src",persona.foto);
		imagen.setAttribute("class","fotoPerfil")
		
		h3=document.createElement("h3");
		h3.innerHTML=persona.nick;

		
		div.appendChild(imagen);
		div.appendChild(h3);
		div.setAttribute('data-leido','si');
		personas.appendChild(div);
		aux=$('.persona');
		aux[aux.length-1].addEventListener('click',mostrarChat);
	}
	obtenerNoLeidos();

}

function enviarMensaje(){
	texto=txtMensaje.value;
	txtMensaje.value="";
	if(texto!=""){
		var contenerPerfil=document.createElement("div");
		var contenedorMensaje=document.createElement("div");
		var contenedor=document.createElement("div");
		var imagen=document.createElement("img");
		//var p1=document.createElement("p");
		var p2=document.createElement("p");

		contenedor.setAttribute("class","self");
		imagen.setAttribute("src",userFoto);
		imagen.setAttribute("class","fotoPerfil");
		//p1.innerHTML=userNick;
		p2.innerHTML=texto;
		contenedorMensaje.setAttribute("class","mensaje");
		contenerPerfil.setAttribute("class","infoPer");
		contenedor.appendChild(contenedorMensaje);
		contenedor.appendChild(contenerPerfil);
		contenerPerfil.appendChild(imagen);
		//contenerPerfil.appendChild(p1);
		contenedorMensaje.appendChild(p2);
		areaMensajes.appendChild(contenedor);
		$("#areaMensajes").animate({ scrollTop: areaMensajes.scrollHeight}, 1000);
		console.log(cabezeraMensaje.dataset.id);
		socket.emit('enviarServidor',{'idEmisor':userId,'idDestino':cabezeraMensaje.dataset.id,'mensaje':texto});
	}

}

function agregarMensaje(mensaje){
	var contenedor=document.createElement("div");
	var contenerPerfil=document.createElement("div");
	var contenedorMensaje=document.createElement("div");
	imagen=document.createElement("img");
	//var p1=document.createElement("p");
	var p2=document.createElement("p");
	imagen.setAttribute("class","fotoPerfil");
	contenedorMensaje.setAttribute("class","mensaje");
	contenerPerfil.setAttribute("class","infoPer");
	contenedor.setAttribute("class","friend");
	imagen.setAttribute("src",mensaje.foto);
	//p1.innerHTML=mensaje.nick;
	contenedor.appendChild(contenerPerfil);
	contenedor.appendChild(contenedorMensaje);
	p2.innerHTML=mensaje.contenido;
	contenerPerfil.appendChild(imagen);
	//contenerPerfil.appendChild(p1);
	contenedorMensaje.appendChild(p2);
	areaMensajes.appendChild(contenedor);
	$("#areaMensajes").animate({ scrollTop: areaMensajes.scrollHeight}, 1000);
}

function connectSocket(){
  socket = io.connect();
  socket.emit('solicitarConversaciones');
  
  socket.on('enviarCliente',function(data){
  	id_emisor=data.id_emisor;
    console.log(data);
    if(cabezeraMensaje.dataset.id==id_emisor){
    	agregarMensaje(data);
    }else{// la ventana abierta no es del usuario dueño del mensaje
    	chats=$(".persona");
   		var ban=0;
    	for(i=0;i<chats.length;i++){
    		var c=chats[i];
    		var auxid=c.dataset.id;
    		if(id_emisor==auxid){
    			ban=1;
    			break;
    		}
    	}
    	//nunca ha habado con esa persona
    	if(ban==0){
    		console.log("nuevo mensaje");
    		CargarPersona(id_emisor);

    	}else{
    		console.log("si lo tengo");
    	}


    }
  });

  socket.on('enviarDatosConversacion',function(data){
    //console.log(data);
    if(data.id_dueno==userId){
   		procesarDatosConversacion(data);
   	}
  });

  socket.on('enviarNumeroNoLeido',function(data){
    console.log(data);
    p=$('.persona[data-id='+data.id+']');
    if(p[0].dataset.leido=='no'){
		$('.persona[data-id='+data.id+'] .numeroNotificacionPersona').remove();
	}
	punto=document.createElement("span");
	punto.setAttribute('class','numeroNotificacionPersona');
	
	p[0].setAttribute('data-leido','no');
	punto.innerHTML=data.num;
	p[0].appendChild(punto);
  });

  

}

function focoCajaTexto(){
	leerMensajes(cabezeraMensaje.dataset.id);
	//obtenerNoLeidosBarra();
}


function inicializar(){
	$('.persona').click(mostrarChat);
	$('.regresar').click(regresar);
	//cargarConversaciones();
	$('#conversacion').css("display","none");
	$('#btnEnviar').click(enviarMensaje);
	txtMensaje.addEventListener('click',focoCajaTexto,false);
	connectSocket();
	if(idReceptor!=0){
		console.log("le enviare mensajes a un man");
		CargarPersona(idReceptor);
		personas.classList.remove("visible");
		personas.classList.add("invisible");
		cargarConversacion(idReceptor);
		$('#conversacion').css("display","flex");
	}
	//obtenerNoLeidos();
}







window.addEventListener('load', inicializar, false);