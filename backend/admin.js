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
        title, property_type, price, location, 
        status, bedrooms, bathrooms, area_size, description 
    } = req.body;
    

    const imageUrl = req.file ? req.file.path : null; 

    const sql = `INSERT INTO properties 
    (title, property_type, price, location, status, bedrooms, bathrooms, area_size, description, image_url) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        title, property_type, price, location, 
        status, bedrooms, bathrooms, area_size, description, imageUrl
    ];

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Property with Image Added!", id: result.insertId });
    });
});

// Properties delete karne ka route
router.delete('/properties/:id', async (req, res) => {
  const { id } = req.params; // Frontend se bheja gaya ID yahan milega

  try {
    // Agar SQL use kar rahe hain (DBeaver/Aiven PostgreSQL)
    const result = await db.query('DELETE FROM properties WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Property nahi mili!" });
    }

    res.status(200).json({ message: "Property delete ho gayi" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error: Delete nahi ho paya" });
  }
});

module.exports = router;