import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import rootRouter from './routers/index.js';
import columnRouter from './routers/columnRouter.js';
import todoRouter from './routers/todoRouter.js';
import actionRouter from './routers/actionRouter.js';
import authRouter from './routers/authRouter.js';

import session from 'express-session';
import connectRedis from 'connect-redis';
import passport from "passport";

import { createClient }  from "redis";

const redisClient = createClient({ socket: { host: process.env.REDISCLOUD_URL || '127.0.0.1' }, legacyMode: true })
redisClient.connect().catch(console.error);
redisClient.on('connect', () => {
  console.log(`🚧 redis Connected!: ${process.env.REDIS_PORT}`)
})
const RedisStore = connectRedis(session);

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(`../client/src`));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 31536000000 }
}
));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', rootRouter);
app.use("/column", columnRouter);
app.use("/todo", todoRouter);
app.use("/action", actionRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`✅ Server listenting on http://127.0.0.1:${PORT} 🚀`);
});
