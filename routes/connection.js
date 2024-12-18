var mysql = require('mysql');
var dotenv = require('dotenv');
dotenv.config();
// DATABASE_URL="mysql://root:root@localhost/erpcrm"
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected');
});
module.exports = connection;