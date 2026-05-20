import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CityDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCityProperties = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://bricks-keys.vercel.app/api/properties?city=${slug}`);
        setProperties(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching city properties:", error);
        setLoading(false);
      }
    };

    fetchCityProperties();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  const cityName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="city-detail-page" style={{ paddingTop: "80px", backgroundColor: "#f8f9fa" }}>
      <div 
        className="position-relative text-white d-flex align-items-center justify-content-center"
        style={{ 
          height: "400px", 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1200')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="text-center">
          <h1 className="display-3 fw-bold mb-3">{cityName}</h1>
          <p className="lead fs-4">Discover the finest properties in {cityName}</p>
        </div>
      </div>

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h2 className="fw-bold" style={{ color: "#1b4332" }}>
            Available Properties ({properties.length})
          </h2>
          <button onClick={() => navigate(-1)} className="btn btn-outline-success rounded-pill px-4">
            <i className="bi bi-arrow-left me-2"></i> Back to Areas
          </button>
        </div>

        {properties.length > 0 ? (
          <div className="row g-4">
            {properties.map((property) => (
              <div key={property.id} className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden hover-scale bg-white">
                  <div className="position-relative">
                    <img 
                      src={property.image_url || property.img} 
                      className="card-img-top" 
                      alt={property.title}
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                    <div className="position-absolute top-0 start-0 m-3">
                      <span className="badge bg-success px-3 py-2 rounded-pill">
                        {property.property_type || "For Sale"}
                      </span>
                    </div>
                  </div>

                  <div className="card-body p-4">
                    <h5 className="card-title fw-bold text-truncate mb-3" style={{ color: "#1b4332" }}>
                      {property.title}
                    </h5>
                    
                    <div className="d-flex gap-3 mb-3 text-muted small">
                      <span><i className="bi bi-door-open text-success me-1"></i> {property.bedrooms} Beds</span>
                      <span><i className="bi bi-droplet text-success me-1"></i> {property.bathrooms} Baths</span>
                      <span><i className="bi bi-aspect-ratio text-success me-1"></i> {property.area_size || property.area}</span>
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                      <span className="fw-bold fs-5 text-success">{property.price}</span>
                      <button 
                        onClick={() => navigate(`/properties/detail/${property.id}`)}
                        className="btn btn-success px-4 rounded-pill btn-sm shadow-sm" 
                        style={{ backgroundColor: "#2d6a4f", border: "none" }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <div className="mb-4">
              <i className="bi bi-building-exclamation display-1 text-muted"></i>
            </div>
            <h3 className="text-muted">No properties found in {cityName} right now.</h3>
            <p className="text-secondary">Please check back later or explore other cities.</p>
          </div>
        )}
      </div>

      <style>{`
        .hover-scale {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-scale:hover {
          transform: translateY(-10px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default CityDetailPage;