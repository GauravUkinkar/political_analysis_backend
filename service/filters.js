import { pool } from "../database/db.js";

export const addFilter = async (data) => {
  try {
    const query = `INSERT INTO filters (filterName,description,boothNumber,boothName,zonalPartition,village,totalVotes,totalVotesReceived,maleVoters,femaleVoters) VALUES (?,?,?,?,?,?,?,?,?,?)`;
    const values = [
      data.filterName,
      data.description,
      JSON.stringify(data.boothNumber),
      JSON.stringify(data.boothName),
      JSON.stringify(data.zonalPartition),
      JSON.stringify(data.village),
      JSON.stringify(data.totalVotes),
      JSON.stringify(data.totalVotesReceived),
      JSON.stringify(data.maleVoters),
      JSON.stringify(data.femaleVoters),
    ];

    const response = await pool.query(query, values);

    return {
      success: true,
      message: "filter added successfully",
      id: response.insertId,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
