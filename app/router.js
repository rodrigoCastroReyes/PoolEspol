var LoginController = require('./controller/LoginController');
var NoticiasController = require('./controller/NoticiasController.js');
var PerfilController = require('./controller/PerfilController');
var MensajesController = require('./controller/MensajesController');
var NotificacionesController = require('./controller/NotificacionesController');
var LogoutController = require('./controller/LogoutController');

var express=require('express');
var router=express.Router();

router.get('/',LoginController.index);
router.post('/login',LoginController.login);
router.post('/autenticar',LoginController.autenticar);
router.post('/registrar',LoginController.registrar);

router.get('/noticias',NoticiasController.noticias);
router.get('/Rutas',NoticiasController.obtenerRutasNoticias);
router.get('/Aventones', NoticiasController.obtenerAventonesNoticias);

router.get('/perfil',PerfilController.perfil);
router.post('/actualizarperfil',PerfilController.actualizarPerfil);
router.post('/actualizarcarro',PerfilController.actualizarCarro);
router.get('/misRutas',PerfilController.obtenerMisRuta);

router.get('/cerrar_sesion',LogoutController.cerrar);

router.get('/chat',MensajesController.mensajes);
//router.get('/conversaciones',MensajesController.enviarConversaciones);
router.get('/chat/conversacion',MensajesController.enviarConversacion);
router.get('/nuevaConversacion',MensajesController.nuevaConversacion);
router.get('/chat/persona',MensajesController.obtenerPersona);
router.get('/chat/nolidos',MensajesController.obtenerNoLeidos);
router.get('/chat/leermensajes',MensajesController.leerMensajes);

router.get('/notificaciones',NotificacionesController.notificaciones);
router.get('/obtenerNotificaciones',NotificacionesController.obtenerNotificaciones);
router.get('/pasajeros',NoticiasController.obtenerPasajeros);

module.exports = router;
