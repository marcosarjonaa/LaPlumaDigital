const db = require('../db.js');
const moment = require('moment');

exports.libros = (req, res) => {
    db.query('SELECT * FROM Libros', (err, response) => {
        if(err){ //Compruebo si hay algún error 
            res.send("Ha habido un error listando los libros");
            // Y si lo hay mando la respuesta diciendo el fallo
        } else {
            // En caso de que no lo haya
            response.forEach(libro => {
                /*
                    Compruebo que si los libros tienen fecha
                    y si tienen, que debería, lo que hago es 
                    formatearla para que cumpla el formato que quiero
                */
                if(libro.Fecha){
                    libro.Fecha = moment(libro.Fecha).format("YYYY-MM-DD");
                }else {
                    res.send("El libro con id: "+ libro.idLibros + 
                        " no tiene fecha. Por favor eliminalo de la bbdd"
                    );
                }
            });
            res.render('libros/listado', {libro: response});
        }
    })
}

exports.add = (req, res) => {
    res.render('libros/add');
}

exports.addPost = (req, res) => {
    const {} = req.body;  
    db.query(
        'INSERT INTO Libros () VALUES ()',
        (error, respuesta) => {
            if(error) {
                res.send("Error insertando libros")
            } else {
                res.redirect('/libros')
            }
        }
    );  
};

exports.del = (req, res) => {
    const { id } = req.params;
    if(isNaN(id)){
        res.send('Parámetros incorrectos')
    } else {
        db.query('SELECT * FROM Libros WHERE idLibro=?', [id], (error, respuesta) => {
            if (error) {
                res.send('Error al intentar borrar');
            } else {
                if (respuesta.length>0) {
                    const libros = respuesta[0];
                    if (libros.fecha) {
                        libros.fecha = moment(libros.fecha).format('YYYY-MM-DD');
                    } else {
                        res.send("El libro con id: "+ libro.idLibros + 
                            " no tiene fecha. Por favor eliminalo de la bbdd"
                        );
                    }
                    res.render('libros/del', {libro: respuesta[0]})
                }else {
                    res.send('Error al intentar borrar el libro')
                }
            }
        })
        if (resp) {
            
        }
    }
}

exports.delPost = () => {
    const { id } = req.body;
    if(isNaN(id)){
        res.send('Error borrando');
    }else {
        db.query('DELETE FROM Libros WHERE id=?', [id], (error) => {
            if(error) {
                res.send('Error en el post de borrar libro: '+ error)
            }else {
                res.redirect('/libros');
            }
        });
    }
};

