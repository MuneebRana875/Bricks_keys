import { useState, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaCloudUploadAlt, FaTrash, FaImage } from 'react-icons/fa';

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
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (images.length + imageFiles.length > 5) {
      toast.error('You can only upload up to 5 images');
      return;
    }

    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages(prev => [...prev, file]);
        setImagePreview(prev => [...prev, event.target.result]);
      };
      reader.readAsDataURL(file);
    });
    
    toast.success(`${imageFiles.length} image(s) added`);
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    
    
    if (images.length === 0) {
      toast.error('Please upload an image');
      return;
    }
  
   
    const loadingToast = toast.loading('Uploading property...');
  
   
    const data = new FormData();
  
   
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
  
    
    data.append('image', images[0]);
  
    try {
      
      const response = await axios.post('https://bricks-keys.vercel.app/admin/add-property', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      toast.dismiss(loadingToast);
      toast.success('Property added successfully to database!');
  
     
      setFormData({
        title: '', description: '', property_type: 'For Sale',
        brand: '', price: '', location: '',
        bedrooms: '', bathrooms: '', area_size: '', status: 'Active'
      });
      setImages([]);
      setImagePreview([]);
      if (fileInputRef.current) fileInputRef.current.value = '';
  
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error('Submission Error:', error);
      toast.error(error.response?.data?.error || 'Failed to add property');
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '8px' }}>Add New Property</h1>
      <p style={{ color: '#64748b', marginBottom: '24px' }}>Fill in the details to list a new property</p>
      
      <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '16px', padding: '28px', maxWidth: '900px' }}>
        
        <div style={{ marginBottom: '28px' }}>
          <label style={{ display: 'block', fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
            Upload Images
          </label>
          
          
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: '2px dashed #cbd5e1',
              borderRadius: '12px',
              padding: '40px',
              textAlign: 'center',
              cursor: 'pointer',
              background: '#fafbfc',
              transition: 'all 0.2s ease',
              marginBottom: '16px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#c9a03d'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#cbd5e1'}
          >
            <FaCloudUploadAlt style={{ fontSize: '48px', color: '#94a3b8', marginBottom: '12px' }} />
            <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>
              Drag & drop or click to upload image
            </p>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>
              Support: JPG, PNG, WEBP (Max 5 images, 5MB each)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/"
              multiple
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </div>
          {imagePreview.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '12px', marginTop: '16px' }}>
              {imagePreview.map((preview, index) => (
                <div key={index} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                  <img 
                    src={preview} 
                    alt={`Preview ${index + 1}`} 
                    style={{ width: '100%', height: '100px', objectFit: 'cover' }}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      background: 'rgba(239, 68, 68, 0.9)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: 'white'
                    }}
                  >
                    <FaTrash style={{ fontSize: '12px' }} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
              Title <span style={{ color: '#ef4444' }}></span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter property title"
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
              Property Type <span style={{ color: '#ef4444' }}></span>
            </label>
            <select
              name="property_type"
              value={formData.property_type}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px' }}
            >
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
              <option value="Commercial">Commercial</option>
              <option value="Land">Land/Plot</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
              Price <span style={{ color: '#ef4444' }}></span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
              Location <span style={{ color: '#ef4444' }}></span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter property location"
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px' }}
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
              value={formData.bedrooms}
              onChange={handleChange}
              placeholder="Number of bedrooms"
              style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
              Bathrooms
            </label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              placeholder="Number of bathrooms"
              style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px' }}
            />
          </div>
          <div >
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
              Area (sq ft)
            </label>
            <input
              type="text"
              name="area_size"
              value={formData.area_size}
              onChange={handleChange}
              placeholder="e.g., 1200 sq ft"
              style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px' }}
            />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
              Description <span style={{ color: '#ef4444' }}></span>
            </label>
            <textarea
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter property description"
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', resize: 'vertical' }}
            ></textarea>
          </div>
        </div>
        <div style={{ marginTop: '28px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={() => window.history.back()}
            style={{ 
              background: 'white', 
              border: '1px solid #cbd5e1', 
              padding: '10px 24px', 
              borderRadius: '8px', 
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{ 
              background: '#c9a03d', 
              color: '#0f2b3d', 
              padding: '10px 28px', 
              border: 'none', 
              borderRadius: '8px', 
              fontWeight: '600', 
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Add Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
