import mysql from "mysql2/promise.js";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port:process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});



const connection = async () => {
  try {
    let connection;

    connection = await pool.getConnection();


   
   

    console.log("database connected");

    return connection;
  } catch (error) {
    console.log(error);
  }
};

export { connection, pool };
