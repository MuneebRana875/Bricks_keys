require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// 1. Pool banayein (Variable ka naam 'db' rakh letay hain taake niche asani ho)
const db = mysql.createPool({
    uri: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    waitForConnections: true,
    connectionLimit: 1, 
    queueLimit: 0,
    enableKeepAlive: true, // Connection ko zinda rakhne ke liye
    keepAliveInitialDelay: 10000
});

// 2. Pool mein .connect() ki zaroorat nahi hoti, bas aik test query kar letay hain
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database via Pool');
    connection.release(); // Connection wapas pool mein bhej dein
});

app.get('/api/properties', (req, res) => {
    const sql = 'SELECT * FROM properties'; 
    // 3. 'db' (jo pool hai) wahi query handle karega
    db.query(sql, (err, results) => {
       if (err) {
           console.error("Query Error:", err);
           return res.status(500).json(err);
       }
       return res.json(results);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});






























































app.listen(5000,() =>
    console.log("server is runing on port 5000")


);