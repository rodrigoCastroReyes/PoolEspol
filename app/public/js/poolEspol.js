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
  this.idPublicador = idPublicador || '';
  this.publicador =  publicador || '';//nickname
  this.urlNickname = urlNickname || "";
  this.fecha = fecha || "";
  this.hora = hora || "";
  this.precio = precio || 0.0;
  this.capacidad = capacidad || 0;
  this.idRuta = 0.0;
  this.ruta = ruta || [];
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
  this.id=id;
  this.nickname=nickname;
  this.foto=urlFoto;
  this.posicionActual={};
  this.infoRutas=new Array();//informacion sobre las rutas
  this.infoAventones=new Array();//informacion sobre los aventones
  this.solicitudes=new Array();//solicitudes a rutas

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

  this.agregarSolicitud=function(solicitud){
    this.solicitudes[solicitud.idRuta] = solicitud;
  }
  

}

