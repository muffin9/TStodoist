import pool from '../config/database.js';
import { findIdByUser } from "./userController.js";

export const postAction = async (req, res) => {
    const { email, oauthProvider } = req.user;
    const connection = await pool.getConnection(async conn => conn);
    try {
        const userId = await findIdByUser({ provider: oauthProvider, email });

        const action = {
            title: req.body.title,
            content: req.body.content || '',
            status: req.body.status,
            endStatus: req.body.endStatus || '',
            type: req.body.type,
            date: new Date().toISOString().slice(0, 19).replace('T', ' '),
            user_id: userId
        }
        await connection.beginTransaction();
        const [ newAction ] = await connection.query(`INSERT INTO actions (title, content, status, endStatus, type, date, user_id) VALUES('${action.title}', '${action.content}', '${action.status}', '${action.endStatus}', '${action.type}', '${action.date}', '${action.user_id}')`);
        console.log(newAction);
        await connection.commit();
        return res.json({ newAction });
    } catch (err) {
        console.log(`query Error is ${err}...`);
    } finally {
        connection.release();
    }
}

export const deleteAction = async (req, res) => {
    const connection = await pool.getConnection(async conn => conn);
    try {
        const uuid = req.params.uuid;
        if(!uuid) return res.sendStatus(500);

        await connection.beginTransaction();
        await connection.query(`UPDATE actions SET is_deleted=true WHERE uuid='${uuid}'`);
        await connection.commit();
        return res.sendStatus(200);
    } catch (err) {
        console.log(`query Error is ${err}...`);
    } finally {
        connection.release();
    }
}