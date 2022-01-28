const mysql = require('mysql2');

const pool = mysql.createPool({
    host            : '159.65.220.66',
    user            : 'iste501',
    password        : 'Iste501Cage',
    database        : 'cage'
});

pool.getConnection((error, connection) => {
    if (error) {
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        else if (error.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        else if (error.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
        else {
            console.log(`Error in connecting to mysql server: ${error}`);
        }
    }
    else {
        console.log('Connected to the MySQL cage database!');

        pool.releaseConnection(connection);
    }
});

const poolPromise = pool.promise();

module.exports = poolPromise;