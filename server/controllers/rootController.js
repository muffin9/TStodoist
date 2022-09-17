import fs from "fs";
import path from "path";
import connection from '../config/database.js';

export const home = (req, res) => {
    fs.readFile(path.join(path.resolve(), "../client/index.html"), (err, html) => {
        if (err) {
            console.log(err);
            return res.status(500).end(`<h1>ERROR</h1>`);
        }
        if(!req.user) return res.redirect('/login');
        return res.status(200).end(html);
    });
}

export const getData = (req, res) => {
    if(!req.user) return;
    const { email, avatarurl } = req.user;

    try {
        // findBy userEmail...
        connection.query(`SELECT id FROM users where email='${email}'`, (err, user, fields) => {
            if(!user[0]) throw new Error(`user is not Found.`);
            const userId = user[0].id;
            const columnsQuery = `SELECT id, title FROM columns where user_id='${userId}';`;
            const todosQuery = `SELECT * FROM todos where column_id in (select id from columns where user_id='${userId}');`
            connection.query(columnsQuery + todosQuery, (err, datas, fileds) => {
                if(err) {
                    console.log(`query Error is ${err}...`);
                    return;
                }
                return res.json({
                    email: email,
                    avatarurl: avatarurl,
                    columns: datas[0],
                    todos: datas[1]});
                });
            })
    } catch (err) {
        throw new Error(err);
    }
}

export const login = (req,res) => {
    fs.readFile(path.join(path.resolve(), "../client/src/login.html"), (err, html) => {
        if (err) {
            console.log(err);
            return res.status(500).end(`<h1>ERROR</h1>`);
        }
        if (req.user) return res.redirect('/');
        else return res.status(200).end(html);
    });
}

export const logout = (req,res) => {
    req.session.destroy(()=>{
        //클라이언트 측 세션 암호화 쿠키 삭제
        res.cookie('connect.sid','',{ maxAge:0 });
        res.redirect('/');
    });
}