import { FaCog, FaUser, FaBell, FaShieldAlt } from 'react-icons/fa';

const Settings = () => {
  return (
    <div>
      <h1 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '8px' }}>Settings</h1>
      <p style={{ color: '#64748b', marginBottom: '24px' }}>Configure platform settings and preferences</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px' }}>
          <FaUser style={{ fontSize: '32px', color: '#3b82f6', marginBottom: '12px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Profile Settings</h3>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Update your admin profile information</p>
          <button style={{ marginTop: '16px', background: '#f1f5f9', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>
            Edit Profile
          </button>
        </div>
        
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px' }}>
          <FaBell style={{ fontSize: '32px', color: '#f59e0b', marginBottom: '12px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Notifications</h3>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Configure email and system notifications</p>
          <button style={{ marginTop: '16px', background: '#f1f5f9', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>
            Configure
          </button>
        </div>
        
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px' }}>
          <FaShieldAlt style={{ fontSize: '32px', color: '#10b981', marginBottom: '12px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Security</h3>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Manage security and access controls</p>
          <button style={{ marginTop: '16px', background: '#f1f5f9', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>
            Security Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;