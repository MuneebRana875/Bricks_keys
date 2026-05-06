import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const CategoryDetails = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (propertyId) {
      fetchPropertyDetails();
    }
  }, [propertyId]);

  const fetchPropertyDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://bricks-keys.vercel.app/admin/properties/${propertyId}`);
      setProperty(response.data);
    } catch (error) {
      console.error('Error fetching property:', error);
      toast.error('Failed to load property details');
    } finally {
      setLoading(false);
    }
  };

  // Default features if API doesn't return features
  const defaultFeatures = ['High-Speed Internet', 'Central AC', 'Parking Included', 'Modern Kitchen', 'Garden Access', '24/7 Security'];

  if (loading) {
    return (
      <div className="container text-center py-5" style={{ minHeight: '80vh' }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading property details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container text-center py-5" style={{ minHeight: '80vh' }}>
        <h2>Property Not Found</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="category-details-wrapper">
      <div className="container py-4" style={{ marginBottom: '100px', minHeight: '80vh' }}>
       
        <button 
          className="btn mb-4 d-flex align-items-center gap-2 back-btn-anim"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left"></i> Back
        </button>

        
        <div className="property-details-container">
          <div className="row g-4 align-items-stretch">
            
            <div className="col-lg-7">
              <div className="main-image-wrapper h-100">
                <img 
                  src={property.image_url || 'https://via.placeholder.com/800x600'} 
                  alt={property.title}
                  className="main-property-img h-100 w-100"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600'; }}
                />
                <div className="price-badge-large">{property.price}</div>
              </div>
            </div>

            
            <div className="col-lg-5">
              <div className="property-info-card h-100 d-flex flex-column justify-content-between">
                <div>
                  <h1 className="display-6 fw-bold mb-2">{property.title}</h1>
                  
                  <div className="location-details mb-4">
                    <i className="bi bi-geo-alt-fill"></i>
                    <span className="ms-2">{property.city_name || property.location || 'Location not specified'}</span>
                  </div>

                  <div className="property-stats mb-4">
                    <div className="row g-2">
                      {(property.bedrooms > 0 || property.bedrooms === 0) && (
                        <div className="col-6">
                          <div className="stat-item">
                            <i className="bi bi-door-closed"></i>
                            <div>
                              <strong>{property.bedrooms || 0}</strong>
                              <span> Bedrooms</span>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="col-6">
                        <div className="stat-item">
                          <i className="bi bi-droplet"></i>
                          <div>
                            <strong>{property.bathrooms || 0}</strong>
                            <span> Bathrooms</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="stat-item">
                          <i className="bi bi-aspect-ratio"></i>
                          <div>
                            <strong>{property.area || 'N/A'}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="stat-item">
                          <i className="bi bi-calendar"></i>
                          <div>
                            <strong>{property.year_built || 'N/A'}</strong>
                            <span> Built</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="description-section mb-4">
                    <h4 className="fw-bold h5">Property Description</h4>
                    <p className="text-muted small">{property.description || 'No description available for this property.'}</p>
                  </div>

                  {property.category && (
                    <div className="mb-3">
                      <span className="badge" style={{ backgroundColor: '#1a3c34', color: 'white', padding: '8px 15px', borderRadius: '50px' }}>
                        <i className="bi bi-tag me-1"></i> {property.category}
                      </span>
                    </div>
                  )}

                  {property.property_type && (
                    <div className="mb-3">
                      <span className="badge" style={{ 
                        backgroundColor: property.property_type === 'For Sale' ? '#2d6a4f' : '#c41e1e', 
                        color: 'white', 
                        padding: '8px 15px', 
                        borderRadius: '50px' 
                      }}>
                        <i className="bi bi-tag me-1"></i> {property.property_type}
                      </span>
                    </div>
                  )}
                </div>

                <div className="action-buttons">
                  <button 
                    className="btn contact-btn w-100 mb-2" 
                    onClick={() => navigate('/contact')}
                  >
                    <i className="bi bi-telephone"></i> Contact Agent
                  </button>
                  <button className="btn schedule-btn w-100">
                    <i className="bi bi-calendar-check"></i> Schedule a Tour
                  </button>
                </div>
              </div>
            </div>
          </div>

          
          <div className="features-section mt-5 p-4 bg-white shadow-sm rounded-4">
            <h3 className="mb-4 fw-bold">Key Features</h3>
            <div className="row g-3">
              {defaultFeatures.map((feature, index) => (
                <div key={index} className="col-md-4 col-sm-6">
                  <div className="feature-item p-3 border rounded-3 d-flex align-items-center gap-2">
                    <i className="bi bi-check-circle-fill text-success"></i>
                    <span className="fw-medium">{feature}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .category-details-wrapper { background: #f5f7fa; min-height: 100vh; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        
        .main-image-wrapper { 
          position: relative; 
          border-radius: 24px; 
          overflow: hidden; 
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
        }

        .main-property-img { 
          object-fit: cover; 
          min-height: 480px; 
          transition: transform 0.6s ease;
        }
        .main-image-wrapper:hover .main-property-img {
          transform: scale(1.05);
        }

        .price-badge-large {
          position: absolute; top: 25px; right: 25px;
          background: #1a3c34; color: white;
          padding: 12px 28px; border-radius: 50px;
          font-weight: 700; font-size: 1.25rem;
          box-shadow: 0 8px 20px rgba(0,0,0,0.25);
          z-index: 10;
        }

        .property-info-card {
          background: white; border-radius: 24px;
          padding: 35px; box-shadow: 0 10px 40px rgba(0,0,0,0.04);
        }

        .location-details {
          display: inline-flex; align-items: center;
          padding: 10px 20px; background: #e8f3f0;
          color: #1a3c34; border-radius: 50px; font-weight: 600;
        }

        .stat-item {
          padding: 15px; background: #fdfdfd;
          border-radius: 16px; border: 1px solid #f0f0f0;
          display: flex; align-items: center; gap: 12px;
          transition: 0.3s;
        }
        .stat-item:hover { border-color: #1a3c34; background: #fff; transform: translateY(-2px); }

        .stat-item i { font-size: 1.6rem; color: #1a3c34; }
        .stat-item strong { display: block; font-size: 1.1rem; color: #1a3c34; }
        .stat-item span { font-size: 0.85rem; color: #777; }

        .contact-btn {
          background: #1a3c34; color: white; border-radius: 50px;
          padding: 14px; font-weight: 600; border: none; transition: 0.3s;
        }
        .contact-btn:hover { background: #244d43; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(26,60,52,0.2); color: white; }

        .schedule-btn {
          background: transparent; color: #1a3c34; border: 2px solid #1a3c34;
          border-radius: 50px; padding: 14px; font-weight: 600; transition: 0.3s;
        }
        .schedule-btn:hover { background: #1a3c34; color: white; transform: translateY(-2px); }

        .back-btn-anim {
          border: 1px solid #ddd; color: #555; background: white;
          border-radius: 50px; padding: 10px 25px; font-weight: 600; transition: 0.3s;
        }
        .back-btn-anim:hover { background: #1a3c34; color: white; border-color: #1a3c34; transform: translateX(-5px); }

        .feature-item {
          transition: all 0.3s ease;
        }
        .feature-item:hover {
          background-color: #1a3c34;
          color: white;
          transform: translateY(-3px);
        }
        .feature-item:hover .bi-check-circle-fill {
          color: #E6BA5F !important;
        }
        .feature-item:hover span {
          color: white;
        }

        @media (max-width: 991px) {
          .main-property-img { min-height: 400px; }
          .property-info-card { padding: 25px; }
        }
      `}</style>
    </div>
  );
};

export default CategoryDetails;