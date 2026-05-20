import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaBuilding, FaBriefcase, FaUsers } from 'react-icons/fa';
import axios from 'axios';

const FeaturedCategories = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const [counts, setCounts] = useState({
    villas: 0,
    apartments: 0,
    offices: 0,
    townhouses: 0
  });
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await axios.get('https://bricks-keys.vercel.app/api/meta/counts');
        setCounts(res.data);
      } catch (error) {
        console.error("Error fetching category counts:", error);
      }
    };
    fetchCounts();
  }, []);

  const categories = [
    { id: 1, name: 'Modern Villa', count: `${counts.villas || 0} Properties`, icon: <FaHome />, path: '/category/villas' },
    { id: 2, name: 'Apartment', count: `${counts.apartments || 0} Properties`, icon: <FaBuilding />, path: '/category/apartments' },
    { id: 3, name: 'Office Space', count: `${counts.offices || 0} Properties`, icon: <FaBriefcase />, path: '/category/offices' },
    { id: 4, name: 'Townhouse', count: `${counts.townhouses || 0} Properties`, icon: <FaUsers />, path: '/category/townhouses' },
  ];

  const handleSelectCategory = (index, path) => {
    setActiveIndex(index);
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  return (
    <section className="py-5" style={{ backgroundColor: '#fff' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h6 className="text-success text-uppercase fw-bold mb-2" style={{ letterSpacing: '2px' }}>
            Browse Categories
          </h6>
          <h2 className="display-6 fw-bold" style={{ color: '#111' }}>Featured Property Types</h2>
        </div>

        <div className="row g-4 justify-content-center">
          {categories.map((item, index) => (
            <div key={item.id} className="col-6 col-md-3">
              <div 
                onClick={() => handleSelectCategory(index, item.path)}
                style={{
                  cursor: 'pointer',
                  padding: '30px 20px',
                  borderRadius: '24px',
                  backgroundColor: index === activeIndex ? '#f0fdf4' : '#f9fafb',
                  border: index === activeIndex ? '2px solid #16a34a' : '2px solid transparent',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: index === activeIndex ? 'scale(1.05)' : 'scale(1)',
                }}
                className="text-center h-100 shadow-sm"
              >
                <div 
                  style={{ 
                    color: index === activeIndex ? '#16a34a' : '#9ca3af', 
                    fontSize: '32px', 
                    marginBottom: '15px',
                    transition: '0.3s'
                  }}
                >
                  {item.icon}
                </div>

                <div>
                  <div style={{ color: '#111', fontSize: '18px', fontWeight: '700' }}>
                    {item.name}
                  </div>
                  <div style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>
                    {item.count}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 d-flex justify-content-center gap-2 align-items-center">
          {categories.map((_, index) => (
            <div 
              key={index} 
              onClick={() => setActiveIndex(index)} 
              style={{ 
                cursor: 'pointer',
                width: index === activeIndex ? '24px' : '8px', 
                height: '8px', 
                backgroundColor: index === activeIndex ? '#16a34a' : '#d1d5db', 
                borderRadius: '10px',
                transition: 'all 0.4s ease'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;