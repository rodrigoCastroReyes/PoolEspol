//visualizador.js: contiene todo los necesario para dibujar el visualizador de una ruta y un aventon

//crea un div con las opciones del menu superior del visualizador de ruta
var IDruta = -1;


function errorFound(error){
  alert("Error has ocurred" + error.code);/* 0: Error desconocido 1: Permiso denegado  2: Posicion no esta disponible  3: Timeout */
}

function cerrarInfoRuta(){
  $("#contenedor_rutas").css('opacity','1');
  $("#infoRuta").css('visibility','hidden');
  $("#infoRuta").css('opacity','0');
}

function cronologiaRuta(response,day){
	var list = [];
	var rows = response.rows;
	var element;
	var container = document.createElement('div');
	var span = document.createElement('span');
	span.innerHTML = " " + moment(day).format("DD/MMM/YYYY, h:mm:ss a");
	container.appendChild(span);
	list.push(container);
    var seconds = 0;
	for(var i in rows){
		element = rows[i].elements[i];
		container = document.createElement('div');
		span = document.createElement('span');
		seconds = element.duration.value + seconds;
		var newday = moment(day).add(seconds,'seconds');
		span.innerHTML = " " + moment(newday).format("DD/MMM/YYYY, h:mm:ss a");
		container.appendChild(span);
		list.push(container);
	}
	return list;
}

function calcularDistancia(response){
	var total = 0 ;
	for(var i in response.rows){
		total = response.rows[i].elements[i].distance.value + total;
	}
	return total;
}

function calcularDuracion(response){
	var total = 0 ;
	for(var i in response.rows){
		total = response.rows[i].elements[i].duration.value + total;
	}
	return total;
}


function mostrarResumen(response){
	var contDist= document.getElementById("infoRuta-distancia");
	$("#infoRuta-distancia").empty();
	contDist.setAttribute('class','rutas-titulo');
	contDist.innerHTML = "Distancia de la ruta: ";
	var contDur= document.getElementById("infoRuta-duracion");
	$("#infoRuta-duracion").empty();
	contDur.setAttribute('class','rutas-titulo');
	contDur.innerHTML = "Duracion de la ruta: ";

	var span = document.createElement('span');
	span.setAttribute('class','estadistica-resultado');
	span.innerHTML =  calcularDistancia(response)/100 + " km";
	contDist.appendChild(span);

	span = document.createElement('span');
	span.setAttribute('class','estadistica-resultado');
	span.innerHTML = Math.ceil(calcularDuracion(response)/60) + " min";
	contDur.appendChild(span);
}


function mostrarInfoRuta(response,status,infoRuta){
    if(status=="OK") {
    	var ruta = infoRuta.ruta;
    	var day = moment(infoRuta.fecha + " " + infoRuta.hora, "DD-MM-YYYY HH:mm:ss")
        mostrarResumen(response);
        var infoWindowContent= cronologiaRuta(response,day);

        var mapOptions = {
          zoom: 15,
          center:new google.maps.LatLng(ruta[0].x,ruta[0].y),
          mapTypeId:google.maps.MapTypeId.ROADMAP
        };

       	var contenedorMapa = document.getElementById("mapaInfoRuta");
        var newMap = new google.maps.Map(contenedorMapa,mapOptions);//se crea el mapa
        var path = []
        for(var i=0; i< ruta.length - 1 ; i++){
        	path.push( { location: { lat: ruta[i].x , lng : ruta[i].y } , stopover: true  } );
        }
        var directionsDisplay=new google.maps.DirectionsRenderer({
            map: newMap,
            markerOptions: {
            	visible : false
            },
            polylineOptions:{
              strokeColor: "#0080FB"
            }
        });
	    var directionsService = new google.maps.DirectionsService();
	    var request = {
	        origin: { lat: ruta[0].x , lng : ruta[0].y },
	        waypoints: path,
	        destination: { lat: ruta[ruta.length -1].x , lng : ruta[ruta.length -1].y },
	        optimizeWaypoints: true,
	        travelMode:google.maps.TravelMode.DRIVING
	    }
	    directionsService.route(request,function(response,status){
            if(status==google.maps.DirectionsStatus.OK){
              	directionsDisplay.setDirections(response);
              	for(var i in ruta){
              		var marker= new google.maps.Marker({
					    position: { lat: ruta[i].x , lng : ruta[i].y },
					    draggable:false,
					    map:newMap
					});
					marker.indice = i;
					marker.addListener('click', function() {
						var contentString = "";
						var infowindow = new google.maps.InfoWindow({
						    content: infoWindowContent[this.indice]
						});
						infowindow.open(newMap,this);
					});
              	}
            }
        });
   } else {
    	alert("Error: " + status);
    }
}

