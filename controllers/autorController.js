const db = require('../db.js');
const moment = require('moment');

exports.autores = (req, res) => {
    db.query('SELECT * FROM Autores', (err, response) => {
        if(err){ //Compruebo si hay algún error 
            res.send("Ha habido un error listando los autore", err);
            // Y si lo hay mando la respuesta diciendo el fallo
        } else {
            res.render('autores/list', {autores: response});
        }
    })
}

exports.add = (req, res) => {
    res.render('autores/add');
}

exports.addPost = (req, res) => {
    const {idAutor, Nombre, FechaNac, FechaFal, Foto} = req.body;
    if(FechaFal && FechaFal.trim() !== ''){
        db.query(
            'INSERT INTO Autores (idAutor, Nombre, FechaNac, FechaFal, Foto) VALUES (?,?,?,?,?)',
            [idAutor, Nombre, FechaNac, FechaFal, Foto],
            (error, respuesta) => {
                if(error) {
                    res.send("Error insertando un autor"+ error)
                } else {
                    res.redirect('/autores')
                }
            }
        );  
    } else {
        db.query(
            'INSERT INTO Autores (idAutor, Nombre, FechaNac, Foto) VALUES (?,?,?,?)',
            [idAutor, Nombre, FechaNac, Foto],
            (error, respuesta) => {
                if(error) {
                    res.send("Error insertando un autor"+ error)
                } else {
                    res.redirect('/autores')
                }
            }
        ); 
    }
};

exports.edit = (req, res) => {
    const id = req.params.id;
    if(isNaN(id)) {
        res.send('Id no es un numero '+ id)
    } else {
        db.query('SELECT * FROM Autores WHERE idAutor=?', [id], (error, respuesta) => {
            if (error) {
                res.send('Error actualizando el libro');
              } else {
                if (respuesta.length > 0) {
                  const autor = respuesta[0];
                  if (autor.FechaNac) {
                    autor.FechaNac = moment(autor.FechaNac).format('YYYY-MM-DD');
                    if(autor.FechaFal){
                        autor.FechaFal = moment(autor.FechaFal).format('YYYY-MM-DD')
                    }
                  }else {
                    res.send("El autor con id: "+ autor.idAutor + 
                        "El autor no tiene fecha de nacimiento. Por favor eliminalo de la bbdd"
                    );
                }
                    res.render('autores/edit', { autor});
                } else {
                  res.send('Error actualizando el utor, el id es incoherente');1
                }
              }
        })
    }
}

exports.editPost= (req, res) => {
    const {idAutor, Nombre, FechaNac, FechaFal, Foto} = req.body;
    if (isNaN(idAutor)) {
        res.send('Error actualizando porque el id no es un número'+ id);
    } else {
        if(FechaFal && FechaFal.trim() !== ''){
            db.query(
              'UPDATE Autor SET idAutor=?, Nombre=?, FechaNac=?, FechaFal=?, Foto=? WHERE idAutor = ?',
              [ idAutor, Nombre, FechaNac, FechaFal, Foto, idAutor],
              (error) => {
                if (error) {
                  res.send('Error en el post de actualizar: ' + error);
                } else res.redirect('/autores');
              }
            );
        } else {
            db.query(
                'UPDATE Autor SET idAutor=?, Nombre=?, FechaNac=?, Foto=? WHERE idAutor = ?',
                [ idAutor, Nombre, FechaNac, Foto, idAutor],
                (error) => {
                  if (error) {
                    res.send('Error en el post de actualizar: ' + error);
                  } else res.redirect('/autores');
                }
              );
        }
    }
}

