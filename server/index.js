import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import columnRouter from './routers/columnRouter.js';

const PORT = process.env.PORT || 3000;
const app = express();
const __dirname = path.resolve();

app.use(express.static(__dirname + "../src"));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);
});

app.use("/column", columnRouter);
