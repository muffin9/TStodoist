import pool from '../config/database.js';

export const postTodo = async (req, res) => {
    const connection = await pool.getConnection(async conn => conn);

    try {
        const todo = {
            title: req.body.title,
            content: req.body.content,
            status: req.body.status,
            date: req.body.date,
            column_id: req.body.columnId
        }

        await connection.beginTransaction();
        await connection.query(`INSERT INTO todos (title, content, status, column_id) VALUES('${todo.title}', '${todo.content}', '${todo.status}', '${todo.column_id}')`);
        await connection.commit();
        return res.sendStatus(200);
    } catch (err) {
        console.log(`query Error is ${err}...`);
    } finally {
        connection.release();
    }
}

export const patchTodo = async (req, res) => {
    const connection = await pool.getConnection(async conn => conn);
    try {
        const id = req.params.id;
        // 해당 id를 가지고 있는 todo가 있는지 체킹.
        const newTodo = {
            title: req.body.title,
            content: req.body.content,
        }
        await connection.beginTransaction();
        await connection.query(`UPDATE todos SET title='${newTodo.title}', content='${newTodo.content}' WHERE id='${id}' `);
        await connection.commit();
        return res.sendStatus(200);
    } catch (err) {
        console.log(`query Error is ${err}...`);
    } finally {
        connection.release();
    }
}

export const deleteTodo = async (req, res) => {
    const connection = await pool.getConnection(async conn => conn);
    try {
        const id = req.params.id;
        if(!id) return res.sendStatus(500);
        await connection.beginTransaction();
        await connection.query(`DELETE FROM todos WHERE id=${id}`);
        await connection.commit();
        return res.sendStatus(200);
    } catch (err) {
        console.log(`query Error is ${err}...`);
    } finally {
        connection.release();
    }
}