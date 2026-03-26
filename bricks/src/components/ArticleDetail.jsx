import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Images Import
import img1 from '../assets/images/343.png';
import img2 from '../assets/images/347.png';
import img3 from '../assets/images/351.png';
import img4 from '../assets/images/317.png';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      image: img1,
      category: 'Apartment',
      date: 'March 19, 2024',
      title: 'Housing Markets That Changed the Most This Week',
      intro: 'The global real estate landscape is shifting rapidly due to interest rate adjustments and urban migration.',
      content: `This week, several key housing markets have seen unprecedented activity. Cities that were previously overlooked are now becoming hotspots for first-time homebuyers. Economic experts suggest that the rise in remote work is continuing to drive people away from dense city centers toward more spacious suburban apartments.

      We have analyzed data from over 50 regions to identify where prices are cooling down and where competition remains fierce. For investors, this means a shift in strategy—focusing on long-term rental yields rather than quick flips.`,
      highlights: ['Interest rate impact on monthly mortgages', 'Emerging suburban hotspots', 'Inventory levels reaching a 3-year high']
    },
    {
      id: 2,
      image: img2,
      category: 'Apartment',
      date: 'March 19, 2024',
      title: 'Read Unveils the Best Canadian Cities for Biking',
      intro: 'Sustainable urban mobility is transforming how Canadians choose their next home.',
      content: `A new study has ranked Canadian cities based on their cycling infrastructure, safety, and trail connectivity. Vancouver and Montreal continue to lead the pack, but smaller cities like Victoria are quickly catching up. 

      Living in a "bikeable" neighborhood is no longer just a lifestyle choice—it's a significant factor in property valuation. Homes located within 500 meters of a major bike path have shown a 12% higher resale value compared to those reliant solely on car transport. This article dives deep into the urban planning projects making these cities more accessible.`,
      highlights: ['Top 5 bike-friendly cities in 2024', 'Correlation between bike paths and property value', 'Future urban planning investments']
    },
    {
      id: 3,
      image: img3,
      category: 'Office',
      date: 'March 19, 2024',
      title: '10 Walkable Cities Where You Can Live Affordably',
      intro: 'Finding a balance between a car-free lifestyle and a reasonable budget is finally possible.',
      content: `Walkability is often associated with high-end European capitals or expensive coastal hubs. However, our latest research identifies ten hidden gems where you can run all your errands on foot without paying a premium.

      These cities offer robust public transit, dense commercial zones mixed with residential units, and plenty of green space. We explore how these "15-minute cities" are structured and why they are becoming the top choice for retirees and young professionals alike who want to reduce their carbon footprint and living expenses.`,
      highlights: ['Low-cost walkable neighborhoods', 'Public transit efficiency ratings', 'Cost of living vs. Walk Score']
    },
    {
      id: 4,
      image: img4,
      category: 'Shop',
      date: 'March 19, 2024',
      title: 'New Apartment Nice in the Best Canadian Cities',
      intro: 'Modern architecture meets comfort in the latest wave of Canadian residential developments.',
      content: `The newest apartment complexes in Canada are redefining luxury. It’s no longer just about square footage; it's about the "experience." From rooftop co-working spaces to automated grocery delivery docks, these buildings are designed for the modern lifestyle.

      This review covers the most aesthetically pleasing and functional developments in Toronto, Calgary, and Ottawa. We look at the materials used, the energy-efficient technologies implemented, and the community-focused amenities that set these apartments apart from traditional high-rises.`,
      highlights: ['Smart home integration features', 'Sustainable building materials', 'Community amenity trends']
    },
  ];

  const article = articles.find((a) => a.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) return <div className="container py-5 text-center"><h3>Loading Article...</h3></div>;

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <button className="btn btn-outline-secondary mb-4 rounded-pill" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left me-2"></i>Back to News
        </button>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white p-4 p-md-5">
              
              <span className="text-success fw-bold text-uppercase mb-2 d-block" style={{ letterSpacing: '1px', fontSize: '14px' }}>
                {article.category}
              </span>
              
              <h1 className="fw-bold mb-3" style={{ color: '#1A1A1A', fontSize: '2.8rem' }}>{article.title}</h1>
              
              <div className="d-flex align-items-center gap-2 mb-4 text-muted">
                <span>By RealEstate Insights</span>
                <span>•</span>
                <span>{article.date}</span>
              </div>

              <img src={article.image} alt={article.title} className="w-100 rounded-4 mb-5" style={{ height: '400px', objectFit: 'cover' }} />

              <div className="article-body" style={{ color: '#444', lineHeight: '1.9', fontSize: '1.15rem' }}>
                <p className="fw-bold text-dark mb-4">{article.intro}</p>
                <p style={{ whiteSpace: 'pre-line' }}>{article.content}</p>

                <div className="bg-light p-4 rounded-4 my-5">
                  <h4 className="fw-bold mb-3 text-dark">Key Highlights:</h4>
                  <ul className="mb-0">
                    {article.highlights.map((item, idx) => (
                      <li key={idx} className="mb-2">{item}</li>
                    ))}
                  </ul>
                </div>

                <p>Stay tuned for more updates as we continue to track these developments across the country. Our team of experts is dedicated to bringing you the most accurate real estate data.</p>
              </div>
              
              <hr className="my-5" />
              <div className="d-flex justify-content-between align-items-center">
                <div className="fw-bold">Share this article:</div>
                <div className="d-flex gap-3 fs-5 text-success">
                   <i className="bi bi-facebook cursor-pointer"></i>
                   <i className="bi bi-twitter cursor-pointer"></i>
                   <i className="bi bi-link-45deg cursor-pointer"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;