function obtenerInfoRuta(event){
  var idRuta = this.getAttribute('data-idruta');
  var infoRuta = usuario.consultarRuta(idRuta);
  $("#contenedor_rutas").css('opacity','0.5');
  $("#infoRuta").css('visibility','visible');
  $("#infoRuta").css('opacity','1');
  var service = new google.maps.DistanceMatrixService();
  var origins = [];
  var destinations = [];
  for (var i = 0 ; i < infoRuta.ruta.length - 1 ; i++){
    origins.push({ lat: infoRuta.ruta[i].x , lng: infoRuta.ruta[i].y });
  }
  for (var i = 1 ; i < infoRuta.ruta.length ; i++){
    destinations.push({ lat: infoRuta.ruta[i].x , lng: infoRuta.ruta[i].y });
  }
  service.getDistanceMatrix({ origins: origins, destinations: destinations,
    travelMode: google.maps.TravelMode.DRIVING
	},
    function(response,status){
    	mostrarInfoRuta(response,status,infoRuta);
    });
}

function cerrarInfoAventon(){
  $("#contenedor_rutas").css('opacity','1');
  $("#infoAventon").css('visibility','hidden');
  $("#infoAventon").css('opacity','0');
}

function obtenerInfoAventon(event){
  var idAventon = this.getAttribute('data-idAventon');
  var lat = this.getAttribute('data-Lat');
  var lon = this.getAttribute('data-Long');
  var aventon = new punto(lat,lon);
  //Geolocalizacion
  var posicionActual={};
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
      function(position){
        posicionActual=new punto(position.coords.latitude.toString(),position.coords.longitude.toString());
        $("#contenedor_rutas").css('opacity','0.5');
        $("#infoAventon").css('visibility','visible');
        $("#infoAventon").css('opacity','1');

        var from = new google.maps.LatLng(parseFloat(aventon.x),parseFloat(aventon.y));
        var to =  new google.maps.LatLng(parseFloat(posicionActual.x),parseFloat(posicionActual.y));
        var dist = google.maps.geometry.spherical.computeDistanceBetween(from, to);

        var RutaInfo = {};
        RutaInfo.ruta = [];
        RutaInfo.ruta.push(posicionActual);
        RutaInfo.ruta.push(aventon);

        var contDistancia = document.getElementById("infoAventon-distancia");
        $("#contDistancia").empty();
        contDistancia.setAttribute("class","rutas-titulo");
        contDistancia.innerHTML = "Distancia en km : ";
        var span = document.createElement('span');
        span.setAttribute('class','estadistica-resultado');
        span.innerHTML =  parseFloat(dist/100).toFixed(2);
        contDistancia.appendChild(span);

        var contenedorMapa = document.getElementById("mapaInfoAventon");
        crearMapa(RutaInfo,contenedorMapa);
      },
    errorFound);//se obtiene las posiciones actuales  
  }else{
    alert("Actualiza el navegador");
  }
}

