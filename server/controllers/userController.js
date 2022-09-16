import connection from '../config/database.js';

export const findUser = (user, callback) => {
    const { provider, email } = user;

    connection.query(`SELECT * FROM users WHERE oauthProvider='${provider}' AND email='${email}'`, (err, user, fields) => {
        if(err) {
            console.log(`query Error is ${err}...`);
            callback(0);
            return;
        }

        if(user.length === 0) callback(-1);
        return callback(user[0]);
    })
}

export const createUser = (newUser, callback) => {
    connection.query(`INSERT INTO users (nickname, oauthProvider, email, avatarurl) VALUES ('${newUser.nickname}', '${newUser.oauthProvider}', '${newUser.email}', '${newUser.avatarurl}')`, (err, user, fields) => {
        if(err) {
            console.log(`query Error is ${err}...`);
            return callback(0);
        }

        // create set default columns(todo, doing, done)
        const userId = user.insertId;
        const columnValues = [
            ['todo', userId],
            ['doing', userId],
            ['done', userId]
        ];
        connection.query(`INSERT INTO columns (title, user_id) VALUES ?;`, [columnValues], (err, columns, fields) => {
            if(err) {
                console.log(`query Error is ${err}...`);
                return callback(0);
            }
        });
        callback();
    })
}