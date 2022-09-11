import express from "express";

const columnRouter = express.Router();

columnRouter.get("/", () => console.log("column get!"));

export default columnRouter;