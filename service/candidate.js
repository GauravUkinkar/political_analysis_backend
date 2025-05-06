import { pool } from "../database/db.js";



export const addCandidate = async (data)=>{
    try {
        const query = `INSERT INTO candidate (year,name,party) VALUES (?,?,?)`;
        const values = [data.year,data.name,data.party];

        const response = await pool.query(query,values);

        return {
            success:true,
            message:"data inserted successfully",
            data :response.insertId
        }
    } catch (error) {
        return {
            success:false,
            message:"something error",
            data : error.message
        }
    }
}