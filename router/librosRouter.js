const express = require('express');
const router = express.Router();
const librosController = require('../controllers/librosController');

//Te lleva al listado general
router.get('/', librosController.libros);

//Rutas para añadir
router.get('/add', librosController.add);
router.post('/add', librosController.addPost);

//Rutas para editar
router.get('/edit/:id', librosController.edit);
router.post('/edit/:id', librosController.editPost);

//Rutas para eliminar
router.get('/del/:id', librosController.del);
router.post('/del/:id', librosController.delPost);

//Rutas para ver los detalles de un libro.
router.get('/ver/:id', librosController.ver);

//Ruta para buscar un libro según titulo
router.post('/verLibro', librosController.buscar);

module.exports = router