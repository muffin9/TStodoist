import express from "express";
import { postColumn, patchColumn, deleteColumn } from '../controllers/columnController.js';
import { isAuthenticated } from "../util/common.js";

const columnRouter = express.Router();

columnRouter.post("/", isAuthenticated, postColumn);
columnRouter.patch("/:uuid", isAuthenticated, patchColumn);
columnRouter.delete("/:uuid", isAuthenticated, deleteColumn);

export default columnRouter;