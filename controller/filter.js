import { pool } from "../database/db.js";
import { addFilter } from "../service/filters.js";

export const filterAdd = async (req, res) => {
  try {
    const {
      filterName,
      description,
      boothNumber,
      boothName,
      zonalPartition,
      village,
      totalVotes,
      totalVotesReceived,
      maleVoters,
      femaleVoters,
    } = req.body;

    const data = await addFilter({
      filterName,
      description,
      boothNumber,
      boothName,
      zonalPartition,
      village,
      totalVotes,
      totalVotesReceived,
      maleVoters,
      femaleVoters,
    });

    if (data.success) {
      return res.status(200).json({
        message: data.message,
        id: data.id,
      });
    } else {
      return res.status(400).json({
        message: data.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// get All filter data

export const getAllfilter = async (req, res) => {
  try {
    const [data] = await pool.query(`SELECT * FROM filters`);

    return res.status(200).json({
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// get filter by Id
export const getfilterById = async (req, res) => {
  try {
    const { id } = req.query;
    const [data] = await pool.query(`SELECT * FROM filters WHERE id=?`, [id]);

    return res.status(200).json({
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// change pin status

export const changeFilterPin = async (req, res) => {
  try {
    const { id } = req.query;
    
   pool.query(`UPDATE filters SET pin=? WHERE id=?`, [
      true,
      id,
    ]);

    return res.status(200).json({
      message:"success"
    })
  } catch (error) {
    return res.status(500).json({
      message:error.message
    })
  }
};

// get all pin filter


export const getAllPinFilter = async (req,res)=>{
  try {
    const [data] = await pool.query(`SELECT * FROM filters WHERE pin=?`,[true]);
    return res.status(200).json({
      data,
      message:"sucesss"
    })
  } catch (error) {
    return res.status(500).json({
      message:error.message
    })
  }
}
