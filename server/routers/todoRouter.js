import express from "express";
import { postTodo, patchTodo, deleteTodo } from '../controllers/todoController.js'

const todoRouter = express.Router();

todoRouter.post("/", postTodo);
todoRouter.patch("/:id", patchTodo);
todoRouter.delete("/:id", deleteTodo);

export default todoRouter;