actual=null;
function mostrarChat(evt){
	if(actual!=null){
		actual.css("display","none");
	}
	personas.classList.remove("visible");
	personas.classList.add("invisible");
	$('#'+this.dataset.per).css("display","flex");
	actual=$('#'+this.dataset.per);

}

function regresar(evt){
	personas.classList.remove("invisible");
	personas.classList.add("visible");
	if(actual!=null){
		actual.css("display","none");
	}

}




function inicializar(){
	$('.persona').click(mostrarChat);
	$('.regresar').click(regresar);
}







window.addEventListener('load', inicializar, false);