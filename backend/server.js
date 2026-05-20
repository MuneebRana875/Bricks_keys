const express = require('express');
const cors = require('cors');
const db = require('./db');
const adminRoutes = require('./admin');
const dashboardRoutes = require('./dashboard');
const app = express();
if (process.env.NODE_ENV === 'production') {
  app.use('/api', (req, res, next) => {
    req.url = req.url.replace(/^\/api/, '');
    next();
  });
}

// Middleware
app.use(cors());
app.use(express.json());

// --- ROUTES ---

// 1. All Properties & Filters
app.get('/api/properties', (req, res) => {
    const { type, city, category, limit } = req.query;
    let sql = 'SELECT * FROM properties WHERE 1=1';
    const params = [];

    if (type) { sql += ' AND property_type = ?'; params.push(type); }
    if (city) { sql += ' AND city_slug = ?'; params.push(city); }
    if (category) { sql += ' AND category = ?'; params.push(category); }
    
    sql += ' ORDER BY id DESC';
    if (limit) { 
        sql += ' LIMIT ?'; 
        params.push(parseInt(limit)); 
    }

    db.query(sql, params, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 2. Single Property Detail
app.get('/api/properties/detail/:slug', (req, res) => {
    db.query('SELECT * FROM properties WHERE slug = ?', [req.params.slug], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result[0] || { message: "Property not found" });
    });
});

// 3. Articles/News
app.get('/api/articles', (req, res) => {
    db.query('SELECT * FROM articles ORDER BY date DESC', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 4. City/Area Counts (Fixed: Added specific areas route)
app.get('/api/properties/areas', (req, res) => {
    const sql = 'SELECT DISTINCT city_name, city_slug FROM properties';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 5. Meta Stats (Featured Categories)
app.get('/api/meta/counts', (req, res) => {
    const sql = `
        SELECT 
            (SELECT COUNT(*) FROM properties WHERE city_name = 'New York') as ny,
            (SELECT COUNT(*) FROM properties WHERE category = 'villas') as villas,
            (SELECT COUNT(*) FROM properties WHERE category = 'apartments') as apartments
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
});

// Imported Route Handlers
app.use('/admin', adminRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health Check Route (Good for testing if server is alive)
app.get('/', (req, res) => {
    res.send("Bricks & Keys API is running...");
});

// --- VERCEL CONFIGURATION ---

// Locally, you can still use app.listen
if (process.env.NODE_ENV !== 'production') {
    const PORT = 5000;
    app.listen(PORT, () => console.log(`Server running locally on port ${PORT}`));
}

// Crucial for Vercel deployment:
module.exports = app;