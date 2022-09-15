import express from "express";
import passport from '../config/passport.js';

const authRouter = express.Router();

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/google/callback', passport.authenticate('google'), (req, res) => res.redirect("/"));

export default authRouter;