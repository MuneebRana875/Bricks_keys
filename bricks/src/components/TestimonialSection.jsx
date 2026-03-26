import React from 'react';
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';
import avatarImg from '../assets/images/div.avarta.png'; // Aapki export ki hui image ka path

const TestimonialSection = () => {
  return (
    <section className="py-5" style={{ backgroundColor: '#1A432F', color: '#fff', minHeight: '500px', display: 'flex', alignItems: 'center' }}>
      <div className="container py-5">
        <div className="row align-items-center">
          
          {/* Left Side: Stats and Heading */}
          <div className="col-lg-5 mb-5 mb-lg-0">
            <h2 className="fw-bold mb-4" style={{ fontSize: '2.5rem', lineHeight: '1.2' }}>
              What our customers are saying us?
            </h2>
            <p className="mb-5" style={{ color: '#A0B3A9', fontSize: '15px', maxWidth: '400px' }}>
              Various versions have evolved over the years, sometimes by accident, sometimes on purpose injected humour and the like.
            </p>
            
            <div className="d-flex gap-5">
              <div>
                <h3 className="fw-bold mb-1">10m+</h3>
                <p style={{ color: '#A0B3A9', fontSize: '14px' }}>Happy People</p>
              </div>
              <div>
                <h3 className="fw-bold mb-1">4.88</h3>
                <p className="mb-1" style={{ color: '#A0B3A9', fontSize: '14px' }}>Overall rating</p>
                <div style={{ color: '#E4C371', fontSize: '12px' }}>
                  <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Testimonial Card */}
          <div className="col-lg-6 offset-lg-1">
            <div className="position-relative">
              
              {/* Profile Header */}
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center gap-3">
                  <img 
                    src={avatarImg} 
                    alt="User" 
                    style={{ width: '65px', height: '65px', borderRadius: '50%', objectFit: 'cover' }} 
                  />
                  <div>
                    <h5 className="mb-0 fw-bold">Cameron Williamson</h5>
                    <p className="mb-0" style={{ color: '#A0B3A9', fontSize: '14px' }}>Designer</p>
                  </div>
                </div>
                {/* Quote Icon */}
                <FaQuoteRight style={{ color: '#E4C371', fontSize: '2rem', opacity: '0.8' }} />
              </div>

              {/* Testimonial Text */}
              <p className="mb-5" style={{ fontSize: '18px', lineHeight: '1.8', color: '#E0EAE5' }}>
                Searches for multiplexes, property comparisons, and the loan estimator. 
                Works great. Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolores.
              </p>

              {/* Navigation Buttons */}
              <div className="d-flex gap-3">
                <button 
                  className="btn d-flex align-items-center justify-content-center rounded-circle"
                  style={{ 
                    width: '45px', 
                    height: '45px', 
                    border: '1px solid rgba(255,255,255,0.2)', 
                    color: '#fff',
                    backgroundColor: 'transparent'
                  }}
                >
                  <FaChevronLeft size={14} />
                </button>
                <button 
                  className="btn d-flex align-items-center justify-content-center rounded-circle"
                  style={{ 
                    width: '45px', 
                    height: '45px', 
                    border: '1px solid rgba(255,255,255,0.2)', 
                    color: '#fff',
                    backgroundColor: 'transparent'
                  }}
                >
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