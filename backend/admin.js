require('dotenv').config();
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
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'property_images',
        allowed_formats: ['jpg', 'png', 'jpeg']
    },
});
const upload = multer({ storage: storage });
router.get('/cities', (req, res) => {
    const sql = `
        SELECT 
            c.id,
            c.city_name,
            c.city_slug,
            COUNT(p.id) as property_count
        FROM cities c
        LEFT JOIN properties p ON c.id = p.city_id
        GROUP BY c.id
        ORDER BY c.city_name
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Cities Fetch Error:", err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.status(200).json(results);
    });
});
router.get('/categories', (req, res) => {
    const categories = ['Modern Villa', 'Apartments', 'Office Space', 'Townhouse'];
    res.status(200).json(categories);
});
router.post('/add-property', upload.single('image'), (req, res) => {
    const { 
        title, property_type, category, price, location, 
        status, bedrooms, bathrooms, area_size, description, city_id 
    } = req.body;
    if (!title || !property_type || !price || !city_id) {
        return res.status(400).json({ 
            success: false,
            error: "Missing required fields: title, property_type, price, and city_id are required" 
        });
    }
    const imageUrl = req.file ? req.file.path : null;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const priceValue = parseFloat(price.toString().replace(/[^0-9.-]/g, '')) || 0;
    const sql = `INSERT INTO properties 
    (title, property_type, category, price, price_value, location, 
     status, bedrooms, bathrooms, area, description, image_url, city_id, slug) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        title, property_type, category || null, price, priceValue,
        location || null, status || 'Active', bedrooms || 0, bathrooms || 0, 
        area_size || null, description || null, imageUrl, city_id, slug
    ];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Insert Property Error:", err);
            return res.status(500).json({ success: false, error: err.message });
        }
        const updateCountSql = `
            UPDATE cities c
            SET property_count = (SELECT COUNT(*) FROM properties WHERE city_id = ?)
            WHERE c.id = ?
        `;
        db.query(updateCountSql, [city_id, city_id]);
        
        res.status(200).json({ 
            success: true,
            message: "Property added successfully!", 
            id: result.insertId 
        });
    });
});
router.get('/properties', (req, res) => {
    const { city, category } = req.query;
    let sql = `
        SELECT p.*, c.city_name 
        FROM properties p 
        LEFT JOIN cities c ON p.city_id = c.id
        WHERE 1=1
    `;
    const values = [];
    if (city && city !== 'all') {
        sql += ' AND p.city_id = ?';
        values.push(city);
    }
    if (category && category !== 'all') {
        sql += ' AND p.category = ?';
        values.push(category);
    }
    sql += ' ORDER BY p.created_at DESC';
    db.query(sql, values, (err, results) => {
        if (err) {
            console.error("Fetch Properties Error:", err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.status(200).json({ success: true, count: results.length, properties: results });
    });
});
router.put('/properties/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { 
        title, property_type, category, price, location, 
        status, bedrooms, bathrooms, area_size, description, city_id
    } = req.body;

    if (!title) return res.status(400).json({ error: "Title is required for update" });

    const imageUrl = req.file ? req.file.path : null;
    const priceValue = price ? parseFloat(price.toString().replace(/[^0-9.-]/g, '')) : 0;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    let sql, values;

    if (imageUrl) {
        sql = `UPDATE properties SET 
            title=?, property_type=?, category=?, price=?, price_value=?, location=?, 
            status=?, bedrooms=?, bathrooms=?, area=?, description=?, image_url=?, city_id=?, slug=?
            WHERE id=?`;
        values = [title, property_type, category, price, priceValue, location, status, bedrooms, bathrooms, area_size, description, imageUrl, city_id, slug, id];
    } else {
        sql = `UPDATE properties SET 
            title=?, property_type=?, category=?, price=?, price_value=?, location=?, 
            status=?, bedrooms=?, bathrooms=?, area=?, description=?, city_id=?, slug=?
            WHERE id=?`;
        values = [title, property_type, category, price, priceValue, location, status, bedrooms, bathrooms, area_size, description, city_id, slug, id];
    }

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Update Error:", err);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ success: true, message: "Property updated successfully!" });
    });
});
router.delete('/properties/:id', (req, res) => {
    const { id } = req.params;

    db.query('SELECT city_id FROM properties WHERE id = ?', [id], (err, result) => {
        if (err || result.length === 0) return res.status(404).json({ error: "Property not found" });
        
        const cityId = result[0].city_id;

        db.query('DELETE FROM properties WHERE id = ?', [id], (err, deleteResult) => {
            if (err) return res.status(500).json({ error: "Deletion failed" });
            db.query(`UPDATE cities SET property_count = (SELECT COUNT(*) FROM properties WHERE city_id = ?) WHERE id = ?`, [cityId, cityId]);
            
            res.status(200).json({ success: true, message: "Property deleted successfully!" });
        });
    });
});

module.exports = router;