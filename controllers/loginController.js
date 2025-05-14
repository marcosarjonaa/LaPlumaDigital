const db = require('../db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    res.render('login/login');
};

exports.loginPost = (req, res) => {
    const { Email, Contrasena } = req.body;
    if (!Email || !Contrasena) {
        return res.send('Todos los campos son obligatorios.');
    }

    db.query('SELECT u.*, uyp.Contrasena FROM Usuario u JOIN UyP uyp ON u.idUsuario = uyp.idUsuario WHERE uyp.Email = ?', [Email], (err, results) => {
        if (err) return res.send('Error en la base de datos: ' + err);
        if (results.length === 0) return res.send('Correo no registrado.');

        const user = results[0];
        bcrypt.compare(Contrasena, user.Contrasena, (err, isMatch) => {
            if (err) return res.send('Error al verificar la contraseña.');
            if (!isMatch) return res.send('Contraseña incorrecta.');

            const payload = {
                idUsuario: user.idUsuario,
                tipo: user.Tipo,
                email: user.Email
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10h' });

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 10 * 60 * 60 * 1000
            });

            res.redirect('/');
        });
    });
};