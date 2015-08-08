var HomeController = require('./controller/HomeController');

var express=require('express');
var router=express.Router();

router.get('/',HomeController.Index);
router.post('/login',HomeController.LogIn);
router.get('/noticias',HomeController.Noticias);
router.get('/perfil',HomeController.Perfil);
router.get('/chat',HomeController.Mensajes);
router.get('/notificaciones',HomeController.Notificaciones);
router.get('/cerrar_sesion',HomeController.Cerrar);
router.post('/other',HomeController.Other);

module.exports = router;