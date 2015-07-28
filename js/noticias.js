var mapProp, mapProp2, mapProp3;

function punto(x,y) { 
  this.x = x;
  this.y = y;
}

//datos que llegan desde el servidor
var ptoAventon = new punto(-2.2845962215476465 ,-79.88536566495895);

var ruta1, ruta2;

function crearMapa(ruta,contenedor,mapOptions){
  var newMap = new google.maps.Map(contenedor,mapOptions);//se crea el mapa
  colocarMarcadores(newMap,ruta);//se colocan los puntos sobre el mapa
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
  foto.setAttribute('class','nickname u-cursor_pointer');
  foto.setAttribute('src','imagenes/fajada.jpg');//RutaInfo['url-nickname']
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
  iconoAgregar.setAttribute('class','VisualizadorRuta-info icon-plus u-cursor_pointer');
  infoAgregar.appendChild(iconoAgregar);

  var infoHorario=document.createElement('div');
  infoHorario.setAttribute('class','info-horario');
  var horario=document.createElement('span');
  horario.innerHTML= RutaInfo["fecha"]+" - "+RutaInfo["hora"]
  infoHorario.appendChild(horario);
  
  menuInferior.appendChild(infoAgregar);
  menuInferior.appendChild(infoHorario)
  
  if(opcionesRuta==true){//visualizador ruta
    var contRuta=document.createElement('div');
    contRuta.setAttribute('class','VisualizadorRuta-opcion u-flex_end');
    //precio de la ruta
    var precio=document.createElement('span');
    precio.setAttribute('class','VisualizadorRuta-info');
    console.log(RutaInfo["precio"]);
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
  }
  return menuInferior;
}

function crearVisualizadorRuta(RutaInfo){
  var contenedor=document.createElement('div');
  contenedor.setAttribute('class','VisualizadorRuta');
  contenedor_rutas.appendChild(contenedor);

  var menuSuperior=crearMenuSuperior(RutaInfo);
  contenedor.appendChild(menuSuperior);

  //mapa
  var contenedorMapa=document.createElement('div');
  contenedorMapa.setAttribute('class','VisualizadorRuta-mapa');
  contenedorMapa.setAttribute('id','mapaGoogle1');
  contenedor.appendChild(contenedorMapa);
  var mapOptions = {
    zoom: 15,
    center:new google.maps.LatLng(RutaInfo.ruta[0].x,RutaInfo.ruta[0].y),
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  crearMapa(RutaInfo.ruta,contenedorMapa,mapOptions);

  var menuInferior=crearMenuInferior(RutaInfo,true);
  contenedor.appendChild(menuInferior);
}

function crearVisualizadorAventon(AventonInfo){
  var contenedor=document.createElement('div');
  contenedor.setAttribute('class','VisualizadorRuta');
  contenedor_rutas.appendChild(contenedor);

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
  colocarPunto(map,AventonInfo.ubicacion);

  var menuInferior=crearMenuInferior(AventonInfo,false);
  contenedor.appendChild(menuInferior);
}

function colocarPunto(map, punto){
  var marker= new google.maps.Marker({
    position: new google.maps.LatLng(punto.x, punto.y),
    title:'#',
    draggable:false,
    map:map
  });
}

function procesarRutas(event){
  var respond = event.target.responseText;
  var listRutas = JSON.parse(respond);//contiene la informacion de las rutas
  rutasInfo=listRutas.rutas;
  for(var i=0;i<rutasInfo.length;i++){
    crearVisualizadorRuta(rutasInfo[i]);
  }
}

function procesarAventones(event){
  var respond = JSON.parse(event.target.responseText);
  var aventonesInfo=respond.aventones;
  for(var i=0;i<aventonesInfo.length;i++){
    crearVisualizadorAventon(aventonesInfo[i]);
  }
}

function cargarMapas(event){
  
  var request = new XMLHttpRequest();
  request.open("GET","JSON/rutas.json",true);
  request.addEventListener('load',procesarRutas ,false);
  request.send(null);

  var request_aventones = new XMLHttpRequest();
  request_aventones.open("GET", "JSON/aventones.json", true);
  request_aventones.addEventListener('load', procesarAventones, false);
  request_aventones.send(null);

}


//window.addEventListener('load',cargarMapas,false);

google.maps.event.addDomListener(window, 'load',cargarMapas);