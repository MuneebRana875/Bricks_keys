import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CategoryPage = () => {
  const { categoryType } = useParams();
  const navigate = useNavigate();
  
  const [propertyData, setPropertyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://bricks-keys.vercel.app/api/properties?category=${categoryType}`);
        setPropertyData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setLoading(false);
      }
    };

    fetchProperties();
    window.scrollTo(0, 0);
  }, [categoryType]);

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh', paddingTop: '100px' }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="category-page" style={{ paddingTop: '110px', paddingBottom: '60px', background: '#f9fbfb' }}>
      <div className="container">
        <div className="row mb-5 align-items-end">
          <div className="col-md-8">
            <h6 className="text-uppercase fw-bold text-success mb-2" style={{ letterSpacing: '2px' }}>
              Explore Collections
            </h6>
            <h1 className="display-5 fw-bold text-capitalize" style={{ color: '#1a3c34' }}>
              {categoryType.replace('-', ' ')}
            </h1>
          </div>
          <div className="col-md-4 text-md-end">
            <span className="text-muted fw-semibold">{propertyData.length} Properties Found</span>
          </div>
        </div>
        <div className="row g-4">
          {propertyData.length > 0 ? (
            propertyData.map((item) => (
              <div key={item.id} className="col-md-6 col-lg-4">
                <div className="property-card h-100 shadow-sm border-0 rounded-4 overflow-hidden bg-white">
                  <div className="position-relative">
                    <img 
                      src={item.image_url || item.img} 
                      className="w-100" 
                      alt={item.title}
                      style={{ height: '240px', objectFit: 'cover' }}
                    />
                    <div className="position-absolute top-0 end-0 p-3">
                      <div 
                        className={`heart-circle ${favorites.includes(item.id) ? 'favorite-active' : ''}`}
                        onClick={() => toggleFavorite(item.id)}
                      >
                        <i className={`bi ${favorites.includes(item.id) ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                      </div>
                    </div>
                    <div className="position-absolute bottom-0 start-0 p-3">
                      <span className="badge bg-white text-dark rounded-pill px-3 py-2 shadow-sm fw-bold">
                        {item.property_type || 'For Sale'}
                      </span>
                    </div>
                  </div>

                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h4 className="fw-bold text-success mb-0">{item.price}</h4>
                    </div>
                    <h5 className="fw-bold mb-2 text-truncate" style={{ color: '#1a3c34' }}>{item.title}</h5>
                    <p className="text-muted small mb-3">
                      <i className="bi bi-geo-alt-fill me-1 text-success"></i> {item.location}
                    </p>
                    
                    <div className="d-flex gap-3 text-muted small border-top pt-3">
                      <span><i className="bi bi-door-open me-1"></i> {item.bedrooms} Beds</span>
                      <span><i className="bi bi-droplet me-1"></i> {item.bathrooms} Baths</span>
                      <span><i className="bi bi-aspect-ratio me-1"></i> {item.area_size || item.area}</span>
                    </div>

                    <button 
                      onClick={() => navigate(`/properties/detail/${item.id}`)}
                      className="btn btn-success w-100 mt-4 rounded-pill py-2 fw-bold"
                      style={{ background: '#1a3c34', border: 'none' }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <i className="bi bi-house-exclamation display-1 text-muted"></i>
              <h3 className="mt-3 text-muted">No properties found in this category.</h3>
              <button onClick={() => navigate('/')} className="btn btn-outline-success mt-3 rounded-pill px-4">
                Back to Home
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .property-card {
          transition: all 0.3s ease;
        }
        .property-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important;
        }
        .heart-circle {
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: 0.3s;
          color: #ccc;
        }
        .heart-circle:hover { transform: scale(1.1); color: #ff4d4f; }
        .favorite-active { color: #ff4d4f; background: #fff; }
      `}</style>
    </div>
  );
};

export default CategoryPage;