import connection from '../config/database.js';

export const getData = (req, res) => {
    try {
    // userid는 쿠키로 받아올예정.
    const userId = 1;
    // 데이터 가공
    connection.query(`SELECT * FROM todos where column_id in (select id from columns where user_id=${userId})`, (err, datas, fields) => { 
        if(err) {
            console.log(`query Error is ${err}...`);
            return;
        }
        return res.json(datas);
      });
    } catch (err) {
        throw new Error(err);
    }
}