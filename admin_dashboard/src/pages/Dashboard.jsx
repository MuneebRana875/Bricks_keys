import { useState, useEffect } from 'react';
import { FaBuilding, FaHome, FaUsers, FaDollarSign } from 'react-icons/fa';
import StatsCard from '../components/StatsCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';
import toast from 'react-hot-toast';
const Dashboard = () => {
  const [monthlyData, setMonthlyData] = useState([
    { month: 'Jan', sales: 0, rentals: 0 },
    { month: 'Feb', sales: 0, rentals: 0 },
    { month: 'Mar', sales: 0, rentals: 0 },
    { month: 'Apr', sales: 0, rentals: 0 },
    { month: 'May', sales: 0, rentals: 0 },
    { month: 'Jun', sales: 0, rentals: 0 },
  ]);
  const [pieData, setPieData] = useState([
    { name: 'For Sale', value: 0, color: '#3b82f6' },
    { name: 'For Rent', value: 0, color: '#10b981' },
  ]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [stats, setStats] = useState({
    totalProperties: 0,
    forSale: 0,
    forRent: 0,
    monthlyRevenue: 0
  });
  const [changes, setChanges] = useState({
    total: 0,
    sales: 0,
    rentals: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchDashboardData();
  }, []);
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://bricks-keys.vercel.app/api/dashboard/data');
      const data = response.data;
      setStats({
        totalProperties: data.totalProperties || 0,
        forSale: data.forSale || 0,
        forRent: data.forRent || 0,
        monthlyRevenue: data.monthlyRevenue || 0
      });
      setMonthlyData(data.monthlyData || monthlyData);
      setPieData(data.pieData || pieData);
      setRecentActivities(data.recentActivities || []);
      setChanges(data.changes || changes);
    } catch (error) {
      console.error('Dashboard error:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading dashboard...</div>;
  }
  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#0f172a' }}>Dashboard Overview</h1>
        <p style={{ color: '#64748b', marginTop: '4px' }}>Welcome back! Here's what's happening with your properties.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <StatsCard 
          title="Total Properties" 
          value={stats.totalProperties.toLocaleString()} 
          icon={FaBuilding} 
          color="#3b82f6" 
          change={changes.total} 
        />
        <StatsCard 
          title="For Sale" 
          value={stats.forSale.toLocaleString()} 
          icon={FaHome} 
          color="#8b5cf6" 
          change={changes.sales} 
        />
        <StatsCard 
          title="For Rent" 
          value={stats.forRent.toLocaleString()} 
          icon={FaUsers} 
          color="#10b981" 
          change={changes.rentals} 
        />
        <StatsCard 
          title="Revenue (Monthly)" 
          value={`$${(stats.monthlyRevenue / 1000).toFixed(1)}K`} 
          icon={FaDollarSign} 
          color="#c9a03d" 
          change={changes.revenue} 
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginBottom: '28px' }}>
        <div style={{ background: 'white', borderRadius: '20px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Property Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} name="Sales" />
              <Line type="monotone" dataKey="rentals" stroke="#10b981" strokeWidth={2} name="Rentals" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background: 'white', borderRadius: '20px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Property Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie 
                data={pieData} 
                cx="50%" 
                cy="50%" 
                labelLine={false} 
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} 
                outerRadius={100} 
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Recent Activity</h2>
        </div>
        <div>
          {recentActivities.length > 0 ? (
            recentActivities.map((activity) => (
              <div 
                key={activity.id} 
                style={{ 
                  padding: '14px 24px', 
                  borderBottom: '1px solid #f1f5f9', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center' 
                }}
              >
                <div>
                  <p style={{ fontWeight: '500' }}>{activity.action}</p>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>
                    {activity.property} • by {activity.user}
                  </p>
                </div>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>{activity.time}</span>
              </div>
            ))
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
              No recent activities
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;