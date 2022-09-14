import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import rootRouter from './routers/index.js';
import columnRouter from './routers/columnRouter.js';
import todoRouter from './routers/todoRouter.js';
import actionRouter from './routers/actionRouter.js';

const PORT = process.env.PORT || 3000;
const app = express();
const __dirname = path.resolve();

app.use(express.static(__dirname + "../src"));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);
});


app.use('/', rootRouter);
app.use("/column", columnRouter);
app.use("/todo", todoRouter);
app.use("/action", actionRouter);