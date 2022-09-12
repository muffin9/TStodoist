import express from "express";
import { createTodo, patchTodo, deleteTodo } from '../controllers/todoController.js'

const todoRouter = express.Router();

todoRouter.post("/", createTodo);
todoRouter.patch("/:id", patchTodo);
todoRouter.delete("/:id", deleteTodo);

export default todoRouter;