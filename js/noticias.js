var mapProp, mapProp2, mapProp3;

function punto(x,y) { 
  this.x = x;
  this.y = y;
}

//datos que llegan desde el servidor
var ptoAventon = new punto(-2.2845962215476465 ,-79.88536566495895);

var ruta1 = [
    new punto(-2.196898776976102 ,-79.92794036865234 ),
    new punto(-2.19823889516066 ,-79.92990374565125),
    new punto(-2.196641474147045 ,-79.9354076385498 ),
    new punto(-2.194089885360678 ,-79.93833661079407),
    new punto(-2.188321992152271 ,-79.94444131851196 ),
    new punto(-2.1807314966553757 ,-79.94523525238037),
    new punto(-2.1723636814734295 ,-79.94108855724335 ),
    new punto(-2.165411015653738 ,-79.94540691375732),
    new punto(-2.1557619277556506 ,-79.94861483573914 ),
    new punto(-2.1522024709832657 ,-79.95297074317932 ),
];

var ruta2 = [
    new punto( -2.163802838596867 ,-79.9209451675415 ),
    new punto(-2.1651858709684997 ,-79.9229085445404),
    new punto(-2.1621732174395216 ,-79.92952823638916  ),
    new punto(-2.1727657236231828 ,-79.94051456451416),
    new punto(-2.155767288377049 ,-79.9485182762146  ),
    new punto(-2.152320404925176 ,-79.95322287082672)
];

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
    console.log(i);
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

	mapProp = {
	center:new google.maps.LatLng(-2.201403, -79.917732),
  zoom:15,
  mapTypeId:google.maps.MapTypeId.ROADMAP
	};

  mapProp2 = {
  center:new google.maps.LatLng(-2.2845962215476465 ,-79.88536566495895),
  zoom:15,
  mapTypeId:google.maps.MapTypeId.ROADMAP
  };

  mapProp3 = {
  center:new google.maps.LatLng(-2.201403, -79.917732),
  zoom:15,
  mapTypeId:google.maps.MapTypeId.ROADMAP
  };

	var map=new google.maps.Map(document.getElementById("mapaGoogle1"),mapProp);
  var map2=new google.maps.Map(document.getElementById("mapaGoogle2"),mapProp2);
  var map3=new google.maps.Map(document.getElementById("mapaGoogle3"),mapProp3);

  colocar_marcadores(map, ruta1);
  colocarPunto(map2, ptoAventon);
  colocar_marcadores(map3, ruta2);

}

window.addEventListener('load',cargarMapas,false);