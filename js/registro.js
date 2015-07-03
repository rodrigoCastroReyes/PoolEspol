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
				campo.disabled=true;
			}else if (campo.name=="apellido"){
				campo.value="CASTRO REYES";
				campo.disabled=true;
			}else if(campo.name=="sexo"){
				campo.disabled=true;
			}else{
				campo.disabled=false;
			}
		}
		document.getElementById("botonRegistro").disabled=false;
		//document.autenticacion.submit();
	}else{
		alert("Ingrese los campos correctamente");
	}

}

window.addEventListener('load',iniciar,false);