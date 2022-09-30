import pool from '../config/database.js';
import { createuuid } from '../util/uuid.js';
import { findColumnIdByuuid, findColumnuuidById } from './columnController.js';

export const findTodoByuuid = async (uuid) => {
    const connection = await pool.getConnection(async conn => conn);

    try {
        const [ todo ] = await connection.query(`SELECT * FROM todos WHERE uuid='${uuid}'`);
        if(!todo.length) return res.sendStatus(500);
        return todo;
    } catch(err) {
        console.log(`query Error is ${err}...`);
    } finally {
        connection.release();
    }
}

export const postTodo = async (req, res) => {
    const connection = await pool.getConnection(async conn => conn);
    const offset = new Date().getTimezoneOffset() * 60000;
    const today = new Date(Date.now() - offset);

    try {
        const todo = {
            uuid: createuuid(),
            title: req.body.title,
            content: req.body.content,
            status: req.body.status,
            date: today.toISOString().slice(0, 19).replace('T', ' '),
            column_id: req.body.columnId
        }

        const columnId = await findColumnIdByuuid(todo.column_id);

        await connection.beginTransaction();
        await connection.query(`INSERT INTO todos (uuid, title, content, status, date, column_id) VALUES('${todo.uuid}', '${todo.title}', '${todo.content}', '${todo.status}', '${todo.date}', '${columnId}')`);
        await connection.commit();
        const newTodo = await findTodoByuuid(todo.uuid);
        return res.json({
            uuid: newTodo[0].uuid,
            columnId: todo.column_id,
            title: newTodo[0].title,
            content: newTodo[0].content,
            status: newTodo[0].status,
            date: newTodo[0].date,
        });
    } catch (err) {
        console.log(`query Error is ${err}...`);
    } finally {
        connection.release();
    }
}

export const patchTodo = async (req, res) => {

    const connection = await pool.getConnection(async conn => conn);
    try {
        const uuid = req.params.uuid;
        if(!uuid) return res.sendStatus(500);

        const todo = {
            title: req.body.title,
            content: req.body.content,
            date: new Date().toISOString().slice(0, 19).replace('T', ' '),
        }

        await connection.beginTransaction();
        await connection.query(`UPDATE todos SET title='${todo.title}', content='${todo.content}', date='${todo.date}' WHERE uuid='${uuid}' `);
        await connection.commit();
        const newTodo = await findTodoByuuid(uuid);
        const columnuuid = await findColumnuuidById(newTodo[0].column_id);
        
        return res.json({
            uuid: newTodo[0].uuid,
            columnId: columnuuid,
            title: newTodo[0].title,
            content: newTodo[0].content,
            status: newTodo[0].status,
            date: newTodo[0].date,
        });
    } catch (err) {
        console.log(`query Error is ${err}...`);
    } finally {
        connection.release();
    }
}

export const deleteTodo = async (req, res) => {
    const connection = await pool.getConnection(async conn => conn);
    try {
        const uuid = req.params.uuid;
        if(!uuid) return res.sendStatus(500);
        await connection.beginTransaction();
        await connection.query(`UPDATE todos SET is_deleted=1 WHERE uuid='${uuid}'`);
        await connection.commit();
        return res.sendStatus(200);
    } catch (err) {
        console.log(`query Error is ${err}...`);
    } finally {
        connection.release();
    }
}

export const patchTodoStatusByColumnId = () => {}