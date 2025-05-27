const db = require('../db.js');

exports.perfil = (req, res) => {    
    const id = req.user.idUsuario;
    db.query('SELECT Nombre, Descripcion, Foto FROM Usuario WHERE idUsuario = ?', [id], (err, user) => {
        if(err) {
            return res.send('Error buscando el usuario')
        }
        db.query('SELECT p.idPublicaciones, p.idLibro, p.Titulo, p.Contenido, l.Foto FROM Publicaciones p JOIN Libros l ON l.idLibro = p.idLibro WHERE idUsuario=?', [id], (err, publicaciones) => {
            if(err){
                return res.send('Error buscando publicaciones')
            }
            db.query('SELECT RANK() OVER (ORDER BY COUNT(p.idLibro) DESC) as ranking, COUNT(*) as contador, l.Titulo, l.Foto, p.idLibro as idLibro FROM Publicaciones p JOIN Libros l ON p.idLibro = l.idLibro WHERE p.idUsuario= ? GROUP BY p.idLibro, l.Titulo, l.Foto ORDER BY COUNT(p.idLibro) DESC', [id], (err, ranking) => {
                if(err) {
                    return res.send('Error buscando el rango')
                }
                usuario = user[0]
                res.render('miperfil/perfil', {usuario: usuario, publicaciones: publicaciones, rankings: ranking})
            })
        })
    })
}

exports.del = (req, res) => {
    const idPublicaciones = req.params.id;
    if(isNaN(idPublicaciones)){
        res.send('Error borrando '+ idPublicaciones);
    }else {
        db.query('DELETE FROM Publicaciones WHERE idPublicaciones=?', [idPublicaciones], (error) => {
            if(error) {
                res.send('Error en el post de borrar publicaciones')
            }else {
                res.redirect('/perfil');
            }
        });
    }
};