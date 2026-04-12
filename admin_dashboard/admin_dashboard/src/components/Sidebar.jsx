import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaBuilding, 
  FaPlusCircle, 
  FaListAlt, 
  FaCog,
  FaKey 
} from 'react-icons/fa';

const Sidebar = () => {
  const menuItems = [
    { path: '/', name: 'Dashboard', icon: FaHome },
    { path: '/properties', name: 'All Properties', icon: FaBuilding },
    { path: '/add-property', name: 'Add Property', icon: FaPlusCircle },
    { path: '/listings', name: 'Listings', icon: FaListAlt },
    { path: '/settings', name: 'Settings', icon: FaCog },
  ];

  return (
    <aside style={{ 
      width: '260px', 
      background: '#0f2b3d', 
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '4px 0 20px rgba(0,0,0,0.08)'
    }}>
      <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaKey style={{ color: '#c9a03d', fontSize: '26px' }} />
          <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>
            Bricks<span style={{ color: '#c9a03d' }}>&</span>Keys
          </h1>
        </div>
        <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>Admin Dashboard</p>
      </div>
      
      <nav style={{ flex: 1, padding: '20px 12px' }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <item.icon style={{ fontSize: '18px' }} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      
      <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '11px', color: '#64748b' }}>
        <p>© 2026 Bricks & Keys</p>
        <p>Version 2.0.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;