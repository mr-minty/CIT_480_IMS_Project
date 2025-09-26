require('dotenv').config();

const mysql = require("mysql2");

//Create connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,   // max number of connections in the pool
    queueLimit: 0          // unlimited waiting queue
});

const promisePool = pool.promise();

module.exports = promisePool;