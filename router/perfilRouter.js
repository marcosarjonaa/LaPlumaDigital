const express = require('express');
const router = express.Router();
const perfilController = require('../controllers/perfilController');


router.get('/', perfilController.perfil)
router.post('/del/:id', perfilController.del)

router.post('/verPerfil', perfilController.buscar)

module.exports = router;
