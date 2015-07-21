var mapProp, mapProp2, mapProp3;

function punto(x,y) { 
  this.x = x;
  this.y = y;
}

//datos que llegan desde el servidor
var ptoAventon = new punto(-2.2845962215476465 ,-79.88536566495895);


var ruta1, ruta2;

function procesarRutas(event){
  var respond = event.target.responseText;
  var listRutas = JSON.parse(respond);
  ruta1 = listRutas.rutas[0];
  ruta2 = listRutas.rutas[1];

  mapProp = {
  center:new google.maps.LatLng(-2.201403, -79.917732),
  zoom:15,
  mapTypeId:google.maps.MapTypeId.ROADMAP
  };

  mapProp3 = {
  center:new google.maps.LatLng(-2.201403, -79.917732),
  zoom:15,
  mapTypeId:google.maps.MapTypeId.ROADMAP
  };

  var map=new google.maps.Map(document.getElementById("mapaGoogle1"),mapProp);
  colocar_marcadores(map, ruta1.ruta);
  var map3=new google.maps.Map(document.getElementById("mapaGoogle3"),mapProp3);
  colocar_marcadores(map3, ruta2.ruta);

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


function colocar_marcadores(map, puntos){

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