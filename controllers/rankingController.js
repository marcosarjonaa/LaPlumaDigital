const db = require('../db.js');
const moment = require('moment');

exports.ranking = (req, res) => {
    db.query(
        'SELECT RANK() OVER (ORDER BY COUNT(p.idLibro) DESC) as ranking, l.Titulo, l.Foto, p.idLibro as idLibro FROM Publicaciones p JOIN Libros l ON p.idLibro = l.idLibro GROUP BY p.idLibro ORDER BY COUNT(p.idLibro) DESC'
    , (err, rank)=> {
        if (err) {
            return res.send('Fallo a la hora del ranking' + err)
        }
        if (rank.length === 0) {
            return res.send('Fallo en la respuesta')
        }
        db.query(
            'SELECT RANK() OVER (ORDER BY COUNT(p.idAutor) DESC) as ranking, a.Nombre, a.Foto, p.idAutor as idAutor FROM Publicaciones p JOIN Autores a ON a.idAutor = p.idAutor GROUP BY p.idAutor ORDER BY COUNT(p.idAutor) DESC',
            (err, rankA) => {
                if(err){
                    return res.send('Fallo a la hora del ranking autores' + err)
                }
                if(rankA.length === 0) {
                    return res.send('Fallo en la respuesta')
                }
                res.render('ranking/ranking', {rankings: rank, rankA: rankA})
            }
        )
    })
}