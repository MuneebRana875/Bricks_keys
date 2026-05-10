import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaCloudUploadAlt, FaTrash } from 'react-icons/fa';
const API_BASE_URL = 'https://bricks-keys.vercel.app';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    property_type: 'For Sale',
    category: '',
    price: '',
    location: '',
    city_id: '',
    bedrooms: '',
    bathrooms: '',
    area_size: '',
    status: 'Active'
  });

  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [categories] = useState(['Modern Villa', 'Apartments', 'Office Space', 'Townhouse']);
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const fileInputRef = useRef(null);

  const hardcodedCities = [
    { id: 1, city_name: 'New York' },
    { id: 2, city_name: 'San Diego' },
    { id: 3, city_name: 'Arizona' },
    { id: 4, city_name: 'Miami' },
    { id: 5, city_name: 'Los Angeles' }
  ];

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    setLoadingCities(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/cities`);
      if (response.data && response.data.length > 0) {
        setCities(response.data);
      } else {
        setCities(hardcodedCities);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
      setCities(hardcodedCities);
    } finally {
      setLoadingCities(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      toast.error('You can only upload up to 5 images');
      return;
    }

    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImages(prev => [...prev, file]);
          setImagePreview(prev => [...prev, event.target.result]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreview(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) return toast.error('Please upload at least one image');
    if (!formData.title || !formData.city_id || !formData.price) {
      return toast.error('Please fill all required fields');
    }

    setSubmitting(true);
    const loadingToast = toast.loading('Uploading property...');

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    data.append('image', images[0]);

    try {
      const response = await axios.post(`${API_BASE_URL}/admin/add-property`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        toast.success('Property added successfully!', { id: loadingToast });
        setFormData({
          title: '', description: '', property_type: 'For Sale',
          category: '', price: '', location: '',
          city_id: '', bedrooms: '', bathrooms: '',
          area_size: '', status: 'Active'
        });
        setImages([]);
        setImagePreview([]);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Submission Error:', error);
      const msg = error.response?.data?.error || 'Failed to connect to server';
      toast.error(msg, { id: loadingToast });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '8px' }}>Add New Property</h1>
      <p style={{ color: '#64748b', marginBottom: '24px' }}>Fill in the details to list a new property</p>

      <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>

        <div style={{ marginBottom: '28px' }}>
          <label style={{ display: 'block', fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
            Upload Images <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{ border: '2px dashed #cbd5e1', borderRadius: '12px', padding: '40px', textAlign: 'center', cursor: 'pointer', background: '#fafbfc' }}
          >
            <FaCloudUploadAlt style={{ fontSize: '48px', color: '#94a3b8', marginBottom: '12px' }} />
            <p>Click to upload image</p>
            <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageUpload} style={{ display: 'none' }} />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            {imagePreview.map((preview, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <img src={preview} style={{ width: '100px', height: '100px', borderRadius: '8px', objectFit: 'cover' }} />
                <button type="button" onClick={() => removeImage(index)} style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'red', color: 'white', borderRadius: '50%', border: 'none', cursor: 'pointer' }}>
                  <FaTrash size={10} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <label>Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
          </div>

          <div>
            <label>City *</label>
            <select name="city_id" value={formData.city_id} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}>
              <option value="">Select City</option>
              {cities.map(city => <option key={city.id} value={city.id}>{city.city_name}</option>)}
            </select>
          </div>

          <div>
            <label>Price *</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
          </div>

          <div>
            <label>Category *</label>
            <select name="category" value={formData.category} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}>
              <option value="">Select Category</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div>
            <label>Property Type</label>
            <select name="property_type" value={formData.property_type} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}>
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>
          </div>
        </div>

        <button type="submit" disabled={submitting} style={{ marginTop: '20px', padding: '12px 30px', background: '#c9a03d', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          {submitting ? 'Processing...' : 'Add Property'}
        </button>
      </form>
    </div>
  );
};

export default AddProperty;