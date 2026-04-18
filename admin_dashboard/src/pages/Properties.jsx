import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import toast from 'react-hot-toast';
import axios from 'axios'; 

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
     
      const response = await axios.get('https://bricks-keys.vercel.app/api/properties');
      setProperties(response.data); 
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://bricks-keys.vercel.app/api/properties/${id}`);
      setProperties(properties.filter(p => p.id !== id));
      toast.success('Property deleted');
    } catch (error) {
      toast.error("Failed to delete property");
    }
  };

  if (loading) return <p>Loading properties...</p>;

  return (
    <div>
      <h1 style={{ fontSize: '26px', fontWeight: 'bold' }}>All Properties</h1>
      <p style={{ color: '#64748b', marginBottom: '24px' }}>Manage your property listings</p>
      
      <div style={{ background: 'white', borderRadius: '16px', overflow: 'auto', padding: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>Title</th>
              <th>Type</th>
              <th>Price</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.length > 0 ? (
              properties.map(p => (
                <tr key={p._id || p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px' }}>{p.title}</td>
                  <td>
                    <span style={{ 
                      background: p.type === 'For Sale' ? '#dbeafe' : '#dcfce7', 
                      padding: '4px 10px', 
                      borderRadius: '20px', 
                      fontSize: '12px' 
                    }}>
                      {p.type}
                    </span>
                  </td>
                  <td>${p.price.toLocaleString()}</td>
                  <td>{p.location}</td>
                  <td>{p.status}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <FaEye color="#3b82f6" style={{ cursor: 'pointer' }} />
                      <FaEdit color="#10b981" style={{ cursor: 'pointer' }} />
                      <FaTrash 
                        color="#ef4444" 
                        onClick={() => handleDelete(p._id || p.id)} 
                        style={{ cursor: 'pointer' }} 
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                No listings available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Properties;