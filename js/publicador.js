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
	$("#Pantalla_Ruta").css('visibility','visible');
	$("#Pantalla_Ruta").css('opacity','1');
	$("#Pantalla_Ruta").css('top','50%');
  $("#Pantalla_Ruta").css('right','0%');
  $("#Pantalla_Ruta").css('left','0%');
	$("#Contenido_Ruta").addClass('popUp');

  var txtFecha = new Date().toDateInputValue()
  $('#Fecha').val(txtFecha);
  $('#Fecha').attr("min",txtFecha);

  var txtTiempo = obtenerHora();
  console.log(txtTiempo);
  $('#Hora').val(txtTiempo);
  $('#Hora').attr("min",txtTiempo);

}

function eventoCerrar(event){
  	console.log("cerrar");
  	$("#Pantalla_Ruta").css('visibility','hidden');
  	$("#Pantalla_Ruta").css('opacity','0');
  	//$("article").css('opacity','1');
}

function eventoCerrarAventon(event){
    console.log("cerrar");
    $("#Pantalla_Aventon").css('visibility','hidden');
    $("#Pantalla_Aventon").css('opacity','0');
    //$("article").css('opacity','1');
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
  $("#Pantalla_Aventon").css('top','50%');
  $("#Pantalla_Aventon").css('right','0%');
  $("#Pantalla_Aventon").css('left','0%');
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


}

window.addEventListener('load',inicializarCuadro,false);