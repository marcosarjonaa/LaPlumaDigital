const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');


router.get('/', registerController.register)
router.post('/', registerController.registerPost);

module.exports = router;
