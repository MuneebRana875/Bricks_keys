const express = require('express');
const router = express.Router();
const db = require('./db');
function executeQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
    const years = Math.floor(days / 365);
    return `${years} year${years > 1 ? 's' : ''} ago`;
}
router.get('/data', async (req, res) => {
    try {
        const [totalResult] = await executeQuery('SELECT COUNT(*) as total FROM properties');
        const totalProperties = totalResult?.total || 0;
        const [forSaleResult] = await executeQuery('SELECT COUNT(*) as count FROM properties WHERE property_type = "For Sale"');
        const forSale = forSaleResult?.count || 0;
        const [forRentResult] = await executeQuery('SELECT COUNT(*) as count FROM properties WHERE property_type = "For Rent"');
        const forRent = forRentResult?.count || 0;
        const [revenueResult] = await executeQuery('SELECT SUM(price) as total FROM properties WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)');
        const monthlyRevenue = revenueResult?.total || 0;
        const monthlyData = await executeQuery(`
            SELECT 
                DATE_FORMAT(created_at, '%b') as month,
                MONTH(created_at) as month_num,
                COUNT(CASE WHEN property_type = 'For Sale' THEN 1 END) as sales,
                COUNT(CASE WHEN property_type = 'For Rent' THEN 1 END) as rentals
            FROM properties 
            WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
            GROUP BY MONTH(created_at), DATE_FORMAT(created_at, '%b')
            ORDER BY month_num ASC
        `);
        const monthsOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        const filledMonthlyData = monthsOrder.map(month => {
            const existing = monthlyData.find(m => m.month === month);
            return existing || { month, sales: 0, rentals: 0 };
        });
        const pieDataRaw = await executeQuery(`
            SELECT 
                'For Sale' as name,
                COUNT(*) as value
            FROM properties 
            WHERE property_type = 'For Sale'
            UNION ALL
            SELECT 
                'For Rent' as name,
                COUNT(*) as value
            FROM properties 
            WHERE property_type = 'For Rent'
        `);
        const pieData = pieDataRaw.map(item => ({
            name: item.name,
            value: item.value,
            color: item.name === 'For Sale' ? '#3b82f6' : '#10b981'
        }));
        const recentProperties = await executeQuery(`
            SELECT 
                id,
                title,
                property_type,
                created_at
            FROM properties 
            ORDER BY created_at DESC 
            LIMIT 10
        `);
        const recentActivities = recentProperties.map(property => ({
            id: property.id,
            action: 'New property added',
            property: property.title,
            user: 'Admin',
            time: getTimeAgo(property.created_at)
        }));
        const [currentTotal] = await executeQuery(`
            SELECT COUNT(*) as count 
            FROM properties 
            WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        `);
        const [previousTotal] = await executeQuery(`
            SELECT COUNT(*) as count 
            FROM properties 
            WHERE created_at BETWEEN DATE_SUB(NOW(), INTERVAL 60 DAY) AND DATE_SUB(NOW(), INTERVAL 30 DAY)
        `);
        const totalChange = previousTotal.count > 0 
            ? Math.round(((currentTotal.count - previousTotal.count) / previousTotal.count) * 100)
            : currentTotal.count > 0 ? 100 : 0;
        const [currentSale] = await executeQuery(`
            SELECT COUNT(*) as count 
            FROM properties 
            WHERE property_type = 'For Sale' AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        `);
        const [previousSale] = await executeQuery(`
            SELECT COUNT(*) as count 
            FROM properties 
            WHERE property_type = 'For Sale' AND created_at BETWEEN DATE_SUB(NOW(), INTERVAL 60 DAY) AND DATE_SUB(NOW(), INTERVAL 30 DAY)
        `);
        
        const saleChange = previousSale.count > 0 
            ? Math.round(((currentSale.count - previousSale.count) / previousSale.count) * 100)
            : currentSale.count > 0 ? 100 : 0;
        const [currentRent] = await executeQuery(`
            SELECT COUNT(*) as count 
            FROM properties 
            WHERE property_type = 'For Rent' AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        `);
        
        const [previousRent] = await executeQuery(`
            SELECT COUNT(*) as count 
            FROM properties 
            WHERE property_type = 'For Rent' AND created_at BETWEEN DATE_SUB(NOW(), INTERVAL 60 DAY) AND DATE_SUB(NOW(), INTERVAL 30 DAY)
        `);
        
        const rentChange = previousRent.count > 0 
            ? Math.round(((currentRent.count - previousRent.count) / previousRent.count) * 100)
            : currentRent.count > 0 ? 100 : 0;
        const [currentRevenue] = await executeQuery(`
            SELECT SUM(price) as total 
            FROM properties 
            WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        `);
        const [previousRevenue] = await executeQuery(`
            SELECT SUM(price) as total 
            FROM properties 
            WHERE created_at BETWEEN DATE_SUB(NOW(), INTERVAL 60 DAY) AND DATE_SUB(NOW(), INTERVAL 30 DAY)
        `);
        const revenueChange = previousRevenue.total > 0 
            ? Math.round(((currentRevenue.total - previousRevenue.total) / previousRevenue.total) * 100)
            : currentRevenue.total > 0 ? 100 : 0;

        res.status(200).json({
            totalProperties: totalProperties,
            forSale: forSale,
            forRent: forRent,
            monthlyRevenue: monthlyRevenue,
            monthlyData: filledMonthlyData,
            pieData: pieData,
            recentActivities: recentActivities,
            changes: {
                total: totalChange,
                sales: saleChange,
                rentals: rentChange,
                revenue: revenueChange
            }
        });
        
    } catch (error) {
        console.error('Dashboard Error:', error);
        res.status(200).json({
            totalProperties: 0,
            forSale: 0,
            forRent: 0,
            monthlyRevenue: 0,
            monthlyData: [
                { month: 'Jan', sales: 0, rentals: 0 },
                { month: 'Feb', sales: 0, rentals: 0 },
                { month: 'Mar', sales: 0, rentals: 0 },
                { month: 'Apr', sales: 0, rentals: 0 },
                { month: 'May', sales: 0, rentals: 0 },
                { month: 'Jun', sales: 0, rentals: 0 }
            ],
            pieData: [
                { name: 'For Sale', value: 0, color: '#3b82f6' },
                { name: 'For Rent', value: 0, color: '#10b981' }
            ],
            recentActivities: [],
            changes: {
                total: 0,
                sales: 0,
                rentals: 0,
                revenue: 0
            }
        });
    }
});

