var mapProp;

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

  var txtFecha = new Date().toDateInputValue()
  $('#Fecha').val(txtFecha);
  $('#Fecha').attr('min',txtFecha);

  var txtTiempo = obtenerHora();
  console.log(txtTiempo);
  $('#Hora').val(txtTiempo);
  $('#Hora').attr('min', txtTiempo);
  //validaciones para la hora
  $('#Hora')[0].checkValidity();


  document.getElementById('Hora').addEventListener('invalid', function() {
    console.log("Error");

}, false);

  document.getElementById('Hora').addEventListener('focusout', function(event) {
      console.log("Change");
      var hora = event.target; 
      var fecha = document.getElementById('Fecha');
      if(Date.parse(fecha.value) > Date.parse(txtFecha)){
          console.log("If")
          hora.min = "00:00";
      }

  }, false);

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


function eventoAventon(event){
  mapProp = {
  center:new google.maps.LatLng(-2.201403, -79.917732),
  zoom:15,
  mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap2"),mapProp);
  //$("article").css('opacity','0.5');
  $("#Pantalla_Aventon").css('visibility','visible');
  $("#Pantalla_Aventon").css('opacity','1');
  $("#contenedor_rutas").css('opacity','0.5');
  $("#Contenido_Aventon").addClass('popUp');

  var txtFecha = new Date().toDateInputValue()
  $('#Fecha_Aventon').val(txtFecha);
  $('#Fecha_Aventon').attr("min",txtFecha);


  var txtTiempo = obtenerHora();
  console.log(txtTiempo);
  $('#Hora_Aventon').val(txtTiempo);
  $('#Hora_Aventon').attr("min",txtTiempo);
}

function inicializarCuadro(){
	var btnRuta=document.getElementById("btnRuta");
	btnRuta.addEventListener('click',eventoRuta,false);

	var btnAventon=document.getElementById("btnAventon");
	btnAventon.addEventListener('click',eventoAventon,false);

	var btnCancelar = document.getElementById('btnCancelar');
	btnCancelar.addEventListener('click', eventoCerrar,false);

	var btnClose = document.getElementById('btnClose');
	btnClose.addEventListener('click', eventoCerrar,false);

  var btnCancelarAventon = document.getElementById('btnCancelarAventon');
  btnCancelarAventon.addEventListener('click', eventoCerrarAventon,false);

  var btnCloseAventon = document.getElementById('btnCloseAventon');
  btnCloseAventon.addEventListener('click', eventoCerrarAventon,false);

  var btnAceptar = document.getElementById('btnAceptar');
  btnAceptar.addEventListener('click', function(event){
    console.log("checkValidity");
    $('#Hora')[0].checkValidity();

  }, false);


}

window.addEventListener('load',inicializarCuadro,false);