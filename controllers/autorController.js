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
                    res.render('autores/edit', { libro });
                } else {
                  res.send('Error actualizando el utor, el id es incoherente');
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