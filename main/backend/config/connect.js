import mysql from "mysql2/promise";

// Create a connection to the database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "jidar107",
  database: "hotel_database",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
