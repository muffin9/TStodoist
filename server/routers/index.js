import express from "express";
import { getData, home, login, logout } from "../controllers/rootController.js";

const rootRouter = express.Router();

rootRouter.get('/', home);
rootRouter.get("/datas", getData);
rootRouter.get("/login", login);
rootRouter.get("/logout", logout);

export default rootRouter;