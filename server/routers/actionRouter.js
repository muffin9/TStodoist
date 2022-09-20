import express from "express";
import { postAction, deleteAction } from '../controllers/actionController.js'
import { isAuthenticated } from '../util/common.js';

const actionRouter = express.Router();

actionRouter.post('/', isAuthenticated, postAction);
actionRouter.delete('/:uuid', isAuthenticated, deleteAction);

export default actionRouter;