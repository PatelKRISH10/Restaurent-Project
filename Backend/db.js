const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "KrishMYSQL123@",
  database: "restaurant_db",
  port: 3306
});

db.connect(err => {
  if (err) {
    console.error("DB Error:", err.message);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;
