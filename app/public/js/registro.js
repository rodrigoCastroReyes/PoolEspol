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
	}
}

function procesarInformacionUsuario(event){
	//json = {nombre,apellido,nick,sexo}
	var respond = event.target.responseText;
	var json = JSON.parse(respond);
	nombre.value=json.nombre;
	apellido.value=json.apellido;
	nickname.value=nick;
	if(sexo=="M"){
		masculino.checked = true;
	}else{
		femenino.checked = true;
	}

}

function autenticar(){
	var valid=document.autenticacion.checkValidity();
	if(valid){
		//si se ingresa de forma correcta el nombre y la contraseña se puede ingresar la info de registro
		//se habilita los campos de nombre apellido y sexo con su valores fijos
		var campos_registro=document.getElementById("registrar").getElementsByTagName("input");
		var campo;
		for(var i=0 ; i < campos_registro.length; i++){
			campo=campos_registro[i];
			campo.disabled=false;
			if(campo.name=="nickname"){
				campo.value=document.getElementById("usuario").value;
			}
		}
		document.getElementById("botonRegistro").disabled=false;//se habilita el boton de registro
		var inputs=document.querySelectorAll("#autenticacion input");//se cambia de color los inputs
		for(var i=0; i<inputs.length;i++){
			inputs[i].style.background="white";
		}
		//document.autenticacion.submit();
		var request = new XMLHttpRequest();
		var url="/autenticar";
		request.open("POST",url,true);
		request.addEventListener('load',procesarInformacionUsuario ,false);
		request.setRequestHeader("Content-Type","application/json;charset=UTF-8");
		inputs=document.getElementById("formulario_registro_usuario").getElementsByTagName("input");
		usuario=inputs[0].value;
		password=inputs[1].value;
		console.log(usuario);
		console.log(password);
		request.send(JSON.stringify({usuario:usuario,contraseña:password}));
		alert("Autenticacion correcta");
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

function registrar(){
	var valid=document.registrar.checkValidity();
	if(valid){
		var inputs=document.querySelectorAll("#registrar input");//se cambia de color los inputs
		for(var i=0; i<inputs.length;i++){
			inputs[i].style.background="white";
		}
		document.registrar.submit();
		alert("Registro correcto");
	}else{
		var inputs=document.querySelectorAll("#registrar input");
		for(var i=0; i<inputs.length;i++){
			if(inputs[i].validity.valid==false){
				inputs[i].style.background="#ffccc0";//se cambia de color los inputs con campos incorrectos
			}
		}
		alert("Ingrese los campos correctamente");
	}
}

function login(){
	var valid=document.formulario_inicio_sesion.checkValidity();
	if(valid){
		/*autenticacion con espol, si el usuario existe en la base de espol, 
		enviar el formulario :document.formulario_inicio_sesion.submit();
		si no existe, vale trozo*/
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
