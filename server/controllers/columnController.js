import pool from '../config/database.js';
import { createuuid } from '../util/uuid.js';
import { findIdByUser } from "./userController.js";

export const postColumn = async (req, res) => {
    const { email, oauthProvider } = req.user;
    const connection = await pool.getConnection(async conn => conn);

    try {
        const userId = await findIdByUser({provider: oauthProvider, email});

        const todo = {
            uuid: createuuid(),
            title: req.body.title,
            user_id: userId
        }
        
        // title 중복 체킹
        const [ column ] = await connection.query(`SELECT uuid FROM columns WHERE title='${todo.title}'`);
        if(column[0]) return res.sendStatus(409);

        await connection.beginTransaction();
        await connection.query(`INSERT INTO columns (uuid, title, user_id) VALUES('${todo.uuid}', '${todo.title}', '${todo.user_id}')`);
        await connection.commit();
        return res.sendStatus(200);
    } catch (err) {
        console.log(`query Error is ${err}...`);
    } finally {
        connection.release();
    }
}