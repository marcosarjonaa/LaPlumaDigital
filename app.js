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

const app = express();
const port = process.env.SERVICE_PORT;

/*
    Redireccionamiento a rutas: 
*/
app.use('/libros', librosRouter)

app.get('/', (req, res) => {
    res.render('index')
})