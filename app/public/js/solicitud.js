/**Solicitud**/
var puntoSolicitud;//punto en donde el usuario solicita que lo lleven

function solicitarRuta(event){
  //evento generado cuando el usuario da click en el + de un visualizador de ruta
  //se levanta un mapa que le permite al usuario seleccionar el punto en donde desea que lo lleven
  var idRuta = this.getAttribute('data-idRuta');
  var rutaActual = usuario.consultarRuta(idRuta);
  var solicitud = usuario.obtenerSolicitud(idRuta);//verifica si ya existe una solicitud para esta ruta
  if(solicitud == null){
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
  var idRuta=this.getAttribute('data-idRuta');//con este idRuta traigo la informacion del id el publicador 
  var ruta = usuario.consultarRuta(idRuta);
  var solicitud = new Solicitud(idRuta, usuario.id, ruta.idPublicador,
                                puntoSolicitud.position.lat(), puntoSolicitud.position.lng());
  //se crea una nueva solicitud para la ruta actual
  usuario.agregarSolicitud(solicitud);//se registra la solicitud del usuario
  console.log(usuario);
  socket.emit('solicitarRuta',solicitud);
  puntoSolicitud=null;
  cerrarSolicitarRuta();
}

function cerrarSolicitarRuta(){
  $("#OpcionAgregar").css('visibility','hidden');
  $("#OpcionAgregar").css('opacity','0');
  $("#contenedor_rutas").css('opacity','1');
}
/**Solicitud**/