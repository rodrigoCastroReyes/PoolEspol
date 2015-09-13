var socket;
var usuario;
//Variables para la paginacion
var PageRuta = 0;
var limiteRutas = 1000;
var PageAventon = 0;
var limiteAventon = 1000;

/*Aventon*/
function crearVisualizadorAventon(AventonInfo,appendLast){
  var contenedor=document.createElement('div');
  contenedor.setAttribute('class','VisualizadorRuta');
  if(appendLast){
    contenedor_rutas.appendChild(contenedor);
  }else{
    contenedor_rutas.insertBefore(contenedor,contenedor_rutas.firstChild);
  }
  var menuSuperior=crearMenuSuperior(AventonInfo);
  contenedor.appendChild(menuSuperior);
  var contenedorMapa=document.createElement('div');//mapa
  contenedorMapa.setAttribute('class','VisualizadorRuta-mapa');
  contenedorMapa.setAttribute('id','mapaGoogle2');
  contenedor.appendChild(contenedorMapa);
  var mapOptions = {
    zoom: 15,
    center:new google.maps.LatLng(AventonInfo.ubicacion.x,AventonInfo.ubicacion.y),
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };  
  var map=new google.maps.Map(contenedorMapa,mapOptions);
  var marker= new google.maps.Marker({
    position: new google.maps.LatLng(AventonInfo.ubicacion.x,AventonInfo.ubicacion.y),
    title:'#',
    draggable:false,
    map:map
  });//ubica el punto del aventon dentro del mapaS
  var menuInferior=crearMenuInferior(AventonInfo,false);
  contenedor.appendChild(menuInferior);
}

function aceptarAventon(event){ 
  //se envia una notificacion al solicitante del aventon indicando que el usuario desea llevarlo
  var idAventon=this.getAttribute('data-idaventon');
  var idReceptor=this.getAttribute('data-idpublicador');
  var id=usuario.id;
  var confirmacion={idAventon:idAventon,idEmisor:id,idReceptor:idReceptor}
  console.log(confirmacion);
  socket.emit('aceptarAventon',confirmacion);
}

function procesarAventones(event){
  var respond = JSON.parse(event.target.responseText);
  var aventonesInfo=respond.aventones;
  for(var i=0;i<aventonesInfo.length;i++){
    crearVisualizadorAventon(aventonesInfo[i],true);
    usuario.agregarInfoAventon(aventonesInfo[i]);
  }
}
/*Sockets*/
function connectSocket(){
  socket = io.connect();
  
  socket.on('actualizarRuta',function(infoRuta){
    usuario.agregarInfoRuta(infoRuta);
    crearVisualizadorRuta(infoRuta,false);//se crea el visualizador de la ruta
  });
  
  socket.on('actualizarAventon',function(infoAventon){
    usuario.agregarInfoAventon(infoAventon);
    crearVisualizadorAventon(infoAventon,false);//se crea el visualizador de la ruta, se inserta al inicio
  });

  socket.on('ErrorRuta',function(code){
    switch(code){
      case 0:
        solicitudRepetida("Ya te has unido a esta ruta antes!");
        break;
      case 1:
        solicitudRepetida("No hay capacidad en esta ruta");
        break;
      case 2:
        solicitudRepetida("Este aventon ya ha sido resuelto");
        break;
      case 3:
         solicitudRepetida("Ya haz intentado unirte a esta ruta!");
         break;
    }
  });
  socket.on('AventonAceptado',function(datosUsuario){
    solicitudAventonAceptado(datosUsuario);
  });
}

/*Noticias*/

