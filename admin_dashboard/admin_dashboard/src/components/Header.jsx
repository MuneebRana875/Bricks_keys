import { useState } from 'react';
import { FaBell, FaUserCircle, FaSearch, FaPhoneAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header style={{ 
      background: 'white', 
      padding: '12px 24px',
      borderBottom: '1px solid #e2e8f0',
      boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, maxWidth: '400px' }}>
          <div style={{ position: 'relative' }}>
            <FaSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search properties, listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 16px 10px 40px',
                border: '1px solid #cbd5e1',
                borderRadius: '12px',
                outline: 'none',
                fontSize: '14px'
              }}
            />
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f0fdf4', padding: '6px 14px', borderRadius: '30px' }}>
            <FaPhoneAlt style={{ color: '#16a34a', fontSize: '12px' }} />
            <span style={{ fontSize: '13px', fontWeight: '500', color: '#166534' }}>+92 3286561587</span>
          </div>
          
          <button 
            onClick={() => toast.success('No new notifications')}
            style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
          >
            <FaBell style={{ fontSize: '20px', color: '#475569' }} />
            <span style={{ position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }}></span>
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '12px', borderLeft: '1px solid #e2e8f0' }}>
            <FaUserCircle style={{ fontSize: '32px', color: '#94a3b8' }} />
            <div>
              <p style={{ fontSize: '13px', fontWeight: '600' }}>Admin User</p>
              <p style={{ fontSize: '11px', color: '#64748b' }}>admin@brickskeys.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;