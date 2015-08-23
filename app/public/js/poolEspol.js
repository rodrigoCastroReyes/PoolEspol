//objetos usados en la app
function punto(x,y) { 
  this.x = x;
  this.y = y;
}

var Solicitud = function(idRuta,idEmisor,idReceptor,latitud,longitud){
  //idReceptor: id del dueño de la ruta
  this.idRuta = idRuta || '' ;
  this.idEmisor= idEmisor || '';
  this.idReceptor= idReceptor || '' ;
  this.latitud = latitud || 0.0 ;
  this.longitud = longitud || 0.0 ;
}

var InfoRuta= function(idPublicador,publicador,urlNickname,fecha,hora,precio,capacidad,ruta){
  this.idPublicador= idPublicador || '';
  this.publicador=  publicador || '';//nickname
  this.urlNickname= urlNickname || "";
  this.fecha= fecha || "";
  this.hora= hora || "";
  this.precio= precio || 0.0;
  this.capacidad= capacidad || 0;
  this.ruta= ruta || [];
}

var InfoAventon = function(idPublicador,publicador,urlNickname,fecha,hora,ubicacion){
  this.idPublicador= idPublicador || "";
  this.publicador=  publicador || "";//nickname
  this.urlNickname= urlNickname || "";
  this.fecha= fecha || "";
  this.hora= hora || "";
  this.ubicacion = ubicacion || {};
}

var Usuario=function(id,nickname,urlFoto){
  this.idUsuario=id;
  this.nickname=nickname;
  this.foto=urlFoto;
  this.posicionActual={};
  this.infoRutas=new Array();//informacion sobre las rutas
  this.infoAventones=new Array();//informacion sobre los aventones
  this.solicitudes=new Array();//solicitudes a rutas

  this.consultarPosicionActual=function(){
    //Geolocalizacion
    var posicionActual={};
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        posicionActual=new punto(position.coords.latitude,position.coords.longitude);
        console.log("Posicion consultada");
      },errorFound);//se obtiene las posiciones actuales
    }else{
      alert("Actualiza el navegador");
    }
  }

  this.consultarRuta=function(idRuta){
    var infoRuta=this.infoRutas[idRuta];
    return infoRuta;
  }

  this.consultarAventon=function(idAventon){
    var infoAventon=this.infoAventones[idAventon];
    return infoAventon;
  }

  this.obtenerSolicitud=function(idRuta){
    return this.solicitudes[idRuta];
  }

  this.agregarInfoRuta=function(info){
    this.infoRutas[info.idRuta] = new InfoRuta(info.idPublicador,
    info.publicador,
    info.urlNickname,
    info.fecha,
    info.hora,
    info.precio,
    info.capacidad,
    info.ruta);
  }

  this.agregarInfoAventon=function(info){
    this.infoAventones[info.idRuta] = new InfoAventon(info.idPublicador,
    info.publicador,
    info.urlNickname,
    info.fecha,
    info.ubicacion);
  }

  this.agregarSolicitud=function(idRuta,idReceptor,latitud,longitud){
    this.solicitudes[idRuta]=new Solicitud(idRuta,this.idUsuario,idReceptor,latitud,longitud);
  }
}

function errorFound(error){
  alert("Error has ocurred" + error.code);/* 0: Error desconocido 1: Permiso denegado  2: Posicion no esta disponible  3: Timeout */
}