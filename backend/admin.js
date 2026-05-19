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

router.delete('/properties/:id', (req, res) => {
    const { id } = req.params;
  

    const sql = 'DELETE FROM properties WHERE id = ?';
  
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error: Deletion failed." });
      }
  
   
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Property not found!" });
      }
  
      res.status(200).json({ message: "Property deleted successfully!" });
    });
});
router.get('/properties/:id', (req, res) => {
    const { id } = req.params;
    
    const sql = 'SELECT * FROM properties WHERE id = ?';
    
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
        title, property_type, price, location, 
        status, bedrooms, bathrooms, area_size, description 
    } = req.body;
    const imageUrl = req.file ? req.file.path : null;
    if (imageUrl) {
        const sql = `UPDATE properties SET 
            title = ?, 
            property_type = ?, 
            price = ?, 
            location = ?, 
            status = ?, 
            bedrooms = ?, 
            bathrooms = ?, 
            area_size = ?, 
            description = ?, 
            image_url = ? 
            WHERE id = ?`;
        
        const values = [
            title, property_type, price, location, 
            status, bedrooms, bathrooms, area_size, description, imageUrl, id
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
            price = ?, 
            location = ?, 
            status = ?, 
            bedrooms = ?, 
            bathrooms = ?, 
            area_size = ?, 
            description = ? 
            WHERE id = ?`;
        const values = [
            title, property_type, price, location, 
            status, bedrooms, bathrooms, area_size, description, id
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
module.exports = router;