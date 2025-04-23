const express = require('express');
const router = express.Router();
const librosController = require('../controllers/librosController');

//Te lleva al crud general
router.get('/', librosController.libros);

//Rutas para añadir
router.get('/add', librosController.add);
router.post('/add', librosController.addPost);

//Rutas para editar
router.get('/edit/:id', librosController.edit);
router.post('/edit/:id', librosController.editPost);

//Rutas para eliminar
router.get('/del/:id', librosController.del);
router.get('/del/:id', librosController.delPost)

module.exports = router