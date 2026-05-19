import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CategoryDetails = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();

  // Full Property Data List
  const propertyData = [
    { id: 1, type: 'villas', title: 'Modern Luxury Villa', price: '$850,000', location: 'Beverly Hills', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600', 
      bedrooms: 5, bathrooms: 4, area: '4,500 sq ft', yearBuilt: 2022, description: 'Experience unparalleled luxury in this modern masterpiece. Featuring floor-to-ceiling windows, smart home technology, and a private infinity pool.' },
    { id: 2, type: 'villas', title: 'Sunset Palm Villa', price: '$720,000', location: 'Miami Beach', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600',
      bedrooms: 4, bathrooms: 3, area: '3,200 sq ft', yearBuilt: 2021, description: 'Stunning beachfront villa with panoramic ocean views. Enjoy direct beach access and tropical landscaping.' },
    { id: 3, type: 'villas', title: 'Emerald Garden Estate', price: '$950,000', location: 'Lahore, PK', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600',
      bedrooms: 6, bathrooms: 5, area: '6,000 sq ft', yearBuilt: 2023, description: 'A sprawling estate surrounded by lush gardens. Perfect for large families with separate guest quarters.' },
    { id: 4, type: 'apartments', title: 'Skyline Penthouse', price: '$450,000', location: 'New York City', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600',
      bedrooms: 3, bathrooms: 2, area: '1,800 sq ft', yearBuilt: 2020, description: 'Luxury penthouse with breathtaking city views. Features premium finishes and 24/7 concierge service.' },
    { id: 5, type: 'apartments', title: 'Green View Studio', price: '$310,000', location: 'Chicago', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600',
      bedrooms: 1, bathrooms: 1, area: '750 sq ft', yearBuilt: 2021, description: 'Modern studio apartment with floor-to-ceiling windows overlooking the park.' },
    { id: 6, type: 'apartments', title: 'Urban Eco Loft', price: '$280,000', location: 'Seattle', img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600',
      bedrooms: 2, bathrooms: 2, area: '1,200 sq ft', yearBuilt: 2022, description: 'Eco-friendly loft with sustainable materials and energy-efficient appliances.' },
    { id: 7, type: 'offices', title: 'Tech Hub Office', price: '$1,200,000', location: 'San Francisco', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600',
      bedrooms: 0, bathrooms: 2, area: '3,500 sq ft', yearBuilt: 2021, description: 'Prime office space in the heart of Silicon Valley. Open floor plan with modern amenities.' },
    { id: 8, type: 'offices', title: 'Eco-Friendly Workspace', price: '$980,000', location: 'Austin', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600',
      bedrooms: 0, bathrooms: 2, area: '2,800 sq ft', yearBuilt: 2022, description: 'LEED-certified office building with rooftop garden and collaborative spaces.' },
    { id: 9, type: 'townhouses', title: 'Modern Family Rowhouse', price: '$540,000', location: 'London', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
      bedrooms: 4, bathrooms: 3, area: '2,400 sq ft', yearBuilt: 2021, description: 'Contemporary townhouse with private garden and modern interior design.' },
    { id: 10, type: 'townhouses', title: 'Green Terrace Home', price: '$410,000', location: 'Vancouver', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600',
      bedrooms: 3, bathrooms: 2, area: '1,900 sq ft', yearBuilt: 2020, description: 'Charming townhouse with rooftop terrace and mountain views.' },
    { id: 11, type: 'townhouses', title: 'Classic Brick Townhouse', price: '$480,000', location: 'Boston', img: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=600',
      bedrooms: 3, bathrooms: 2, area: '2,100 sq ft', yearBuilt: 2019, description: 'Historic brick townhouse with modern renovations and original architectural details.' }
  ];

  const property = propertyData.find(p => p.id === parseInt(propertyId));

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
          <i className="bi bi-arrow-left"></i> Back to {property.type}
        </button>

        
        <div className="property-details-container">
          <div className="row g-4 align-items-stretch">
            
            <div className="col-lg-7">
              <div className="main-image-wrapper h-100">
                <img 
                  src={property.img} 
                  alt={property.title}
                  className="main-property-img h-100 w-100"
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
                    <span className="ms-2">{property.location}</span>
                  </div>

                  <div className="property-stats mb-4">
                    <div className="row g-2">
                      {property.bedrooms > 0 && (
                        <div className="col-6">
                          <div className="stat-item">
                            <i className="bi bi-door-closed"></i>
                            <div>
                              <strong>{property.bedrooms}</strong>
                              <span> Bedrooms</span>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="col-6">
                        <div className="stat-item">
                          <i className="bi bi-droplet"></i>
                          <div>
                            <strong>{property.bathrooms}</strong>
                            <span> Bathrooms</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="stat-item">
                          <i className="bi bi-aspect-ratio"></i>
                          <div>
                            <strong>{property.area}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="stat-item">
                          <i className="bi bi-calendar"></i>
                          <div>
                            <strong>{property.yearBuilt}</strong>
                            <span> Built</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="description-section mb-4">
                    <h4 className="fw-bold h5">Property Description</h4>
                    <p className="text-muted small">{property.description}</p>
                  </div>
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
              {['High-Speed Internet', 'Central AC', 'Parking Included', 'Modern Kitchen', 'Garden Access', '24/7 Security'].map((feature, index) => (
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
        .back-btn-anim:hover { background: #1a3c34; color: white; border-color: #1a3c34; }

        @media (max-width: 991px) {
          .main-property-img { min-height: 400px; }
          .property-info-card { padding: 25px; }
        }
      `}</style>
    </div>
  );
};

export default CategoryDetails; 
