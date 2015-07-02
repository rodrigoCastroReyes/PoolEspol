function iniciar(){
	document.getElementById("botonAutenticar").addEventListener("click",autenticar,false);
}

function autenticar(){
	var valid=document.autenticacion.checkValidity();
	if(valid){
		var campos_registro=document.getElementById("registrar").getElementsByTagName("input");
		var i=0;
		var campo;
		for(i=0 ; i < campos_registro.length; i++){
			campo=campos_registro[i];
			if(campo.name=="nombre"){
				campo.value="RODRIGO FABRICIO";
			}else if (campo.name=="apellido"){
				campo.value="CASTRO REYES";
			}else{
				campo.disabled=false;
			}
		}
		document.getElementById("botonRegistro").disabled=false;
		//document.autenticacion.submit();
	}else{
		
		alert("Escribe bien chucha!!");

	}

}

window.addEventListener('load',iniciar,false);