import React, { useState } from 'react';
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Cameron Williamson",
      role: "Designer",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "Searches for multiplexes, property comparisons, and the loan estimator. Works great. Lorem ipsum dolor sit amet.",
      rating: 5
    },
    {
      id: 2,
      name: "Arlene McCoy",
      role: "Marketing Specialist",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "The user interface is very intuitive. I found exactly what I was looking for within minutes. Highly recommended!",
      rating: 4
    },
    {
      id: 3,
      name: "Dianne Russell",
      role: "Real Estate Agent",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      text: "As an agent, this platform has made my workflow 2x faster. The filter options are precise and the data is up to date.",
      rating: 3
    },
    {
      id: 4,
      name: "Albert Flores",
      role: "Home Owner",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      text: "I sold my house within a week of listing it here. The process was seamless and the support team was very helpful.",
      rating: 5 
    },
    {
      id: 5,
      name: "Kathryn Murphy",
      role: "Architect",
      image: "https://randomuser.me/api/portraits/women/89.jpg",
      text: "The technical details provided for each property are very helpful for my research. Best real estate platform.",
      rating: 4
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const { name, role, image, text, rating } = testimonials[currentIndex];

  const renderStars = (count) => {
    return [...Array(5)].map((_, index) => (
      <FaStar 
        key={index} 
        style={{ color: index < count ? '#E4C371' : 'rgba(255,255,255,0.2)' }} 
      />
    ));
  };

  return (
    <section className="py-5" style={{ backgroundColor: '#1A432F', color: '#fff', minHeight: '550px', display: 'flex', alignItems: 'center' }}>
      <div className="container py-5">
        <div className="row align-items-center">
          
          <div className="col-lg-5 mb-5 mb-lg-0">
            <h2 className="fw-bold mb-4" style={{ fontSize: '2.5rem', lineHeight: '1.2' }}>
              What our customers are saying us?
            </h2>
            <p className="mb-5" style={{ color: '#A0B3A9', fontSize: '15px', maxWidth: '400px' }}>
              Various versions have evolved over the years, sometimes by accident.
            </p>
            
            <div className="d-flex gap-5">
              <div>
                <h3 className="fw-bold mb-1">10m+</h3>
                <p style={{ color: '#A0B3A9', fontSize: '14px' }}>Happy People</p>
              </div>
              <div>
                <h3 className="fw-bold mb-1">{rating}.0</h3>
                <p className="mb-1" style={{ color: '#A0B3A9', fontSize: '14px' }}>Customer rating</p>
                <div style={{ fontSize: '12px' }}>
                  {renderStars(rating)}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 offset-lg-1">
            <div className="position-relative">
              
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center gap-3">
                  <img src={image} alt={name} style={{ width: '65px', height: '65px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <h5 className="mb-0 fw-bold">{name}</h5>
                    <p className="mb-0" style={{ color: '#A0B3A9', fontSize: '14px' }}>{role}</p>
                    <div style={{ fontSize: '10px', marginTop: '4px' }}>
                       {renderStars(rating)}
                    </div>
                  </div>
                </div>
                <FaQuoteRight style={{ color: '#E4C371', fontSize: '2rem', opacity: '0.8' }} />
              </div>

              <p className="mb-5" style={{ fontSize: '18px', lineHeight: '1.8', color: '#E0EAE5', minHeight: '130px' }}>
                "{text}"
              </p>

              <div className="d-flex gap-3">
                <button onClick={prevTestimonial} className="btn border border-white border-opacity-25 text-white rounded-circle" style={{ width: '45px', height: '45px' }}>
                  <FaChevronLeft size={14} />
                </button>
                <button onClick={nextTestimonial} className="btn border border-white border-opacity-25 text-white rounded-circle" style={{ width: '45px', height: '45px' }}>
                  <FaChevronRight size={14} />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;