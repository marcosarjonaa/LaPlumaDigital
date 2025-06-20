/*
                La Pluma Digital 
        Donde las historias cobran vida
              Marcos Arjona Comino
*/

const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: './laplumadigital/.env' });

const verificarJWT = require('./middleware/verificarJWT');
const registerRouter = require('./router/registerRouter');
const loginRouter = require('./router/loginRouter');
const librosRouter = require('./router/librosRouter');
const autoresRouter = require('./router/autoresRouter');
const rankingRouter = require('./router/rankingRouter');
const perfilRouter = require('./router/perfilRouter');
const subeTuLibroRouter = require('./router/subeTuLibroRouter');
const graciasRouter = require('./router/graciasRouter');
const indexRouter = require('./router/indexRouter');
const sobreNosotrosRouter = require('./router/sobreNosotrosRouter');

const app = express();
const port = process.env.SERVICE_PORT;

app.use(cookieParser());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware de autenticación
app.use(verificarJWT);

// Rutas
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/libros', librosRouter);
app.use('/autores', autoresRouter);
app.use('/rankings', rankingRouter);
app.use('/perfil', perfilRouter);
app.use('/subeTuLibro', subeTuLibroRouter);
app.use('/gracias', graciasRouter);
app.use('/sobreNosotros', sobreNosotrosRouter)
app.use('/', indexRouter);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

app.listen(
    port, () => {
        console.log(`Servidor iniciado en http://localhost:${port}`);
});