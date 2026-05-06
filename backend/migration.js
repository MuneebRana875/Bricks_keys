const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'mysql-1f76f92a-muneebrana497-c630.g.aivencloud.com',
    port: 23704,
    user: 'avnadmin',
    password: 'AVNS_8XGsdd5v9A9cUMOyTdk',
    database: 'defaultdb',
    ssl: {
        rejectUnauthorized: false
    },
    connectTimeout: 30000
});

console.log('📡 Connecting to Aiven Cloud database...');
console.log('Host:', 'mysql-1f76f92a-muneebrana497-c630.g.aivencloud.com');
console.log('Port:', 23704);
console.log('Database:', 'defaultdb');

connection.connect((err) => {
    if (err) {
        console.error('Connection error:', err.message);
        process.exit(1);
    }
    
    console.log('Connected to database successfully!\n');
    console.log('Running migrations...\n');
    connection.query(`
        CREATE TABLE IF NOT EXISTS properties (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            property_type VARCHAR(50) NOT NULL,
            category VARCHAR(50),
            price VARCHAR(50) NOT NULL,
            price_value DECIMAL(12,2),
            location VARCHAR(255),
            city_name VARCHAR(100),
            city_slug VARCHAR(100),
            status VARCHAR(50) DEFAULT 'Active',
            bedrooms INT DEFAULT 0,
            bathrooms INT DEFAULT 0,
            area VARCHAR(50),
            description TEXT,
            image_url VARCHAR(500),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.log('Properties table:', err.message);
        } else {
            console.log(' Properties table ready');
        }
    });

    
    connection.query(`ALTER TABLE properties ADD COLUMN IF NOT EXISTS category VARCHAR(50) AFTER property_type`, (err) => {
        if (err && err.code !== 'ER_DUP_FIELDNAME') {
            console.log('Category column:', err.message);
        } else {
            console.log(' Category column ready');
        }
    });
    connection.query(`ALTER TABLE properties ADD COLUMN IF NOT EXISTS city_id INT AFTER city_name`, (err) => {
        if (err && err.code !== 'ER_DUP_FIELDNAME') {
            console.log('City_id column:', err.message);
        } else {
            console.log('City_id column ready');
        }
    });
    connection.query(`
        CREATE TABLE IF NOT EXISTS cities (
            id INT AUTO_INCREMENT PRIMARY KEY,
            city_name VARCHAR(100) NOT NULL UNIQUE,
            city_slug VARCHAR(100) GENERATED ALWAYS AS (LOWER(REPLACE(city_name, ' ', '-'))),
            property_count INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.log('Cities table:', err.message);
        } else {
            console.log('Cities table ready');
        }
    });
    connection.query(`
        INSERT IGNORE INTO cities (city_name) VALUES 
        ('New York'), ('San Diego'), ('Arizona'), ('Miami'),
        ('Los Angeles'), ('Hawaii'), ('Florida'), ('Chicago'), ('Washington')
    `, (err) => {
        if (err) {
            console.log('Insert cities:', err.message);
        } else {
            console.log('Cities inserted');
        }
    });
    connection.query(`
        UPDATE properties p
        INNER JOIN cities c ON p.city_name = c.city_name
        SET p.city_id = c.id
        WHERE p.city_id IS NULL AND p.city_name IS NOT NULL
    `, (err) => {
        if (err) {
            console.log('Update city_id:', err.message);
        } else {
            console.log('City IDs updated');
        }
    });
    connection.query(`
        UPDATE cities c
        SET property_count = (
            SELECT COUNT(*) FROM properties p WHERE p.city_id = c.id
        )
    `, (err) => {
        if (err) {
            console.log('Update counts:', err.message);
        } else {
            console.log('Property counts updated');
        }
    });
    connection.query(`
        UPDATE properties 
        SET category = CASE 
            WHEN title LIKE '%Villa%' OR title LIKE '%Mansion%' OR title LIKE '%Estate%' OR title LIKE '%Manor%' OR title LIKE '%Penthouse%' THEN 'Modern Villa'
            WHEN title LIKE '%Condo%' OR title LIKE '%Apartment%' OR title LIKE '%Loft%' OR title LIKE '%Suite%' OR title LIKE '%Studio%' THEN 'Apartments'
            WHEN title LIKE '%Home%' OR title LIKE '%House%' OR title LIKE '%Cottage%' OR title LIKE '%Bungalow%' THEN 'Townhouse'
            ELSE 'Apartments'
        END
        WHERE category IS NULL
    `, (err) => {
        if (err) {
            console.log('Update categories:', err.message);
        } else {
            console.log(' Categories updated');
        }
    });
    setTimeout(() => {
        console.log('\n MIGRATION SUMMARY:\n');
        
        connection.query('SELECT COUNT(*) as total FROM cities', (err, result) => {
            if (err) {
                console.log('   - Error fetching cities count');
            } else {
                console.log(`Total Cities: ${result[0].total}`);
            }
        });
        
        connection.query('SELECT COUNT(*) as total FROM properties', (err, result) => {
            if (err) {
                console.log('   - Error fetching properties count');
            } else {
                console.log(`    Total Properties: ${result[0].total}`);
            }
        });
        
        connection.query('SELECT COUNT(*) as total FROM properties WHERE category IS NOT NULL', (err, result) => {
            if (err) {
                console.log('   - Error fetching category count');
            } else {
                console.log(`   Properties with Category: ${result[0].total}`);
            }
        });
        
        connection.query('SELECT COUNT(*) as total FROM properties WHERE city_id IS NOT NULL', (err, result) => {
            if (err) {
                console.log('   - Error fetching city count');
            } else {
                console.log(`   ✓ Properties with City: ${result[0].total}`);
            }
        });
        
        connection.query('SELECT city_name, property_count FROM cities ORDER BY property_count DESC', (err, results) => {
            if (err) {
                console.log('\n   Error fetching city distribution');
            } else if (results && results.length > 0) {
                console.log('\n Cities Property Distribution:');
                results.forEach(city => {
                    console.log(`   - ${city.city_name}: ${city.property_count} properties`);
                });
            } else {
                console.log('\n   No cities found in database');
            }
            
            console.log('\n Migration completed successfully!');
            connection.end();
        });
    }, 3000);
});