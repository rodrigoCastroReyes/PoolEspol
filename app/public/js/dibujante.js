/*Ruta*/
function dibujarRuta(RutaInfo, lienzo){
  var contenedor=document.createElement('div');
  contenedor.setAttribute('class','VisualizadorRuta');
  
  
  lienzo.appendChild(contenedor);
  
  
  //crear menu superior del visualizador: nickname,mensajes
  var menuSuperior=dibujarMenuSuperior(RutaInfo,false,true);
  contenedor.appendChild(menuSuperior);
  //crear el mapa en donde se mostrara la ruta, ubicar los puntos de la ruta sobre el mapa
  var contenedorMapa=document.createElement('div');
  contenedorMapa.setAttribute('class','VisualizadorRuta-mapa');
  contenedorMapa.setAttribute('id','mapaGoogle1');
  contenedor.appendChild(contenedorMapa);
  
  crearMapa(RutaInfo,contenedorMapa);
  //crear menu inferior del visualizador: agregar, precio, capacidad
  var menuInferior=dibujarMenuInferior(RutaInfo,true,false);
  contenedor.appendChild(menuInferior);
}





/*Aventon*/

function dibujarAventon(AventonInfo, lienzo ){
  var contenedor=document.createElement('div');
  contenedor.setAttribute('class','VisualizadorRuta');
  
  lienzo.appendChild(contenedor);
  
  var menuSuperior = dibujarMenuSuperior(AventonInfo);
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
  var menuInferior= dibujarMenuInferior(AventonInfo,false);
  contenedor.appendChild(menuInferior);
}


function dibujarMenuSuperior(Info, miRuta ){
  	var menuSuperior=document.createElement('div');
  	menuSuperior.setAttribute('class','VisualizadorRuta-menu u-menu_superior');

  	var infoUsuario=document.createElement('div');
    infoUsuario.setAttribute('class','VisualizadorRuta-opcion u-flex_start');

  	var foto=document.createElement('img');
  	foto.setAttribute('src', Info['urlNickname']);
    foto.setAttribute('class','nickname u-cursor_pointer');
    //nick name del usuario
    var nickname=document.createElement('span');
    nickname.setAttribute('class','VisualizadorRuta-info');
    nickname.innerHTML= Info["publicador"];
    infoUsuario.appendChild(foto); 
    infoUsuario.appendChild(nickname);  

    menuSuperior.appendChild(infoUsuario);


  	return menuSuperior;
}

function dibujarMenuInferior(RutaInfo){
  //menu inferior
  var menuInferior=document.createElement('div');
  menuInferior.setAttribute('class','VisualizadorRuta-menu u-menu_inferior');


  var infoHorario=document.createElement('div');
  infoHorario.setAttribute('class','info-horario u-flex_center');
  var horario=document.createElement('span');
  horario.innerHTML= RutaInfo["fecha"]+" - "+RutaInfo["hora"]
  infoHorario.appendChild(horario);
  menuInferior.appendChild(infoHorario)


  return menuInferior;
}


