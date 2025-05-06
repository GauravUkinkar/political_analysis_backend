import fs from "fs";
import csv from "csv-parser";
import { addBooth } from "../service/booth.js";
import { pool } from "../database/db.js";

export const addBoothController = async (req, res) => {
  try {
    const booth_data = req.file?.path;

    if (!booth_data) {
      return res.status(400).json({ message: "CSV file is required" });
    }

    const parsedRows = [];

    // 1. Read CSV and collect all valid rows
    fs.createReadStream(booth_data)
      .pipe(csv())
      .on("data", (row) => {
        const data = {
          year: parseInt(row.year),
          booth_number: parseInt(row.booth_number),
          name: row.name,
          zp: row.zp,
          village: row.village,
          counting: parseInt(row.counting),
          totalCount: parseInt(row.totalCount),
          maleVotes: parseInt(row.maleVotes),
          femaleVotes: parseInt(row.femaleVotes),
        };

        // Only add valid rows
        if (!isNaN(data.year) && !isNaN(data.booth_number)) {
          parsedRows.push(data);
        }
      })
      .on("end", async () => {
        try {
          // 2. Now insert all data using your addBooth service
          await Promise.all(parsedRows.map(addBooth));

          res.status(200).json({
            message: "Booth data uploaded and inserted successfully",
          });
        } catch (err) {
          console.error("Error during booth data insertion:", err);
          res.status(500).json({ message: "Error inserting booth data" });
        }
      });
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// get masterData

export const getMasterData = async (req, res) => {
  try {
    const { year } = req.query;
    // Fetch booth data
    const [boothData] = await pool.query(
      "SELECT * FROM booth_data WHERE year = ?",
      [year]
    );

    // Fetch candidate and counting data, join with candidate_counting
    const [candidateData] = await pool.query(
      `
        SELECT 
          c.id AS c_id,
          c.name AS candidate_name,
          c.year AS candidate_year,
          vc.booth_number,
          vc.counting
        FROM candidate c
        LEFT JOIN candidate_counting vc ON c.id = vc.cid WHERE vc.year = ?
      `,
      [year]
    );

    // Sort boothData by booth_number
    boothData.sort((a, b) => a.booth_number - b.booth_number);

    // Sort candidateData by booth_number
    candidateData.sort((a, b) => a.booth_number - b.booth_number);

    // Format booth data
    const formattedBoothData = boothData.map((booth) => {
      // Get candidates for the current booth, ensuring they are sorted
      const boothCandidates = candidateData.filter(
        (candidate) => candidate.booth_number === booth.booth_number
      );

      // Map the candidates with their vote counting data
      const votesCounting = boothCandidates.map((candidate) => ({
        vc_id: candidate.c_id,
        booth_number: booth.booth_number,
        c_id: candidate.c_id,
        counting: candidate.counting || 0,
      }));

      return {
        id: booth.id,
        year: booth.year,
        boothNumber: booth.booth_number,
        name: booth.name,
        zp: booth.zp,
        village: booth.village,
        totalVotes: booth.counting || 0,
        totalVotesReceived: booth.totalCount || 0,
        maleVoters: booth.maleVotes || 0,
        femaleVoters: booth.femaleVotes || 0,
        votesCounting,
        candidates: boothCandidates.map((candidate) => ({
          c_id: candidate.c_id,
          name: candidate.candidate_name,
          party: candidate.party,
          booth_number: candidate.booth_number,
        })),
      };
    });

    res.status(200).json({
      booth: formattedBoothData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
