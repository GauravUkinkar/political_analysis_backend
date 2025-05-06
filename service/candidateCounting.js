import { pool } from "../database/db.js";

export const addCandiCount = async (rows) => {
  try {
    const query = `INSERT INTO candidate_counting (cid, booth_number, counting) VALUES ?`;
    await pool.query(query, [rows]);

    return {
      success: true,
      message: "Data inserted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
