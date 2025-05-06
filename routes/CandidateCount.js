import express from "express";
import { addCandiCountController } from "../controller/candidtaeCounting.js";
import upload from "../utils/multer.js";

export const candidateCountRoute = express.Router();

candidateCountRoute.post("/add", upload.single("file"), addCandiCountController)