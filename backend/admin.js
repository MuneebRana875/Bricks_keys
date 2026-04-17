const express = require('express');
const router = express.Router();
const db = require('./db'); // Database file ko link kiya

// Example: Add Property Route
router.post('/add-property', (req, res) => {
    const { title, category, brand, price } = req.body;
    const sql = "INSERT INTO properties (title, category, brand, price) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [title, category, brand, price], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Property added successfully!" });
    });
});

module.exports = router;