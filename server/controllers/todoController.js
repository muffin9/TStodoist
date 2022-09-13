import connection from '../config/database.js';

export const createTodo = (req, res) => {
    try {
        const todo = {
            title: req.body.title,
            content: req.body.content,
            status: req.body.status,
            date: req.body.date,
            column_id: req.body.columnId
        }

        connection.query(`INSERT INTO todos (title, content, status, column_id) VALUES('${todo.title}', '${todo.content}', '${todo.status}', '${todo.column_id}')`, (err, todo, fields) => {
            if(err) {
                console.log(`query Error is ${err}...`);
                return;
            }
            return res.sendStatus(200);
        })
    } catch (err) {
        throw new Error(err);
    }
}

export const patchTodo = (req, res) => {
    try {
        const id = req.params.id;
        // 해당 id를 가지고 있는 todo가 있는지 체킹.
        const newTodo = {
            title: req.body.title,
            content: req.body.content,
        }

        connection.query(`UPDATE todos SET title='${newTodo.title}', content='${newTodo.content}' WHERE id='${id}' `, (err, todo, fileds) => {
            if(err) {
                console.log(`query Error is ${err}...`);
                return;
            }
            return res.sendStatus(200);
        })
    } catch (err) {
        throw new Error(err);
    }
}

export const deleteTodo = (req, res) => {
    try {
        const id = req.params.id;
        if(!id) {
            return res.sendStatus(500);
        }
        connection.query(`DELETE FROM todos WHERE id=${id}`, (err, todo, fileds) => {
            if(err) {
                console.log(`query Error is ${err}...`);
                return;
            }
            return res.sendStatus(200);
        })
    } catch (err) {
        throw new Error(err);
    }
}