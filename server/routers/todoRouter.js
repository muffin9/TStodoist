import express from "express";
import { postTodo, patchTodo, deleteTodo } from '../controllers/todoController.js'
import { isAuthenticated } from '../util/common.js';

const todoRouter = express.Router();

todoRouter.post("/", isAuthenticated, postTodo);
todoRouter.patch("/:id", isAuthenticated, patchTodo);
todoRouter.delete("/:id", isAuthenticated, deleteTodo);

export default todoRouter;