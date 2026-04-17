import { FaBuilding, FaHome, FaUsers, FaDollarSign } from 'react-icons/fa';
import StatsCard from '../components/StatsCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const monthlyData = [
    { month: 'Jan', sales: 65, rentals: 42 },
    { month: 'Feb', sales: 78, rentals: 48 },
    { month: 'Mar', sales: 92, rentals: 55 },
    { month: 'Apr', sales: 88, rentals: 62 },
    { month: 'May', sales: 104, rentals: 71 },
    { month: 'Jun', sales: 112, rentals: 85 },
  ];

  const pieData = [
    { name: 'For Sale', value: 432, color: '#3b82f6' },
    { name: 'For Rent', value: 313, color: '#10b981' },
  ];

  const recentActivities = [
    { id: 1, action: 'New property added', property: 'Luxury Villa', user: 'John Doe', time: '5 mins ago' },
    { id: 2, action: 'Property sold', property: 'Downtown Apartment', user: 'Sarah Smith', time: '1 hour ago' },
    { id: 3, action: 'Price updated', property: 'Beach House', user: 'Admin', time: '3 hours ago' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#0f172a' }}>Dashboard Overview</h1>
        <p style={{ color: '#64748b', marginTop: '4px' }}>Welcome back! Here's what's happening with your properties.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <StatsCard title="Total Properties" value="745" icon={FaBuilding} color="#3b82f6" change={12} />
        <StatsCard title="For Sale" value="432" icon={FaHome} color="#8b5cf6" change={8} />
        <StatsCard title="For Rent" value="313" icon={FaUsers} color="#10b981" change={-3} />
        <StatsCard title="Revenue (Monthly)" value="$284.5K" icon={FaDollarSign} color="#c9a03d" change={18} />
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
              <Pie data={pieData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} outerRadius={100} dataKey="value">
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
          {recentActivities.map((activity) => (
            <div key={activity.id} style={{ padding: '14px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: '500' }}>{activity.action}</p>
                <p style={{ fontSize: '13px', color: '#64748b' }}>{activity.property} • by {activity.user}</p>
              </div>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;