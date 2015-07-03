/**
 *NOTA LOS EVENTOS DE VALIDACIONES SE ACTIVAN CUANDO PRESIONAN
 *LA TECLA ENTERRRRR
 *
 *
 *
 * 
 */

 var nombre, apellido,cedula;
 var placa,capacidad;

 function salvarDatosUsuario(){
 	nombre=labelNombre.value;
 	apellido=labelApellido.value;
 	cedula=labelCelular.value;
 }

function salvarDatosAutos(){
 	placa=labelplaca.value;
 	capacidad=labelcapacidad.value;
 }

function cancelarUsuario(){
 	labelNombre.value=nombre;
 	labelApellido.value=apellido;
 	labelCelular.value=cedula;
 	deshabilitarcajasusuario();
 }

 function cancelarAutos(){
 	labelplaca.value=placa;
 	labelcapacidad.value=capacidad;
 	deshabilitarcajasauto();

 }


function habilitarcajasusuario(){
	document.getElementById("labelNombre").style.background ='white';
	document.getElementById("labelApellido").style.background ='white';
	document.getElementById("labelCelular").style.background = 'white';
	//document.getElementById("labelsexo").style.background='white';

	document.getElementById("labelNombre").style.color ='black';
	document.getElementById("labelApellido").style.color ='black';
	document.getElementById("labelCelular").style.color = 'black';
	//document.getElementById("labelsexo").style.color='black';
	
	document.getElementById("labelNombre").disabled=false;
	document.getElementById("labelApellido").disabled=false;
	document.getElementById("labelCelular").disabled=false;
	//document.getElementById("labelsexo").disabled=false;
	
	document.getElementById("botonusuario").style.display = 'none';
	document.getElementById("botonguardar").style.display = 'flex';
	document.getElementById("botoncancelar").style.display = 'flex';
	document.getElementById("labelNombre").focus();
	var lista = document.getElementsByClassName("datos");
	
		for(i=0; i <lista.length ; i++){
			
			lista[i].style.marginbottom = "55px";
			
		}
		salvarDatosUsuario();
	
}

function deshabilitarcajasusuario(){
	document.getElementById("labelNombre").style.background ='#0080FB';
	document.getElementById("labelApellido").style.background ='#0080FB';
	document.getElementById("labelCelular").style.background = '#0080FB';
	//document.getElementById("labelsexo").style.background='white';

	document.getElementById("labelNombre").style.color ='white';
	document.getElementById("labelApellido").style.color ='white';
	document.getElementById("labelCelular").style.color = 'white';
	//document.getElementById("labelsexo").style.color='black';
	
	document.getElementById("labelNombre").disabled=true;
	document.getElementById("labelApellido").disabled=true;
	document.getElementById("labelCelular").disabled=true;
	//document.getElementById("labelsexo").disabled=false;
	
	document.getElementById("botonusuario").style.display = 'flex';
	document.getElementById("botonguardar").style.display = 'none';
	document.getElementById("botoncancelar").style.display = 'none';
	document.getElementById("labelNombre").focus();
	var lista = document.getElementsByClassName("datos");
	
		for(i=0; i <lista.length ; i++){
			
			lista[i].style.marginbottom = "0px";
			
		}
	
}


function habilitarcajasauto(){
	document.getElementById("labelplaca").style.background='white';
	document.getElementById("labelcapacidad").style.background = 'white';
	document.getElementById("labelplaca").style.borderColor = 'blue';
	document.getElementById("labelcapacidad").style.borderColor = 'blue';
	document.getElementById("labelplaca").disabled=false;
	document.getElementById("labelcapacidad").disabled=false;
	document.getElementById("botonguardarcarro").style.display = 'flex';
	document.getElementById("botoncancelarcarro").style.display= 'flex';
	document.getElementById("botoncarro").style.display = 'none';
	document.getElementById("labelplaca").focus();
	salvarDatosAutos();
	
}

function deshabilitarcajasauto(){
	document.getElementById("labelplaca").style.background='#e2e4e6';
	document.getElementById("labelcapacidad").style.background = '#e2e4e6';
	//document.getElementById("labelplaca").style.borderColor = 'blue';
	//document.getElementById("labelcapacidad").style.borderColor = 'blue';
	document.getElementById("labelplaca").disabled=true;
	document.getElementById("labelcapacidad").disabled=true;
	document.getElementById("botonguardarcarro").style.display = 'none';
	document.getElementById("botoncancelarcarro").style.display= 'none';
	document.getElementById("botoncarro").style.display = 'flex';
	
}


function guadarDatos(evt){
	var val=document.forms["datosPersona"].checkValidity();
	if(val==false){
		alert("escreibe bien!!!");
	}else{
		deshabilitarcajasusuario();
		alert("se guardo correctamente");
	}
}

function guadarDatosAuto(evt){
	var val=document.forms["datosAuto"].checkValidity();
	if(val==false){
		alert("escreibe bien!!!");
	}else{
		deshabilitarcajasauto();
		alert("se guardo correctamente");
	}
}




