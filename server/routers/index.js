import express from "express";
import connection from '../config/database.js';

const rootRoter = express.Router();

rootRoter.get("/", () => {
    connection.query("SELECT * FROM columns", function (err, results, fields) { 
        if (err) {
            console.log(err);
        }
        console.log(results);
      });
});

export default rootRoter;