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
            console.error(err);
            return res.status(500).json({ error: err.message });
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
        title, 
        property_type, 
        category, 
        price, 
        location, 
        status, 
        bedrooms, 
        bathrooms, 
        area_size, 
        description, 
        city_id 
    } = req.body;
    
    const imageUrl = req.file ? req.file.path : null;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const priceValue = parseFloat(price.toString().replace(/[^0-9.-]/g, ''));
    if (!title || !property_type || !price || !city_id) {
        return res.status(400).json({ 
            error: "Missing required fields: title, property_type, price, and city_id are required" 
        });
    }

    const sql = `INSERT INTO properties 
    (title, property_type, category, price, price_value, location, 
     status, bedrooms, bathrooms, area, description, image_url, city_id, slug) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        title, 
        property_type, 
        category || null, 
        price, 
        priceValue,
        location || null, 
        status || 'Active', 
        bedrooms || 0, 
        bathrooms || 0, 
        area_size || null, 
        description || null, 
        imageUrl, 
        city_id,
        slug
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        
        const updateCountSql = `
            UPDATE cities c
            SET property_count = (
                SELECT COUNT(*) FROM properties p 
                WHERE p.city_id = c.id
            )
            WHERE c.id = ?
        `;
        db.query(updateCountSql, [city_id]);
        
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
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        
        res.status(200).json({
            success: true,
            count: results.length,
            properties: results
        });
    });
});

router.get('/cities/:citySlug/properties', (req, res) => {
    const { citySlug } = req.params;
    
    const sql = `
        SELECT p.*, c.city_name 
        FROM properties p 
        INNER JOIN cities c ON p.city_id = c.id 
        WHERE c.city_slug = ?
        ORDER BY p.created_at DESC
    `;
    
    db.query(sql, [citySlug], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        
        res.status(200).json({
            success: true,
            city: citySlug,
            count: results.length,
            properties: results
        });
    });
});

router.get('/properties/:id', (req, res) => {
    const { id } = req.params;
    
    const sql = `
        SELECT p.*, c.city_name 
        FROM properties p 
        LEFT JOIN cities c ON p.city_id = c.id 
        WHERE p.id = ?
    `;
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        
        if (result.length === 0) {
            return res.status(404).json({ message: "Property not found!" });
        }
        
        res.status(200).json(result[0]);
    });
});

router.put('/properties/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { 
        title, property_type, category, price, location, 
        status, bedrooms, bathrooms, area_size, description, city_id
    } = req.body;
    const imageUrl = req.file ? req.file.path : null;
    const priceValue = parseFloat(price.toString().replace(/[^0-9.-]/g, ''));
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    if (imageUrl) {
        const sql = `UPDATE properties SET 
            title = ?, 
            property_type = ?, 
            category = ?,
            price = ?,
            price_value = ?,
            location = ?, 
            status = ?, 
            bedrooms = ?, 
            bathrooms = ?, 
            area = ?, 
            description = ?, 
            image_url = ?,
            city_id = ?,
            slug = ?
            WHERE id = ?`;
        
        const values = [
            title, property_type, category, price, priceValue, location, 
            status, bedrooms, bathrooms, area_size, description, imageUrl, city_id, slug, id
        ];
        
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: err.message });
            }
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Property not found!" });
            }
            
            res.status(200).json({ 
                message: "Property updated successfully with new image!", 
                id: id 
            });
        });
    } 
    else {
        const sql = `UPDATE properties SET 
            title = ?, 
            property_type = ?, 
            category = ?,
            price = ?,
            price_value = ?,
            location = ?, 
            status = ?, 
            bedrooms = ?, 
            bathrooms = ?, 
            area = ?, 
            description = ?,
            city_id = ?,
            slug = ?
            WHERE id = ?`;
        
        const values = [
            title, property_type, category, price, priceValue, location, 
            status, bedrooms, bathrooms, area_size, description, city_id, slug, id
        ];
        
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: err.message });
            }
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Property not found!" });
            }
            
            res.status(200).json({ 
                message: "Property updated successfully!", 
                id: id 
            });
        });
    }
});

router.delete('/properties/:id', (req, res) => {
    const { id } = req.params;
    

    const getCitySql = 'SELECT city_id FROM properties WHERE id = ?';
    db.query(getCitySql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        
        const cityId = result[0]?.city_id;
        
        const deleteSql = 'DELETE FROM properties WHERE id = ?';
        db.query(deleteSql, [id], (err, deleteResult) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Error: Deletion failed." });
            }
        
            if (deleteResult.affectedRows === 0) {
                return res.status(404).json({ message: "Property not found!" });
            }
            

            if (cityId) {
                const updateCountSql = `
                    UPDATE cities c
                    SET property_count = (
                        SELECT COUNT(*) FROM properties p 
                        WHERE p.city_id = c.id
                    )
                    WHERE c.id = ?
                `;
                db.query(updateCountSql, [cityId]);
            }
            
            res.status(200).json({ message: "Property deleted successfully!" });
        });
    });
});

module.exports = router;