import pool from '../config/database.js';

export const findUser = async (user) => {
    const { provider, email } = user;
    const connection = await pool.getConnection(async conn => conn);

    try{
        const [ result ] = await connection.query(`SELECT * FROM users WHERE oauthProvider='${provider}' AND email='${email}'`);
        return result[0] ? result[0] : '';
    } catch(err) {
        console.log(`query Error is ${err}...`);
        return;
    } finally {
        connection.release();
    }
}

export const findIdByUser = async (user) => {
    const { provider, email } = user;
    const connection = await pool.getConnection(async conn => conn);

    try{
        const [ result ] = await connection.query(`SELECT id FROM users WHERE oauthProvider='${provider}' AND email='${email}'`);
        return result[0] ? result[0].id : '';
    } catch(err) {
        console.log(`query Error is ${err}...`);
        return;
    } finally {
        connection.release();
    }
}

export const createUser = async (newUser) => {
    const connection = await pool.getConnection(async conn => conn);

    try {
        const { nickname, oauthProvider, email, avatarurl} = newUser;
        await connection.beginTransaction();
        const [ user ] = await connection.query(`INSERT INTO users (nickname, oauthProvider, email, avatarurl) VALUES ('${nickname}', '${oauthProvider}', '${email}', '${avatarurl}')`);
        const id = user.insertId;

        const columnValues = [
            ['todo', id],
            ['doing', id],
            ['done', id]
        ];

        // create set default columns(todo, doing, done)
        await connection.query(`INSERT INTO columns (title, user_id) VALUES ?;`, [columnValues]);
        return await connection.commit();
    } catch(err) {
        console.log(`query Error is ${err}...`);
        return;
    } finally {
        connection.release();
    }
}