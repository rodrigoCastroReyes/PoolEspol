
var hora_referencia;

var puntoAventon;
var miPosicion={};//posicion actual 
var mapRuta;//map 
var mapAventon;
var waypoints=[];//puntos intermedios
var start;//punto inicio de la ruta
var end;//punto final
var firstMarker;//marcador del punto inicial
var directionsService=new google.maps.DirectionsService();
var directionsDisplay;

//objeto usado para almacenar la informacion de una ruta
var infoRuta=new InfoRuta();
var infoAventon=new InfoAventon();

//Geolocalizacion
function queryCoords(){//consulta al navegador si es posible usar geolocation
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(getCoords,errorFound);
      //se obtiene las posiciones actuales
    }else{
      alert("Actualiza tu guevada");
    }
}

function errorFound(error){
    alert("Error has ocurred" + error.code);
    miPosicion.error=true;//indica que hubo un error en la peticion de geolocalizacion
    /* 0: Error desconocido 1: Permiso denegado  2: Posicion no esta disponible  3: Timeout
    */
}

function getCoords(position){
  var lat=position.coords.latitude;
  var lon= position.coords.longitude;
  miPosicion.error=true;
  miPosicion.latitud=lat;
  miPosicion.longitude=lon;
};

/*Rutas*/
//Creacion de rutas
function crearRuta(event){
  //evento generado cuando el usuario hace click en el boton crear ruta del cuadro publicador  
  var posicion=new google.maps.LatLng(miPosicion.latitud,miPosicion.longitude) //se crea un punto en el mapa con mi posicion actual
  
  //muestra el mapa en la pantalla 
  var mapProp = {
    center:posicion,
    zoom:17,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  
  mapRuta=new google.maps.Map(document.getElementById("googleMap"),mapProp);
  
  var marker = new google.maps.Marker({
    position: posicion ,
    animation: google.maps.Animation.DROP,
    map: mapRuta
  });

  //google.maps.event.addListener(marker,'click',borrarMarcador);//si doy click en marker se borra  
  directionsDisplay.setMap(mapRuta);
  google.maps.event.addListener(mapRuta,'click',agregarMarcador);
  //variables para construir la ruta
  start=null
  end=null;
  waypoints=[];
  //css
  $("#contenedor_rutas").css('opacity','0.5');
  $("#Pantalla_Ruta").css('visibility','visible');
  $("#Pantalla_Ruta").css('opacity','1');

  //validaciones
  var txtFecha = new Date().toDateInputValue();
  $('#Fecha').val(txtFecha);
  $('#Fecha').attr('min',txtFecha);

  var txtTiempo = obtenerHora();
  hora_referencia = txtTiempo;
  $('#Hora').val(txtTiempo);

  //validaciones para la hora
  $('#Hora')[0].checkValidity();
  $('#Fecha')[0].checkValidity();

  document.getElementById('Fecha').addEventListener('change', erroresFechaHora, false);
  document.getElementById('Hora').addEventListener('change', erroresFechaHora, false);
}

function cerrarRuta(event){
    directionsDisplay.set('directions', null);
    $("#Pantalla_Ruta").css('visibility','hidden');
    $("#Pantalla_Ruta").css('opacity','0');
    $("#contenedor_rutas").css('opacity','1');
}

function agregarMarcador(event){//Cuando el usuario hace click en el mapa se marca ese punto en la ruta
  if(start==null){
    start=event.latLng;
    firstMarker=new google.maps.Marker({
      position: event.latLng,
      map:mapRuta
    });
    return;
  }else if(end==null){
    firstMarker.setMap(null);
    firstMarker=null;
    end=event.latLng;
  }else{
    waypoints.push({
      location:end,
      stopover:false
    });
    end=event.latLng;
    console.log(end);
  }

  var request={
    origin:start,
    destination:end,
    waypoints:waypoints,
    optimizeWaypoints:true,
    travelMode:google.maps.TravelMode.DRIVING
  }
  directionsService.route(request,function(response,status){
    if(status==google.maps.DirectionsStatus.OK){
      directionsDisplay.setDirections(response);
    }else{
      console.log(status);
    }
  });
}

function borrarMarcador(event){
  this.setMap(null);
}

function guardarRuta(){
  var valid=document.forms["formRuta"].checkValidity();
  if(valid){
    guardarPuntos();
    guardarDatos();
    //se envia los datos al servidor
    socket.emit('nuevaRuta',infoRuta);
    //document.forms["formRuta"].submit();
    console.log(infoRuta);
    cerrarRuta();//se cierra el cuadro publicador de ruta
    infoRuta={};//se reinicia infoRuta
    infoRuta.publicador;
    infoRuta.fecha;
    infoRuta.hora;
    infoRuta.precio;
    infoRuta.capacidad;
    infoRuta.ruta=[];
  }
}

function guardarPuntos(){
  var ruta=directionsDisplay.getDirections().routes[0];
  var leg=ruta.legs[0];
  /*routes: An array of DirectionsRoutes, 
  each of which contains information about the legs and steps of which it is composed.*/
  /*
  legs:An array of DirectionsLegs, 
  each of which contains information about the steps of which it is composed
  */
  var end_route=leg.end_location;
  var start_route=leg.start_location;
  var waypoints_route=leg.via_waypoints;
  infoRuta.ruta.push({'x':start_route.lat(),'y':start_route.lng()});
  for(var i=0;i<waypoints_route.length;i++){
    var middle_route=waypoints_route[i];
    infoRuta.ruta.push({'x':middle_route.lat(),'y':middle_route.lng()});
  }
  infoRuta.ruta.push({'x':end_route.lat(),'y':end_route.lng()});
}

function guardarDatos(){
  infoRuta.publicador=nickname.innerHTML;
  infoRuta.urlNickname="imagenes/oswaldo.jpg";
  infoRuta.capacidad=parseInt(RutaCapacidad.value);
  infoRuta.precio=parseFloat(RutaCosto.value);
  infoRuta.fecha=Fecha.value;
  infoRuta.hora=Hora.value;
}
/****/

/*Aventon*/
function crearAventon(event){
  var posicion=new google.maps.LatLng(miPosicion.latitud,miPosicion.longitude) //se crea un punto en el mapa con mi posicion actual

  var mapProp = {
    center:posicion,
    zoom:17,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };

  mapAventon=new google.maps.Map(document.getElementById("googleMap2"),mapProp);
 
  var marker = new google.maps.Marker({
    position: posicion,
    animation: google.maps.Animation.DROP,
    map: mapAventon
  });

  google.maps.event.addListener(mapAventon, 'click', function(event) {
    marcarAventon(event.latLng, mapAventon);
  });

  $("#contenedor_rutas").css('opacity','0.5');
  $("#Pantalla_Aventon").css('visibility','visible');
  $("#Pantalla_Aventon").css('opacity','1');

  //configuracion y validacion de fecha y hora
  var txtFecha = new Date().toDateInputValue();
  $('#Fecha_Aventon').val(txtFecha);
  $('#Fecha_Aventon').attr('min',txtFecha);

  var txtTiempo = obtenerHora();
  hora_referencia = txtTiempo;
  $('#Hora_Aventon').val(txtTiempo);

  //validaciones para la hora
  $('#Hora_Aventon')[0].checkValidity();
  $('#Fecha_Aventon')[0].checkValidity();

  document.getElementById('Fecha_Aventon').addEventListener('change', erroresFechaHoraAventon, false);
  document.getElementById('Hora_Aventon').addEventListener('change', erroresFechaHoraAventon, false);  
}

function guardarAventon(){
  var valid=document.forms["formAventon"].checkValidity();
  if(valid){
    infoAventon.publicador=nickname.innerHTML;
    infoAventon.urlNickname="imagenes/oswaldo.jpg"
    infoAventon.fecha=Fecha_Aventon.value;
    infoAventon.hora=Hora_Aventon.value;
    infoAventon.ubicacion={
      'x': puntoAventon.position.lat(),
      'y': puntoAventon.position.lng()
    }
    socket.emit('nuevoAventon',infoAventon);
    cerrarAventon();
    puntoAventon=null;
    infoAventon={};//se reinicia el objeto infoAventon
    infoAventon.publicador;
    infoAventon.fecha;
    infoAventon.hora;
    infoAventon.ubicacion={};
  }
}

function cerrarAventon(event){
    $("#Pantalla_Aventon").css('visibility','hidden');
    $("#Pantalla_Aventon").css('opacity','0');
    $("#contenedor_rutas").css('opacity','1');
}

function marcarAventon(location, map) {//marca el punto del aventon en el mapa
  if ( puntoAventon ) {
    puntoAventon.setPosition(location);
  } else {
    puntoAventon = new google.maps.Marker({
      position: location,
      map: map
    });
  }
}

/****/

//validaciones 
Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});


