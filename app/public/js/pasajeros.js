/*Mostrar Pasajero*/
function mostrarPasajeros(){
  console.log("mostrar Pasajeros");
  id_ruta = this.dataset.idruta;
  var request = new XMLHttpRequest();
  request.open("GET","/pasajeros?id="+id_ruta ,true);
  request.addEventListener('load',procesarPasajeros ,false);
  request.send(null);
}

function procesarPasajeros(event){
  var respond = JSON.parse(event.target.responseText);
  var pasajeros = respond.pasajeros;
  console.log(pasajeros);
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
/*Mostrar Pasajeros*/