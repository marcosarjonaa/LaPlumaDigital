const express = require('express');
const router = express.Router();
const subeTuLibroController = require('../controllers/subeTuLibroController');


router.get('/', subeTuLibroController.formulario)
router.post('/', subeTuLibroController.formularioPost)

module.exports = router;