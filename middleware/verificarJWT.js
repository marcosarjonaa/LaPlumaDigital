const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const rutasPublicas = ['/', '/register', '/login'];
    const token = req.cookies.token;
    res.locals.tipo = null
    res.locals.usuarioAutenticado = false;

    if (rutasPublicas.includes(req.path)) {
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (!err) {
                    req.user = decoded;
                    res.locals.usuarioAutenticado = true;
                    res.locals.tipo = decoded.tipo
                }
            });
        }
        return next();
    }

    if (!token) {
        return res.render('login/login');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.render('login/login');
        }
        req.user = decoded;
        res.locals.usuarioAutenticado = true;
        res.locals.tipo = decoded.tipo
        next();
    });
};
