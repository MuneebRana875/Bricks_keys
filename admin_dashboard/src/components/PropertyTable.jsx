import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import toast from 'react-hot-toast';

const PropertyTable = ({ properties, onDelete }) => {
  const handleDelete = (id, title) => {
    if (window.confirm(`Delete "${title}"?`)) {
      onDelete(id);
      toast.success('Property deleted successfully');
    }
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ background: '#f8fafc' }}>
          <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Title</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Type</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Price</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Location</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '12px', fontWeight: '500' }}>{property.title}</td>
              <td style={{ padding: '12px' }}>
                <span style={{ 
                  background: property.type === 'For Sale' ? '#dbeafe' : '#dcfce7',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '12px'
                }}>
                  {property.type}
                </span>
              </td>
              <td style={{ padding: '12px' }}>${property.price.toLocaleString()}</td>
              <td style={{ padding: '12px' }}>{property.location}</td>
              <td style={{ padding: '12px' }}>
                <span style={{ background: '#dcfce7', padding: '4px 10px', borderRadius: '20px', fontSize: '12px' }}>
                  {property.status}
                </span>
              </td>
              <td style={{ padding: '12px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <FaEye style={{ color: '#3b82f6', cursor: 'pointer' }} />
                  <FaEdit style={{ color: '#10b981', cursor: 'pointer' }} />
                  <FaTrash 
                    style={{ color: '#ef4444', cursor: 'pointer' }} 
                    onClick={() => handleDelete(property.id, property.title)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyTable;