import express from "express";
import { postAction } from '../controllers/actionController.js'
import { isAuthenticated } from '../util/common.js';

const actionRouter = express.Router();

actionRouter.post('/', isAuthenticated, postAction);

export default actionRouter;