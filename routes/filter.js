import express from "express";
import { filterAdd, getAllfilter, getfilterById } from "../controller/filter.js";

export const filterRoute = express.Router();

filterRoute.post("/addFilter",filterAdd);
filterRoute.get("/getAllfilter",getAllfilter);
filterRoute.get("/getfilterById",getfilterById);