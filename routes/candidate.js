import { addCandidtaeController } from "../controller/Candidate.js";
import express from "express"

export const candidateRoute = express.Router();

candidateRoute.post("/addCandidate",addCandidtaeController)