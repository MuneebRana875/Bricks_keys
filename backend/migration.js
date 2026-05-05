const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'real_estate_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting:', err);
        return;
    }
    console.log('Connected to database');
    
    // 1. Add category column
    connection.query(`ALTER TABLE properties ADD COLUMN IF NOT EXISTS category VARCHAR(50) AFTER property_type`, (err) => {
        if (err && err.code !== 'ER_DUP_FIELDNAME') console.error(err);
        else console.log('✓ Category column ready');
    });
    
    // 2. Add city_id column
    connection.query(`ALTER TABLE properties ADD COLUMN IF NOT EXISTS city_id INT AFTER city_name`, (err) => {
        if (err && err.code !== 'ER_DUP_FIELDNAME') console.error(err);
        else console.log('✓ City_id column ready');
    });
    
    // 3. Create cities table
    connection.query(`
        CREATE TABLE IF NOT EXISTS cities (
            id INT AUTO_INCREMENT PRIMARY KEY,
            city_name VARCHAR(100) NOT NULL UNIQUE,
            city_slug VARCHAR(100) GENERATED ALWAYS AS (LOWER(REPLACE(city_name, ' ', '-'))),
            property_count INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) console.error(err);
        else console.log('✓ Cities table ready');
    });
    
    // 4. Insert cities from existing properties
    connection.query(`
        INSERT IGNORE INTO cities (city_name)
        SELECT DISTINCT city_name FROM properties WHERE city_name IS NOT NULL
    `, (err) => {
        if (err) console.error(err);
        else console.log('✓ Cities inserted');
    });
    
    // 5. Update city_id in properties
    connection.query(`
        UPDATE properties p
        INNER JOIN cities c ON p.city_name = c.city_name
        SET p.city_id = c.id
        WHERE p.city_id IS NULL
    `, (err) => {
        if (err) console.error(err);
        else console.log('✓ City IDs updated');
    });
    
    // 6. Update property counts
    connection.query(`
        UPDATE cities c
        SET property_count = (
            SELECT COUNT(*) FROM properties p WHERE p.city_id = c.id
        )
    `, (err) => {
        if (err) console.error(err);
        else console.log('✓ Property counts updated');
    });
    
    console.log('\n✅ Migration completed!');
    connection.end();
});