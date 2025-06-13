const express = require('express');
const router = express.Router();
const sobreNosotrosController = require('../controllers/sobreNosotrosController');

router.get('/', sobreNosotrosController.sobreNosotros)

module.exports = router;
