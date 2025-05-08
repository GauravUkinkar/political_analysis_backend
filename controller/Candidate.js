import { pool } from "../database/db.js";
import { addCandidate } from "../service/candidate.js";

export const addCandidtaeController = async (req, res) => {
  try {
    const { year, name, party } = req.body;

    if (!year || !name || !party) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [existCandidate] = await pool.query(`SELECT * FROM candidate WHERE year =? AND name = ?`,[year,name]);

    if(existCandidate.length > 0){
      return res.status(400).json({
        message:"Candidate already exist"
      })
    }

    const data = await addCandidate({ year, name, party });

    if (data.success) {
      return res.status(200).json({
        message: data.message,
      });
    }else{
      return res.status(400).json({
        message:data.data
      })
    }
  } catch (error) {
    return res.status(500).json({
        message:error.message
    })
  }
};
