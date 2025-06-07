const db = require('../db.js');
const moment = require('moment');
const nodemailer = require('nodemailer');

exports.formulario = (req, res) => {
    res.render('subeTuLibro/subeTuLibro')
}

exports.formularioPost = (req, res) => {
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
    });
    db.query('SELECT email FROM UyP WHERE idUsuario = ?', [req.user.idUsuario], (err, email) => {
        if(err) {
            return res.send('Error buscando el email')
        }
        const mailOptions = {
            from: '"La Pluma Digital" <marcosarjonacomino@gmail.com>',
            to: email[0].email,
            subject: 'Tu libro ha sido recibido',
            text: '¡Gracias por enviar tu libro! Lo revisaremos pronto.',
            html: '<h1>Gracias por tu envío</h1><p>Pronto será revisado.</p>'
        };
        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar correo:', error);
        } else {
            console.log('Correo enviado: ' + info.response);
        }
        });
    })


}

