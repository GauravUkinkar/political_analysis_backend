import { pool } from "../database/db.js";

export const addBooth = async (data) => {
    try {
      const query = `
        INSERT INTO booth_data (
          year, booth_number, name, zp, village, counting, totalCount, maleVotes, femaleVotes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          name = VALUES(name),
          zp = VALUES(zp),
          village = VALUES(village),
          counting = VALUES(counting),
          totalCount = VALUES(totalCount),
          maleVotes = VALUES(maleVotes),
          femaleVotes = VALUES(femaleVotes)
      `;
  
      const values = [
        data.year,
        data.booth_number,
        data.name,
        data.zp,
        data.village,
        data.counting,
        data.totalCount,
        data.maleVotes,
        data.femaleVotes,
      ];
  
      await pool.query(query, values);
  
      return {
        success: true,
        message: "booth inserted or updated successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };
  
  
