function cargarNotificaciones(){
  window.location.href="notificaciones.html"; 
}

$(document).ready(function () {
	$("#notificaciones").click(function () {
		$("#contenedor_Notificacion").show();
	    $("#sign_box").show();
	    return false;
	});

	$("body").click(function () {
		$("#contenedor_Notificacion").hide();
	    $("#sign_box").hide();
	    return false;
	});

	$("").click(function () {
		$("#contenedor_Notificacion").hide();
	    $("#sign_box").hide();
	    return false;
	});

	$("#mas").click(function () {
		cargarNotificaciones();
	    return false;
	});


});