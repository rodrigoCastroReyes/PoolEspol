/**
 *NOTA LOS EVENTOS DE VALIDACIONES SE ACTIVAN CUANDO PRESIONAN
 *LA TECLA ENTERRRRR
 *
 *
 *
 * 
 */

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



