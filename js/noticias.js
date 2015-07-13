var mapProp;


function cargarMapas(event){

	mapProp = {
	center:new google.maps.LatLng(-2.201403, -79.917732),
  zoom:15,
  mapTypeId:google.maps.MapTypeId.ROADMAP
	};

  mapProp2 = {
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
  var map2=new google.maps.Map(document.getElementById("mapaGoogle2"),mapProp2);
  var map3=new google.maps.Map(document.getElementById("mapaGoogle3"),mapProp3);

}

window.addEventListener('load',cargarMapas,false);