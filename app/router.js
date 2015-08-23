var LoginController = require('./controller/LoginController');
var NoticiasController = require('./controller/NoticiasController');
var PerfilController = require('./controller/PerfilController');
var MensajesController = require('./controller/MensajesController');
var NotificacionesController = require('./controller/NotificacionesController');
var LogoutController = require('./controller/LogoutController');

var express=require('express');
var router=express.Router();

router.get('/',LoginController.index);
router.post('/login',LoginController.login);
router.get('/noticias',NoticiasController.noticias);
router.get('/perfil',PerfilController.perfil);
router.get('/chat',MensajesController.mensajes);
router.get('/notificaciones',NotificacionesController.notificaciones);
router.get('/cerrar_sesion',LogoutController.cerrar);

module.exports = router;