import { useState, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaCloudUploadAlt, FaTrash, FaBed, FaBath, FaRulerCombined, FaTag, FaMapMarkerAlt } from 'react-icons/fa';

const AddProperty = () => {
  const [formData, setFormData] = useState({
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

  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
  };

  const processFiles = (files) => {
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
      } else {
        toast.error(`${file.name} is not an image file`);
      }
    });
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreview(prev => prev.filter((_, i) => i !== index));
    toast.success('Image removed');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    const loadingToast = toast.loading('Uploading property to Bricks & Keys...');
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    
  
    images.forEach((img) => data.append('image', img));

    try {
      const response = await axios.post('https://bricks-keys.vercel.app/admin/add-property', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.dismiss(loadingToast);
      toast.success('Property added successfully!');

      setFormData({
        title: '', description: '', property_type: 'For Sale',
        price: '', location: '', bedrooms: '', bathrooms: '', 
        area_size: '', status: 'Active'
      });
      setImages([]);
      setImagePreview([]);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.error || 'Failed to add property');
    }
  };

  // Reusable Input Style
  const inputStyle = {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
    backgroundColor: '#f8fafc'
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#334155'
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0f2b3d', marginBottom: '4px' }}>Add New Property</h1>
      <p style={{ color: '#64748b', marginBottom: '30px' }}>List your property on the Bricks & Keys portal</p>
      
      <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '20px', padding: '32px', maxWidth: '1000px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        
        {/* Image Upload Section */}
        <div style={{ marginBottom: '32px' }}>
          <label style={{ ...labelStyle, fontSize: '16px' }}>Upload Property Media</label>
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: '2px dashed #cbd5e1',
              borderRadius: '16px',
              padding: '40px',
              textAlign: 'center',
              cursor: 'pointer',
              background: '#fafbfc',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#c9a03d';
              e.currentTarget.style.background = '#fefcf6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#cbd5e1';
              e.currentTarget.style.background = '#fafbfc';
            }}
          >
            <FaCloudUploadAlt style={{ fontSize: '54px', color: '#c9a03d', marginBottom: '12px' }} />
            <p style={{ fontSize: '16px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>Drag & drop or click to upload</p>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>High-quality JPG or PNG (Max 5 images)</p>
            <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageUpload} style={{ display: 'none' }} />
          </div>
          {imagePreview.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '16px', marginTop: '20px' }}>
              {imagePreview.map((preview, index) => (
                <div key={index} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '100px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  <img src={preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                    style={{ position: 'absolute', top: '5px', right: '5px', background: '#ef4444', border: 'none', borderRadius: '50%', width: '24px', height: '24px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <FaTrash size={10} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          
          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>Property Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Modern 3-Bed Luxury Villa" required style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}><FaTag size={14}/> Property Type</label>
            <select name="property_type" value={formData.property_type} onChange={handleChange} style={inputStyle}>
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
              <option value="Villa">Villa</option>
              <option value="Appartment">Appartment</option>
              <option value="Office Space">Office Space</option>
              <option value="Townhouse">Townhouse</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}><FaTag size={14}/> Status</label>
            <select name="status" value={formData.status} onChange={handleChange} style={inputStyle}>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Sold">Sold</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Price (USD/PKR)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Enter amount" required style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}><FaMapMarkerAlt size={14}/> Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="City, Area" required style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}><FaBed size={14}/> Bedrooms</label>
            <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} placeholder="0" style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}><FaBath size={14}/> Bathrooms</label>
            <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} placeholder="0" style={inputStyle} />
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}><FaRulerCombined size={14}/> Area Size</label>
            <input type="text" name="area_size" value={formData.area_size} onChange={handleChange} placeholder="e.g. 2400 sq ft" style={inputStyle} />
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>Description</label>
            <textarea name="description" rows="4" value={formData.description} onChange={handleChange} placeholder="Describe the features, amenities, and nearby landmarks..." required style={{ ...inputStyle, resize: 'none' }}></textarea>
          </div>
        </div>
        <div style={{ marginTop: '40px', display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={() => window.history.back()}
            style={{ background: 'transparent', border: '1px solid #cbd5e1', padding: '12px 30px', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', color: '#64748b' }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{ background: '#c9a03d', color: '#0f2b3d', padding: '12px 40px', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(201, 160, 61, 0.3)', transition: 'transform 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Publish Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;