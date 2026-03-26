import React, { useState } from 'react';  // Import useState for favorite functionality
import { useParams, useNavigate } from 'react-router-dom';

const CategoryPage = () => {
  const { categoryType } = useParams(); // Gets category from URL (e.g., "villas" from /category/villas)
  const navigate = useNavigate(); // For navigation (back button)

  // Data Source: Expanded property list with valid high-quality Unsplash images
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

  // State for favorites - stores favorite status for each property
  // Format: { 1: true, 2: false, 3: true } (propertyId: boolean)
  const [favorites, setFavorites] = useState({});

  // Function to toggle favorite status when heart icon is clicked
  const toggleFavorite = (propertyId) => {
    // Takes previous state and reverses the boolean value for clicked property
    setFavorites(prevState => ({
      ...prevState, // Keep all other properties as they were
      [propertyId]: !prevState[propertyId] // Toggle this specific property
    }));
  };

  // Filter properties based on the URL parameter
  // Shows only properties matching current category (villas/apartments/etc)
  const filteredList = propertyData.filter(item => item.type === categoryType);

  return (
     <div className="container" style={{ marginTop: '10px', marginBottom: '100px', minHeight: '80vh' }}>
      
      {/* Navigation: Back Button with Slide Animation */}
      <button 
        className="btn mb-4 d-flex align-items-center gap-2 back-btn-anim" 
        onClick={() => navigate('/')} // Navigates to home page
      >
        <i className="bi bi-arrow-left"></i> Back to Home
      </button>

      {/* Header Section with Entrance Fade */}
      <div className="mb-5 text-center reveal-header">
        {/* Category tag with animation */}
         <span className="category-tag-anim mb-2 d-inline-block fst-italic">
          Explore Our Premium {categoryType}
        </span>
        {/* Main heading - dynamically shows category name */}
        <h2 className="fw-bold text-capitalize display-5 main-heading">
          {categoryType} Collection
        </h2>
        {/* Decorative line under heading */}
        <div className="heading-line mx-auto mt-2"></div>
      </div>

      {/* Property Grid - Responsive: 1 col mobile, 2 cols tablet, 3 cols desktop */}
      <div className="row g-4">
        {filteredList.length > 0 ? (
          // Map through filtered properties and create cards
          filteredList.map((item, index) => (
            <div key={item.id} className="col-md-6 col-lg-4">
              {/* Property Card with staggered animation delay */}
              <div 
                className="card h-100 border-0 property-card-v2 shadow-sm" 
                style={{ animationDelay: `${index * 0.15}s` }} // Each card animates with delay
              >
                {/* Image Section with Hover Effects */}
                <div className="img-wrapper position-relative">
                  {/* Property Image */}
                  <img src={item.img} className="card-img-top property-img-v2" alt={item.title} />
                  {/* Price Badge overlayed on image */}
                  <div className="price-overlay shadow-lg">{item.price}</div>
                  {/* Shine effect that slides on hover */}
                  <div className="img-shine"></div>
                </div>

                {/* Property Details Section */}
                <div className="card-body p-4 text-start">
                  {/* Property Title */}
                  <h5 className="fw-bold mb-2 card-title-anim">{item.title}</h5>
                  {/* Location with icon */}
                  <p className="text-muted mb-4 d-flex align-items-center gap-2">
                    <i className="bi bi-geo-alt-fill loc-icon"></i> {item.location}
                  </p>
                  
                  {/* Action Buttons Section */}
                  <div className="pt-3 border-top d-flex justify-content-between align-items-center">
                    {/* Explore Details Button */}
                    <button className="btn details-btn-v2 px-4 rounded-pill">
                      Explore Details
                    </button>
                    
                    {/* Favorite Heart Icon - Clickable */}
                    <div 
                      // Dynamic class: adds 'favorite-active' when property is favorited
                      className={`heart-circle ${favorites[item.id] ? 'favorite-active' : ''}`}
                      onClick={() => toggleFavorite(item.id)} // Toggle favorite on click
                      role="button"  // Accessibility: indicates this is a button
                      tabIndex={0}    // Makes it focusable with keyboard
                      onKeyPress={(e) => e.key === 'Enter' && toggleFavorite(item.id)} // Enter key support
                    >
                      {/* Dynamic icon: filled heart if favorite, empty heart if not */}
                      <i className={`bi ${favorites[item.id] ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          /* Fallback UI: Displayed when no properties match the category */
          <div className="col-12 text-center py-5 no-data-box shadow-sm">
             <i className="bi bi-search mb-3 d-block" style={{fontSize: '3rem', opacity: 0.5}}></i>
             <h4 className="fw-bold">No {categoryType} Found</h4>
             <p className="text-muted">Stay tuned for upcoming listings!</p>
          </div>
        )}
      </div>

      {/* Optional Favorites Counter - Shows only if at least one favorite exists */}
      {Object.values(favorites).filter(Boolean).length > 0 && (
        <div className="favorites-bar mt-5 p-3 rounded-pill text-center">
          <i className="bi bi-heart-fill me-2" style={{color: '#ff4d4f'}}></i>
          You have {Object.values(favorites).filter(Boolean).length} favorite properties
        </div>
      )}

      {/* CSS Styles */}
      <style>{`
        /* CSS Variables for consistent theming */
        :root {
          --brand-green: #1a3c34; /* Primary brand color - dark green */
          --brand-light: #f1f8f6; /* Light green background */
          --soft-red: #ff4d4f;    /* Red for heart icon */
        }

        /* Page Loading Animations */
        @keyframes slideInUpBlur {
          0% { opacity: 0; transform: translateY(50px) scale(0.95); filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }

        /* Card Styling & Hover State */
        .property-card-v2 {
          animation: slideInUpBlur 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          border-radius: 20px;
          overflow: hidden;
          background: #fff;
          transition: 0.5s all ease;
        }

        /* Card hover effect - lifts up */
        .property-card-v2:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 50px rgba(26, 60, 52, 0.15) !important;
        }

        /* Image wrapper to contain zoom effect */
        .img-wrapper { overflow: hidden; position: relative; }

        /* Property image styling */
        .property-img-v2 {
          height: 260px;
          width: 100%;
          object-fit: cover;
          transition: transform 1.2s ease;
        }

        /* Image zoom on card hover */
        .property-card-v2:hover .property-img-v2 {
          transform: scale(1.1) rotate(1deg);
        }

        /* Dynamic Image Shine Animation */
        .img-shine {
          position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
          transform: skewX(-25deg);
          transition: 0.75s;
          pointer-events: none; /* Allows clicking through the shine */
        }
        /* Shine slides across image on hover */
        .property-card-v2:hover .img-shine { left: 125%; }

        /* Price overlay on image */
        .price-overlay {
          position: absolute; bottom: 15px; left: 15px;
          background: var(--brand-green); color: white;
          padding: 6px 18px; border-radius: 50px;
          font-weight: 700; font-size: 0.85rem;
          z-index: 5;
        }

        /* Button Customizations */
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

        /* Back button styling */
        .back-btn-anim {
          border: 1px solid var(--brand-green);
          color: var(--brand-green);
          border-radius: 50px; padding: 10px 25px;
          transition: 0.3s ease; font-weight: 600;
        }

        /* Back button hover - text shifts right */
        .back-btn-anim:hover {
          background: var(--brand-green); color: white;
          padding-left: 35px;
        }

        /* Typography and UI Elements */
        .category-tag-anim {
          background: var(--brand-light); color: var(--brand-green);
          padding: 8px 20px; border-radius: 50px;
          font-size: 0.85rem; font-weight: 800;
          letter-spacing: 1px;
          border: 1px solid #d1e2dd;
        }

        .main-heading { color: var(--brand-green); }

        /* Decorative line under heading */
        .heading-line {
          width: 60px; height: 4px;
          background: var(--brand-green);
          border-radius: 10px;
        }

        .loc-icon { color: var(--brand-green); }

        /* Heart Icon Circle Styling */
        .heart-circle {
          width: 42px; height: 42px; background: #f9fbfb;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%; color: #ccd6d4; 
          cursor: pointer; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid #edf2f1;
        }

        /* Heart hover effect */
        .heart-circle:hover { 
          background: #fff1f0; 
          color: var(--soft-red); 
          transform: scale(1.15) rotate(15deg);
          border-color: #ffccc7;
          box-shadow: 0 5px 15px rgba(255, 77, 79, 0.15);
        }

        /* Active/Favorite State - when heart is selected */
        .heart-circle.favorite-active {
          background: #fff1f0;
          color: var(--soft-red);
          border-color: #ff4d4f;
        }

        /* Remove rotation on hover when already active */
        .heart-circle.favorite-active:hover {
          transform: scale(1.15) rotate(0deg);
        }

        /* Favorites Bar - shows total count */
        .favorites-bar {
          background: var(--brand-light);
          border: 1px solid #d1e2dd;
          color: var(--brand-green);
          font-weight: 600;
          max-width: 400px;
          margin: 0 auto;
          box-shadow: 0 5px 15px rgba(26, 60, 52, 0.1);
        }

        /* No data fallback styling */
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