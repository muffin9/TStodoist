import express from "express";
import { getData } from "../controllers/rootController.js";

const rootRoter = express.Router();

rootRoter.get("/", getData);

export default rootRoter;