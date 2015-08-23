var socket;

var usuario;
var puntoSolicitud;//Solicitud

/*Ruta*/
function crearVisualizadorRuta(RutaInfo){
  var contenedor=document.createElement('div');
  contenedor.setAttribute('class','VisualizadorRuta');
  contenedor_rutas.insertBefore(contenedor,contenedor_rutas.firstChild);

  //crear menu superior del visualizador: nickname,mensajes
  var menuSuperior=crearMenuSuperior(RutaInfo);
  contenedor.appendChild(menuSuperior);

  //crear el mapa en donde se mostrara la ruta
  var contenedorMapa=document.createElement('div');
  contenedorMapa.setAttribute('class','VisualizadorRuta-mapa');
  contenedorMapa.setAttribute('id','mapaGoogle1');
  contenedor.appendChild(contenedorMapa);
  //opciones del mapa
  var mapOptions = {
    zoom: 15,
    center:new google.maps.LatLng(RutaInfo.ruta[0].x,RutaInfo.ruta[0].y),
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  //crea el mapa y ubica los puntas de la ruta sobre el
  crearMapa(RutaInfo.ruta,contenedorMapa,mapOptions);
  //crear menu inferior del visualizador: agregar, precio, capacidad
  var menuInferior=crearMenuInferior(RutaInfo,true);
  contenedor.appendChild(menuInferior);
}


function crearMapa(ruta,contenedor,mapOptions){
  var newMap = new google.maps.Map(contenedor,mapOptions);//se crea el mapa
  colocarMarcadores(newMap,ruta);//se colocan los puntos sobre el mapa
  return newMap;
}

function colocarMarcadores(map, puntos){
  for (var i =0; i < puntos.length; i++){
    var coordenada = puntos[i];
    var position = new google.maps.LatLng(coordenada.x, coordenada.y);
    var marker= new google.maps.Marker({
    position: position,
    title:'#',
    draggable:false,
    map:map
    });
  }
  var request={
    origin: new google.maps.LatLng(puntos[0].x, puntos[0].y),
    destination: new google.maps.LatLng(puntos[puntos.length -1].x, puntos[puntos.length -1].y),
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

//crea un div con las opciones del menu superior del visualizador de ruta
function crearMenuSuperior(RutaInfo){
  var menuSuperior=document.createElement('div');
  menuSuperior.setAttribute('class','VisualizadorRuta-menu u-menu_superior');
  //contenedor de informacion del usuario
  var infoUsuario=document.createElement('div');
  infoUsuario.setAttribute('class','VisualizadorRuta-opcion u-flex_start');
  //foto del usurio
  var foto=document.createElement('img');
  foto.setAttribute('class','nickname u-cursor_pointer');;
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
  //texto: Mensajes
  var mensaje=document.createElement('span');
  mensaje.setAttribute('class','VisualizadorRuta-info');
  mensaje.innerHTML="Mensajes";
  infoMensajes.appendChild(iconoMensaje);  infoMensajes.appendChild(mensaje);

  menuSuperior.appendChild(infoUsuario); menuSuperior.appendChild(infoMensajes);

  return menuSuperior;
}

//crea un div con las opciones del menu inferior del visualizador de ruta
function crearMenuInferior(RutaInfo,opcionesRuta){
   //menu inferior
  var menuInferior=document.createElement('div');
  menuInferior.setAttribute('class','VisualizadorRuta-menu u-menu_inferior');

  var infoAgregar=document.createElement('div');
  infoAgregar.setAttribute('class','VisualizadorRuta-opcion u-flex_start');
  var iconoAgregar=document.createElement('span');
  iconoAgregar.setAttribute('data-idPublicador',RutaInfo["idPublicador"]);//idPublicador: dueño de la ruta
  
  iconoAgregar.setAttribute('class','VisualizadorRuta-info icon-plus u-cursor_pointer');
  iconoAgregar.addEventListener('click',solicitarRuta,false);
  infoAgregar.appendChild(iconoAgregar);

  var infoHorario=document.createElement('div');
  infoHorario.setAttribute('class','info-horario');
  var horario=document.createElement('span');
  horario.innerHTML= RutaInfo["fecha"]+" - "+RutaInfo["hora"]
  infoHorario.appendChild(horario);
  
  menuInferior.appendChild(infoAgregar);
  menuInferior.appendChild(infoHorario)
  
  if(opcionesRuta==true){//visualizador ruta

    iconoAgregar.setAttribute('data-idRuta',RutaInfo["idRuta"]);

    var contRuta=document.createElement('div');
    contRuta.setAttribute('class','VisualizadorRuta-opcion u-flex_end');
    //precio de la ruta
    var precio=document.createElement('span');
    precio.setAttribute('class','VisualizadorRuta-info');
    precio.innerHTML="$"+ RutaInfo["precio"];
    //icono Ruta
    var iconoRuta=document.createElement('span');
    iconoRuta.setAttribute('class','icon-user VisualizadorRuta-info');
    //capacidad de la ruta
    var capacidad=document.createElement('span');
    capacidad.setAttribute('class','VisualizadorRuta-info');
    capacidad.innerHTML=RutaInfo["capacidad"];
    contRuta.appendChild(precio);
    contRuta.appendChild(iconoRuta);
    contRuta.appendChild(capacidad);
    menuInferior.appendChild(contRuta);
  }else{
    iconoAgregar.setAttribute('data-idAventon',RutaInfo["idAventon"]);
    iconoAgregar.addEventListener('click',aceptarAventon,false);
  }
  return menuInferior;
}
/****/

/*Aventon*/
function crearVisualizadorAventon(AventonInfo){
  var contenedor=document.createElement('div');
  contenedor.setAttribute('class','VisualizadorRuta');
  contenedor_rutas.insertBefore(contenedor,contenedor_rutas.firstChild);

  var menuSuperior=crearMenuSuperior(AventonInfo);
  contenedor.appendChild(menuSuperior);

  //mapa
  var contenedorMapa=document.createElement('div');
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
  });//ubica el punto del aventon dentro del mapa

  var menuInferior=crearMenuInferior(AventonInfo,false);
  contenedor.appendChild(menuInferior);
}

function aceptarAventon(event){
  console.log("Acepte llevar a este cojudo");
  //se envia una notificacion al solicitante del aventon que el usuario desea llevarlo
  var idAventon=this.getAttribute('data-idaventon');
  var idReceptor=this.getAttribute('data-idpublicador');
  var idEmisor=usuario.idUsuario;
  var confirmacion={idAventon:idAventon,idEmisor:idEmisor,idReceptor:idReceptor}
  console.log(confirmacion);
  socket.emit('aceptarAventon',confirmacion);
}

/*Solicitud*/
function solicitarRuta(event){
  //evento generado cuando el usuario da click en el + de un visualizador de ruta
  //se levanta un mapa que le permite al usuario seleccionar el punto en donde desea que lo lleven
  var idRuta=this.getAttribute('data-idRuta');
  var rutaActual=usuario.consultarRuta(idRuta);
  var solicitud=usuario.obtenerSolicitud(idRuta);//verifica si ya existe una solicitud para esta ruta
  if(rutaActual!=null && solicitud==null ){
    $("#contenedor_rutas").css('opacity','0.5');
    $("#OpcionAgregar").css('visibility','visible');
    $("#OpcionAgregar").css('opacity','1');
    btnAceptarAgregar.setAttribute('data-idRuta',idRuta);//guarda el id de la ruta en el boton aceptar
    var contenedor=document.getElementById('MapaAgregar');
    var mapOptions = {
      zoom: 14,
      center:new google.maps.LatLng(rutaActual.ruta[0].x,rutaActual.ruta[0].y),
      mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map=crearMapa(rutaActual.ruta,contenedor,mapOptions)
    google.maps.event.addListener(map, 'click', function(event) {
        marcarPunto(event.latLng,map);
    });
    //se crea una nueva solicitud para la ruta actual
    usuario.agregarSolicitud(idRuta,this.getAttribute('data-idPublicador'));
  }
}

function marcarPunto(location, map) {//marca el punto en donde un usuario espera que lo lleven en el mapa de la ruta de otro usuario
  if ( puntoSolicitud ) {
    puntoSolicitud.setPosition(location);
  } else {
    //ha que validar distancia: debe estar entre un rango definido
    puntoSolicitud = new google.maps.Marker({
      position: location,
      map: map
    });
  }
}

function guardarSolicitud(event){
  var idRuta=this.getAttribute('data-idRuta');
  var solicitud=usuario.obtenerSolicitud(idRuta);//se agregan campos faltantes
  solicitud.latitud=puntoSolicitud.position.lat();
  solicitud.longitud=puntoSolicitud.position.lng();
  socket.emit('solicitarRuta',solicitud);
  puntoSolicitud=null;
  cerrarSolicitarRuta();
}

function cerrarSolicitarRuta(){
    $("#OpcionAgregar").css('visibility','hidden');
    $("#OpcionAgregar").css('opacity','0');
    $("#contenedor_rutas").css('opacity','1');
}

/*****/
function procesarRutas(event){
  var respond = JSON.parse(event.target.responseText);
  var rutasInfo=respond.rutas;
  for(var i=0;i<rutasInfo.length;i++){
    crearVisualizadorRuta(rutasInfo[i]);
    usuario.agregarInfoRuta(rutasInfo[i]);
  }
}

function procesarAventones(event){
  var respond = JSON.parse(event.target.responseText);
  var aventonesInfo=respond.aventones;
  for(var i=0;i<aventonesInfo.length;i++){
    crearVisualizadorAventon(aventonesInfo[i]);
    usuario.agregarInfoAventon(aventonesInfo[i]);
  }
}

function cargarMapas(event){
  //se crea un nuevo usuario con la informacion envia desde el server
  usuario=new Usuario(userid,userNick,userFoto);
  //extracion de informacion de rutas
  var request = new XMLHttpRequest();
  request.open("GET","JSON/rutas.json",true);
  request.addEventListener('load',procesarRutas ,false);
  request.send(null);

  //extraer informacion de aventones
  var request_aventones = new XMLHttpRequest();
  request_aventones.open("GET", "JSON/aventones.json", true);
  request_aventones.addEventListener('load', procesarAventones, false);
  request_aventones.send(null);
  /*Manejadores de enventos de botones*/
  btnAceptarAgregar.addEventListener('click',guardarSolicitud,false);
  btnCancelarAgregar.addEventListener('click',cerrarSolicitarRuta,false);
  btnCloseAgregar.addEventListener('click',cerrarSolicitarRuta,false);

  connectSocket();

}

function connectSocket(){
  socket = io.connect();
  
  socket.on('actualizarRuta',function(infoRuta){
    usuario.agregarInfoRuta(infoRuta);
    crearVisualizadorRuta(infoRuta);//se crea el visualizador de la ruta
  });
  
  socket.on('actualizarAventon',function(infoAventon){
    usuario.agregarInfoRuta(infoRuta);
    crearVisualizadorAventon(infoAventon);//se crea el visualizador de la ruta
  });

  socket.on('actualizarNotificacion',function(notificacion){
    crearNotificacion(notificacion);
  });

}

google.maps.event.addDomListener(window, 'load',cargarMapas);