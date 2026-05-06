import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const CategoryPage = () => {
  const { categoryType } = useParams();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryType) fetchCategoryProperties();
  }, [categoryType]);

  const fetchCategoryProperties = async () => {
    setLoading(true);
    try {
      let categoryName = '';
      switch (categoryType) {
        case 'villas': categoryName = 'Modern Villa'; break;
        case 'apartments': categoryName = 'Apartments'; break;
        case 'offices': categoryName = 'Office Space'; break;
        case 'townhouses': categoryName = 'Townhouse'; break;
        default: categoryName = categoryType;
      }
      const response = await axios.get('https://bricks-keys.vercel.app/admin/properties', { params: { category: categoryName } });
      setProperties(response.data.properties);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const getDisplayName = () => {
    switch (categoryType) {
      case 'villas': return 'Villas';
      case 'apartments': return 'Apartments';
      case 'offices': return 'Office Spaces';
      case 'townhouses': return 'Townhouses';
      default: return categoryType;
    }
  };

  if (loading) return <div className="container py-5 text-center"><p>Loading...</p></div>;

  return (
    <div className="container" style={{ marginTop: '100px', marginBottom: '100px' }}>
      <button onClick={() => navigate('/')} className="btn mb-4" style={{ border: '1px solid #1a3c34', color: '#1a3c34', borderRadius: '50px', padding: '10px 25px' }}>← Back to Home</button>
      <div className="mb-5 text-center">
        <h2 className="fw-bold text-capitalize display-5" style={{ color: '#1a3c34' }}>{getDisplayName()} Collection</h2>
      </div>
      <div className="row g-4">
        {properties.length > 0 ? properties.map((item) => (
          <div key={item.id} className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <img src={item.image_url || 'https://via.placeholder.com/600x400'} className="card-img-top" alt={item.title} style={{ height: '260px', objectFit: 'cover', cursor: 'pointer' }} onClick={() => navigate(`/property/${item.id}`)} />
              <div className="card-body p-4">
                <h5 className="fw-bold mb-2">{item.title}</h5>
                <p className="text-muted mb-4"><i className="bi bi-geo-alt-fill me-2"></i>{item.city_name || item.location}</p>
                <div className="pt-3 border-top">
                  <span className="fw-bold text-success fs-5">{item.price}</span>
                  <button onClick={() => navigate(`/property/${item.id}`)} className="btn mt-2 w-100" style={{ backgroundColor: '#1a3c34', color: 'white', borderRadius: '50px' }}>View Details</button>
                </div>
              </div>
            </div>
          </div>
        )) : <div className="col-12 text-center py-5"><h4>No {getDisplayName()} Found</h4></div>}
      </div>
    </div>
  );
};

export default CategoryPage;