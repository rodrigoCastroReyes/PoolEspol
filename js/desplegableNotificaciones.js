var ban=0;
function cargarNotificaciones(){
  window.location.href="notificaciones.html"; 
}

function iniciar () {
	$("#notificaciones").click(function () {
		if(ban==0){
			$("#contenedor_Notificacion").show();
	    	$("#sign_box").show();
	    	ban=1;
	    }else{
	    	$("#contenedor_Notificacion").hide();
	    	$("#sign_box").hide();
	    	ban=0;
	    }
	    return false;
	});
	
	/*
	$("body").click(function () {
		$("#contenedor_Notificacion").hide();
	    $("#sign_box").hide();
	    return false;
	});

	$("").click(function () {
		$("#contenedor_Notificacion").hide();
	    $("#sign_box").hide();
	    return false;
	});*/

	$("#mas").click(function () {
		cargarNotificaciones();
	    return false;
	});
}

window.addEventListener('load',iniciar,false);