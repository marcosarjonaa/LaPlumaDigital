const express = require('express');
const router = express.Router();
const graciasController = require('../controllers/graciasController');


router.get('/', graciasController.gracias)

module.exports = router;
