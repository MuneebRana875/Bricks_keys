import React, { useEffect } from 'react';
import { FaShieldAlt, FaHandshake, FaUserTie, FaGlobe } from 'react-icons/fa';

const AboutDetails = () => {
  // Page load hote hi top par scroll karne ke liye
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const details = [
    {
      title: "Verified Listings",
      desc: "Every property on our platform goes through a multi-step verification process to ensure zero fraud.",
      icon: <FaShieldAlt />
    },
    {
      title: "Expert Agents",
      desc: "Our agents are trained professionals with deep knowledge of the local real estate market.",
      icon: <FaUserTie />
    },
    {
      title: "Transparent Deals",
      desc: "We believe in clear communication. No hidden charges or surprise legal issues.",
      icon: <FaHandshake />
    },
    {
      title: "Wide Coverage",
      desc: "From urban apartments to rural farmhouses, we cover every corner of the city.",
      icon: <FaGlobe />
    }
  ];

  return (
    <div className="py-5" style={{ backgroundColor: '#FDF7F5', minHeight: '100vh' }}>
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold" style={{ color: '#1A432F' }}>Why Choose Our Services?</h1>
          <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
            We are dedicated to providing the best real estate experience in Pakistan. 
            Our mission is to help you find a place you can truly call home.
          </p>
        </div>

        <div className="row g-4">
          {details.map((item, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="p-4 bg-white h-100 shadow-sm text-center" style={{ borderRadius: '15px' }}>
                <div className="mb-3" style={{ fontSize: '2.5rem', color: '#E4C371' }}>
                  {item.icon}
                </div>
                <h5 className="fw-bold" style={{ color: '#1A432F' }}>{item.title}</h5>
                <p className="small text-muted mb-0">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutDetails;