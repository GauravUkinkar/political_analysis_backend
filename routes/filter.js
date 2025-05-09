import express from "express";
import { changeFilterPin, filterAdd, getAllfilter, getAllPinFilter, getfilterById } from "../controller/filter.js";

export const filterRoute = express.Router();

filterRoute.post("/addFilter",filterAdd);
filterRoute.get("/getAllfilter",getAllfilter);
filterRoute.get("/getfilterById",getfilterById);
filterRoute.patch("/changeFilterPin",changeFilterPin);
filterRoute.get("/getAllPinFilter",getAllPinFilter);