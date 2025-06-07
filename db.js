const mysql = require('mysql2'); 
require('dotenv').config({ path: 'laplumadigital/.env' }); 

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    charset: 'utf8mb4'
  });

db.connect(err => {
    if (err) {
      console.error(
        'Error al conectar a MySQL:', err);
      return;
    }
    db.query("SET NAMES utf8mb4", err => {
      if (err) {
        console.error('Error al establecer utf8mb4:', err);
      } else {
        console.log('Conexión exitosa a MySQL con utf8mb4');
      }
    });
  
  });

  module.exports=db;