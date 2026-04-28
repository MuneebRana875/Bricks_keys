import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import axios from 'axios'; 

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    property_type: 'For Sale',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area_size: '',
    status: 'Active'
  });
  const [editImage, setEditImage] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState('');

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
    if (!window.confirm("Are you sure you want to delete this property?")) return;

    try {
      await axios.delete(`https://bricks-keys.vercel.app/admin/properties/${id}`);
      setProperties(prevProperties => 
        prevProperties.filter(p => (p.id !== id && p._id !== id))
      );
      toast.success('Property deleted');
    } catch (error) {
      console.error("Delete error details:", error.response);
      toast.error(error.response?.data?.message || "Failed to delete property");
    }
  };
  const handleEdit = async (property) => {
    try {
      const propertyId = property.id || property._id;
      const response = await axios.get(`https://bricks-keys.vercel.app/admin/properties/${propertyId}`);
      const propertyData = response.data;
      
      setEditingProperty(propertyData);
      setEditFormData({
        title: propertyData.title || '',
        description: propertyData.description || '',
        property_type: propertyData.property_type || 'For Sale',
        price: propertyData.price || '',
        location: propertyData.location || '',
        bedrooms: propertyData.bedrooms || '',
        bathrooms: propertyData.bathrooms || '',
        area_size: propertyData.area_size || '',
        status: propertyData.status || 'Active'
      });
      setEditImagePreview(propertyData.image_url || '');
      setEditImage(null);
      setShowEditModal(true);
    } catch (error) {
      toast.error("Failed to load property data");
    }
  };

  
  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingProperty(null);
    setEditFormData({
      title: '',
      description: '',
      property_type: 'For Sale',
      price: '',
      location: '',
      bedrooms: '',
      bathrooms: '',
      area_size: '',
      status: 'Active'
    });
    setEditImage(null);
    setEditImagePreview('');
  };

  
  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  
  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setEditImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  
  const handleUpdateProperty = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    const loadingToast = toast.loading('Updating property...');

    const formData = new FormData();
    Object.keys(editFormData).forEach(key => {
      if (editFormData[key]) {
        formData.append(key, editFormData[key]);
      }
    });
    if (editImage) {
      formData.append('image', editImage);
    }

    try {
      const propertyId = editingProperty.id || editingProperty._id;
      await axios.put(`https://bricks-keys.vercel.app/admin/properties/${propertyId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      toast.dismiss(loadingToast);
      toast.success('Property updated successfully!');
      fetchProperties(); 
      closeEditModal();
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.error || 'Failed to update property');
      console.error(error);
    } finally {
      setEditLoading(false);
    }
  };

  const handleView = (property) => {
    toast.success(`${property.title} - $${parseInt(property.price).toLocaleString()}`);
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
              <th style={{ padding: '12px' }}>Image</th>
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
                  <td style={{ padding: '12px' }}>
                    {p.image_url && (
                      <img 
                        src={p.image_url} 
                        alt={p.title} 
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} 
                      />
                    )}
                  </td>
                  <td style={{ padding: '12px' }}>{p.title}</td>
                  <td>
                    <span style={{ 
                      background: p.property_type === 'For Sale' ? '#dbeafe' : 
                                 p.property_type === 'For Rent' ? '#dcfce7' : '#fef3c7', 
                      padding: '4px 10px', 
                      borderRadius: '20px', 
                      fontSize: '12px' 
                    }}>
                      {p.property_type}
                    </span>
                  </td>
                  <td>${parseInt(p.price).toLocaleString()}</td>
                  <td>{p.location}</td>
                  <td>
                    <span style={{ 
                      background: p.status === 'Active' ? '#dcfce7' : 
                                 p.status === 'Sold' ? '#fee2e2' : '#fef3c7',
                      padding: '4px 10px', 
                      borderRadius: '20px', 
                      fontSize: '12px' 
                    }}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <FaEye 
                        color="#3b82f6" 
                        style={{ cursor: 'pointer' }} 
                        onClick={() => handleView(p)}
                      />
                      <FaEdit 
                        color="#10b981" 
                        style={{ cursor: 'pointer' }} 
                        onClick={() => handleEdit(p)}
                      />
                      <FaTrash 
                        color="#ef4444" 
                        onClick={() => handleDelete(p.id || p._id)} 
                        style={{ cursor: 'pointer' }} 
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                  No listings available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showEditModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          overflow: 'auto'
        }} onClick={closeEditModal}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            width: '90%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflow: 'auto',
            padding: '30px',
            position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>
            
            <button 
              onClick={closeEditModal}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#f1f5f9',
                border: 'none',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FaTimes />
            </button>

            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Edit Property</h2>
            <p style={{ color: '#64748b', marginBottom: '24px' }}>Update property details</p>

            <form onSubmit={handleUpdateProperty}>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                  Property Image
                </label>
                {editImagePreview && (
                  <div style={{ marginBottom: '12px' }}>
                    <img 
                      src={editImagePreview} 
                      alt="Preview" 
                      style={{ width: '120px', height: '90px', objectFit: 'cover', borderRadius: '8px' }} 
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleEditImageChange}
                  style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '8px' }}
                />
                <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                  Leave empty to keep current image
                </p>
              </div>

              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                    Title <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditChange}
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                    Property Type <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <select
                    name="property_type"
                    value={editFormData.property_type}
                    onChange={handleEditChange}
                    style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }}
                  >
                    <option value="For Sale">For Sale</option>
                    <option value="For Rent">For Rent</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Land/Plot">Land/Plot</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                    Price <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={editFormData.price}
                    onChange={handleEditChange}
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                    Location <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={editFormData.location}
                    onChange={handleEditChange}
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                    Status
                  </label>
                  <select
                    name="status"
                    value={editFormData.status}
                    onChange={handleEditChange}
                    style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }}
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Sold">Sold</option>
                    <option value="Rented">Rented</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={editFormData.bedrooms}
                    onChange={handleEditChange}
                    style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={editFormData.bathrooms}
                    onChange={handleEditChange}
                    style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                    Area (sq ft)
                  </label>
                  <input
                    type="text"
                    name="area_size"
                    value={editFormData.area_size}
                    onChange={handleEditChange}
                    style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }}
                  />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows="4"
                    value={editFormData.description}
                    onChange={handleEditChange}
                    style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', resize: 'vertical' }}
                  />
                </div>
              </div>

              <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={closeEditModal}
                  style={{ 
                    padding: '10px 24px', 
                    background: '#f1f5f9', 
                    border: 'none', 
                    borderRadius: '8px', 
                    cursor: 'pointer' 
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  style={{ 
                    padding: '10px 28px', 
                    background: '#c9a03d', 
                    color: '#0f2b3d', 
                    border: 'none', 
                    borderRadius: '8px', 
                    fontWeight: '600', 
                    cursor: editLoading ? 'not-allowed' : 'pointer',
                    opacity: editLoading ? 0.7 : 1
                  }}
                >
                  {editLoading ? 'Updating...' : 'Update Property'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;