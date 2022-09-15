import express from "express";
import { getData, home, login } from "../controllers/rootController.js";

const rootRouter = express.Router();

rootRouter.get('/', home)
rootRouter.get("/datas", getData);
rootRouter.get("/login", login);

export default rootRouter;