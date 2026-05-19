require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const adminRoutes = require('./admin');
const dashboardRoutes = require('./dashboard');
const db = require('./db');

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/admin', adminRoutes);
app.use('/api/dashboard', dashboardRoutes);



app.get('/api/properties', (req, res) => {
    const sql = 'SELECT * FROM properties'; 
    
    db.query(sql, (err, results) => {
       if (err) {
           console.error("Query Error:", err);
           return res.status(500).json(err);
       }
       return res.json(results);
    });
});





app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;

   
    const sql = 'SELECT * FROM admins WHERE email = ? AND password = ?';
    
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ message: "Server error" });
        }

        if (results.length > 0) {
           
            return res.status(200).json({ 
                success: true, 
                message: "Login successful!",
                user: { id: results[0].id, email: results[0].email }
            });
        } else {
          
            return res.status(401).json({ 
                success: false, 
                message: "Invalid email or password" 
            });
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

