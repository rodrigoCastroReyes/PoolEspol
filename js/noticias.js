var mapProp, mapProp2, mapProp3;

function punto(x,y) { 
  this.x = x;
  this.y = y;
}

//datos que llegan desde el servidor
var ptoAventon = new punto(-2.2845962215476465 ,-79.88536566495895);

var ruta1, ruta2;

function crearMapa(ruta,contenedor,mapOptions){
  var map = new google.maps.Map(contenedor,mapOptions);//se crea el mapa
  colocarMarcadores(map,ruta);//se colocan los puntos sobre el mapa
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

function crearVisualizadorRuta(RutaInfo){
  var contenedor=document.createElement('div');
  contenedor.setAttribute('class','VisualizadorRuta');

  var menuSuperior=document.createElement('div');
  menuSuperior.setAttribute('class','VisualizadorRuta-menu u-menu_superior');

  //contenedor de informacion del usuario
  var infoUsuario=document.createElement('div');
  infoUsuario.setAttribute('class','VisualizadorRuta-opcion u-flex_start');
  //foto del usurio
  var foto=document.createElement('img');
  foto.setAttribute('class','nickname u-cursor_pointer');
  foto.setAttribute('src','imagenes/fajada.jpg');
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
  iconoMensaje.setAttribute('src','icon-mail4  VisualizadorRuta-info u-cursor_pointer');
  //texto: Mensajes
  var mensaje=document.createElement('span');
  mensaje.setAttribute('class','VisualizadorRuta-info');
  mensaje.innerHTML="Mensajes";
  infoMensajes.appendChild(iconoMensaje);  infoMensajes.appendChild(mensaje);

  menuSuperior.appendChild(infoUsuario); menuSuperior.appendChild(infoMensajes);
  contenedor.appendChild(menuSuperior);

  //mapa
  var contenedorMapa=document.createElement('div');
  contenedorMapa.setAttribute('class','VisualizadorRuta-mapa');
  contenedorMapa.setAttribute('id','mapaGoogle1');
  contenedor.appendChild(contenedorMapa);

  var mapOptions = {
    zoom: 15,
    mapTypeId:google.maps.MapTypeId.ROADMAP,
    center:new google.maps.LatLng(-2.201403, -79.917732)
  };

  crearMapa(RutaInfo.ruta,contenedorMapa,mapOptions);

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

  var infoRuta=document.createElement('div');
  infoRuta.setAttribute('class','VisualizadorRuta-opcion u-flex_end');
  //precio de la ruta
  var precio=document.createElement('span');
  precio.setAttribute('class','VisualizadorRuta-info');
  precio.innerHTML="$"+RutaInfo["precio"];
  //icono Ruta
  var iconoRuta=document.createElement('span');
  iconoRuta.setAttribute('class','icon-user VisualizadorRuta-info');
  //capacidad de la ruta
  var capacidad=document.createElement('span');
  capacidad.setAttribute('class','VisualizadorRuta-info');
  capacidad.innerHTML=RutaInfo["capacidad"];
  infoRuta.appendChild(precio);
  infoRuta.appendChild(iconoRuta);
  infoRuta.appendChild(capacidad);

  menuInferior.appendChild(infoAgregar);
  menuInferior.appendChild(infoHorario);
  menuInferior.appendChild(infoRuta);

  contenedor.appendChild(menuInferior);
  contenedor_rutas.appendChild(contenedor);
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
  var respond = event.target.responseText;
  var listventones = JSON.parse(respond);
  var aventon1 = listventones.aventones[0];
  mapProp2 = {
  center:new google.maps.LatLng(-2.2845962215476465 ,-79.88536566495895),
  zoom:15,
  mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map2=new google.maps.Map(document.getElementById("mapaGoogle2"),mapProp2);
  
  colocarPunto(map2, aventon1.ubicacion);
}

function colocarPunto(map, punto){
  var marker= new google.maps.Marker({
    position: new google.maps.LatLng(punto.x, punto.y),
    title:'#',
    draggable:false,
    map:map
    });

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


window.addEventListener('load',cargarMapas,false);