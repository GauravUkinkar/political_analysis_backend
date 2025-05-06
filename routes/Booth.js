import express from "express"
import { addBoothController, getMasterData } from "../controller/booth.js";
import upload from "../utils/multer.js";

export const boothRoute = express.Router();

boothRoute.post("/add", upload.single("booth_data"), addBoothController);
boothRoute.get("/getMasterData", getMasterData);