import { addCandidate } from "../service/candidate.js";

export const addCandidtaeController = async (req, res) => {
  try {
    const { year, name, party } = req.body;

    if (!year || !name || !party) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const data = await addCandidate({ year, name, party });

    if (data.success) {
      return res.status(200).json({
        message: data.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
        message:error.message
    })
  }
};
