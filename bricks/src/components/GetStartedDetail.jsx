import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaHome, FaTags, FaUserShield } from 'react-icons/fa';

const GetStartedDetail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="py-5 bg-white min-vh-100">
      <div className="container">
        {/* Navigation */}
        <button 
          onClick={() => navigate(-1)} 
          className="btn btn-outline-dark rounded-pill px-4 mb-5"
        >
          ← Back
        </button>

        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <h1 className="display-4 fw-bold mb-4" style={{ color: '#1A3C34' }}>
              Your Journey to a Perfect Home Starts Here
            </h1>
            <p className="lead text-muted mb-5">
              Whether you are looking to buy your dream residence or sell your current property, 
              we provide the tools and expertise to make the process seamless.
            </p>

            {/* Features List */}
            <div className="features-grid">
              <div className="d-flex gap-3 mb-4">
                <FaHome size={40} className="text-success p-2 bg-light rounded" />
                <div>
                  <h5 className="fw-bold">Exclusive Listings</h5>
                  <p className="text-muted">Access to over 350+ premium properties not found anywhere else.</p>
                </div>
              </div>

              <div className="d-flex gap-3 mb-4">
                <FaTags size={40} className="text-success p-2 bg-light rounded" />
                <div>
                  <h5 className="fw-bold">Best Market Rates</h5>
                  <p className="text-muted">We ensure you get the most competitive prices, whether buying or selling.</p>
                </div>
              </div>

              <div className="d-flex gap-3 mb-4">
                <FaUserShield size={40} className="text-success p-2 bg-light rounded" />
                <div>
                  <h5 className="fw-bold">Trusted Security</h5>
                  <p className="text-muted">A community of thousands trusts our verified agents and secure process.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="p-5 rounded-5 shadow-lg" style={{ background: '#F2E7E3' }}>
              <h3 className="fw-bold mb-4 text-center">Ready to Move Forward?</h3>
              <form>
                <div className="mb-3">
                  <label className="form-label fw-bold">I am looking to:</label>
                  <select className="form-select p-3 border-0 rounded-3">
                    <option>Buy a New Home</option>
                    <option>Sell My Property</option>
                    <option>Invest in Real Estate</option>
                  </select>
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control p-3 border-0 rounded-3" placeholder="Full Name" />
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control p-3 border-0 rounded-3" placeholder="Email Address" />
                </div>
                <button 
                  type="button" 
                  className="btn w-100 p-3 mt-3 fw-bold text-white rounded-3"
                  style={{ background: '#1A3C34' }}
                >
                  Schedule a Consultation
                </button>
              </form>
              <p className="text-center mt-4 text-muted small">
                <FaCheckCircle className="text-success me-1" /> No hidden fees • Professional Agents
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStartedDetail;