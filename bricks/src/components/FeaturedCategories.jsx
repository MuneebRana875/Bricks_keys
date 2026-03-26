import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Required for navigation
import { FaHome, FaBuilding, FaBriefcase, FaUsers } from 'react-icons/fa';

const FeaturedCategories = () => {
  // Hook to handle programmatic navigation
  const navigate = useNavigate();
  
  // State to track which category is currently highlighted
  const [activeIndex, setActiveIndex] = useState(0);

  // Data Source: Paths updated to match the '/category/:categoryType' route in App.jsx
  const categories = [
    { id: 1, name: 'Modern Villa', count: '10 Properties', icon: <FaHome />, path: '/category/villas' },
    { id: 2, name: 'Apartment', count: '25 Properties', icon: <FaBuilding />, path: '/category/apartments' },
    { id: 3, name: 'Office Space', count: '12 Properties', icon: <FaBriefcase />, path: '/category/offices' },
    { id: 4, name: 'Townhouse', count: '8 Properties', icon: <FaUsers />, path: '/category/townhouses' },
  ];

  // Function to handle selection and redirection
  const handleSelectCategory = (index, path) => {
    setActiveIndex(index);
    
    // Smooth navigation with a slight delay for the scale animation
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  return (
    <section className="py-5" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="container text-center">
        {/* Header Section */}
        <div className="mb-5">
          <h2 className="fw-bold" style={{ color: '#111', fontSize: '2.2rem' }}>
            Featured Categories
          </h2>
          <p className="text-muted">Find your perfect home based on your preferred property type.</p>
        </div>

        {/* Categories Grid */}
        <div className="row g-4 mt-2">
          {categories.map((item, index) => (
            <div key={item.id} className="col-6 col-md-3">
              <div 
                className="d-flex align-items-center p-3"
                onClick={() => handleSelectCategory(index, item.path)}
                style={{
                  cursor: 'pointer',
                  border: index === activeIndex ? '2px solid #1A1A1A' : '1px solid #E5E7EB',
                  borderRadius: '12px',
                  backgroundColor: '#fff',
                  minHeight: '80px',
                  // Visual lift effect when active
                  transform: index === activeIndex ? 'translateY(-5px)' : 'translateY(0)',
                  transition: 'all 0.3s ease-in-out',
                  boxShadow: index === activeIndex ? '0 10px 15px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                {/* Icon Container */}
                <div 
                  style={{ 
                    color: index === activeIndex ? '#1A1A1A' : '#9CA3AF', 
                    fontSize: '24px', 
                    transition: '0.3s'
                  }} 
                  className="me-3"
                >
                  {item.icon}
                </div>

                {/* Text Content */}
                <div className="text-start">
                  <div style={{ color: '#111', fontSize: '16px', fontWeight: '600' }}>
                    {item.name}
                  </div>
                  <div style={{ color: '#6B7280', fontSize: '13px' }}>{item.count}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination/Indicator Dots */}
        <div className="mt-5 d-flex justify-content-center gap-2 align-items-center">
          {categories.map((_, index) => (
            <div 
              key={index} 
              onClick={() => setActiveIndex(index)} 
              style={{ cursor: 'pointer', padding: '5px' }}
            >
              <div style={{ 
                width: index === activeIndex ? '10px' : '8px', 
                height: index === activeIndex ? '10px' : '8px', 
                backgroundColor: index === activeIndex ? '#1A1A1A' : '#D1D5DB', 
                borderRadius: '50%',
                transition: '0.3s'
              }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;