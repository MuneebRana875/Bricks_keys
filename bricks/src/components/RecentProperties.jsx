import { ErrorBoundary } from "react-error-boundary";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaBed, 
  FaBath, 
  FaRulerCombined, 
  FaRegHeart, 
  FaMapMarkerAlt 
} from 'react-icons/fa';




const RecentProperties = () => {
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = 'https://bricks-keys.vercel.app/api/properties';
  const IMAGE_BASE_URL = 'http://localhost:5000/uploads/';

  useEffect(() => {

      const fetchProperties = async () => {
          try {
              const response = await axios.get(API_URL);
              setProperties(response.data);
              setLoading(false);
          } catch (error) {
            console.log("Error fetching properties:", error);
            setLoading(false);
          }
        };
        fetchProperties();
  },[]);


  if (loading) return <div className="text-center py-5">Loading Properties...</div>;

  return (
    <section className="py-5" style={{ backgroundColor: '#fff' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold" style={{ color: '#1A1A1A', fontSize: '2.2rem' }}>Recent Properties for Rent</h2>
          <p className="text-muted">Explore our latest listings</p>
        </div>

        <div className="row g-4">
          {properties.map((item, index) => (
            <div key={item.id} className="col-12 col-md-6 col-lg-3">
              <div 
                className="card h-100 border-0 shadow-sm" 
                onClick={() => setActiveIndex(index)} 
                style={{ 
                  borderRadius: '15px', 
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  // --- Static Position Highlight Logic ---
                  outline: index === activeIndex ? '2px solid #1A1A1A' : 'none', 
                  transform: index === activeIndex ? 'translateY(-10px)' : 'none',
                  boxShadow: index === activeIndex ? '0 10px 20px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                <div className="position-relative">
                  <img 
                  src={`${IMAGE_BASE_URL}${item.image_url}`} 
                  className="card-img-top" 
                  alt={item.title} 
                  style={{ height: '200px', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Bricks+Property'; }}
                  
                  
                  />
                  <div className="position-absolute top-0 left-0 p-3 d-flex gap-2">
                    <span className="badge" style={{ backgroundColor: '#1A432F', fontSize: '10px' }}>FOR RENT</span>
                    {item.featured === 1 && <span className="badge" style={{ backgroundColor: '#FFB800', color: '#1A1A1A', fontSize: '10px' }}>FEATURED</span>}
                  </div>
                </div>

                <div className="card-body p-4 text-start">
                  <h5 className="fw-bold mb-1" style={{ fontSize: '1.05rem' }}>{item.title}</h5>
                  <p className="text-muted mb-3" style={{ fontSize: '13px' }}><FaMapMarkerAlt className="me-1" /> {item.location}</p>

                  <div className="d-flex justify-content-between py-3 border-top border-bottom mb-3" style={{ borderColor: '#f3f3f3' }}>
                    <div className="text-muted" style={{ fontSize: '12px' }}><FaBed className="me-1" /> {item.bedrooms}</div>
                    <div className="text-muted" style={{ fontSize: '12px' }}><FaBath className="me-1" /> {item.bathrooms}</div>
                    <div className="text-muted" style={{ fontSize: '12px' }}><FaRulerCombined className="me-1" /> {item.area_size}</div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="fw-bold" style={{ color: '#FF5A3C', fontSize: '1.2rem' }}>${item.price}</span>
                      <span className="text-muted" style={{ fontSize: '13px' }}>/month</span>
                    </div>
                    <div style={{ color: index === activeIndex ? '#FF5A3C' : '#999', transition: '0.3s' }}><FaRegHeart /></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Section - Click to Change Highlight */}
        <div className="mt-5 d-flex justify-content-center gap-2 align-items-center">
          {properties.map((_, index) => (
            <div key={index} onClick={() => setActiveIndex(index)} style={{ cursor: 'pointer' }}>
              {index === activeIndex ? (
                <div style={{ 
                  width: '24px', height: '24px', borderRadius: '50%', 
                  border: '1px solid #1A1A1A', display: 'flex', 
                  alignItems: 'center', justifyContent: 'center' 
                }}>
                  <span style={{ width: '8px', height: '8px', backgroundColor: '#1A1A1A', borderRadius: '50%' }}></span>
                </div>
              ) : (
                <span style={{ 
                  width: '8px', height: '8px', backgroundColor: '#D9D9D9', 
                  borderRadius: '50%', display: 'block' 
                }}></span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentProperties;