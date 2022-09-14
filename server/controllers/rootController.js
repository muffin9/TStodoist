import connection from '../config/database.js';

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