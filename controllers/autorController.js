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
                  res.send('Error actualizando el utor, el id es incoherente');
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
                        res.render('autores/ver', { autor: autor, fechaFal: autor.FechaFal});
                        }else {
                            res.render('autores/ver', { autor: autor, fechaFal: "Actualidad"});
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