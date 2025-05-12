const express = require('express');
const router = express.Router();
const registroController = require('../controllers/registroController');


router.get('/register', registroController.register)
router.post('/register', registroController.registerPost);

module.exports = router;