function crearMenuSuperior(RutaInfo, miRuta, infoPerfil ){
  var menuSuperior=document.createElement('div');
  menuSuperior.setAttribute('class','VisualizadorRuta-menu u-menu_superior');
  
  if(!miRuta){//si no es mi ruta
    //contenedor de informacion del usuario
    var infoUsuario=document.createElement('div');
    infoUsuario.setAttribute('class','VisualizadorRuta-opcion u-flex_start');
    //foto del usurio
    var foto=document.createElement('img');
    foto.setAttribute('data-idpublicador',RutaInfo["idPublicador"]);
    foto.setAttribute('class','nickname u-cursor_pointer');
    if(infoPerfil){
      foto.addEventListener('click',obtenerInfoUsuario,false);
    }else{
      foto.setAttribute('data-idAventon',RutaInfo["idAventon"]);
      //foto.addEventListener('click',obtenerInfoAventon,false);
    }

    foto.setAttribute('src', RutaInfo['urlNickname']);
    //nick name del usuario
    var nickname=document.createElement('span');
    nickname.setAttribute('class','VisualizadorRuta-info');
    nickname.innerHTML=RutaInfo["publicador"];
    infoUsuario.appendChild(foto); 
    infoUsuario.appendChild(nickname);
      //contenedor de opcion de mensajes
    var infoMensajes=document.createElement('div');
    infoMensajes.setAttribute('class','VisualizadorRuta-opcion u-flex_end');
    //icono de mensajes
    var iconoMensaje=document.createElement('span');
    iconoMensaje.setAttribute('class','icon-mail4  VisualizadorRuta-info u-cursor_pointer');
    iconoMensaje.setAttribute('data-idpublicador',RutaInfo["idPublicador"]);
    iconoMensaje.addEventListener('click',clickMensaje,false);
    //texto: Mensajes
    var mensaje=document.createElement('span');
    mensaje.setAttribute('class','VisualizadorRuta-info');
    mensaje.innerHTML="Mensajes";
    infoMensajes.appendChild(iconoMensaje);  infoMensajes.appendChild(mensaje);

    menuSuperior.appendChild(infoUsuario); menuSuperior.appendChild(infoMensajes);
  }else{
    var infoEliminar=document.createElement('div');
    infoEliminar.setAttribute('class','VisualizadorRuta-opcion u-flex_end');
    var iconoEliminar=document.createElement('span');
    iconoEliminar.setAttribute('class','icon-bin  VisualizadorRuta-info u-cursor_pointer');
    iconoEliminar.setAttribute('data-idruta',RutaInfo["idRuta"]);
    iconoEliminar.addEventListener('click', clickEliminar, false);
    //texto: Mensajes
    var eliminar=document.createElement('span');
    eliminar.setAttribute('class','VisualizadorRuta-info');
    eliminar.innerHTML="Eliminar";
    infoEliminar.appendChild(iconoEliminar);  
    infoEliminar.appendChild(eliminar);
    menuSuperior.appendChild(infoEliminar); 
  }
  return menuSuperior;
}

