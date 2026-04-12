import { useState } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Properties = () => {
  const [properties, setProperties] = useState([
    { id: 1, title: 'Luxury Villa', type: 'For Sale', price: 850000, location: 'Bahria Town', status: 'Active' },
    { id: 2, title: 'Downtown Apartment', type: 'For Rent', price: 2500, location: 'Gulberg', status: 'Active' },
  ]);

  const handleDelete = (id) => {
    setProperties(properties.filter(p => p.id !== id));
    toast.success('Property deleted');
  };

  return (
    <div>
      <h1 style={{ fontSize: '26px', fontWeight: 'bold' }}>All Properties</h1>
      <p style={{ color: '#64748b', marginBottom: '24px' }}>Manage your property listings</p>
      <div style={{ background: 'white', borderRadius: '16px', overflow: 'auto', padding: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>Title</th><th>Type</th><th>Price</th><th>Location</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px' }}>{p.title}</td>
                <td><span style={{ background: p.type === 'For Sale' ? '#dbeafe' : '#dcfce7', padding: '4px 10px', borderRadius: '20px', fontSize: '12px' }}>{p.type}</span></td>
                <td>${p.price.toLocaleString()}</td><td>{p.location}</td><td>{p.status}</td>
                <td><div style={{ display: 'flex', gap: '10px' }}><FaEye color="#3b82f6" /><FaEdit color="#10b981" /><FaTrash color="#ef4444" onClick={() => handleDelete(p.id)} style={{ cursor: 'pointer' }} /></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Properties; 