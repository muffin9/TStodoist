import pool from '../config/database.js';
import { createuuid } from '../util/uuid.js';
import { findIdByUser } from "./userController.js";

export const findColumnByuuid = async (uuid) => {
    const connection = await pool.getConnection(async conn => conn);

    try {
        const [ column ] = await connection.query(`SELECT * FROM columns WHERE uuid='${uuid}'`);
        if(!column.length) return res.sendStats(500);
        return column;
    } catch(err) {
        console.log(`query Error is ${err}...`);
    } finally {
        connection.release();
    }
}

export const findColumnIdByuuid = async (uuid) => {
    const connection = await pool.getConnection(async conn => conn);

    try {
        const [ column ] = await connection.query(`SELECT id FROM columns WHERE uuid='${uuid}'`);
        return column[0] ? column[0].id : '';
    } catch(err) {
        console.log(`query Error is ${err}...`);
    } finally {
        connection.release();
    }
}

export const postColumn = async (req, res) => {
    // const { email, oauthProvider } = req.user;
    const email = 'jinlog9@gmail.com';
    const oauthProvider = 'google';
    const connection = await pool.getConnection(async conn => conn);

    try {
        const userId = await findIdByUser({ provider: oauthProvider, email });

        const column = {
            uuid: createuuid(),
            title: req.body.title,
            user_id: userId
        }

        // title 중복 체킹
        await connection.query(`SELECT uuid FROM columns WHERE title='${column.title}'`);
        if(column[0]) return res.sendStatus(409);

        await connection.beginTransaction();
        await connection.query(`INSERT INTO columns (uuid, title, user_id) VALUES('${column.uuid}', '${column.title}', '${column.user_id}')`);
        await connection.commit();
        const newColumn = await findColumnByuuid(column.uuid);
        return res.json(newColumn[0]);
    } catch (err) {
        console.log(`query Error is ${err}...`);
    } finally {
        connection.release();
    }
}

export const patchColumn = async (req, res) => {
    const connection = await pool.getConnection(async conn => conn);
    try {
        const uuid = req.params.uuid;
        if(!uuid) return res.sendStats(500);

        const column = {
            title: req.body.title
        }

        await connection.beginTransaction();
        // column 중복 체킹
        const [ isExistColumnTitle ] = await connection.query(`SELECT id FROM columns WHERE title='${column.title}'`);
        if(isExistColumnTitle.length) return res.sendStatus(409);

        await connection.query(`UPDATE columns SET title='${column.title}' WHERE uuid='${uuid}'`);
        const columnId = await findColumnIdByuuid(uuid);
        await connection.query(`UPDATE todos SET status='${column.title}' WHERE column_id='${columnId}'`);
        await connection.commit();
        const newColumn = await findColumnByuuid(uuid);
        return res.json(newColumn[0]);
    } catch (err) {
        console.log(`query Error is ${err}...`);
    } finally {
        connection.release();
    }
}