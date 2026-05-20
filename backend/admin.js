const express = require('express');
const router = express.Router();
const db = require('./db');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ 
    storage: new CloudinaryStorage({
        cloudinary: cloudinary,
        params: { folder: 'property_images', allowed_formats: ['jpg', 'png', 'jpeg'] }
    })
});

// 1. ADD PROPERTY
router.post('/add-property', upload.single('image'), (req, res) => {
    const { title, category, price, price_value, city_name, city_slug, slug, bedrooms, bathrooms, area, address, description } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const sql = `INSERT INTO properties 
    (category, city_slug, city_name, slug, title, price, price_value, bedrooms, bathrooms, area, address, description, image_url) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [category, city_slug, city_name, slug, title, price, price_value, bedrooms, bathrooms, area, address, description, imageUrl], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Property added!", id: result.insertId });
    });
});

// 2. UPDATE PROPERTY (EDIT)
router.put('/update-property/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { title, category, price, price_value, city_name, city_slug, slug, bedrooms, bathrooms, area, address, description } = req.body;
    
    let sql = `UPDATE properties SET category=?, city_slug=?, city_name=?, slug=?, title=?, price=?, price_value=?, bedrooms=?, bathrooms=?, area=?, address=?, description=?`;
    let params = [category, city_slug, city_name, slug, title, price, price_value, bedrooms, bathrooms, area, address, description];

    if (req.file) {
        sql += `, image_url=? WHERE id=?`;
        params.push(req.file.path, id);
    } else {
        sql += ` WHERE id=?`;
        params.push(id);
    }

    db.query(sql, params, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Property updated!" });
    });
});

// 3. DELETE PROPERTY
router.delete('/delete-property/:id', (req, res) => {
    db.query('DELETE FROM properties WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Property deleted!" });
    });
});

module.exports = router;