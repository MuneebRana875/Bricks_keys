import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHome, FaBuilding, FaBriefcase, FaUsers } from 'react-icons/fa';

const FeaturedCategories = () => {
  const navigate = useNavigate();
  const [categoryCounts, setCategoryCounts] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetchCategoryCounts();
  }, []);

  const fetchCategoryCounts = async () => {
    try {
      const response = await axios.get('https://bricks-keys.vercel.app/admin/properties');
      const props = response.data.properties;
      const counts = {
        'Modern Villa': props.filter(p => p.category === 'Modern Villa').length,
        'Apartments': props.filter(p => p.category === 'Apartments').length,
        'Office Space': props.filter(p => p.category === 'Office Space').length,
        'Townhouse': props.filter(p => p.category === 'Townhouse').length
      };
      setCategoryCounts(counts);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const categories = [
    { id: 1, name: 'Modern Villa', icon: <FaHome />, path: '/category/villas' },
    { id: 2, name: 'Apartment', icon: <FaBuilding />, path: '/category/apartments' },
    { id: 3, name: 'Office Space', icon: <FaBriefcase />, path: '/category/offices' },
    { id: 4, name: 'Townhouse', icon: <FaUsers />, path: '/category/townhouses' },
  ];

  const handleSelectCategory = (index, path) => {
    setActiveIndex(index);
    setTimeout(() => navigate(path), 300);
  };

  return (
    <section className="py-5" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="container text-center">
        <div className="mb-5">
          <h2 className="fw-bold" style={{ color: '#111', fontSize: '2.2rem' }}>Featured Categories</h2>
          <p className="text-muted">Find your perfect home based on your preferred property type.</p>
        </div>
        <div className="row g-4 mt-2">
          {categories.map((item, index) => (
            <div key={item.id} className="col-6 col-md-3">
              <div onClick={() => handleSelectCategory(index, item.path)} className="d-flex align-items-center p-3" style={{ cursor: 'pointer', border: index === activeIndex ? '2px solid #1A1A1A' : '1px solid #E5E7EB', borderRadius: '12px', backgroundColor: '#fff', minHeight: '80px', transform: index === activeIndex ? 'translateY(-5px)' : 'translateY(0)', transition: 'all 0.3s ease-in-out', boxShadow: index === activeIndex ? '0 10px 15px rgba(0,0,0,0.1)' : 'none' }}>
                <div style={{ color: index === activeIndex ? '#1A1A1A' : '#9CA3AF', fontSize: '24px', transition: '0.3s' }} className="me-3">{item.icon}</div>
                <div className="text-start">
                  <div style={{ color: '#111', fontSize: '16px', fontWeight: '600' }}>{item.name}</div>
                  <div style={{ color: '#6B7280', fontSize: '13px' }}>{categoryCounts[item.name] || 0} Properties</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;