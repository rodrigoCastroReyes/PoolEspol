

function cerrarBuscarPersona(event){
	var chat=document.getElementById("contenido");
    buscar_persona.style.display="none";
    chat.style.opacity=1;
    txtNick.value="";
    resultados_personas.innerHTML="";
  
}

function mostrarChat2(id){
	personas.classList.remove("visible");
	personas.classList.add("invisible");
	cargarConversacion(id);
	leerMensajes(id);
	$('#conversacion').css("display","flex");
	
	//obtenerNoLeidosBarra();

}


function agregarPersona(event){
	var p=document.querySelectorAll("#personas .persona");
	var id=this.dataset.id;
	var foto= this.dataset.foto;
	var nick= this.dataset.nick;

	for(i=0;i<p.length;i++){
		if(p[i].dataset.id==id){
			cerrarBuscarPersona();
			mostrarChat2(id);
			return;
		}
	}

	div=document.createElement("div");
	div.setAttribute("class","persona");
	div.setAttribute("data-id",id);

	imagen=document.createElement("img");
	imagen.setAttribute("src",foto);
	imagen.setAttribute("class","fotoPerfil");

	informacion=document.createElement("div");
	
	h3=document.createElement("h3");
	h3.innerHTML=nick;
	
	div.appendChild(imagen);
	div.appendChild(h3);
	div.addEventListener('click',mostrarChat);
	personas.appendChild(div);
	cerrarBuscarPersona();
	mostrarChat2(id);

}

function procesarPersonaBusqueda(response){
	var response = event.target.responseText;
	var p = JSON.parse(response);
	console.log(p);
	resultados_personas.innerHTML='';
	if(p.length==0)
		resultados_personas.innerHTML='No Hay Resultados';

	for(i=0;i<p.length;i++){
		div=document.createElement("div");
		div.setAttribute("class","persona");
		div.setAttribute("data-id",p[i].id);
		div.setAttribute("data-nick",p[i].nick);
		div.setAttribute("data-foto",p[i].foto);

		imagen=document.createElement("img");
		imagen.setAttribute("src",p[i].foto);
		imagen.setAttribute("class","fotoPerfil");

		informacion=document.createElement("div");
		
		h3=document.createElement("h3");
		h3.innerHTML='Nick Name: '+p[i].nick;
		informacion.appendChild(h3);
		h3=document.createElement("h3");
		h3.innerHTML='Nombres: '+p[i].nombre;
		informacion.appendChild(h3);
		h3=document.createElement("h3");
		h3.innerHTML='Apellidos: '+p[i].apellidos;
		informacion.appendChild(h3);
		
		

		div.appendChild(imagen);
		div.appendChild(informacion);
		resultados_personas.appendChild(div);
		div.addEventListener('click',agregarPersona);
	}

}


function obtenerPersonaNick(){
	console.log(txtNick.value);
	var request = new XMLHttpRequest();
  	var url="/chat/obtenerPersonaNick?nick="+txtNick.value;
  	request.open("GET",url,true);
  	request.addEventListener('load',procesarPersonaBusqueda ,false);
  	request.send(null);

}

function obtenerPersonaNombre(){
	console.log(txtNick.value);
	var request = new XMLHttpRequest();
  	var url="/chat/obtenerPersonaNombre?nombre="+txtNick.value.toUpperCase();
  	request.open("GET",url,true);
  	request.addEventListener('load',procesarPersonaBusqueda ,false);
  	request.send(null);

}

function obtenerPersonaApellido(){
	console.log(txtNick.value);
	var request = new XMLHttpRequest();
  	var url="/chat/obtenerPersonaApellido?apellido="+txtNick.value.toUpperCase();
  	request.open("GET",url,true);
  	request.addEventListener('load',procesarPersonaBusqueda ,false);
  	request.send(null);

}

function obtenerPersona(){
	if(tipo.value=="nick")
		obtenerPersonaNick();
	else if(tipo.value=="nombre")
		obtenerPersonaNombre();
	else
		obtenerPersonaApellido();
}