/**Mensajes de error**/
function solicitudAventonAceptado(datosUsuario){
  var contenedor = document.createElement('div');
  contenedor.setAttribute('id','contenedorerrorRuta');
  contenedor.setAttribute('class','errorRuta');

  var leyenda = document.createElement('div');
  var boton = document.createElement('div');
  boton.setAttribute('class','errorRuta-Boton');
  contenedor.appendChild(leyenda);
  contenedor.appendChild(boton);

  var spanLeyenda = document.createElement('span');
  spanLeyenda.innerHTML = "Haz aceptado llevar a " + datosUsuario.nickname;
  spanLeyenda.setAttribute('class','errorRuta-Titulo');
  leyenda.appendChild(spanLeyenda);

  var spanBoton = document.createElement('span');
  
  spanBoton.addEventListener('click',function(){
    $("#contenedorerrorRuta").remove();
  });

  spanBoton.setAttribute('id','errorRuta-Ok');
  spanBoton.setAttribute('class','icon-checkmark iconos_menu');
  boton.appendChild(spanBoton);
  var rutas=document.getElementById("contenedor_rutas");
  rutas.appendChild(contenedor);

}

function solicitudRepetida(mensaje){
  var contenedor = document.createElement('div');
  contenedor.setAttribute('id','contenedorerrorRuta');
  contenedor.setAttribute('class','errorRuta');

  var leyenda = document.createElement('div');
  var boton = document.createElement('div');
  boton.setAttribute('class','errorRuta-Boton');
  contenedor.appendChild(leyenda);
  contenedor.appendChild(boton);

  var spanLeyenda = document.createElement('span');
  spanLeyenda.innerHTML = mensaje;
  spanLeyenda.setAttribute('class','errorRuta-Titulo');
  leyenda.appendChild(spanLeyenda);

  var spanBoton = document.createElement('span');
  
  spanBoton.addEventListener('click',function(){
    $("#contenedorerrorRuta").remove();
  });

  spanBoton.setAttribute('id','errorRuta-Ok');
  spanBoton.setAttribute('class','icon-checkmark iconos_menu');
  boton.appendChild(spanBoton);
  var rutas=document.getElementById("contenedor_rutas");
  rutas.appendChild(contenedor);
}
/**Mensajes de error**/


$(window).scroll(function(){
if ($(window).scrollTop() == $(document).height() - $(window).height()){
  console.log("final del scroll");
  cargarMapas(null);
  }
});

function auxRutas(event){
  limiteRutas = JSON.parse(event.target.responseText).numPage;
  procesarRutas(event);
}

function auxAventones(event){
  limiteAventon = JSON.parse(event.target.responseText).numPage;
  console.log("Numero de registros", limiteAventon);
  procesarAventones(event);
}

function progreso(event){
  $('#loader-icon').show();
}

function cargarMapas(event){
  $('#loader-icon').show();
  usuario=new Usuario(userid,userNick,userFoto);//se crea un nuevo usuario con la informacion envia desde el server
  //extracion de informacion de rutas
  if(PageRuta < limiteRutas){
    var request = new XMLHttpRequest();
    request.open("GET","/Rutas?page="+PageRuta ,true);
    request.addEventListener('load',auxRutas ,false);
    request.addEventListener('progress',progreso, true );
    request.send(null);
    PageRuta = PageRuta + 1; //incremento la pagina  
  }else{
    console.log("no traigo rutas");
  } 
  //extraer informacion de aventones
  $('#loader-icon').show();
  if(PageAventon < limiteAventon){
    var request_aventones = new XMLHttpRequest();
    request_aventones.open("GET", "/Aventones?page="+PageAventon, true);
    request_aventones.addEventListener('load',auxAventones , false);
    request.addEventListener('progress',progreso, true );
    request_aventones.send(null);
    PageAventon = PageAventon + 1; //incremento la pagina  
  }else{
    console.log("no traigo aventones");
  }
  $('#loader-icon').hide();
  /*Manejadores de enventos de botones del cuadro publicador*/
  btnAceptarAgregar.addEventListener('click',guardarSolicitud,false);
  btnCancelarAgregar.addEventListener('click',cerrarSolicitarRuta,false);
  btnCloseAgregar.addEventListener('click',cerrarSolicitarRuta,false);
}

function inicializar(event){
  limiteAventon = (flag)?1000:0; //verifica si tiene o no tiene carro
  cargarMapas(null);
  connectSocket();
}
google.maps.event.addDomListener(window, 'load', inicializar);
