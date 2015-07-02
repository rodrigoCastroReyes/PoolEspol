function habilitarcajasusuario(){
	document.getElementsByClassName("candado").style.display = "flex";
	document.getElementsByClassName("cancelado").style.display = "flex";
	document.getElementById("labelNombre").style.background ='white';
	document.getElementById("labelApellido").style.background ='white';
	document.getElementById("labelCelular").style.background = 'white';
	document.getElementById("labelsexo").style.background='white';
	document.getElementById("labelNombre").disabled=false;
	document.getElementById("labelApellido").disabled=false;
	document.getElementById("labelCelular").disabled=false;
	document.getElementById("labelsexo").disabled=false;
	document.getElementById("botonusuario").style.display = 'none';
	//document.getElementsByClassName("datos")[0].style.marginbottom = "25px"
	
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
	
}