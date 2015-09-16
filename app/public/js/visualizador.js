//visualizador.js: contiene todo los necesario para dibujar el visualizador de una ruta y un aventon

//crea un div con las opciones del menu superior del visualizador de ruta

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
    if(infoPerfil){
      foto.setAttribute('class','nickname u-cursor_pointer');
      foto.addEventListener('click',obtenerInfoUsuario,false);
    }else{
      foto.setAttribute('class','nickname');
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
function crearMenuInferior(RutaInfo,opcionesRuta,miRuta){
  //menu inferior
  var menuInferior=document.createElement('div');
  menuInferior.setAttribute('class','VisualizadorRuta-menu u-menu_inferior');

  if(!miRuta){//mostrar opcion + cuando la ruta no pertenezca al usuario
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
  infoHorario.setAttribute('class','info-horario');
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
    iconoRuta.addEventListener('click',mostrarPasajeros,false);

    //capacidad de la ruta
    var capacidad=document.createElement('span');
    capacidad.setAttribute('class','VisualizadorRuta-info');
    capacidad.innerHTML=RutaInfo["capacidad"];
    contRuta.appendChild(precio);
    contRuta.appendChild(iconoRuta);
    contRuta.appendChild(capacidad);
    menuInferior.appendChild(contRuta);
  }else{//visualizador aventon
    iconoAgregar.setAttribute('data-idAventon',RutaInfo["idAventon"]);
    iconoAgregar.addEventListener('click',aceptarAventon,false);
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
  for (var i =1; i < puntos.length-2; i++){
    var coordenada = puntos[i];
    var position = new google.maps.LatLng(coordenada.x, coordenada.y);
    waypoints.push({location : position, stopover:false });
  }
  var request={
    origin: new google.maps.LatLng(puntos[0].x, puntos[0].y),
    destination: new google.maps.LatLng(puntos[puntos.length -1].x, puntos[puntos.length -1].y),
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
  var menuInferior=crearMenuInferior(RutaInfo,true,false);
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
  var IDruta = this.dataset.idruta;
  console.log("Eliminado", this.dataset.idruta);
  
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

}

function quitarVisualizador(idruta){
  var element = document.getElementById(idruta);
  element.outerHTML = "";
  delete element;
}

/*Eliminar Ruta*/

function inicializar(event){
  socket.on('EliminarRutaPerfil',function(idruta){
    quitarVisualizador(idruta);
  });
}

window.addEventListener('load',inicializar,false);
