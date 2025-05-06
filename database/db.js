import mysql from "mysql2/promise.js";
import dotenv from "dotenv";

dotenv.config();
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
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
