const express = require('express');
const router = express.Router();
const rankingController = require('../controllers/rankingController');


router.get('/', rankingController.ranking)

module.exports = router;
