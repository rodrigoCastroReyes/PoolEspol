function habilitarcajasusuario(){
	document.getElementById("labelNombre").style.background ='white';
	document.getElementById("labelApellido").style.background ='white';
	document.getElementById("labelCelular").style.background = 'white';
	document.getElementById("labelsexo").style.background='white';
	document.getElementById("labelNombre").disabled=false;
	document.getElementById("labelApellido").disabled=false;
	document.getElementById("labelCelular").disabled=false;
	document.getElementById("labelsexo").disabled=false;
	document.getElementById("botonusuario").style.display = 'none';
	document.getElementById("botonguardar").style.display = 'flex';
	document.getElementById("botoncancelar").style.display = 'flex';
	document.getElementById("labelNombre").focus();
	var lista = document.getElementsByClassName("datos");
	
		for(i=0; i <lista.length ; i++){
			
			lista[i].style.marginbottom = "55px";
			
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
	
}

function validarnombre(event){
  if(event.which == 13){
  	var texto = document.getElementById("labelNombre").value;
  	if (texto.search(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_\s]+$/) != -1){

		document.getElementById("labelApellido").focus();
  	}
	
	else{

		document.getElementById("labelNombre").style.backgroundColor="red";
		document.getElementById("labelNombre").style.color = 'white';

	}

	}
	else{
		document.getElementById("labelNombre").style.backgroundColor="white";
		document.getElementById("labelNombre").style.color = 'black';

	}

  }
	
function validarapellido(event){
	if(event.which == 13){
  	var texto = document.getElementById("labelApellido").value;
  	if (texto.search(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_\s]+$/) != -1){
		document.getElementById("labelCelular").focus();
  	}
	
	else{

		document.getElementById("labelApellido").style.backgroundColor="red";
		document.getElementById("labelApellido").style.color = 'white';

	}

	}
	else{

		document.getElementById("labelApellido").style.backgroundColor="white";
		document.getElementById("labelApellido").style.color = 'black';

	}


}

function validarcelular(event){
	if(event.which == 13){
  	var texto = document.getElementById("labelCelular").value;
  	if (texto.search(/^[0-9]+$/) != -1){
		document.getElementById("labelsexo").focus();
  	}
	
	else{

		document.getElementById("labelCelular").style.backgroundColor="red";
		document.getElementById("labelCelular").style.color = 'white';

	}

	}
	else{
		document.getElementById("labelCelular").style.backgroundColor="white";
		document.getElementById("labelCelular").style.color = 'black';

	}

}

function validarsexo(event)
{
	if(event.which == 13){
  	var texto = document.getElementById("labelsexo").value;
  	if (texto.search(/^[a-u]+$/) != -1){
		
		document.getElementById("labelNombre").disabled=true;
		document.getElementById("labelApellido").disabled=true;
		document.getElementById("labelCelular").disabled=true;
		document.getElementById("labelsexo").disabled=true;
		
		

  	}
	
	else{

		document.getElementById("labelsexo").style.backgroundColor="red";
		document.getElementById("labelsexo").style.color = 'white';

		}
	

	}
	else
	{
		document.getElementById("labelsexo").style.backgroundColor="white";
		document.getElementById("labelsexo").style.color = 'black';
	}
}

function validarplaca(event)
{
 if(event.which == 13){
 	var texto = document.getElementById("labelplaca").value;
 		if(texto.search(/^([a-z]+[0-9]+)|([0-9]+[a-z]+)/i)!= -1)
 		{
 			document.getElementById("labelcapacidad").focus();
 		}
 		else
 		{
 		document.getElementById("labelplaca").style.backgroundColor="red";
		document.getElementById("labelplaca").style.color = 'white';


 		}
 }

 else{
 	document.getElementById("labelplaca").style.backgroundColor="white";
	document.getElementById("labelplaca").style.color = 'black';
 }
}

function validarcapacidad(event){

 if(event.which == 13){
  	var texto = document.getElementById("labelcapacidad").value;
  	if (texto.search(/^[0-6]+$/) != -1){
		document.getElementById("labelcapacidad").disabled=true;
		document.getElementById("labelplaca").disabled =true;
  	}
	
	else{

		document.getElementById("labelcapacidad").style.backgroundColor="red";
		document.getElementById("labelcapacidad").style.color = 'white';

	}

}

}

function habilitarcajas(){
	var listacajas = document.getElementsByTagName("input");

		for(var i=0 ; i < 4;i++){
			listacajas[i].disabled = false;
		}
		document.getElementsByTagName("input")[0].focus();
}

function cerrardatos(){
	var listacajas = document.getElementsByTagName("input");

	for(var i=0 ; i < 4;i++){
			listacajas[i].style.backgroundColor = "#0080FB";
			listacajas[i].style.color =  "white";

		}

		document.getElementById("botonusuario").style.display = 'flex';
		document.getElementById("botonguardar").style.display = 'none';
		document.getElementById("botoncancelar").style.display = 'none';

}

function cerrardatoscarro(){

var listacajas = document.getElementsByTagName("input");

	for(var i=4 ; i < 6;i++){
			listacajas[i].style.backgroundColor = "#0080FB";
			listacajas[i].style.color =  "white";

		}

		document.getElementById("botoncarro").style.display = 'flex';
		document.getElementById("botonguardarcarro").style.display = 'none';
		document.getElementById("botoncancelarcarro").style.display = 'none';


}


function habilitarcarro(){
	var listacajas = document.getElementsByTagName("input");

		for(var i=4 ; i < 6;i++){
			listacajas[i].disabled = false;
		}
		document.getElementsByTagName("input")[4].focus();


}
