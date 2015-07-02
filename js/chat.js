actual=null;
function mostrarChat(evt){
	if(actual!=null){
		actual.css("display","none");
	}
	$('#'+this.dataset.per).css("display","flex");
	actual=$('#'+this.dataset.per);
}

function enviarMensaje(evt){

}




function inicializar(){
	$('.persona').click(mostrarChat);

}







window.addEventListener('load', inicializar, false);