//crea un div con las opciones del menu inferior del visualizador de ruta
function crearMenuInferior(RutaInfo,opcionesRuta,miRuta,mostrarInfoRuta){
  //menu inferior
  var menuInferior=document.createElement('div');
  menuInferior.setAttribute('class','VisualizadorRuta-menu u-menu_inferior');

  if(!miRuta){//mostrar opcion +  cuando la ruta no pertenezca al usuario
    var infoAgregar=document.createElement('div');
    infoAgregar.setAttribute('class','VisualizadorRuta-opcion u-flex_start');
    var iconoAgregar=document.createElement('span');
    iconoAgregar.setAttribute('data-idPublicador',RutaInfo["idPublicador"]);//idPublicador: dueño de la ruta
    iconoAgregar.setAttribute('class','VisualizadorRuta-info icon-plus u-cursor_pointer');
    iconoAgregar.addEventListener('click',solicitarRuta,false);
    infoAgregar.appendChild(iconoAgregar);   
    menuInferior.appendChild(infoAgregar);
  }

  var infoHorario=document.createElement('div');
  infoHorario.setAttribute('class','info-horario u-flex_center');
  var horario=document.createElement('span');
  horario.innerHTML= RutaInfo["fecha"]+" - "+RutaInfo["hora"]
  infoHorario.appendChild(horario);
  menuInferior.appendChild(infoHorario)

  if(opcionesRuta){//visualizador ruta
    if(!miRuta){
      iconoAgregar.setAttribute('data-idRuta',RutaInfo["idRuta"]);
    }
    var contRuta=document.createElement('div');
    contRuta.setAttribute('class','VisualizadorRuta-opcion u-flex_end');
    //precio de la ruta
    var precio=document.createElement('span');
    precio.setAttribute('class','VisualizadorRuta-info');
    precio.innerHTML=RutaInfo["precio"];
    //icono Ruta
    var iconoRuta=document.createElement('span');
    iconoRuta.setAttribute('class','icon-user VisualizadorRuta-info u-cursor_pointer');
    iconoRuta.setAttribute('data-idruta',RutaInfo["idRuta"]);

    if(!miRuta){
      iconoRuta.addEventListener('click',mostrarPasajeros,false);
    }
    else{
      iconoRuta.addEventListener('click',mostrarPasajerosEnMapa,false);
    }
    //capacidad de la ruta
    var capacidad = document.createElement('span');
    capacidad.setAttribute('class','VisualizadorRuta-info');
    capacidad.innerHTML = RutaInfo["capacidad"];
    contRuta.appendChild(precio);
    contRuta.appendChild(iconoRuta);
    contRuta.appendChild(capacidad);
    if(mostrarInfoRuta ){
	    //mostrar la opcion : informacion de ruta
	    var iconoInfoRuta = document.createElement('span');
	    iconoInfoRuta.setAttribute('class','VisualizadorRuta-info icon-location u-cursor_pointer');
	    iconoInfoRuta.setAttribute('data-idruta',RutaInfo["idRuta"]);
	    iconoInfoRuta.addEventListener('click',obtenerInfoRuta,false);
	    contRuta.appendChild(iconoInfoRuta);
    }
    menuInferior.appendChild(contRuta);
  }else{//visualizador aventon
    iconoAgregar.setAttribute('data-idAventon',RutaInfo["idAventon"]);
    iconoAgregar.addEventListener('click',aceptarAventon,false);

    var masInfoAventon = document.createElement('div');
    masInfoAventon.setAttribute('class','VisualizadorRuta-opcion u-flex_end');
    
    var iconoInfoAventon = document.createElement('span');
    iconoInfoAventon.setAttribute('class','VisualizadorRuta-info icon-location u-cursor_pointer');
    iconoInfoAventon.setAttribute('data-idAventon',RutaInfo["idAventon"]);
    iconoInfoAventon.setAttribute('data-Lat',RutaInfo["ubicacion"].x);
    iconoInfoAventon.setAttribute('data-Long',RutaInfo["ubicacion"].y);
    iconoInfoAventon.addEventListener('click',obtenerInfoAventon,false);
    masInfoAventon.appendChild(iconoInfoAventon);
    menuInferior.appendChild(masInfoAventon);
  }
  return menuInferior;
}


function crearMapa(RutaInfo,contenedorMapa){//en ruta Info viene la informacion de la ruta
  //opciones del mapa
  var mapOptions = {
    zoom: 15,
    center:new google.maps.LatLng(RutaInfo.ruta[0].x,RutaInfo.ruta[0].y),
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var newMap = new google.maps.Map(contenedorMapa,mapOptions);//se crea el mapa
  colocarMarcadores(newMap,RutaInfo.ruta);//se colocan los puntos sobre el mapa
  return newMap;
}

function colocarMarcadores(map, puntos){
  var waypoints = [];
  for (var i = 1; i < puntos.length-1; i++){
    var coordenada = puntos[i];
    var position = new google.maps.LatLng(coordenada.x, coordenada.y);
    waypoints.push({location : position, stopover:false });
  }
  var request={
    origin: new google.maps.LatLng(puntos[0].x, puntos[0].y),
    destination: new google.maps.LatLng(puntos[puntos.length-1].x, puntos[puntos.length-1].y),
    waypoints,
    optimizeWaypoints:true,
    travelMode:google.maps.TravelMode.DRIVING
  }
  var directionsDisplay=new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);

  var directionsService=new google.maps.DirectionsService();
  directionsService.route(request,function(response,status){
    if(status==google.maps.DirectionsStatus.OK){
      	directionsDisplay.setDirections(response);
    }
  });
}

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

