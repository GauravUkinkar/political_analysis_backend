import fs from "fs";
import csv from "csv-parser";
import { pool } from "../database/db.js";
import { addCandiCount } from "../service/candidateCounting.js";


export const addCandiCountController = async (req, res) => {
  try {
    const filePath = req.file?.path;
    if (!filePath) {
      return res.status(400).json({ message: "CSV file is required" });
    }

    const [candidates] = await pool.query(`SELECT id, name FROM candidate`);

if(candidates.length === 0) {
  return res.status(400).json({ message: "No candidates found" });
}
    const candidateMap = {};

    candidates.forEach((item) => {
      candidateMap[item.name.trim().toLowerCase()] = item.id;
    });

    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        const boothNumber = row["booth number"] || row["Booth Number"]; // support both cases

        for (let key in row) {
          const name = key.trim().toLowerCase();
          const year = row.year
          const cid = candidateMap[name];
          const count = parseInt(row[key], 10);
          if (cid && boothNumber && !isNaN(count)) {
            results.push([year,cid, boothNumber, count]);
          }
        }
      })
      .on("end", async () => {
        if (results.length > 0) {
          const response = await addCandiCount(results);

          if (response.success) {
            return res.status(201).json({ message: response.message });
          } else {
            return res.status(500).json({ message: response.message });
          }
        } else {
          return res.status(400).json({ message: "No valid data found in CSV." });
        }
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error: " + error.message,
    });
  }
};