exports.del = (req, res) => {
    const id  = req.params.id;
    if(isNaN(id)){
        res.send('Parámetros incorrectos'+ id)
    } else {
        db.query('SELECT * FROM Autores WHERE idAutor=?', [id], (error, respuesta) => {
            if (error) {
                res.send('Error al intentar borrar');
            } else {
                if (respuesta.length>0) {
                    const autor = respuesta[0];
                    if (autor.FechaNac) {
                        autor.FechaNac = moment(autor.FechaNac).format('YYYY-MM-DD');
                        if(autor.FechaFal){
                            autor.FechaFal = moment(autor.FechaFal).format('YYYY-MM-DD')
                        }
                        res.render('autores/del', {autor: autor})
                    } else {
                        res.send("El autor con id: "+ autor.idAutor + 
                            " no tiene fecha. Por favor eliminalo de la bbdd"
                        );
                    }
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
        db.query('DELETE FROM Autor WHERE idAutor=?', [id], (error) => {
            if(error) {
                res.send('Error en el post de borrar autor: '+id + ', comprueba que no tenga libros que sigan creados')
            }else {
                res.redirect('/autor');
            }
        });
    }
};

exports.ver = (req, res) => {
    const id  = req.params.id;
    if (isNaN(id)) {
        res.send('Error buscando la id: ' + id)
    } else {
        db.query('SELECT * FROM  Autores WHERE idAutor=?', [id], (error, respuesta) => {
            if (error) {
                res.send("Ha habido un fallo buscando el autor"+ error)
            } else {
                if (respuesta.length > 0) {
                    const autor = respuesta[0];
                    if (autor.FechaNac) {
                      autor.FechaNac = moment(autor.FechaNac).format('YYYY-MM-DD');
                      if(autor.FechaFal){
                        autor.FechaFal = moment(autor.FechaFal).format('YYYY-MM-DD')
                        db.query('SELECT * FROM Libros WHERE idAutor=?', [autor.idAutor], (error, libros) => {
                            if(error){
                                return res.send("Fallo a la hora de encontrar libros del autor")
                            }
                            if(libros.length > 0) {
                                libros.forEach(libro => {
                                    if(libro.Fecha){
                                        libro.Fecha = moment(libro.Fecha).format("YYYY-MM-DD");
                                    }else {
                                        return res.send("El libro con id: "+ libro.idLibro + 
                                            " no tiene fecha. Por favor eliminalo de la bbdd"
                                        );
                                    }
                                });
                                res.render('autores/ver', { autor: autor, libros: libros, fechaFal: autor.fechaFal});
                            }
                        })
                        }else {
                            db.query('SELECT * FROM Libros WHERE idAutor=?', [autor.idAutor], (error, libros) => {
                                if(error){
                                    return res.send("Fallo a la hora de encontrar libros del autor")
                                }
                                if(libros.length > 0) {
                                    libros.forEach(libro => {
                                        if(libro.Fecha){
                                            libro.Fecha = moment(libro.Fecha).format("YYYY-MM-DD");
                                        }else {
                                            return res.send("El libro con id: "+ libro.idLibro + 
                                                " no tiene fecha. Por favor eliminalo de la bbdd"
                                            );
                                        }
                                    });
                                    res.render('autores/ver', { autor: autor, libros: libros, fechaFal: "Actualidad"});
                                }
                            })
                        }
                    }else {
                      res.send("El autor con id: "+ autor.idAutor + 
                          "El autor no tiene fecha. Por favor eliminalo de la bbdd"
                      );
                    } 
                } else {
                    res.send('Error actualizando el autor no ha sido econtrado');
                  }
            }
        })
    }
}

exports.buscar = (req, res) => {
    const nombre = req.body.nombre.trim()
    if (nombre=="" || nombre==" "){
        return res.send("Error por nombre vacia")
    }
    db.query(
        'SELECT * FROM Autores WHERE LOWER(nombre)=?', [nombre.toLowerCase()], (error, autores) => {
            if(error){
                return res.send('Fallo en la busqueda de autores')
            }
            else {
                if (autores.length === 1) {
                    const autor = autores[0];
                    if (autor.FechaNac) {
                        autor.FechaNac = moment(autor.FechaNac).format('YYYY-MM-DD');
                            if(autor.FechaFal){
                                autor.FechaFal = moment(autor.FechaFal).format('YYYY-MM-DD')
                            }
                        }else {
                            return res.send("El autor con id: "+ autor.idAutor + 
                                "El autor no tiene fecha. Por favor eliminalo de la bbdd"
                            );
                      }
                    db.query('SELECT * FROM Libros WHERE idAutor=?', [autor.idAutor], (error, libros) => {
                        if(error){
                            return res.send("Fallo a la hora de encontrar libros del autor")
                        }
                        if(libros.length > 0) {
                            libros.forEach(libro => {
                                if(libro.Fecha){
                                    libro.Fecha = moment(libro.Fecha).format("YYYY-MM-DD");
                                }else {
                                    return res.send("El libro con id: "+ libro.idLibro + 
                                        " no tiene fecha. Por favor eliminalo de la bbdd"
                                    );
                                }
                            });
                            res.render('autores/ver', { autor: autor, libros: libros })
                        } else {
                            return res.send("Fallo a la hora de encontrar el autor")
                        }
                    })
                }else {
                    return res.send('Ha habido un fallo con la busqueda del libro. Intentalo de nuevo')
                }
            }
        }
    )
}

exports.publicar = (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        res.send('Error buscando la id: ' + id)
    } else {
        db.query('SELECT * FROM Libros WHERE idLibro=?', [id], (error, respuesta) => {
            if (error) {
                res.send("Ha habido un fallo buscando el libro"+ error)
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
                    res.render('autores/publicar', { libro: libro});
                } else {
                    res.send('Error actualizando el libro, el id es int');
                  }
            }
        })
    }
}

exports.publicarPost = (req, res) => {
    const {idLibro, idAutor, Titulo, Contenido} = req.body;
    const idUsuario = req.user.idUsuario;
    db.query('SELECT Foto from Libros WHERE idLibro=?', [idLibro], (error, respuesta) => {
        if(error){
            return res.send('Este es el error '+error)
        }
        const libro = respuesta[0]
        db.query(
            'INSERT INTO Publicaciones (idUsuario, idLibro, idAutor, Titulo, Contenido, Foto) VALUES (?, ?, ?, ?, ?, ?)', 
            [idUsuario, idLibro, idAutor, Titulo, Contenido, libro.Foto],
            (error, respuesta) => {
                if(error) {
                    res.send("Error insertando unA publicacion"+ error)
                } else {
                    res.redirect('/')
                }
            }
        ); 
})
}