router.get('/quick-stats', async (req, res) => {
    try {
        const [total] = await executeQuery('SELECT COUNT(*) as total FROM properties');
        const [forSale] = await executeQuery('SELECT COUNT(*) as count FROM properties WHERE property_type = "For Sale"');
        const [forRent] = await executeQuery('SELECT COUNT(*) as count FROM properties WHERE property_type = "For Rent"');
        const [revenue] = await executeQuery('SELECT SUM(price) as total FROM properties WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)');
        
        res.status(200).json({
            totalProperties: total?.total || 0,
            forSale: forSale?.count || 0,
            forRent: forRent?.count || 0,
            monthlyRevenue: revenue?.total || 0
        });
    } catch (error) {
        res.status(200).json({
            totalProperties: 0,
            forSale: 0,
            forRent: 0,
            monthlyRevenue: 0
        });
    }
});

router.get('/recent-activities', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        
        const properties = await executeQuery(`
            SELECT id, title, created_at
            FROM properties 
            ORDER BY created_at DESC 
            LIMIT ?
        `, [limit]);
        
        const activities = properties.map(p => ({
            id: p.id,
            action: 'New property added',
            property: p.title,
            user: 'Admin',
            time: getTimeAgo(p.created_at)
        }));
        
        res.status(200).json(activities);
    } catch (error) {
        res.status(200).json([]);
    }
});
router.get('/monthly-trends', async (req, res) => {
    try {
        const data = await executeQuery(`
            SELECT 
                DATE_FORMAT(created_at, '%b') as month,
                MONTH(created_at) as month_num,
                COUNT(CASE WHEN property_type = 'For Sale' THEN 1 END) as sales,
                COUNT(CASE WHEN property_type = 'For Rent' THEN 1 END) as rentals
            FROM properties 
            WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
            GROUP BY MONTH(created_at), DATE_FORMAT(created_at, '%b')
            ORDER BY month_num ASC
        `);
        
        const monthsOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        const filledData = monthsOrder.map(month => {
            const existing = data.find(d => d.month === month);
            return existing || { month, sales: 0, rentals: 0 };
        });
        
        res.status(200).json(filledData);
    } catch (error) {
        res.status(200).json([
            { month: 'Jan', sales: 0, rentals: 0 },
            { month: 'Feb', sales: 0, rentals: 0 },
            { month: 'Mar', sales: 0, rentals: 0 },
            { month: 'Apr', sales: 0, rentals: 0 },
            { month: 'May', sales: 0, rentals: 0 },
            { month: 'Jun', sales: 0, rentals: 0 }
        ]);
    }
});

module.exports = router;