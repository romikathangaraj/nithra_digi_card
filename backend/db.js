// db.js
const mysql = require('mysql2/promise');
require("dotenv").config();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "digital",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = db;
