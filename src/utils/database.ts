import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node_playground",
  password: "12345678",
});

export default pool.promise();
