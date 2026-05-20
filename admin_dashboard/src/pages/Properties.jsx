import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const fetchProps = async () => {
    const res = await axios.get('https://bricks-keys.vercel.app/api/properties');
    setProperties(res.data);
  };

  const deleteProp = async (id) => {
    if (window.confirm("Delete this property?")) {
      await axios.delete(`https://bricks-keys.vercel.app/admin/delete-property/${id}`);
      toast.success("Deleted!");
      fetchProps();
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(editingItem).forEach(key => { if(key !== 'image_url') data.append(key, editingItem[key]) });
    
    try {
      await axios.put(`https://bricks-keys.vercel.app/admin/update-property/${editingItem.id}`, data);
      toast.success("Updated!");
      setEditingItem(null);
      fetchProps();
    } catch (err) { toast.error("Update failed"); }
  };

  useEffect(() => { fetchProps(); }, []);

  return (
    <div style={{ padding: '24px' }}>
      <table style={tableStyle}>
        <thead style={{ background: '#0f2b3d', color: 'white' }}>
          <tr>
            <th style={cellStyle}>Image</th>
            <th style={cellStyle}>Title</th>
            <th style={cellStyle}>Category</th>
            <th style={cellStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {properties.map(p => (
            <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={cellStyle}><img src={p.image_url} width="50" style={{ borderRadius: '5px' }} /></td>
              <td style={cellStyle}>{p.title}</td>
              <td style={cellStyle}>{p.category}</td>
              <td style={cellStyle}>
                <FaEdit onClick={() => setEditingItem(p)} style={{ color: '#c9a03d', cursor: 'pointer', marginRight: '15px' }} />
                <FaTrash onClick={() => deleteProp(p.id)} style={{ color: '#ef4444', cursor: 'pointer' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingItem && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <h3>Edit Property</h3>
            <form onSubmit={handleUpdate}>
              <input style={inputStyle} value={editingItem.title} onChange={e => setEditingItem({...editingItem, title: e.target.value})} />
              <input style={inputStyle} value={editingItem.price} onChange={e => setEditingItem({...editingItem, price: e.target.value})} />
              <button type="submit" style={btnStyle}>Save Changes</button>
              <button type="button" onClick={() => setEditingItem(null)} style={{...btnStyle, background: '#eee', marginLeft: '10px'}}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const tableStyle = { width: '100%', background: 'white', borderRadius: '12px', borderCollapse: 'collapse', overflow: 'hidden' };
const cellStyle = { padding: '15px', textAlign: 'left' };
const modalOverlay = { position: 'fixed', top:0, left:0, width:'100%', height:'100%', background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center' };
const modalContent = { background:'white', padding:'30px', borderRadius:'12px', width:'400px' };

export default Properties;