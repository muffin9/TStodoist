import fs from "fs";
import path from "path";
import pool from '../config/database.js';
import { findIdByUser } from "./userController.js";

export const home = (req, res) => {
    fs.readFile(path.join(path.resolve(), "../client/index.html"), (err, html) => {
        if (err) {
            console.log(err);
            return res.status(500).end(`<h1>ERROR</h1>`);
        }
        return res.status(200).end(html);
    });
}

    export const getData = async (req, res) => {
        const { email, oauthProvider, avatarurl } = req.user;
        const connection = await pool.getConnection(async conn => conn);
        try {
            const userId = await findIdByUser({ provider: oauthProvider, email });
            const [ columns ] = await connection.query(`SELECT * FROM columns where user_id='${userId}' and is_deleted = false;`);
            const [ todos ] = await connection.query(`SELECT * FROM todos where column_id in (select id from columns where user_id='${userId}') and is_deleted=false order by date desc`);
            const [ actions ] = await connection.query(`SELECT * FROM actions where user_id='${userId}' and is_deleted=false order by date desc`)
            return res.json({
                email: email,
                avatarurl: avatarurl,
                columns: columns,
                todos: todos,
                actions: actions
            });
        } catch (err) {
            console.log(`query Error is ${err}...`);
        } finally {
            connection.release();
        }
    }

export const login = (req,res) => {
    fs.readFile(path.join(path.resolve(), "../client/src/login.html"), (err, html) => {
        if (err) {
            console.log(err);
            return res.status(500).end(`<h1>ERROR</h1>`);
        }
        return res.status(200).end(html);
    });
}

export const logout = (req,res) => {
    req.session.destroy(()=>{
        //클라이언트 측 세션 암호화 쿠키 삭제
        res.cookie('connect.sid','',{ maxAge:0 });
        res.redirect('/');
    });
}