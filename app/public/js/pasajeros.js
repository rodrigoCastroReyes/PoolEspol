/*Mostrar Pasajero*/
function mostrarPasajeros(){
  id_ruta = this.dataset.idruta;
  var request = new XMLHttpRequest();
  request.open("GET","/pasajeros?id="+id_ruta ,true);
  request.addEventListener('load',procesarPasajeros ,false);
  request.send(null);
}

function mostrarPasajerosEnMapa(){
  id_ruta = this.dataset.idruta;
  var request = new XMLHttpRequest();
  request.open("GET","/pasajeros?id="+id_ruta ,true);
  request.addEventListener('load',function(event){
    var respond = JSON.parse(event.target.responseText);
    var ruta = usr.consultarRuta(id_ruta);
    procesarPasajerosMapa(ruta, respond);

  } ,false);
  request.send(null);
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

function colocarPasajeros(pasajeros, map){
  console.log(pasajeros);
  var lista = pasajeros.pasajeros;

  for (var i = 0; i < lista.length; i++){
    var psj = lista[i];
    var foto = psj.urlfoto;
    var lng = psj.longitud;
    var lat = psj.latitud;
    var nick = psj.nickname;
    console.log(foto, lng, lat); 


    var fotoMarcador = {
      url: foto, // url
      scaledSize: new google.maps.Size(40, 40), 
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(0, 0)
    };

    var marker= new google.maps.Marker({
      position: new google.maps.LatLng(lat,lng),
      title: nick,
      icon: fotoMarcador,
      map:map,
    });
  }
}

function procesarPasajerosMapa(ruta, pasajeros){
  $("#contenedorPasajerosMapa").css('opacity','1');
  $("#pantallaPasajerosMapa").css('visibility','visible');
  $("#pantallaPasajerosMapa").css('opacity','1');

  //opciones del mapa
  var mapOptions = {
    zoom: 15,
    center:new google.maps.LatLng(ruta.ruta[0].x,ruta.ruta[0].y),
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var newMap = new google.maps.Map(mapaPasajeros,mapOptions);//se crea el mapa
  colocarMarcadores(newMap,ruta.ruta);//se colocan los puntos sobre el mapa
  colocarPasajeros(pasajeros, newMap);


}



function procesarPasajeros(event){
  var respond = JSON.parse(event.target.responseText);
  var pasajeros = respond.pasajeros;
  if(pasajeros.length == 0){
    alert("Esa ruta no tiene pasajeros");
    return;
  }
  $("#contenidoPasajeros").css('opacity','1');
  $("#pantallaPasajeros").css('visibility','visible');
  $("#pantallaPasajeros").css('opacity','1');

  for (var i =0; i< pasajeros.length; i++){
      pasajero = pasajeros[i];
      var div = document.createElement("div");
      div.setAttribute('class',"pasajero");
      var p = document.createElement("p");
      p.innerHTML = pasajero.nickname;
      p.setAttribute('class', "nickname_pasajero");
      var foto = document.createElement("img");
      foto.setAttribute('class','pasajero_foto');
      foto.setAttribute('src', pasajero.urlfoto);
      div.appendChild(foto);
      div.appendChild(p);
      var br = document.createElement("br");

      $("#ListaPasajeros").append(div);
      $("#ListaPasajeros").append(br); 
  }
}

function cerrarPasajerosMapas(){
  $("#pantallaPasajerosMapa").css('visibility','hidden');
  $("#pantallaPasajerosMapa").css('opacity','0');
  $("#contenidoPasajeros").css('opacity','1');
  $("#mapaPasajeros").html("");
}

function inicio(event){
  var bt = document.getElementById("closePasajerosMapa");
  if(bt != null){
    bt.addEventListener('click', cerrarPasajerosMapas);
  }
  else{
  }

}

window.addEventListener('load',inicio,false);
/*Mostrar Pasajeros*/