const db = require('../db.js');
const moment = require('moment');
const { marked } = require('marked'); // <--- AÑADE ESTA LÍNEA para usar Markdown

exports.libros = (req, res) => {
    db.query('SELECT * FROM Libros', (err, response) => {
        if(err){
            console.error("Error listando libros:", err); // Usa console.error para errores
            res.status(500).send("Ha habido un error listando los libros"); // Envía un status 500
        } else {
            response.forEach(libro => {
                if(libro.Fecha){
                    libro.Fecha = moment(libro.Fecha).format("YYYY-MM-DD");
                } else {
                    console.warn("El libro con id: "+ libro.idLibro + " no tiene fecha."); // Advertencia en consola
                    // No detengas la ejecución por esto, pero puedes decidir cómo manejarlo
                }
            });
            res.render('libros/list', {libros: response});
        }
    })
}

exports.add = (req, res) => {
    db.query('SELECT idAutor, Nombre FROM Autores', (err, autores)=> {
        if (err) {
            console.error("Error obteniendo autores para añadir libro:", err);
            res.status(500).send("Hay un error obteniendo autores");
        } else {
            // Pasamos un objeto vacío para libro si la vista de edición también se usa para añadir
            res.render('libros/add', { autores, libro: {} }); 
        }
    })
}

exports.addPost = (req, res) => {
    const {idAutor, Titulo, Sinapsis, Descripcion, Paginas, Fecha, Foto} = req.body;  
    
    // Convertimos Sinapsis y Descripcion de Markdown a HTML
    const sinapsisHTML = marked(Sinapsis);
    const descripcionHTML = marked(Descripcion);

    db.query(
        // Asegúrate de que los campos Sinapsis y Descripcion en tu DB sean de tipo TEXT
        'INSERT INTO Libros (idAutor, Titulo, Sinapsis, Descripcion, Paginas, Fecha, Foto) VALUES (?,?,?,?,?,?,?)',
        [idAutor, Titulo, sinapsisHTML, descripcionHTML, Paginas, Fecha, Foto], // Usamos las versiones HTML
        (error, respuesta) => {
            if(error) {
                console.error("Error insertando libros:", error);
                res.status(500).send("Error insertando libros: "+ error.message); // Muestra el mensaje de error de DB
            } else {
                res.redirect('/libros');
            }
        }
    );  
};

exports.edit = (req, res) => {
    const id = req.params.id;
    if(isNaN(id)) {
        return res.status(400).send('Parámetros incorrectos en el edit de formulario: '+ id);
    }
    db.query('SELECT * FROM Libros WHERE idLibro=?', [id], (error, respuesta) => {
        if (error) {
            console.error('Error obteniendo libro para editar:', error);
            return res.status(500).send('Error obteniendo el libro para editar');
          }
        if (respuesta.length > 0) {
            const libro = respuesta[0];
            if (libro.Fecha) {
                libro.Fecha = moment(libro.Fecha).format('YYYY-MM-DD');
            } else {
                console.warn("El libro con id: "+ libro.idLibro + " no tiene fecha.");
            }
            db.query('SELECT idAutor, Nombre FROM Autores', (err, autores)=> {
                if (err) {
                    console.error("No se han conseguido los autores:", err);
                    return res.status(500).send("No se han conseguido los autores");
                }
                // Los campos Sinapsis y Descripcion ya vienen de la DB en HTML, EasyMDE los manejará al cargar.
                res.render('libros/edit', { libro, autores });
            });
        } else {
            res.status(404).send('El libro a editar no se encontró.');
        }
    });
}

exports.editPost= (req, res) => {
    const {id, idAutor, Titulo, Sinapsis, Descripcion, Paginas, Fecha, Foto} = req.body;
    if (isNaN(id)) {
        return res.status(400).send('Error actualizando porque el id no es un número: '+ id);
    }
    
    // Convertimos Sinapsis y Descripcion de Markdown a HTML
    const sinapsisHTML = marked(Sinapsis);
    const descripcionHTML = marked(Descripcion);

    db.query(
        'UPDATE Libros SET idAutor=?, Titulo=?, Sinapsis=?, Descripcion=?, Paginas=?, Fecha=?, Foto=? WHERE idLibro = ?',
        [idAutor, Titulo, sinapsisHTML, descripcionHTML, Paginas, Fecha, Foto, id], // Usamos las versiones HTML
        (error) => {
            if (error) {
              console.error('Error en el post de actualizar:', error);
              res.status(500).send('Error en el post de actualizar: ' + error.message);
            } else {
                res.redirect('/libros');
            }
        }
    );
};

