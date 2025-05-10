const express = require('express');
const router = express.Router();
const autorController = require('../controllers/autorController');

//Te lleva al listado general
router.get('/', autorController.autores);

//Rutas para añadir
router.get('/add', autorController.add);
router.post('/add', autorController.addPost);

//Rutas para editar
router.get('/edit/:id', autorController.edit);
router.post('/edit/:id', autorController.editPost);

//Rutas para eliminar
router.get('/del/:id', autorController.del);
router.post('/del/:id', autorController.delPost)

//Rutas para ver los detalles de un libro.
router.get('/ver/:id', autorController.ver)

module.exports = router