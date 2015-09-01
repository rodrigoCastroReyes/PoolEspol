var socket;

var flag = false;
var usuario;
var puntoSolicitud;//Solicitud

//Variables para la paginacion
var PageRuta = 0;
var limiteRutas = 1000;
var PageAventon = 0;
var limiteAventon = 1000;


/*Aventon*/
function crearVisualizadorAventon(AventonInfo){
  var contenedor=document.createElement('div');
  contenedor.setAttribute('class','VisualizadorRuta');
  contenedor_rutas.insertBefore(contenedor,contenedor_rutas.firstChild);

  var menuSuperior=crearMenuSuperior(AventonInfo);
  contenedor.appendChild(menuSuperior);

  //mapa
  var contenedorMapa=document.createElement('div');
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
  });//ubica el punto del aventon dentro del mapa

  var menuInferior=crearMenuInferior(AventonInfo,false);
  contenedor.appendChild(menuInferior);
}

function crearVisualizadorAventon2(AventonInfo){
  var contenedor=document.createElement('div');
  contenedor.setAttribute('class','VisualizadorRuta');
  contenedor_rutas.appendChild(contenedor,contenedor_rutas.firstChild);

  var menuSuperior=crearMenuSuperior(AventonInfo);
  contenedor.appendChild(menuSuperior);

  //mapa
  var contenedorMapa=document.createElement('div');
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
  });//ubica el punto del aventon dentro del mapa

  var menuInferior=crearMenuInferior(AventonInfo,false);
  contenedor.appendChild(menuInferior);
}

function aceptarAventon(event){
  //se envia una notificacion al solicitante del aventon que el usuario desea llevarlo
  var idAventon=this.getAttribute('data-idaventon');
  var idReceptor=this.getAttribute('data-idpublicador');
  var id=usuario.id;
  var confirmacion={idAventon:idAventon,idEmisor:id,idReceptor:idReceptor}
  console.log(confirmacion);
  socket.emit('aceptarAventon',confirmacion);
}

/*Solicitud*/
function solicitarRuta(event){
  //evento generado cuando el usuario da click en el + de un visualizador de ruta
  //se levanta un mapa que le permite al usuario seleccionar el punto en donde desea que lo lleven
  var idRuta=this.getAttribute('data-idRuta');
  var rutaActual=usuario.consultarRuta(idRuta);
  var solicitud=usuario.obtenerSolicitud(idRuta);//verifica si ya existe una solicitud para esta ruta
  if(rutaActual!=null){
    $("#contenedor_rutas").css('opacity','0.5');
    $("#OpcionAgregar").css('visibility','visible');
    $("#OpcionAgregar").css('opacity','1');
    btnAceptarAgregar.setAttribute('data-idRuta',idRuta);//guarda el id de la ruta en el boton aceptar
    var contenedor=document.getElementById('MapaAgregar');
    var mapOptions = {
      zoom: 14,
      center:new google.maps.LatLng(rutaActual.ruta[0].x,rutaActual.ruta[0].y),
      mapTypeId:google.maps.MapTypeId.ROADMAP
    };

    var map=crearMapa(rutaActual,contenedor)
    google.maps.event.addListener(map, 'click', function(event) {
        marcarPunto(event.latLng,map);
    });
    //se crea una nueva solicitud para la ruta actual
    usuario.agregarSolicitud(idRuta,this.getAttribute('data-idPublicador'));
  }
}

function marcarPunto(location, map) {//marca el punto en donde un usuario espera que lo lleven en el mapa de la ruta de otro usuario
  if ( puntoSolicitud ) {
    puntoSolicitud.setPosition(location);
  } else {
    //ha que validar distancia: debe estar entre un rango definido
    puntoSolicitud = new google.maps.Marker({
      position: location,
      map: map
    });
  }
}

function guardarSolicitud(event){
  var idRuta=this.getAttribute('data-idRuta');
  var solicitud=usuario.obtenerSolicitud(idRuta);//se agregan campos faltantes
  solicitud.latitud=puntoSolicitud.position.lat();
  solicitud.longitud=puntoSolicitud.position.lng();
  socket.emit('solicitarRuta',solicitud);
  puntoSolicitud=null;
  cerrarSolicitarRuta();
}

function cerrarSolicitarRuta(){
    $("#OpcionAgregar").css('visibility','hidden');
    $("#OpcionAgregar").css('opacity','0');
    $("#contenedor_rutas").css('opacity','1');
}

/*****/
function procesarAventones(event){
  var respond = JSON.parse(event.target.responseText);
  var aventonesInfo=respond.aventones;
  for(var i=0;i<aventonesInfo.length;i++){
    crearVisualizadorAventon2(aventonesInfo[i]);
    usuario.agregarInfoAventon(aventonesInfo[i]);
  }
}



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
  //se crea un nuevo usuario con la informacion envia desde el server
  $('#loader-icon').show();
  usuario=new Usuario(userid,userNick,userFoto);
  //extracion de informacion de rutas
  if(PageRuta < limiteRutas){
    var request = new XMLHttpRequest();
    request.open("GET","/Rutas?page="+PageRuta ,true);
    request.addEventListener('load',auxRutas ,false);
    request.addEventListener('progress',progreso, true );
    request.send(null);
    PageRuta = PageRuta+ 1; //incremento la pagina  
  }
  else{
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
    PageAventon = PageAventon+ 1; //incremento la pagina  
  }else{
    console.log("no traigo aventones");
  }
  $('#loader-icon').hide();
  /*Manejadores de enventos de botones*/
  btnAceptarAgregar.addEventListener('click',guardarSolicitud,false);
  btnCancelarAgregar.addEventListener('click',cerrarSolicitarRuta,false);
  btnCloseAgregar.addEventListener('click',cerrarSolicitarRuta,false);
}

function incializar(event){
    cargarMapas(null);
    connectSocket();
}

function connectSocket(){
  socket = io.connect();
  
  socket.on('actualizarRuta',function(infoRuta){
    usuario.agregarInfoRuta(infoRuta);
    crearVisualizadorRuta(infoRuta);//se crea el visualizador de la ruta
  });
  
  socket.on('actualizarAventon',function(infoAventon){
    usuario.agregarInfoRuta(infoRuta);
    crearVisualizadorAventon(infoAventon);//se crea el visualizador de la ruta
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


$(window).scroll(function(){
if ($(window).scrollTop() == $(document).height() - $(window).height()){
  console.log("final del scroll");
  cargarMapas(null);
  }
});

google.maps.event.addDomListener(window, 'load', incializar);
