import express from "express";
import { getData, home, login, logout } from "../controllers/rootController.js";
import { isAuthenticated } from '../util/common.js';

const rootRouter = express.Router();

rootRouter.get('/', isAuthenticated, home);
rootRouter.get("/datas", isAuthenticated, getData);
rootRouter.get("/login", login);
rootRouter.get("/logout", isAuthenticated, logout);

export default rootRouter;