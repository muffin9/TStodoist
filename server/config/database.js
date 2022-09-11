import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const databaseConfig = {
    host     : '127.0.0.1',
    user     : 'muffin',
    password : process.env.DATABASE_PASSWORD,
    database : 'todoist',
};

const connection = mysql.createConnection(databaseConfig);
connection.connect((error) => {
    if(error){
      console.log(error);
    } else{
      console.log('Connected:)');
    }
});

export default connection;