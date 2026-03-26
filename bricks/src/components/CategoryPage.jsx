import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CategoryPage = () => {
  const { categoryType } = useParams();
  const navigate = useNavigate();

  // Property data remains the same
  const propertyData = [
    { id: 1, type: 'villas', title: 'Modern Luxury Villa', price: '$850,000', location: 'Beverly Hills', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600' },
    { id: 2, type: 'villas', title: 'Sunset Palm Villa', price: '$720,000', location: 'Miami Beach', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600' },
    { id: 3, type: 'villas', title: 'Emerald Garden Estate', price: '$950,000', location: 'Lahore, PK', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600' },
    { id: 4, type: 'apartments', title: 'Skyline Penthouse', price: '$450,000', location: 'New York City', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600' },
    { id: 5, type: 'apartments', title: 'Green View Studio', price: '$310,000', location: 'Chicago', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600' },
    { id: 6, type: 'apartments', title: 'Urban Eco Loft', price: '$280,000', location: 'Seattle', img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600' },
    { id: 7, type: 'offices', title: 'Tech Hub Office', price: '$1,200,000', location: 'San Francisco', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600' },
    { id: 8, type: 'offices', title: 'Eco-Friendly Workspace', price: '$980,000', location: 'Austin', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600' },
    { id: 9, type: 'townhouses', title: 'Modern Family Rowhouse', price: '$540,000', location: 'London', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600' },
    { id: 10, type: 'townhouses', title: 'Green Terrace Home', price: '$410,000', location: 'Vancouver', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600' },
    { id: 11, type: 'townhouses', title: 'Classic Brick Townhouse', price: '$480,000', location: 'Boston', img: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=600' },
  ];

  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (propertyId) => {
    setFavorites(prevState => ({
      ...prevState,
      [propertyId]: !prevState[propertyId]
    }));
  };

  const filteredList = propertyData.filter(item => item.type === categoryType);

  // Function to handle navigation to property details
  const handleExploreDetails = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <div className="container" style={{ marginTop: '10px', marginBottom: '100px', minHeight: '80vh' }}>
      <button 
        className="btn mb-4 d-flex align-items-center gap-2 back-btn-anim" 
        onClick={() => navigate('/')}
      >
        <i className="bi bi-arrow-left"></i> Back to Home
      </button>

      <div className="mb-5 text-center reveal-header">
        <span className="category-tag-anim mb-2 d-inline-block fst-italic">
          Explore Our Premium {categoryType}
        </span>
        <h2 className="fw-bold text-capitalize display-5 main-heading">
          {categoryType} Collection
        </h2>
        <div className="heading-line mx-auto mt-2"></div>
      </div>

      <div className="row g-4">
        {filteredList.length > 0 ? (
          filteredList.map((item, index) => (
            <div key={item.id} className="col-md-6 col-lg-4">
              <div 
                className="card h-100 border-0 property-card-v2 shadow-sm" 
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="img-wrapper position-relative">
                  <img src={item.img} className="card-img-top property-img-v2" alt={item.title} />
                  <div className="price-overlay shadow-lg">{item.price}</div>
                  <div className="img-shine"></div>
                </div>

                <div className="card-body p-4 text-start">
                  <h5 className="fw-bold mb-2 card-title-anim">{item.title}</h5>
                  <p className="text-muted mb-4 d-flex align-items-center gap-2">
                    <i className="bi bi-geo-alt-fill loc-icon"></i> {item.location}
                  </p>
                  
                  <div className="pt-3 border-top d-flex justify-content-between align-items-center">
                    {/* Updated Explore Details Button with navigation */}
                    <button 
                      className="btn details-btn-v2 px-4 rounded-pill"
                      onClick={() => handleExploreDetails(item.id)}
                    >
                      Explore Details
                    </button>
                    
                    <div 
                      className={`heart-circle ${favorites[item.id] ? 'favorite-active' : ''}`}
                      onClick={() => toggleFavorite(item.id)}
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) => e.key === 'Enter' && toggleFavorite(item.id)}
                    >
                      <i className={`bi ${favorites[item.id] ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5 no-data-box shadow-sm">
            <i className="bi bi-search mb-3 d-block" style={{fontSize: '3rem', opacity: 0.5}}></i>
            <h4 className="fw-bold">No {categoryType} Found</h4>
            <p className="text-muted">Stay tuned for upcoming listings!</p>
          </div>
        )}
      </div>

      {Object.values(favorites).filter(Boolean).length > 0 && (
        <div className="favorites-bar mt-5 p-3 rounded-pill text-center">
          <i className="bi bi-heart-fill me-2" style={{color: '#ff4d4f'}}></i>
          You have {Object.values(favorites).filter(Boolean).length} favorite properties
        </div>
      )}

      <style>{`
        :root {
          --brand-green: #1a3c34;
          --brand-light: #f1f8f6;
          --soft-red: #ff4d4f;
        }

        @keyframes slideInUpBlur {
          0% { opacity: 0; transform: translateY(50px) scale(0.95); filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }

        .property-card-v2 {
          animation: slideInUpBlur 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          border-radius: 20px;
          overflow: hidden;
          background: #fff;
          transition: 0.5s all ease;
        }

        .property-card-v2:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 50px rgba(26, 60, 52, 0.15) !important;
        }

        .img-wrapper { overflow: hidden; position: relative; }

        .property-img-v2 {
          height: 260px;
          width: 100%;
          object-fit: cover;
          transition: transform 1.2s ease;
        }

        .property-card-v2:hover .property-img-v2 {
          transform: scale(1.1) rotate(1deg);
        }

        .img-shine {
          position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
          transform: skewX(-25deg);
          transition: 0.75s;
          pointer-events: none;
        }

        .property-card-v2:hover .img-shine { left: 125%; }

        .price-overlay {
          position: absolute; bottom: 15px; left: 15px;
          background: var(--brand-green); color: white;
          padding: 6px 18px; border-radius: 50px;
          font-weight: 700; font-size: 0.85rem;
          z-index: 5;
        }

        .details-btn-v2 {
          background-color: var(--brand-green);
          color: white; border: none;
          transition: 0.4s; font-weight: 600;
        }

        .details-btn-v2:hover {
          background-color: #244e44;
          box-shadow: 0 8px 15px rgba(26, 60, 52, 0.3);
          transform: translateY(-2px);
          color: white;
        }

        .back-btn-anim {
          border: 1px solid var(--brand-green);
          color: var(--brand-green);
          border-radius: 50px; padding: 10px 25px;
          transition: 0.3s ease; font-weight: 600;
        }

        .back-btn-anim:hover {
          background: var(--brand-green); color: white;
          padding-left: 35px;
        }

        .category-tag-anim {
          background: var(--brand-light); color: var(--brand-green);
          padding: 8px 20px; border-radius: 50px;
          font-size: 0.85rem; font-weight: 800;
          letter-spacing: 1px;
          border: 1px solid #d1e2dd;
        }

        .main-heading { color: var(--brand-green); }

        .heading-line {
          width: 60px; height: 4px;
          background: var(--brand-green);
          border-radius: 10px;
        }

        .loc-icon { color: var(--brand-green); }

        .heart-circle {
          width: 42px; height: 42px; background: #f9fbfb;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%; color: #ccd6d4; 
          cursor: pointer; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid #edf2f1;
        }

        .heart-circle:hover { 
          background: #fff1f0; 
          color: var(--soft-red); 
          transform: scale(1.15) rotate(15deg);
          border-color: #ffccc7;
          box-shadow: 0 5px 15px rgba(255, 77, 79, 0.15);
        }

        .heart-circle.favorite-active {
          background: #fff1f0;
          color: var(--soft-red);
          border-color: #ff4d4f;
        }

        .heart-circle.favorite-active:hover {
          transform: scale(1.15) rotate(0deg);
        }

        .favorites-bar {
          background: var(--brand-light);
          border: 1px solid #d1e2dd;
          color: var(--brand-green);
          font-weight: 600;
          max-width: 400px;
          margin: 0 auto;
          box-shadow: 0 5px 15px rgba(26, 60, 52, 0.1);
        }

        .no-data-box {
          background: #fdfdfd;
          border: 2px dashed #d1e2dd;
          color: var(--brand-green);
          border-radius: 25px;
        }
      `}</style>
    </div>
  );
};

export default CategoryPage;