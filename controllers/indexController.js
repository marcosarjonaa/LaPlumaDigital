const db = require('../db.js');
const moment = require('moment');

exports.publicaciones = (req, res) => {
    db.query('SELECT p.idPublicaciones, p.idUsuario, p.idLibro, p.Titulo, p.Contenido, l.Foto as fotoLibro, u.Foto as fotoUsuario FROM Publicaciones p JOIN Libros l ON l.idLibro = p.idLibro JOIN Usuario u ON u.idUsuario = p.idUsuario LIMIT 20', (err, publicaciones) => {
        if(err){
            return res.send('Error buscando publicaciones')
        }
        res.render('index', {publicaciones: publicaciones})
    })
}