require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express = require ('express');
const mysql = require ('mysql2');
const cors = require ('cors');
const path = require('path');


const app =express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


const db = mysql.createConnection({
    uri: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
db.connect ((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.get('/api/properties', (req, res) => {
    const property = 'SELECT * FROM properties'; 
    db.query(property, (err, results) => {
       if (err) return res.status(500).json(err);
       return res.json(results);
    });
    });




































































app.listen(5000,() =>
    console.log("server is runing on port 5000")


);