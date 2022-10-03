import express from "express";
import { postTodo, patchTodo, deleteTodo, patchStatusTodo } from '../controllers/todoController.js'
import { isAuthenticated } from '../util/common.js';

const todoRouter = express.Router();

todoRouter.post("/", isAuthenticated, postTodo);
todoRouter.patch("/:uuid", isAuthenticated, patchTodo);
todoRouter.delete("/:uuid", isAuthenticated, deleteTodo);
todoRouter.patch("/status/:uuid", isAuthenticated, patchStatusTodo);

export default todoRouter;