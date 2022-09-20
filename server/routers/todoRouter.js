import express from "express";
import { postTodo, patchTodo, deleteTodo } from '../controllers/todoController.js'
import { isAuthenticated } from '../util/common.js';

const todoRouter = express.Router();

todoRouter.post("/", isAuthenticated, postTodo);
todoRouter.patch("/:uuid", isAuthenticated, patchTodo);
todoRouter.delete("/:uuid", isAuthenticated, deleteTodo);

export default todoRouter;