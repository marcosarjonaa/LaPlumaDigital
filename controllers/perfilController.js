const db = require('../db.js');
const moment = require('moment');

exports.perfil = (req, res) => {    
    const id = req.user.idUsuario;
    db.query('SELECT Nombre, Descripcion, Foto FROM Usuario WHERE idUsuario = ?', [id], (err, user) => {
        if(err) {
            return res.send('Error buscando el usuario')
        }
        db.query('SELECT p.idPublicaciones, p.idLibro, p.Titulo, p.Contenido, l.Foto, Likes FROM Publicaciones p JOIN Libros l ON l.idLibro = p.idLibro WHERE idUsuario=?', [id], (err, publicaciones) => {
            if(err){
                return res.send('Error buscando publicaciones')
            }
            usuario = user[0]
            res.render('miperfil/perfil', {usuario: usuario, publicaciones: publicaciones})
        })
    })
}
