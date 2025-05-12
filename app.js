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

const librosRouter = require('./router/librosRouter');
const autoresRouter = require('./router/autoresRouter');
//const miPerfilRouter = require('./router/miperfilrouter');
//const rankingRouter = require('./router/rankingrouter');
//const sobrenosotrosRouter = require('./router/sobrenosotrosRouter')

require('dotenv').config({ path: './laplumadigital/.env' });

const app = express();
const port = process.env.SERVICE_PORT;

app.use(express.static('public'));


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));

/*
    Redireccionamiento a rutas: 
*/
app.use('/libros', librosRouter)
app.use('/autores', autoresRouter)
//app.use('/perfil', miPerfilRouter)
//app.use('/ranking', rankingRouter)
//app.use('/sobrenosotros', sobrenosotrosRouter)


app.get('/', (req, res) => {
    res.render('index')
})

app.listen(
    port, () => {
        console.log(`Servidor iniciado en http://localhost:${port}`);
});