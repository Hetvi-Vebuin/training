import mysql, { QueryError, PoolConnection } from "mysql2";

const conn = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME ||"user_details",
  connectionLimit: 2
}).promise();


export default conn;