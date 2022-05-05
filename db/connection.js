const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root", //  username of database
  password: "NewPassword", // password
  database: "employees"  // database name 
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
