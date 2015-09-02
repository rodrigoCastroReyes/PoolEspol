function iniciar(){
	document.getElementById("botonAutenticar").addEventListener("click",autenticar,false);
	document.getElementById("botonRegistro").addEventListener("click",registrar,false);
	document.getElementById("botonInicioSesion").addEventListener("click",login,false);
}

function opcionesCarroOn(){
	input=event.target;
	if(input.checked){
		placaLabel.setAttribute("class","etiqueta visible");
		capacidadLabel.setAttribute("class","etiqueta visible");
		placa.required=true;
		placa.setAttribute("class","entrada_texto visible");
		capacidad.required=true;
		capacidad.setAttribute("class","entrada_texto visible");
		placa.disabled=false;
		capacidad.disabled=false;
	}
}

function opcionesCarroOff(){
	input=event.target;
	if(input.checked){
		placaLabel.setAttribute("class","invisible");
		capacidadLabel.setAttribute("class","invisible");
		placa.required=false;
		placa.setAttribute("class","invisible");
		capacidad.required=false;
		capacidad.setAttribute("class","invisible");
		placa.disabled=true;
		capacidad.disabled=true;
	}
}

function procesarInformacionUsuario(event){
	//json = {nombre,apellido,nick,sexo}
	//var respond = event.target.responseText;
	//var json = JSON.parse(respond);
	//nombre.value=json.nombre;
	//apellido.value=json.apellido;
	//nickname.value=nick;
	var respond = event.target.responseText;
	var json = JSON.parse(respond);
	if(json.error==null){
		console.log(json);
		nombre.value= json.NOMBRES;
		apellido.value= json.APELLIDOS;
		inputs=document.getElementById("formulario_registro_usuario").getElementsByTagName("input");
		nickname.value= inputs[0].value;
		sexo= json.SEXO;
		if(sexo=="M"){
			masculino.checked = true;
		}else{
			femenino.checked = true;
		}
		siCarro.disabled=false;
		noCarro.disabled=false;
	}else{
		alert(json.error);
	}
}

function autenticar(){
	var valid=document.autenticacion.checkValidity();
	if(valid){
		//si se ingresa de forma correcta el nombre y la contraseña se puede ingresar la info de registro
		//se habilita los campos de nombre apellido y sexo con su valores fijos
		/*
		var campos_registro=document.getElementById("registrar").getElementsByTagName("input");
		var campo;
		for(var i=0 ; i < campos_registro.length; i++){
			campo=campos_registro[i];
			campo.disabled=false;
			if(campo.name=="nickname"){
				campo.value=document.getElementById("usuario").value;
			}
		}
		*/
		telefono.disabled=false;
		document.getElementById("botonRegistro").disabled=false;//se habilita el boton de registro
		var inputs=document.querySelectorAll("#autenticacion input");//se cambia de color los inputs
		for(var i=0; i<inputs.length;i++){
			inputs[i].style.background="white";
		}
		var request = new XMLHttpRequest();
		var url="/autenticar";
		request.open("POST",url,true);
		request.addEventListener('load',procesarInformacionUsuario ,false);
		request.setRequestHeader("Content-Type","application/json;charset=UTF-8");
		inputs=document.getElementById("formulario_registro_usuario").getElementsByTagName("input");
		usuario=inputs[0].value;
		password=inputs[1].value;
		request.send(JSON.stringify({usuario:usuario,contraseña:password}));
	}else{
		var inputs=document.querySelectorAll("#autenticacion input");
		for(var i=0; i<inputs.length;i++){
			if(inputs[i].validity.valid==false){
				inputs[i].style.background="#ffccc0";//se cambia de color los inputs con campos incorrectos
			}
		}
		alert("Ingrese los campos correctamente");
	}
}

function respuestaRegistro(event){
	var respond = event.target.responseText;
	var json = JSON.parse(respond);
	alert(json.mensaje);

}

function registrar(){
	var valid=document.registrar.checkValidity();
	if(valid){
		var json={};
		json.usuario={};
		json.carro={};
		var inputs=document.querySelectorAll("#registrar input");//se cambia de color los inputs
		for(var i=0; i<inputs.length;i++){
			inputs[i].style.background="white";
		}
		//document.registrar.submit();
		var request = new XMLHttpRequest();
		var url="/autenticar";
		request.open("POST",url,true);
		request.addEventListener('load',respuestaRegistro ,false);
		request.setRequestHeader("Content-Type","application/json;charset=UTF-8");
		var campos_registro=document.getElementById("registrar").getElementsByTagName("input");
		var campo;
		for(var i=0 ; i < campos_registro.length; i++){
			campo=campos_registro[i];
			campo.disabled=false;
		}
		json.nombre=nombre;
		json.apellido=apellido;
		json.nick=nick;
		json.telefono=telefono;
		if(masculino.checkValidity==true){
			json.sexo="masculino";
		}else{
			json.sexo="femenino";
		}
		json.usuario.sexo=nombre;
		json.carro=siCarro.checkValidity;
		if(siCarro.checkValidity==true){
			json.placa=placa.value;
			json.capacidad=capacidad.value;
		}
		var campos_registro=document.getElementById("registrar").getElementsByTagName("input");
		var campo;
		for(var i=0 ; i < campos_registro.length; i++){
			campo=campos_registro[i];
			campo.disabled=true;
		}
		console.log(json);
		request.send(json);

	}else{
		var inputs=document.querySelectorAll("#registrar input");
		for(var i=0; i<inputs.length;i++){
			if(inputs[i].validity.valid==false){
				inputs[i].style.background="#ffccc0";//se cambia de color los inputs con campos incorrectos
			}
		}
	}
}

function login(){
	var valid=document.formulario_inicio_sesion.checkValidity();
	if(valid){ // uso del servicio web se encuentra en el LoginController.js
		document.formulario_inicio_sesion.submit();
	}else{
		var inputs=document.querySelectorAll("#formulario_inicio_sesion input");
		for(var i=0; i<inputs.length;i++){
			if(inputs[i].validity.valid==false){
				inputs[i].style.background="#ffccc0";//se cambia de color los inputs con campos incorrectos
			}
		}
		alert("Ingrese los campos correctamente");
	}
}

window.addEventListener('load',iniciar,false);
