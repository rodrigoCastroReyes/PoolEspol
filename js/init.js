function iniciarSesion(event){
	var element=event.target;
	if(element.getAttribute("id")=="boton_sesion"){
		//si se hace click en el boton de iniciar sesion en la pantalla de inicio
		document.getElementById("inicio").setAttribute("class","invisible");//se oculta la pantalla de inicio
		document.getElementById("inicio_sesion").setAttribute("class","InicioSesion columna_flexible");//se agrega la pantalla de inciar sesion
	}else{
		//si se hace click en el enlace para iniciar sesion en la pantalla de registro
		document.getElementById("inicio_registro").setAttribute("class","invisible");//se oculta la pantalla de inicio
		document.getElementById("inicio_sesion").setAttribute("class","InicioSesion columna_flexible");//se agrega la pantalla de inciar sesion
	}
}

function iniciarRegistro(event){
	var element=event.target;
	if(element.getAttribute("id")=="boton_registro"){
		document.getElementById("inicio").setAttribute("class","invisible");//se oculta la pantalla de inicio
		document.getElementById("inicio_registro").setAttribute("class","InicioRegistro columna_flexible");//se agrega la pantalla de registro
	}else{
		//si se hace click en el enlace para iniciar sesion en la pantalla de registro
		document.getElementById("inicio_sesion").setAttribute("class","invisible");//se oculta la pantalla de inicio sesion
		document.getElementById("inicio_registro").setAttribute("class","InicioRegistro columna_flexible");//se agrega la pantalla de registro		
	}
}

function volverInicio(){
	document.getElementById("inicio_registro").setAttribute("class","invisible");//se oculta la pantalla de registro
	document.getElementById("inicio_sesion").setAttribute("class","invisible");//se oculta la pantalla de registro
	document.getElementById("inicio").setAttribute("class","Inicio columna_flexible");//se agrega la pantalla de inicio

	//Reiniciar los valores de los campos que hayan sido ingresados
	var inputs=document.querySelectorAll("input[type='text']");
	var passwords=document.querySelectorAll("input[type='password']");
	for(var i=0;i<inputs.length;i++){
		inputs[i].value="";
	}

	for(var i=0;i<passwords.length;i++){
		passwords[i].value="";
	}
}

function inicializacion(){
	var boton_sesion=document.getElementById("boton_sesion");
	boton_sesion.addEventListener('click',iniciarSesion,false);

	var boton_registrar=document.getElementById("boton_registro");
	boton_registrar.addEventListener('click',iniciarRegistro,false);

	document.getElementById("enlace_iniciar_sesion").addEventListener('click',iniciarSesion,false);
	document.getElementById("enlace_registro").addEventListener('click',iniciarRegistro,false);
}

window.addEventListener('load',inicializacion,false);