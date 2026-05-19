import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaCheck, FaHome, FaArrowRight } from 'react-icons/fa';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { MdOutlineSecurity } from 'react-icons/md';

import familyImg from '../assets/images/324.png';
import houseImg from '../assets/images/326.png';

const WhyWorkWithUs = () => {
  const navigate = useNavigate(); // Hook initialize karein

  const features = [
    { id: 1, text: '100% Secure', icon: <MdOutlineSecurity /> },
    { id: 2, text: 'Wide Range of Properties', icon: <FaHome /> },
    { id: 3, text: 'Buy or Rent Homes', icon: <FaHome /> },
    { id: 4, text: 'Trusted by Thousands', icon: <HiOutlineUserGroup /> },
  ];

  const handleLearnMore = () => {
    navigate('/about-details'); // Naye page ka path
  };

  return (
    <section className="py-5" style={{ backgroundColor: '#FDF7F5', overflow: 'hidden' }}>
      <div className="container py-5">
        <div className="row align-items-center">
          
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="position-relative" style={{ height: '550px', width: '100%' }}>
              <div 
                className="position-absolute shadow-sm" 
                style={{ top: '34px', left: '20px', width: '260px', zIndex: 2, borderRadius: '25px', overflow: 'hidden' }}
              >
                <img src={familyImg} alt="Family" className="img-fluid" />
              </div>

              <div 
                className="position-absolute shadow-lg" 
                style={{ top: '160px', right: '5px', width: '300px', zIndex: 1, borderRadius: '25px', overflow: 'hidden' }}
              >
                <img src={houseImg} alt="Modern House" className="img-fluid" />
              </div>

              <div 
                className="position-absolute p-4 text-center shadow-sm"
                style={{ backgroundColor: '#E4C371', borderRadius: '20px', width: '180px', bottom: '60px', left: '100px', zIndex: 3 }}
              >
                <div className="bg-white d-inline-flex p-3 rounded-circle mb-2" style={{ color: '#1A432F', fontSize: '20px' }}>
                  <FaHome />
                </div>
                <h6 className="fw-bold mb-0" style={{ fontSize: '13px', color: '#1A1A1A' }}>Properties For Sell</h6>
                <p className="mb-0 fw-bold" style={{ fontSize: '18px' }}>14K</p>
              </div>
            </div>
          </div>

          <div className="col-lg-6 ps-lg-5">
            <h2 className="fw-bold mb-4" style={{ color: '#1A1A1A', fontSize: '2.8rem', lineHeight: '1.2' }}>
              Why You Should Work <br /> With Us
            </h2>
            <p className="text-muted mb-4" style={{ lineHeight: '1.8', fontSize: '16px' }}>
              Pellentesque egestas elementum egestas faucibus sem. Velit nunc egestas ut morbi. Leo diam idam.
            </p>

            <div className="row g-3 mb-5">
              {features.map((item) => (
                <div key={item.id} className="col-md-6 d-flex align-items-center gap-2">
                  <div className="d-flex align-items-center justify-content-center rounded-circle"
                    style={{ backgroundColor: '#fff', color: '#1A432F', width: '24px', height: '24px', fontSize: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                  >
                    <FaCheck />
                  </div>
                  <span style={{ fontSize: '15px', fontWeight: '500', color: '#333' }}>{item.text}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={handleLearnMore} // Click function
              className="btn d-inline-flex align-items-center gap-2 px-4 py-3"
              style={{ backgroundColor: '#1A432F', color: '#fff', borderRadius: '6px', fontWeight: '600', border: 'none' }}
            >
              Learn More <FaArrowRight size={14} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithUs;