import express from "express";
import { postColumn, patchColumn } from '../controllers/columnController.js';
import { isAuthenticated } from "../util/common.js";

const columnRouter = express.Router();

columnRouter.get("/", () => console.log("column get!"));
columnRouter.post("/", isAuthenticated, postColumn);
columnRouter.patch("/:uuid", isAuthenticated, patchColumn);

export default columnRouter;