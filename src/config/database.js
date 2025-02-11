const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const authenticate = async () => await pool.promise().query("SELECT 1");

module.exports = { pool: pool.promise(), authenticate };
