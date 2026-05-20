const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/stats', (req, res) => {
    const sql = `SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN category = 'villas' THEN 1 ELSE 0 END) as villas,
        SUM(CASE WHEN category = 'apartments' THEN 1 ELSE 0 END) as apartments
        FROM properties`;
    
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results[0]);
    });
});

module.exports = router;