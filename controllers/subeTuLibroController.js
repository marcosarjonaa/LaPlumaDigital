const db = require('../db.js');
const moment = require('moment');
const nodemailer = require('nodemailer');

exports.formulario = (req, res) => {
    res.render('subeTuLibro/subeTuLibro')
}

exports.formularioPost = (req, res) => {
    const {Autor, Titulo, Sinapsis, Descripcion, Paginas, Fecha, Foto} = req.body;
    const sinapsisHTML = marked(Sinapsis);
    const descripcionHTML = marked(Descripcion);
    db.query('INSERT INTO Peticiones (Autor, Titulo, Sinapsis, Descripcion, Paginas, Fecha, Foto) VALUES (?,?,?,?,?,?,?)', 
        [Autor, Titulo, sinapsisHTML, descripcionHTML, Paginas, Fecha, Foto], 
        (err, subida) => {
            if(err) {
                return res.send("Fallo mandando datos." + Autor + ", " + Titulo + ", " + Sinapsis + ", " + Descripcion + ", " + Paginas + " " + Fecha + "" + Foto) 
            }
            res.render('gracias/gracias')
        }
    )
}