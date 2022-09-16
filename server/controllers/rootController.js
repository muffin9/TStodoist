import fs from "fs";
import path from "path";
import connection from '../config/database.js';

export const home = (req, res) => {
    fs.readFile(path.join(path.resolve(), "../client/index.html"), (err, html) => {
        if (err) {
            console.log(err);
            return res.status(500).end(`<h1>ERROR</h1>`);
        }
        if(!req.session.passport) return res.redirect('/login');
        return res.status(200).end(html);
    });
}

export const getData = (req, res) => {
    try {
        const userId = 1;
        const columnsQuery = `SELECT id, title FROM columns where user_id=${userId};`;
        const todosQuery = `SELECT * FROM todos where column_id in (select id from columns where user_id=${userId});`
        connection.query(columnsQuery + todosQuery, (err, datas, fileds) => {
            if(err) {
                console.log(`query Error is ${err}...`);
                return;
            }
            return res.json({columns: datas[0], todos: datas[1]});
        });
    } catch (err) {
        throw new Error(err);
    }
}

export const login = (req,res) => {
    fs.readFile(path.join(path.resolve(), "../client/src/login.html"), (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).end(`<h1>ERROR</h1>`);
        }
        if (req.session.passport) return res.redirect('/');
        else return res.status(200).end(data);
    });
}

export const logout = (req,res) => {
    //passport 정보 삭제
    req.logout();
    //서버측 세션 삭제
    req.session.destroy(()=>{
        //클라이언트 측 세션 암호화 쿠키 삭제
        res.cookie('connect.sid','',{ maxAge:0 });
        res.redirect('/');
    });
}