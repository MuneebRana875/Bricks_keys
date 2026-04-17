const express = require('express');
const router = express.Router();
const db = require('./db');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Cloudinary Configuration (Ye details Cloudinary dashboard se milengi)
cloudinary.config({
    cloud_name: 'your_cloud_name',
    api_key: 'your_api_key',
    api_secret: 'your_api_secret'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'property_images',
        allowed_formats: ['jpg', 'png', 'jpeg']
    },
});

const upload = multer({ storage: storage });

// Update: Route ab image bhi handle karega
router.post('/add-property', upload.single('image'), (req, res) => {
    const { 
        title, category, brand, price, location, 
        status, bedrooms, bathrooms, area, description 
    } = req.body;
    
    // Image ka URL jo Cloudinary ne diya
    const imageUrl = req.file ? req.file.path : null; 

    const sql = `INSERT INTO properties 
    (title, category, brand, price, location, status, bedrooms, bathrooms, area, description, image_url) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        title, category, brand, price, location, 
        status, bedrooms, bathrooms, area, description, imageUrl
    ];

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Property with Image Added!", id: result.insertId });
    });
});

module.exports = router;