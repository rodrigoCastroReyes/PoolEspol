var mapProp;
var hora_referencia;
var marker;




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


function eventoRuta(event){

  mapProp = {
  center:new google.maps.LatLng(-2.201403, -79.917732),
  zoom:15,
  mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
  
  //$("article").css('opacity','0.5');
  $("#contenedor_rutas").css('opacity','0.5');
  $("#Pantalla_Ruta").css('visibility','visible');
  $("#Pantalla_Ruta").css('opacity','1');
  $("#Contenido_Ruta").addClass('popUp');

  //configuracion y validacion de la fecha y hora
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

function eventoCerrar(event){
    console.log("cerrar");
    $("#Pantalla_Ruta").css('visibility','hidden');
    $("#Pantalla_Ruta").css('opacity','0');
    $("#contenedor_rutas").css('opacity','1');
}

function eventoCerrarAventon(event){
    console.log("cerrar");
    $("#Pantalla_Aventon").css('visibility','hidden');
    $("#Pantalla_Aventon").css('opacity','0');
    $("#contenedor_rutas").css('opacity','1');
}


function ubicarMarcador(location, map) {
  if ( marker ) {
    marker.setPosition(location);
  } else {
    marker = new google.maps.Marker({
      position: location,
      map: map
    });
  }
}


function eventoAventon(event){
  mapProp = {
  center:new google.maps.LatLng(-2.201403, -79.917732),
  zoom:15,
  mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  marker = null;
  var map=new google.maps.Map(document.getElementById("googleMap2"),mapProp);
  google.maps.event.addListener(map, 'click', function(event) {
    ubicarMarcador(event.latLng, map);
  });


  $("#Pantalla_Aventon").css('visibility','visible');
  $("#Pantalla_Aventon").css('opacity','1');
  $("#contenedor_rutas").css('opacity','0.5');
  $("#Contenido_Aventon").addClass('popUp');

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

function inicializarCuadro(){
  var btnRuta=document.getElementById("btnRuta");
  btnRuta.addEventListener('click',eventoRuta,false);

  var btnAventon=document.getElementById("btnAventon");
  btnAventon.addEventListener('click',eventoAventon,false);

  var btnCancelar = document.getElementById('btnCancelarRuta');
  btnCancelar.addEventListener('click', eventoCerrar,false);

  var btnClose = document.getElementById('btnClose');
  btnClose.addEventListener('click', eventoCerrar,false);

  var btnCancelarAventon = document.getElementById('btnCancelarAventon');
  btnCancelarAventon.addEventListener('click', eventoCerrarAventon,false);

  var btnCloseAventon = document.getElementById('btnCloseAventon');
  btnCloseAventon.addEventListener('click', eventoCerrarAventon,false);



}

window.addEventListener('load',inicializarCuadro,false);