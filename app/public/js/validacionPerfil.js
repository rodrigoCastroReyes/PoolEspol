/**
 *NOTA LOS EVENTOS DE VALIDACIONES SE ACTIVAN CUANDO PRESIONAN
 *LA TECLA ENTERRRRR
 * 
 */
var nombre, apellido,cedula,nickname;
var placa,capacidad;
var datosUsuario= new Object();
var datosCarro= new Object();
var socket;

function editarUsuario(){
	var inputs = document.querySelectorAll("#datosPersona input");//cajas de texto para editar datos
	//estilo de cajas de texto deben cambiar para el ingreso de informacion
	habilitarEntradas(inputs,'white');
	//se deshabilita el lapiz y se muestra el boton guardar y cancelar
	botonEditarUsuario.style.display='none'
	botonGuardarUsuario.style.display = 'flex';
	botonCancelarUsuario.style.display = 'flex';

	//se guardan los datos actuales del usuario
	nombre=inputs[0].value;
 	apellido=inputs[1].value;
 	cedula=inputs[2].value;
 	nickname=inputs[3].value;
}

function habilitarEntradas(inputs,color){
	for(var i=0;i<inputs.length;i++){
		if(i==0){//foco en la primera caja de texto 
			inputs[i].focus();
		}
		inputs[i].style.background=color;
		inputs[i].disabled=false;//se habilita la caja de texto 
	}
}

function cancelarEdicion(){
	var inputs = document.querySelectorAll("#datosPersona input");//cajas de texto para editar datos
	//estilo de cajas de texto deben cambiar
	$(".error").fadeOut().remove();
	deshabilitarEntradas(inputs,'#0080FB');
	botonEditarUsuario.style.display='flex'
	botonGuardarUsuario.style.display = 'none';
	botonCancelarUsuario.style.display = 'none';
	
	inputs[0].value=nombre;
 	inputs[1].value=apellido;
 	inputs[2].value=cedula;
 	inputs[3].value=nickname;
}

function deshabilitarEntradas(inputs,color){
	for(var i=0;i<inputs.length;i++){
		inputs[i].style.background=color;
		inputs[i].disabled=true;//se deshabilita la caja de texto 
	}
}

function guardarDatos(evt){
	var val=document.forms["datosPersona"].checkValidity();
	var inputs = document.querySelectorAll("#datosPersona input");//cajas de texto para editar datos
	//input: nombre,apellido,cedula,nickname
	$(".error").fadeOut().remove();
	if(val==false){
		if(!inputs[0].checkValidity()){
			$("#datosPersona .input_text:nth-child(1)").focus().after('<span class="error">Solo puede contener letras!</span>'); 
		}
		if(!inputs[1].checkValidity()){
			$("#datosPersona .input_text:nth-child(2)").focus().after('<span class="error">Solo puede contener letras!</span>'); 
		}
		if(!inputs[2].checkValidity()){
			$("#datosPersona .input_text:nth-child(3)").focus().after('<span class="error">Solo se ingresa numeros</span>'); 
		}
		if(!inputs[3].checkValidity()){
			$("#datosPersona .input_text:nth-child(4)").focus().after('<span class="error">Solamente datos alfabeticos y de longitud mayor a 6 caracteres</span>'); 
		}
		inputs[0].focus();

	}else{
		/*
		@Descripcion esta funcion mediante peticion ajax envia los datos de este objeto
		al controlador perfil para actualizar datos a la base de datos
		@parameter datosUsuario
		*/
		botonEditarUsuario.style.display='flex'
		botonGuardarUsuario.style.display = 'none';
		botonCancelarUsuario.style.display = 'none';
		deshabilitarEntradas(inputs,'#0080FB');

		datosUsuario.nombre = inputs[0].value;
		datosUsuario.apellidos = inputs[1].value;
		datosUsuario.telefonos = inputs[2].value;
		datosUsuario.nick = inputs[3].value;
		ActualizarDatosUsuario(datosUsuario);


	}
}

function editarInfoAuto(){
	var inputs=document.querySelectorAll("#datosAuto input");
	
	habilitarEntradas(inputs,'white');//habilita las entradas de texto

	botonEditarAuto.style.display='none'
	botonGuardarAuto.style.display ='flex';
	botonCancelarAuto.style.display ='flex';
	
	placa=inputs[0].value;
	capacidad=inputs[1].value;
}

function cancelarEdicionAuto(){
	var inputs = document.querySelectorAll("#datosAuto input");
	$(".error").fadeOut().remove();
	deshabilitarEntradas(inputs,'#e2e4e6');//deshabilita las entradas de texto

	botonEditarAuto.style.display='flex'
	botonGuardarAuto.style.display ='none';
	botonCancelarAuto.style.display ='none';

	inputs[0].value=placa;
 	inputs[1].value=capacidad;

}

function guardarDatosAuto(evt){
	var val=document.forms["datosAuto"].checkValidity();
	var inputs = document.querySelectorAll("#datosAuto input");
	$(".error").fadeOut().remove();

	if(val==false){
		if(!inputs[0].checkValidity()){
			$("#datosAuto .input_text:nth-child(1)").focus().after('<span class="error">Debe tener al menos 6 caracteres alfanumerico</span>'); 
		}
		if(!inputs[1].checkValidity()){
			$("#datosAuto .input_text:nth-child(2)").focus().after('<span class="error">Este dato debe estar entre [1-6]</span>'); 
		}
		inputs[0].focus();
	}else{
		botonEditarAuto.style.display='flex'
		botonGuardarAuto.style.display ='none';
		botonCancelarAuto.style.display ='none';
		deshabilitarEntradas(inputs,'#e2e4e6');//deshabilita las entradas de texto
		datosCarro.placa = inputs[0].value;
		datosCarro.capacidad = inputs[1].value;
		ActualizarDatosCarro(datosCarro);
		alert("se guardo correctamente");
	}
}

function ActualizarDatosUsuario(datosUsurio){

$.ajax({
		url : '/actualizarperfil',

		data: datosUsurio,

		type: 'POST',

		success : function (){
			alert("Los datos se actualizaron con exito");

		},

		complete : function (){
			console.log("peticion realizada via ajax");
		}

	});
}

function ActualizarDatosCarro(datosCarro){

$.ajax({
		url : '/actualizarcarro',

		data: datosCarro,

		type: 'POST',

		success : function (){
			alert("Los datos se actualizaron con exito");

		},

		complete : function (){
			console.log("peticion realizada via ajax");
		}

	});
}

function inicio(){
	console.log("editar perfil");
	document.getElementById("botonEditarUsuario").addEventListener('click',editarUsuario,false);
	document.getElementById("botonCancelarUsuario").addEventListener('click',cancelarEdicion,false);
	document.getElementById("botonGuardarUsuario").addEventListener('click',guardarDatos,false);

	document.getElementById("botonEditarAuto").addEventListener('click',editarInfoAuto,false);
	document.getElementById("botonCancelarAuto").addEventListener('click',cancelarEdicionAuto,false);
	document.getElementById("botonGuardarAuto").addEventListener('click',guardarDatosAuto,false);
}



window.addEventListener('load',inicio,false);