
var open = false;

function cerrarEstadisticas(){
  open = false;
  $("#contenedor_rutas").css('opacity','1');
  $("#infoUsuario").css('visibility','hidden');
  $("#infoUsuario").css('opacity','0');
}

function mostrarEstadistica(event){
  var response = JSON.parse(event.target.responseText); 
  $("#contenedor_rutas").css('opacity','0.5');
  $("#infoUsuario").css('visibility','visible');
  $("#infoUsuario").css('opacity','1');

  /*Informacion del usuario*/
  var usuario = response.usuario;
  var nickName = document.getElementById("informacionUsuario-nickname");
  if(nickName!=null){
    nickName.innerHTML = "Informaci&oacute;n de " + usuario.nick;
  }
  var nombreCompleto = document.getElementById("informacionUsuario-nombres");
  if(nombreCompleto!=null){
    nombreCompleto.innerHTML = usuario.nombre + " " + usuario.apellidos;
  }
  var foto = document.getElementById("informacionUsuario-foto");
  if(foto!=null){
    foto.setAttribute("src",usuario.foto);
  }

  /*Estadisticas*/
  if(response.data.length == 0){
    $("#infoUsuario").css('visibility','visible');
    return;
  }

  var array = [];
  var limit = 5 ;
  var suma = 0;
  for(var i = 0; i < response.data.length; i++){
    suma = suma + parseInt(response.data[i].total);
  }

  var numRutas = document.getElementById("estadisticaRutas");
  $("#estadisticaRutas").empty();
  numRutas.innerHTML = "Rutas Activas : ";
  var span = document.createElement('span');
  span.setAttribute('class','estadistica-resultado');
  span.innerHTML =  response.numRutas;
  numRutas.appendChild(span);

  /*Total de pasajeros llevados por el usuario*/
  var total = document.getElementById("estadisticaTotal");
  $("#estadisticaTotal").empty();
  total.innerHTML = "Total de Pasajeros recogidos : ";
  span = document.createElement('span');
  span.setAttribute('class','estadistica-resultado');
  span.innerHTML = suma;
  total.appendChild(span);

  /*Probabilidad de ser aceptado*/
  var probabilidad = document.getElementById("estadisticaProbabilidad");//probabilidad de ser aceptato
  $("#estadisticaProbabilidad").empty();
  probabilidad.innerHTML = "Probabilidad de ser aceptado : " ;
  span = document.createElement('span');
  span.setAttribute('class','estadistica-resultado');
  var porcentaje = parseInt( 100 * ( suma / (suma + parseFloat(response.numRechazadas))) ) ;
  span.innerHTML = porcentaje + "%"  ; 
  probabilidad.appendChild(span);

  var probabilidadRechazo = document.getElementById("estadisticaProbabilidadDos");
  $("#estadisticaProbabilidadDos").empty();
  probabilidadRechazo.innerHTML = "Probabilidad de ser rechazado : " ;
  span = document.createElement('span');
  span.setAttribute('class','estadistica-resultado');
  porcentaje = 100 - porcentaje;
  span.innerHTML = porcentaje + "%"  ; 
  probabilidadRechazo.appendChild(span);
  
  /*Histograma*/
  response.data.reverse();
  for(var i = 0; i < limit; i++){
    if(response.data[i]!=null){
      array.push({ "usuario" : response.data[i].nick , "aventones" : response.data[i].total ,"color":"#0080FB"});
    }
  }
  var chart = AmCharts.makeChart( "histograma", {
    "type": "serial",
    "theme": "light",
    "dataProvider": array,
    "valueAxes": [ {
      "gridColor": "#FFFFFF",
      "gridAlpha": 0.2,
      "dashLength": 0
    } ],
    "gridAboveGraphs": true,
    "startDuration": 1,
    "graphs": [ {
      "balloonText": "[[category]]: <b>[[value]]</b>",
      "fillAlphas": 0.8,
      "lineAlpha": 0.2,
      "type": "column",
      "valueField": "aventones",
      "colorField": "color"
    } ],
    "chartCursor": {
      "categoryBalloonEnabled": false,
      "cursorAlpha": 0,
      "zoomable": false
    },
    "categoryField": "usuario",
    "categoryAxis": {
      "gridPosition": "start",
      "gridAlpha": 0,
      "tickPosition": "start",
      "tickLength": 20
    },
    "export": {
      "enabled": true
    }
  } );
}

function obtenerInfoUsuario(event){
  if(!open){
    open = true;
    var request = new XMLHttpRequest();
    request.open("GET","/InfoUsuario?publicador=" + this.getAttribute('data-idpublicador') ,true);
    request.addEventListener('load',mostrarEstadistica,false);
    request.send(null);
  }
}