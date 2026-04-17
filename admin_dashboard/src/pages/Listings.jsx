import { FaListAlt } from 'react-icons/fa';

const Listings = () => {
  return (
    <div>
      <h1 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '8px' }}>Property Listings</h1>
      <p style={{ color: '#64748b', marginBottom: '24px' }}>Manage featured listings and publish status</p>
      
      <div style={{ background: 'white', borderRadius: '16px', padding: '48px', textAlign: 'center' }}>
        <FaListAlt style={{ fontSize: '48px', color: '#94a3b8', marginBottom: '16px' }} />
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Listing Management</h3>
        <p style={{ color: '#64748b' }}>This module is coming soon. Stay tuned for updates!</p>
      </div>
    </div>
  );
};

export default Listings;