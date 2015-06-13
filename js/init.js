function iniciarSesion(event){
	var element=event.target;
	if(element.getAttribute("id")=="boton_sesion"){
		//si se hace click en el boton de iniciar sesion en la pantalla de inicio
		document.getElementById("inicio").setAttribute("class","invisible");//se oculta la pantalla de inicio
		document.getElementById("inicio_sesion").setAttribute("class","columna_flexible");//se agrega la pantalla de inciar sesion
	}else{
		//si se hace click en el enlace para iniciar sesion en la pantalla de registro
		document.getElementById("inicio_registro").setAttribute("class","invisible");//se oculta la pantalla de inicio
		document.getElementById("inicio_sesion").setAttribute("class","columna_flexible");//se agrega la pantalla de inciar sesion
	}
}

function iniciarRegistro(){
	document.getElementById("inicio").setAttribute("class","invisible");//se oculta la pantalla de inicio
	document.getElementById("inicio_registro").setAttribute("class","columna_flexible");//se agrega la pantalla de registro
}

function volverInicio(){
	document.getElementById("inicio_registro").setAttribute("class","invisible");//se oculta la pantalla de registro
	document.getElementById("inicio_sesion").setAttribute("class","invisible");//se oculta la pantalla de registro
	document.getElementById("inicio").setAttribute("class","columna_flexible");//se agrega la pantalla de inicio
}

function inicializacion(){
	var boton_sesion=document.getElementById("boton_sesion");
	boton_sesion.addEventListener('click',iniciarSesion,false);

	var boton_registrar=document.getElementById("boton_registro");
	boton_registrar.addEventListener('click',iniciarRegistro,false);

	document.getElementById("enlace_iniciar_sesion").addEventListener('click',iniciarSesion,false);

}

window.addEventListener('load',inicializacion,false);