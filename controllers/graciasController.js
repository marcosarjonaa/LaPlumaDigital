const db = require('../db.js');
const moment = require('moment');

exports.gracias = (req, res) => {
    res.render('/gracias/gracias')
}