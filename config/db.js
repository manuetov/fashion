const mysql = require('mysql'); // requerimos mysql

// Configuración de la conexión con nuestro mysql
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'fashion'
});
 
connection.connect((error) => {
    if(error) {
        throw error;
    } else {
        console.log('conexión correcta');
    }
});

module.exports = connection;