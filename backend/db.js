const mysql = require('mysql2');
require('dotenv').config();


const db = mysql.createPool({
    uri: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    waitForConnections: true,
    connectionLimit: 1, 
    queueLimit: 0,
    enableKeepAlive: true, 
    keepAliveInitialDelay: 10000
});


db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database via Pool');
    connection.release(); 
});


module.exports = db;