import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CategoryDetails = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        
        const res = await axios.get(`https://bricks-keys.vercel.app/api/properties/detail/${propertyId}`);
        setProperty(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching property details:", error);
        setLoading(false);
      }
    };

    fetchPropertyDetails();
    window.scrollTo(0, 0); 
  }, [propertyId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container text-center my-5" style={{ paddingTop: '100px' }}>
        <h2>Property Not Found</h2>
        <button className="btn btn-success mt-3" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="category-details-page" style={{ paddingTop: '100px', paddingBottom: '50px', background: '#f9fbfb' }}>
      <div className="container">
        
        <div className="mb-4 d-flex align-items-center gap-3">
          <button onClick={() => navigate(-1)} className="btn btn-outline-secondary rounded-pill px-4">
            <i className="bi bi-arrow-left me-2"></i> Back
          </button>
          <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill text-capitalize">
            {property.property_type || property.type}
          </span>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
              <img 
                src={property.image_url || property.img} 
                className="img-fluid w-100" 
                alt={property.title}
                style={{ height: '500px', objectFit: 'cover' }}
              />
              <div className="card-body p-4">
                <h1 className="fw-bold mb-2" style={{ color: '#1a3c34' }}>{property.title}</h1>
                <p className="text-muted fs-5 mb-4">
                  <i className="bi bi-geo-alt-fill me-2 text-success"></i>
                  {property.location}
                </p>
                
                <h4 className="fw-bold mb-3">Description</h4>
                <p className="text-muted" style={{ lineHeight: '1.8' }}>
                  {property.description}
                </p>
              </div>
            </div>
            <div className="row g-3">
              {[
                { icon: 'bi-door-open', label: 'Bedrooms', value: property.bedrooms },
                { icon: 'bi-droplet', label: 'Bathrooms', value: property.bathrooms },
                { icon: 'bi-aspect-ratio', label: 'Area', value: property.area_size || property.area },
                { icon: 'bi-calendar-check', label: 'Year Built', value: property.yearBuilt || '2023' }
              ].map((stat, idx) => (
                <div key={idx} className="col-6 col-md-3">
                  <div className="stat-item p-3 text-center rounded-4 border bg-white shadow-sm">
                    <i className={`bi ${stat.icon} fs-3 mb-2 d-block text-success`}></i>
                    <strong>{stat.value}</strong>
                    <span className="d-block text-muted small">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '120px' }}>
              <div className="mb-4">
                <span className="text-muted d-block mb-1">Total Price</span>
                <h2 className="fw-bold text-success" style={{ fontSize: '2.5rem' }}>{property.price}</h2>
              </div>

              <div className="d-grid gap-3">
                <button className="btn btn-success py-3 fw-bold rounded-pill shadow-sm" style={{ backgroundColor: '#1a3c34' }}>
                  <i className="bi bi-chat-dots me-2"></i> Contact Agent
                </button>
                <button className="btn btn-outline-success py-3 fw-bold rounded-pill">
                  <i className="bi bi-calendar-event me-2"></i> Schedule Tour
                </button>
              </div>

              <hr className="my-4" />

              <div className="agent-info d-flex align-items-center gap-3">
                <div className="bg-light rounded-circle p-3">
                  <i className="bi bi-person-fill fs-2 text-muted"></i>
                </div>
                <div>
                  <h6 className="mb-0 fw-bold">Admin Manager</h6>
                  <span className="text-muted small">Bricks & Keys Official</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .stat-item {
          transition: all 0.3s ease;
        }
        .stat-item:hover {
          border-color: #1a3c34 !important;
          transform: translateY(-5px);
        }
        .btn-success {
          border: none;
        }
      `}</style>
    </div>
  );
};

export default CategoryDetails;