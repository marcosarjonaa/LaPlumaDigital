const db = require('../db.js');
const moment = require('moment');

exports.libros = (req, res) => {
    db.query('SELECT * FROM Libros', (err, response) => {
        if(err){ //Compruebo si hay algún error 
            res.send("Ha habido un error listando los libros", err);
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
            res.render('libros/list', {libros: response});
        }
    })
}

exports.add = (req, res) => {
    db.query('SELECT idAutor, Nombre FROM Autores', (err, autores)=> {
        if (err) {
            res.send("Hay un enviando autores"+ err)
        } else {
            res.render('libros/add', { autores });
        }
    })
}

exports.addPost = (req, res) => {
    const {idAutor, Titulo, Sinapsis, Descripcion, Paginas, Fecha, Foto} = req.body;  
    db.query(
        'INSERT INTO Libros (idAutor, Titulo, Sinapsis, Descripcion, Paginas, Fecha, Foto) VALUES (?,?,?,?,?,?)',
        [idAutor, Titulo, Sinapsis, Descripcion, Paginas, Fecha, Foto],
        (error, respuesta) => {
            if(error) {
                res.send("Error insertando libros"+ error)
            } else {
                res.redirect('/libros')
            }
        }
    );  
};

exports.edit = (req, res) => {
    const id = req.params.id;
    if(isNaN(id)) {
        res.send('Parámetros incorrectos en el edit de formulario '+ id)
    } else {
        db.query('SELECT * FROM Libros WHERE idLibro=?', [id], (error, respuesta) => {
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
                  db.query('SELECT idAutor, Nombre FROM Autores', (err, autores)=> {
                    if (err) {
                        res.send("No se han conseguido los autores")
                    }else {
                        res.render('libros/edit', { libro, autores });
                    }
                    })
                } 
                else {
                  res.send('Error actualizando el libro, el id es inc');
                }
              }
        })
    }
}

exports.editPost= (req, res) => {
    const {id, idAutor, Titulo, Sinapsis, Descripcion, Paginas, Fecha, Foto} = req.body;
    if (isNaN(id)) {
        res.send('Error actualizando porque el id no es un número'+ id);
    } else {
        db.query(
          'UPDATE Libros SET idAutor=?, Titulo=?, Sinapsis=?, Descripcion=?,  Paginas=?, Fecha=?, Foto=? WHERE idLibro = ?',
          [ idAutor, Titulo, Sinapsis, Descripcion, Paginas, Fecha, Foto, id],
          (error) => {
            if (error) {
              res.send('Error en el post de actualizar: ' + error);
            } else res.redirect('/libros');
          }
        );
    }
}

exports.del = (req, res) => {
    const id  = req.params.id;
    if(isNaN(id)){
        res.send('Parámetros incorrectos'+ id)
    } else {
        db.query('SELECT * FROM Libros WHERE idLibro=?', [id], (error, respuesta) => {
            if (error) {
                res.send('Error al intentar borrar');
            } else {
                if (respuesta.length>0) {
                    const libros = respuesta[0];
                    if (libros.Fecha) {
                        libros.Fecha = moment(libros.Fecha).format('YYYY-MM-DD');
                    } else {
                        res.send("El libro con id: "+ libros.idLibro + 
                            "El libro no tiene fecha. Por favor eliminalo de la bbdd"
                        );
                    }
                    db.query('SELECT Nombre FROM Autores WHERE idAutor=?', [libros.idAutor], (err, autores)=> {
                        if (err) {
                            res.send("No se ha conseguido el autor")
                        }else {
                            res.render('libros/del', {libro: libros, autor: autores[0]})
                        }
                        })
                }else {
                    res.send('Error al intentar borrar el libro')
                }
            }
        })
    }
}

exports.delPost = (req, res) => {
    const { id } = req.body;
    if(isNaN(id)){
        res.send('Error borrando'+ id);
    }else {
        db.query('DELETE FROM Libros WHERE idLibro=?', [id], (error) => {
            if(error) {
                res.send('Error en el post de borrar libro: '+id + 'y el fallo ha sido: '+ error)
            }else {
                res.redirect('/libros');
            }
        });
    }
};

exports.ver = (req, res) => {
    const id  = req.params.id;
    if (isNaN(id)) {
        res.send('Error buscando la id: ' + id)
    } else {
        db.query('SELECT * FROM  Libros WHERE idLibro=?', [id], (error, libros) => {
            if (error) {
                res.send("Ha habido un fallo buscando el libro"+ error)
            } else {
                if (libros.length > 0) {
                    const libro = libros[0];
                    if (libro.Fecha) {
                      libro.Fecha = moment(libro.Fecha).format('YYYY-MM-DD');
                    }else {
                      res.send("El libro con id: "+ libro.idLibro + 
                          "El libro no tiene fecha. Por favor eliminalo de la bbdd"
                      );
                    } 
                    db.query('SELECT Nombre FROM Autores where idAutor=?', [libro.idAutor], (error, autor) => {
                        if(error){
                            res.send("Fallo a la hora de encontrar el autor")
                        }else {
                            res.render('libros/ver', { libro: libro, autor: autor[0].Nombre });
                        }
                    })
                } else {
                    res.send('Error actualizando el libro, el id es inc');
                  }
            }
        })
    }
}