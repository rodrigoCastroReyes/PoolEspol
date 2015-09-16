/**Solicitud**/
var puntoSolicitud;//punto en donde el usuario solicita que lo lleven
var error=false;

function solicitarRuta(event){
  //evento generado cuando el usuario da click en el + de un visualizador de ruta
  //se levanta un mapa que le permite al usuario seleccionar el punto en donde desea que lo lleven
  var idRuta = this.getAttribute('data-idRuta');
  var rutaActual = usuario.consultarRuta(idRuta);
  var solicitud = usuario.obtenerSolicitud(idRuta);//verifica si ya existe una solicitud para esta ruta
  if(rutaActual !=null && solicitud == null){
    $("#contenedor_rutas").css('opacity','0.5');
    $("#OpcionAgregar").css('visibility','visible');
    $("#OpcionAgregar").css('opacity','1');    
    btnAceptarAgregar.setAttribute('data-idRuta',idRuta);//guarda el id de la ruta en el boton aceptar
    var contenedor = document.getElementById('MapaAgregar');
    var mapOptions = {
      zoom: 14,
      center:new google.maps.LatLng(rutaActual.ruta[0].x,rutaActual.ruta[0].y),
      mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map = crearMapa(rutaActual,contenedor)
    google.maps.event.addListener(map, 'click', function(event) {
      solicitudMarcar(event.latLng,map);
    });
  }else{
    solicitudRepetida("Ya has intentado unirte a esta ruta antes!");
  }
}

function solicitudMarcar(location, map) {
  //marca el punto en donde un usuario espera que lo lleven en el mapa de la ruta de otro usuario
  if ( puntoSolicitud ) {
    puntoSolicitud.setPosition(location);
  } else {
    //hay que validar distancia: debe estar entre un rango definido
    puntoSolicitud = new google.maps.Marker({
      position: location,
      map: map
    });
  }
}

function guardarSolicitud(event){
  var from = new google.maps.LatLng(puntoSolicitud.position.lat(),puntoSolicitud.position.lng());
  var to;
  var idRuta=this.getAttribute('data-idRuta');//con este idRuta traigo la informacion del id el publicador 
  var infoRuta = usuario.consultarRuta(idRuta);
  var distancias = [];
  var flag =false;

  for(i=0 ; i< infoRuta.ruta.length;i++){
    to =  new google.maps.LatLng(infoRuta.ruta[i].x,infoRuta.ruta[i].y);
    var dist = google.maps.geometry.spherical.computeDistanceBetween(from, to);
    distancias.push(dist);
  }

  for(i=0; i < distancias.length;i++){
    if(distancias[i]<250){
      flag=true;
      break;
    }
  }
  flag = true;
  if(flag){
    var solicitud = new Solicitud(idRuta, usuario.id, infoRuta.idPublicador.toString(),
                                  puntoSolicitud.position.lat(), puntoSolicitud.position.lng());
    //se crea una nueva solicitud para la ruta actual
    usuario.agregarSolicitud(solicitud);//se registra la solicitud del usuario
    socket.emit('solicitarRuta',solicitud);
    cerrarSolicitarRuta();
  }else{
    errorSolicitud("Ubica un punto mas cercano a la ruta!");
    $('#btnAceptarAgregar').attr("disabled", true);
    $('#btnCancelarAgregar').attr("disabled", true);
    $('#btnCloseAgregar').attr("disabled", true);
    error = true;
  }
}

function cerrarSolicitarRuta(){
  $("#OpcionAgregar").css('visibility','hidden');
  $("#OpcionAgregar").css('opacity','0');
  $("#contenedor_rutas").css('opacity','1');
  puntoSolicitud=null;
}

function errorSolicitud(mensaje){
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
    $('#btnAceptarAgregar').attr("disabled", false);
    $('#btnCancelarAgregar').attr("disabled", false);
    $('#btnCloseAgregar').attr("disabled", false);
    error = false;
  });

  spanBoton.setAttribute('id','errorRuta-Ok');
  spanBoton.setAttribute('class','icon-checkmark iconos_menu');
  boton.appendChild(spanBoton);
  var cont=document.getElementById("OpcionAgregar");
  cont.appendChild(contenedor);
}

/**Solicitud**/