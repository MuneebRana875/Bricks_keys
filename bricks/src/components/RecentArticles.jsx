import React from 'react';
import { Link } from 'react-router-dom'; 

// Images Import
import img1 from '../assets/images/343.png';
import img2 from '../assets/images/347.png';
import img3 from '../assets/images/351.png';
import img4 from '../assets/images/317.png';

const RecentArticles = () => {
  const articles = [
    {
      id: 1,
      image: img1,
      category: 'Apartment',
      date: 'March 19, 2024',
      title: 'Housing Markets That Changed the Most This Week',
    },
    {
      id: 2,
      image: img2,
      category: 'Apartment',
      date: 'March 19, 2024',
      title: 'Read Unveils the Best Canadian Cities for Biking',
    },
    {
      id: 3,
      image: img3,
      category: 'Office',
      date: 'March 19, 2024',
      title: '10 Walkable Cities Where You Can Live Affordably',
    },
    {
      id: 4,
      image: img4,
      category: 'Shop',
      date: 'March 19, 2024',
      title: 'New Apartment Nice in the Best Canadian Cities',
    },
  ];

  return (
    <section className="py-5 bg-white">
      <div className="container">
      
        <div className="text-center mb-5">
          <h2 className="fw-bold" style={{ color: '#1A1A1A', fontSize: '2.5rem' }}>
            Recent Articles & News
          </h2>
          <p className="text-muted">
            Stay updated with the latest trends and news in the real estate world.
          </p>
        </div>

      
        <div className="row g-4">
          {articles.map((article) => (
            <div key={article.id} className="col-12 col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-100 h-100"
                    style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>

                {/* Card Content */}
                <div className="card-body p-4 text-start">
                  <div className="d-flex align-items-center gap-2 mb-2" style={{ fontSize: '13px' }}>
                    <span className="text-muted fw-medium">{article.category}</span>
                    <span className="text-muted">•</span>
                    <span className="text-muted">{article.date}</span>
                  </div>
                  <h6 className="fw-bold mb-4" style={{ color: '#1A1A1A', lineHeight: '1.5', minHeight: '45px' }}>
                    {article.title}
                  </h6>
                  
                  
                  <Link
                    to={`/article/${article.id}`} 
                    className="text-decoration-none fw-bold"
                    style={{ color: '#1A1A1A', fontSize: '14px' }}
                  >
                    Read More <span className="ms-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentArticles;