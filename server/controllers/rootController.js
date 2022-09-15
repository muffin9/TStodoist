import fs from "fs";
import path from "path";
import connection from '../config/database.js';

export const home = (req, res) => {
    // req.session 이 없으면 로그인 화면으로 리다이렉트 시키기.
    fs.readFile(path.join(path.resolve(), "../client/index.html"), (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).end(`<h1>ERROR</h1>`);
        }
        return res.status(200).end(data);
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
        return res.status(200).end(data);
    });
}