const mysql = require("mysql2");

//로컬
const pool = mysql.createPool({
  host: "192.168.0.63",
  port: 3307,
  user: "we12345",
  password: "we12345",
  database: "node_project",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();
