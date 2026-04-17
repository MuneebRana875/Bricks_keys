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


router.post('/add-property', upload.single('image'), (req, res) => {
    const { 
        title, property_type, price, location, bedrooms, bathrooms, area, description 
    } = req.body;
    

    const imageUrl = req.file ? req.file.path : null; 

    const sql = `INSERT INTO properties 
    (title, property_type, price, location, bedrooms, bathrooms, area, description, image_url) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        title, property_type, price, location, bedrooms, bathrooms, area, description, imageUrl
    ];

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Property with Image Added!", id: result.insertId });
    });
});

module.exports = router;