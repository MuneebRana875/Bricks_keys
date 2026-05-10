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
    origin: ["http://localhost:5173", "http://localhost:5174", "https://bricks-keys.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
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
           console.error("Query Error (Properties):", err);
           return res.status(500).json({
               success: false,
               message: "Database error while fetching properties",
               error: err.message
           });
       }
       return res.json(results);
    });
});
app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }
    const sql = 'SELECT id, email FROM admins WHERE email = ? AND password = ?'; 
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error("Database Error (Login):", err);
            return res.status(500).json({ success: false, message: "Server error during login" });
        }

        if (results.length > 0) {
            return res.status(200).json({ 
                success: true, 
                message: "Login successful!",
                user: results[0]
            });
        } else {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid email or password" 
            });
        }
    });
});
app.use((err, req, res, next) => {
    console.error("Global Error Handler:", err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong on the server!",
        error: err.message
    });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});