exports.del = (req, res) => {
    const id  = req.params.id;
    if(isNaN(id)){
        return res.status(400).send('Parámetros incorrectos: '+ id);
    }
    db.query('SELECT * FROM Libros WHERE idLibro=?', [id], (error, respuesta) => {
        if (error) {
            console.error('Error al intentar borrar:', error);
            return res.status(500).send('Error al intentar borrar');
        }
        if (respuesta.length>0) {
            const libros = respuesta[0];
            if (libros.Fecha) {
                libros.Fecha = moment(libros.Fecha).format('YYYY-MM-DD');
            } else {
                console.warn("El libro con id: "+ libros.idLibro + " no tiene fecha.");
            }
            db.query('SELECT Nombre FROM Autores WHERE idAutor=?', [libros.idAutor], (err, autores)=> {
                if (err) {
                    console.error("No se ha conseguido el autor:", err);
                    return res.status(500).send("No se ha conseguido el autor");
                }
                res.render('libros/del', {libro: libros, autor: autores[0]});
            });
        }else {
            res.status(404).send('Error al intentar borrar el libro: no encontrado');
        }
    });
};

exports.delPost = (req, res) => {
    const { id } = req.body;
    if(isNaN(id)){
        return res.status(400).send('Error borrando: '+ id);
    }
    db.query('DELETE FROM Libros WHERE idLibro=?', [id], (error) => {
        if(error) {
            console.error('Error en el post de borrar libro:', error);
            res.status(500).send('Error en el post de borrar libro: '+id + ' y el fallo ha sido: '+ error.message);
        }else {
            res.redirect('/libros');
        }
    });
};

exports.ver = (req, res) => {
    const id  = req.params.id;
    if (isNaN(id)) {
        return res.status(400).send('Error buscando la id: ' + id);
    }
    db.query('SELECT L.*, A.Nombre AS NombreAutor FROM Libros L JOIN Autores A ON L.idAutor = A.idAutor WHERE L.idLibro=?', [id], (error, libros) => {
        if (error) {
            console.error("Ha habido un fallo buscando el libro:", error);
            return res.status(500).send("Ha habido un fallo buscando el libro: "+ error.message);
        }
        if (libros.length > 0) {
            const libro = libros[0];
            if (libro.Fecha) {
              libro.Fecha = moment(libro.Fecha).format('YYYY-MM-DD');
            }else {
              console.warn("El libro con id: "+ libro.idLibro + " no tiene fecha.");
            } 
            // Como ya hicimos un JOIN, el autor viene directamente en libro.NombreAutor
            // Y Sinapsis y Descripcion ya son HTML
            res.render('libros/ver', { libro: libro, autor: libro.NombreAutor });
        } else {
            res.status(404).send('Error: El libro no se encontró.');
        }
    });
};

exports.buscar = (req, res) => {
    const busqueda = req.body.busqueda.trim();
    if (busqueda === "") { // Mejor validación para búsqueda vacía
        return res.status(400).send("Error por búsqueda vacía");
    }
    // Usamos LIKE para búsquedas parciales y %
    db.query(
        'SELECT L.*, A.Nombre AS NombreAutor FROM Libros L JOIN Autores A ON L.idAutor = A.idAutor WHERE LOWER(L.Titulo) LIKE ?', 
        [`%${busqueda.toLowerCase()}%`], // Búsqueda más flexible
        (error, libros) => {
            if(error){
                console.error('Fallo en la búsqueda de libros:', error);
                return res.status(500).send('Fallo en la búsqueda de libros');
            }
            if (libros.length >= 1) { // Puede haber más de un resultado
                // Si quieres mostrar una lista de resultados, necesitarás una vista diferente
                // Por simplicidad, si hay solo uno, mostramos su detalle. Si hay varios, podrías redirigir a una lista o mostrar el primero.
                if (libros.length === 1) {
                    const libro = libros[0];
                    if (libro.Fecha) {
                        libro.Fecha = moment(libro.Fecha).format('YYYY-MM-DD');
                    } else {
                        console.warn("El libro con id: "+ libro.idLibro + " no tiene fecha.");
                    } 
                    res.render('libros/ver', { libro: libro, autor: libro.NombreAutor });
                } else {
                    // Si hay varios resultados, podrías renderizar una vista de lista de resultados
                    // Por ejemplo: res.render('libros/lista_busqueda', { libros: libros });
                    res.send(`Se encontraron ${libros.length} libros. Por favor, sé más específico o navega a la lista de libros.`);
                }
            } else {
                res.status(404).send('No se encontraron libros con ese título.');
            }
        }
    );
};