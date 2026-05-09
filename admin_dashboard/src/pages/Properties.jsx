import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye, FaFilter, FaTimes, FaBuilding, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const Properties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area_size: '',
    status: 'Active'
  });
  const [editImage, setEditImage] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState('');
  useEffect(() => {
    fetchProperties();
    fetchCategories();
    fetchCities();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://bricks-keys.vercel.app/api/properties');
      setProperties(response.data);
      setFilteredProperties(response.data);
    } catch (error) {
      toast.error("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://bricks-keys.vercel.app/admin/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get('https://bricks-keys.vercel.app/admin/properties/cities');
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };
  useEffect(() => {
    let filtered = [...properties];
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => {
        if (selectedCategory === 'Modern Villa') {
          return p.category_name === 'Modern Villa' || p.title?.toLowerCase().includes('modern villa');
        }
        return p.property_type === selectedCategory || p.category_name === selectedCategory;
      });
    }
    if (selectedCity !== 'All') {
      filtered = filtered.filter(p =>
        p.location?.toLowerCase().includes(selectedCity.toLowerCase())
      );
    }
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProperties(filtered);
  }, [selectedCategory, selectedCity, searchTerm, properties]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await axios.delete(`https://bricks-keys.vercel.app/admin/properties/${id}`);
      setProperties(prev => prev.filter(p => (p.id !== id && p._id !== id)));
      toast.success('Property deleted successfully');
    } catch (error) {
      toast.error("Failed to delete property");
    }
  };

  const openEditModal = async (property) => {
    try {
      const propertyId = property.id || property._id;
      const response = await axios.get(`https://bricks-keys.vercel.app/admin/properties/${propertyId}`);
      const propertyData = response.data;

      setEditingProperty(propertyData);
      setEditFormData({
        title: propertyData.title || '',
        description: propertyData.description || '',
        category_id: propertyData.category_id || '',
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
      title: '', description: '', category_id: '',
      price: '', location: '', bedrooms: '',
      bathrooms: '', area_size: '', status: 'Active'
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
      toast.error('Failed to update property');
    } finally {
      setEditLoading(false);
    }
  };

  const handleView = (property) => {
    toast.success(`${property.title} - $${parseInt(property.price).toLocaleString()}`);
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading properties...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 'bold', margin: 0 }}>All Properties</h1>
          <p style={{ color: '#64748b', marginTop: '4px' }}>Manage your property listings</p>
        </div>
        <button
          onClick={() => navigate('/add-property')}
          style={{ background: '#c9a03d', color: '#0f2b3d', padding: '10px 20px', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
        >
          + Add New Property
        </button>
      </div>

      {/* Filters */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaFilter style={{ color: '#64748b' }} />
            <span style={{ fontWeight: '500' }}>Filter by:</span>
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ padding: '8px 16px', border: '1px solid #cbd5e1', borderRadius: '8px', background: 'white' }}
          >
            <option value="All">All Categories</option>
            <option value="Modern Villa">Modern Villa</option>
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
            <option value="Commercial">Commercial</option>
            <option value="Land/Plot">Land/Plot</option>
          </select>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            style={{ padding: '8px 16px', border: '1px solid #cbd5e1', borderRadius: '8px', background: 'white' }}
          >
            <option value="All">All Cities</option>
            <option value="New York"> New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
            <option value="Houston">Houston</option>
            {cities.map(city => (
              <option key={city.city} value={city.city}>{city.city} ({city.count})</option>
            ))}
          </select>
          <div style={{ flex: 1, maxWidth: '300px' }}>
            <input
              type="text"
              placeholder="Search by title or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px' }}
            />
          </div>
        </div>
      </div>
      <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748b' }}>
        Showing {filteredProperties.length} of {properties.length} properties
        {(selectedCategory !== 'All' || selectedCity !== 'All') && (
          <button
            onClick={() => { setSelectedCategory('All'); setSelectedCity('All'); setSearchTerm(''); }}
            style={{ marginLeft: '12px', color: '#c9a03d', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Clear all filters
          </button>
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
        {filteredProperties.length > 0 ? (
          filteredProperties.map((p) => (
            <div key={p.id || p._id} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              {p.image_url && (
                <img
                  src={p.image_url}
                  alt={p.title}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
              )}
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>{p.title}</h3>
                  <span style={{
                    background: p.property_type === 'For Sale' ? '#dbeafe' : '#dcfce7',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '12px'
                  }}>
                    {p.property_type}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#64748b', fontSize: '14px' }}>
                  <FaMapMarkerAlt size={12} />
                  <span>{p.location}</span>
                </div>

                <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#c9a03d', marginBottom: '12px' }}>
                  ${parseInt(p.price).toLocaleString()}
                </div>

                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', fontSize: '13px', color: '#64748b' }}>
                  {p.bedrooms && <span>{p.bedrooms} beds</span>}
                  {p.bathrooms && <span>{p.bathrooms} baths</span>}
                  {p.area_size && <span>{p.area_size}</span>}
                </div>

                <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
                  <button onClick={() => handleView(p)} style={{ flex: 1, padding: '8px', background: '#f1f5f9', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                    <FaEye style={{ marginRight: '6px' }} /> View
                  </button>
                  <button onClick={() => openEditModal(p)} style={{ flex: 1, padding: '8px', background: '#f1f5f9', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                    <FaEdit style={{ marginRight: '6px' }} /> Edit
                  </button>
                  <button onClick={() => handleDelete(p.id || p._id, p.title)} style={{ flex: 1, padding: '8px', background: '#fee2e2', border: 'none', borderRadius: '8px', cursor: 'pointer', color: '#dc2626' }}>
                    <FaTrash style={{ marginRight: '6px' }} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
            No properties found matching your filters
          </div>
        )}
      </div>
      {showEditModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, overflow: 'auto'
        }} onClick={closeEditModal}>
          <div style={{
            background: 'white', borderRadius: '20px', width: '90%', maxWidth: '800px',
            maxHeight: '90vh', overflow: 'auto', padding: '30px', position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>

            <button onClick={closeEditModal} style={{
              position: 'absolute', top: '20px', right: '20px',
              background: '#f1f5f9', border: 'none', width: '30px', height: '30px',
              borderRadius: '50%', cursor: 'pointer'
            }}><FaTimes /></button>

            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Edit Property</h2>
            <p style={{ color: '#64748b', marginBottom: '24px' }}>Update property details</p>

            <form onSubmit={handleUpdateProperty}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Property Image</label>
                {editImagePreview && (
                  <div style={{ marginBottom: '12px' }}>
                    <img src={editImagePreview} alt="Preview" style={{ width: '120px', height: '90px', objectFit: 'cover', borderRadius: '8px' }} />
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleEditImageChange} style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label>Title *</label>
                  <input type="text" name="title" value={editFormData.title} onChange={handleEditChange} required style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
                </div>
                <div>
                  <label>Category *</label>
                  <select name="category_id" value={editFormData.category_id} onChange={handleEditChange} style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }}>
                    <option value="">Select Category</option>
                    <option value="1">Modern Villa</option>
                    <option value="2">Luxury Apartment</option>
                    <option value="3">Family House</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Price *</label>
                  <input type="number" name="price" value={editFormData.price} onChange={handleEditChange} required style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
                </div>
                <div>
                  <label>Location/City *</label>
                  <input type="text" name="location" value={editFormData.location} onChange={handleEditChange} required placeholder="e.g., New York" style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
                </div>
                <div>
                  <label>Bedrooms</label>
                  <input type="number" name="bedrooms" value={editFormData.bedrooms} onChange={handleEditChange} style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
                </div>
                <div>
                  <label>Bathrooms</label>
                  <input type="number" name="bathrooms" value={editFormData.bathrooms} onChange={handleEditChange} style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
                </div>
                <div>
                  <label>Area (sq ft)</label>
                  <input type="text" name="area_size" value={editFormData.area_size} onChange={handleEditChange} style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
                </div>
                <div>
                  <label>Status</label>
                  <select name="status" value={editFormData.status} onChange={handleEditChange} style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }}>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Sold">Sold</option>
                    <option value="Rented">Rented</option>
                  </select>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label>Description</label>
                  <textarea name="description" rows="4" value={editFormData.description} onChange={handleEditChange} style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
                </div>
              </div>

              <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={closeEditModal} style={{ padding: '10px 24px', background: '#f1f5f9', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={editLoading} style={{ padding: '10px 28px', background: '#c9a03d', color: '#0f2b3d', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: editLoading ? 'not-allowed' : 'pointer', opacity: editLoading ? 0.7 : 1 }}>
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