var LoginController = require('./controller/LoginController');
var RegistroController = require('./controller/RegistroController');
var NoticiasController = require('./controller/NoticiasController.js');
var PerfilController = require('./controller/PerfilController');
var MensajesController = require('./controller/MensajesController');
var NotificacionesController = require('./controller/NotificacionesController');
var LogoutController = require('./controller/LogoutController');

var express=require('express');
var router=express.Router();

router.get('/',LoginController.index);
router.post('/login',LoginController.login);
router.post('/registro',RegistroController.registrar);
router.get('/noticias',NoticiasController.noticias);
router.get('/Rutas',NoticiasController.obtenerRutasNoticias);
router.get('/perfil',PerfilController.perfil);
router.post('/actualizarperfil',PerfilController.actualizarPerfil);
router.post('/actualizarcarro',PerfilController.actualizarCarro);
router.get('/chat',MensajesController.mensajes);
router.get('/notificaciones',NotificacionesController.notificaciones);
router.get('/cerrar_sesion',LogoutController.cerrar);


router.get('/conversaciones',MensajesController.enviarConversaciones);
router.get('/conversacion',MensajesController.enviarConversacion);


module.exports = router;
