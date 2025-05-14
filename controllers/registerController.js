const db = require('../db.js');
const bcrypt = require('bcrypt');

exports.register = (req, res) => {
    res.render('register/register')
}

exports.registerPost = (req, res) => {
    const { UserName, Nombre, Descripcion, Email, Contraseña, Foto } = req.body;
    if (!UserName || !Nombre || !Email || !Contraseña || !Descripcion) {
        return res.send('Todos los campos son obligatorios'+ UserName + ' ' + Nombre + ' ' + Descripcion 
            + ' ' + Email + ' ' + Contraseña );
    }
 
    db.query('SELECT * FROM UyP WHERE Email = ?', [Email], (err, respuesta) => {
        if (err) {
            return res.send('Ha habido un error al comprobar el email: ' + err);
        }

        if (respuesta.length > 0) {
            return res.send('El email ya está registrado. Por favor, utiliza otro.');
        }

        bcrypt.hash(Contraseña, 10, (err, hashedPassword) => {
            if (err) {
                return res.send('Error al encriptar la contraseña: ' + err);
            }
            db.query(
                'INSERT INTO Usuario (UserName, Nombre, Foto, Descripcion, Permitido, Tipo) VALUES (?, ?, ?, ?, ?, ?)',
                [UserName, Nombre, Foto, Descripcion, 1, 'Usuario'],
                (err, result) => {
                    if (err) {
                        return res.send('Error al crear el usuario: ' + err);
                    }
                    const userId = result.insertId;
                    db.query(
                        'INSERT INTO UyP (idUsuario, Email, Contrasena) VALUES (?, ?, ?)',
                        [userId, Email, hashedPassword],
                        (err) => {
                            if (err) {
                                console.log("Ha fallado insertando a UyP")
                                return res.send('Error al guardar las credenciales: ' + err);
                            }
                            return res.render('login/login');
                        }
                    );
                }
            );
        });
    });
};
