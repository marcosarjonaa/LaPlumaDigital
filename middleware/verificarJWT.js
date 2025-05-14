const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const rutasPublicas = ['/', '/register', '/login'];
    if (rutasPublicas.includes(req.path)) {
        return next();
    }

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send('Acceso denegado. Token no proporcionado.');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send('Token inválido');
        }
        req.user = decoded;
        next();
    });
};