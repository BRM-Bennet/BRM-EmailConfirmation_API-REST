const dbConfig = require('../config/dbConfig.json');
const mysql = require('mysql');

const pool = mysql.createPool({
    host: dbConfig.dbhost,
    port: dbConfig.dbport,
    user: dbConfig.dbuser,
    password: dbConfig.dbpassword,
    database: dbConfig.dbname,
});

let dbQueries = {};

dbQueries.getConfirmation = (confimationCode) => {
    return new Promise((resolve, reject) => {
        pool.getConnection( function (err, connection) {
            connection.query(
                "UPDATE user_confirmation SET email_status = ? WHERE code = ?",
                ['confirmed', confimationCode],
                (error, result) => {
                    connection.release();
                    if(error) {
                        return reject(error);
                    }
                    return resolve(result.changedRows > 0)
                }
            );
        });
    });
};

module.exports = dbQueries;