/*Ruta*/
function crearVisualizadorRuta(RutaInfo,appendLast){
  var contenedor=document.createElement('div');
  contenedor.setAttribute('class','VisualizadorRuta');
  
  if(appendLast){
    contenedor_rutas.appendChild(contenedor);
  }else{
    contenedor_rutas.insertBefore(contenedor,contenedor_rutas.firstChild);
  }
  
  //crear menu superior del visualizador: nickname,mensajes
  var menuSuperior=crearMenuSuperior(RutaInfo,false,true);
  contenedor.appendChild(menuSuperior);
  //crear el mapa en donde se mostrara la ruta, ubicar los puntos de la ruta sobre el mapa
  var contenedorMapa=document.createElement('div');
  contenedorMapa.setAttribute('class','VisualizadorRuta-mapa');
  contenedorMapa.setAttribute('id','mapaGoogle1');
  contenedor.appendChild(contenedorMapa);
  
  crearMapa(RutaInfo,contenedorMapa);
  //crear menu inferior del visualizador: agregar, precio, capacidad
  var menuInferior=crearMenuInferior(RutaInfo,true,false,true);
  contenedor.appendChild(menuInferior);
}

/*Manejadores de Eventos: Mensajes, Elimnar, Aceptar Aventon*/
/*Manejador solicitudRuta en solicitud.js*/
/*Manejador mostrarPasajero en solicitud.js*/

/*Aceptar Aventon*/
function aceptarAventon(event){ 
  //se envia una notificacion al solicitante del aventon indicando que el usuario desea llevarlo
  var idAventon=this.getAttribute('data-idaventon');
  var idReceptor=this.getAttribute('data-idpublicador');
  var id=usuario.id;
  var confirmacion={idAventon:idAventon,idEmisor:id,idReceptor:idReceptor}
  console.log(confirmacion);
  socket.emit('aceptarAventon',confirmacion);
}
/*Aceptar Aventon*/

/*Ir a conversacion*/
function clickMensaje(event){
  console.log("nuevo mensaje");
  console.log(this.dataset.idpublicador);
  window.location.href="/nuevaConversacion?idReceptor="+this.dataset.idpublicador;
}
/*Ir a conversacion*/


/*Eliminar Ruta*/

function clickEliminar(event){
  IDruta = this.dataset.idruta;
  console.log("Eliminado", this.dataset.idruta);
  abrir_eliminar();

}

function EliminarRuta(event){
  
  var request = new XMLHttpRequest();
  request.open("GET","/pasajeros?id="+IDruta ,true);
  request.addEventListener('load', function(event){
          var respond = JSON.parse(event.target.responseText);
          var psjr = respond.pasajeros;
          var idpasajeros = [];
          for (var i =0; i< psjr.length; i++){
            console.log(psjr[i].id_usuario);
            idpasajeros.push(psjr[i].id_usuario);
          }
          socket.emit("EliminarRuta", IDruta, idpasajeros);

  } ,false);
  request.send(null);

  cancelar_eliminar();


}

function quitarVisualizador(idruta){
  var element = document.getElementById(idruta);
  element.outerHTML = "";
  delete element;
}

function abrir_eliminar(){
  
  var menuE = document.getElementById("menu_eliminar");
  if(menuE== null){
    return;
  }
  menuE.style.display="flex";
  
  var perfil=document.getElementById("contenedor_perfil")
  
}

function cancelar_eliminar(){
  var menuE = document.getElementById("menu_eliminar");
  if(menuE== null){
    return;
  }

  menuE.style.display="none";

}


/*Eliminar Ruta*/

function inicializar(event){
  socket.on('EliminarRutaPerfil',function(idruta){
    quitarVisualizador(idruta);
  });

  var btnCancelarEliminar = document.getElementById("cancelar_eliminar");
  if(btnCancelarEliminar != null){
    btnCancelarEliminar.addEventListener('click', cancelar_eliminar);
  }

  var btnAceptarEliminar = document.getElementById("aceptar_eliminar");
  if(btnAceptarEliminar != null){
    btnAceptarEliminar.addEventListener('click', EliminarRuta);
  }

}

window.addEventListener('load',inicializar,false);
