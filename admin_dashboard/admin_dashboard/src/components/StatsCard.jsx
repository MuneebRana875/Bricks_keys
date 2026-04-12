const StatsCard = ({ title, value, icon: Icon, color, change }) => {
  return (
    <div className="stat-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ color: '#64748b', fontSize: '13px', fontWeight: '500' }}>{title}</p>
          <p style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '8px', color: '#0f172a' }}>{value}</p>
          {change && (
            <p style={{ fontSize: '11px', marginTop: '8px', color: change > 0 ? '#16a34a' : '#dc2626' }}>
              {change > 0 ? '↑' : '↓'} {Math.abs(change)}% from last month
            </p>
          )}
        </div>
        <div style={{ background: color, padding: '12px', borderRadius: '14px' }}>
          <Icon style={{ color: 'white', fontSize: '22px' }} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;