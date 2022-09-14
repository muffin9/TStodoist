import express from "express";
import { postAction } from '../controllers/actionController.js'

const actionRouter = express.Router();

actionRouter.post('/', postAction);

export default actionRouter;