function obtenerHora(){
  var d = new Date();
  var hora = d.getHours();
  var minuto = d.getMinutes();
  var txtHora = (hora<10)?("0" + hora):(hora);
  var txtMinuto = (minuto<10)?("0" + minuto):(minuto);
  return txtHora + ":" + txtMinuto;
}

function erroresFechaHora(event){
  var hora = document.getElementById('Hora'); 
  var fecha = document.getElementById('Fecha');
  var txtFecha = new Date().toDateInputValue();

  if(Date.parse(fecha.value) == Date.parse(txtFecha)){
      var horaString1 = hora.value;
      var horaString2 = hora_referencia;

      var aa1 = horaString1.split(":");
      var aa2 = horaString2.split(":");
     
      if(aa1[0]< aa2[0] || (aa1[1] < aa2[1]) ){
          hora.setCustomValidity("La hora debe ser mayor o igual que la actual");
      }
      else{
        hora.setCustomValidity("");
      }
  }
  else{
    fecha.setCustomValidity('');
    hora.setCustomValidity('');
  }

}

function erroresFechaHoraAventon(event){
  var hora = document.getElementById('Hora_Aventon'); 
  var fecha = document.getElementById('Fecha_Aventon');
  var txtFecha = new Date().toDateInputValue();

  if(Date.parse(fecha.value) == Date.parse(txtFecha)){
      var horaString1 = hora.value;
      var horaString2 = hora_referencia;

      var aa1 = horaString1.split(":");
      var aa2 = horaString2.split(":");
     
      if(aa1[0]< aa2[0] || (aa1[1] < aa2[1]) ){
          hora.setCustomValidity("La hora debe ser mayor o igual que la actual");
      }
      else{
        hora.setCustomValidity("");
      }
  }
  else{
    fecha.setCustomValidity('');
    hora.setCustomValidity('');
  }

}

function inicializar(){
  btnRuta.addEventListener('click',crearRuta,false);
  btnCancelarRuta.addEventListener('click', cerrarRuta,false);
  btnClose.addEventListener('click', cerrarRuta,false);

  btnAventon.addEventListener('click',crearAventon,false);
  btnCancelarAventon.addEventListener('click', cerrarAventon,false);
  btnCloseAventon.addEventListener('click', cerrarAventon,false);
  
  var rendererOptions = {
    draggable: true,
    suppressMarkers:false,
    preserveViewport:true,
    markerOptions:{
      draggable: true
    }
  };
  directionsDisplay=new google.maps.DirectionsRenderer(rendererOptions);
  queryCoords();
  btnAceptarRuta.addEventListener('click',guardarRuta,false);
  btnAceptarAventon.addEventListener('click',guardarAventon,false);
}


window.addEventListener('load',inicializar,false);