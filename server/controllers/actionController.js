import connection from '../config/database.js';

export const postAction = (req, res) => {
    try {
        const userId = 1;

        const action = {
            title: req.body.title,
            content: req.body.content || '',
            status: req.body.status,
            endStatus: req.body.endStatus || '',
            type: req.body.type,
            date: new Date().toISOString().slice(0, 19).replace('T', ' '),
            user_id: userId
        }

        connection.query(`INSERT INTO actions (title, content, status, endStatus, type, date, user_id) VALUES('${action.title}', '${action.content}', '${action.status}', '${action.endStatus}', '${action.type}', '${action.date}', '${action.user_id}')`, (err, todo, fields) => {
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