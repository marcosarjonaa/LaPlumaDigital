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
                    res.send("El libro con id: "+ libro.idLibro + 
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
    const {idAutor, Titulo, Sinapsis, Paginas, Fecha, Foto} = req.body;  
    db.query(
        'INSERT INTO Libros (idAutor, Titulo, Sinapsis, Paginas, Fecha, Foto) VALUES (?,?,?,?,?,?)',
        [idAutor, Titulo, Sinapsis, Paginas, Fecha, Foto],
        (error, respuesta) => {
            if(error) {
                res.send("Error insertando libros")
            } else {
                res.redirect('/libros')
            }
        }
    );  
};

exports.edit = (req, res) => {
    const { idLibro } = req.params;
    if(isNaN(idLibro)) {
        res.send('Parámetros incorrectos en el edit de formulario')
    } else {
        db.query('SELECT * FROM Libros WHERE idLibro=?', [idLibro], (error, respuesta) => {
            if (error) {
                res.send('Error actualizando el libro');
              } else {
                if (respuesta.length > 0) {
                  const libro = respuesta[0];
                  if (libro.Fecha) {
                    libro.Fecha = moment(libro.Fecha).format('YYYY-MM-DD');
                  }else {
                    res.send("El libro con id: "+ libro.idLibro + 
                        "El libro no tiene fecha. Por favor eliminalo de la bbdd"
                    );
                }
                  res.render('libros/edit', { libro });
                } else {
                  res.send('Error actualizando el libro, el id es inc');
                }
              }
        })
    }
}

exports.editPost= (req, res) => {
    const {} = req.body;
    if (isNaN(id)) {
        res.send('Error actualizando porque el id no es un número');
    } else {
        db.query(
          'UPDATE libros SET idAutor=?, Titulo=?, Sinapsis=?, Paginas=?, Fecha=?, Foto=?',
          [idAutor, Titulo, Sinapsis, Paginas, Fecha, Foto],
          (error) => {
            if (error) {
              res.send('Error en el post de actualizar: ' + error);
            } else res.redirect('/libros');
          }
        );
    }
}

exports.del = (req, res) => {
    const { idLibro } = req.params;
    if(isNaN(idLibro)){
        res.send('Parámetros incorrectos')
    } else {
        db.query('SELECT * FROM Libros WHERE idLibro=?', [idLibro], (error, respuesta) => {
            if (error) {
                res.send('Error al intentar borrar');
            } else {
                if (respuesta.length>0) {
                    const libros = respuesta[0];
                    if (libros.Fecha) {
                        libros.Fecha = moment(libros.Fecha).format('YYYY-MM-DD');
                    } else {
                        res.send("El libro con id: "+ libro.idLibro + 
                            " no tiene fecha. Por favor eliminalo de la bbdd"
                        );
                    }
                    res.render('libros/del', {libro: respuesta[0]})
                }else {
                    res.send('Error al intentar borrar el libro')
                }
            }
        })
    }
}

exports.delPost = () => {
    const { idLibro } = req.body;
    if(isNaN(idLibro)){
        res.send('Error borrando');
    }else {
        db.query('DELETE FROM Libros WHERE idLibro=?', [idLibro], (error) => {
            if(error) {
                res.send('Error en el post de borrar libro: '+ error)
            }else {
                res.redirect('/libros');
            }
        });
    }
};

