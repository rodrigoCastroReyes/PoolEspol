var LoginController = require('./controller/LoginController');
var NoticiasController = require('./controller/NoticiasController.js');
var PerfilController = require('./controller/PerfilController');
var MensajesController = require('./controller/MensajesController');
var NotificacionesController = require('./controller/NotificacionesController');
var LogoutController = require('./controller/LogoutController');
var PaginaDesarrolladores = require('./controller/PaginaDesarrolladores');
var express=require('express');
var router=express.Router();

router.get('/',LoginController.index);
router.post('/login',LoginController.login);
router.post('/autenticar',LoginController.autenticar);
router.post('/registrar',LoginController.registrar);

router.get('/noticias',NoticiasController.noticias);
router.get('/Rutas',NoticiasController.obtenerRutasNoticias);
router.get('/Aventones', NoticiasController.obtenerAventonesNoticias);
router.get('/InfoUsuario',NoticiasController.obtenerUsuarioInfo);

router.get('/perfil',PerfilController.perfil);
router.post('/actualizarperfil',PerfilController.actualizarPerfil);
router.post('/actualizarcarro',PerfilController.actualizarCarro);
router.get('/misRutas',PerfilController.obtenerMisRuta);
router.get('/misAventones',PerfilController.obtenerMisAventones);
router.get('/rutasunidas', PerfilController.obtenerRutasUnidas);
router.get("/aventonesdados", PerfilController.obtenerAventonesDados);

router.get('/cerrar_sesion',LogoutController.cerrar);

router.get('/chat',MensajesController.mensajes);
//router.get('/conversaciones',MensajesController.enviarConversaciones);
router.get('/chat/conversacion',MensajesController.enviarConversacion);
router.get('/nuevaConversacion',MensajesController.nuevaConversacion);
router.get('/chat/persona',MensajesController.obtenerPersona);
router.get('/chat/nolidos',MensajesController.obtenerNoLeidos);
router.get('/chat/leermensajes',MensajesController.leerMensajes);
router.get('/chat/obtenerPersonaNick',MensajesController.obtenerPersonaByNick);
router.get('/chat/obtenerPersonaNombre',MensajesController.obtenerPersonaByNombre);
router.get('/chat/obtenerPersonaApellido',MensajesController.obtenerPersonaByApellido);

router.get('/notificaciones',NotificacionesController.notificaciones);
router.get('/obtenerNotificaciones',NotificacionesController.obtenerNotificaciones);
router.get('/masInformacion',NotificacionesController.masInformacion);
router.get('/pasajeros',NoticiasController.obtenerPasajeros);

router.get('/eliminarRuta', PerfilController.eliminarRuta);
router.get('/desarrolladores',PaginaDesarrolladores.index);
router.post('/photo',PerfilController.transmisionPerfil);

module.exports = router;
