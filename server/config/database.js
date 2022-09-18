import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const databaseConfig = {
    host     : '127.0.0.1',
    user     : 'muffin',
    password : process.env.DATABASE_PASSWORD,
    database : 'todoist',
    multipleStatements: true
};

const pool = mysql.createPool(databaseConfig);

export default pool;