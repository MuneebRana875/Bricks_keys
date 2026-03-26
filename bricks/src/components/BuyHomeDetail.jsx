import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaDollarSign, FaHome } from 'react-icons/fa';

const BuyHomeDetail = () => {
  const navigate = useNavigate();
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="py-5 bg-white min-vh-100">
      <div className="container">
        {/* Navigation */}
        <button 
          onClick={() => navigate(-1)} 
          className="btn border-0 fw-bold mb-4 d-flex align-items-center gap-2 transition-all"
          style={{ color: '#1A432F' }}
        >
          <span style={{ fontSize: '20px' }}>←</span> Back to Search
        </button>

        <div className="row g-5 align-items-center">
          {/* Left Side: Content */}
          <div className="col-lg-6">
            <span className="badge px-3 py-2 rounded-pill mb-3" style={{ background: '#E8F3EE', color: '#1A432F' }}>
              BUY A HOME
            </span>
            <h1 className="display-4 fw-bold mb-4" style={{ color: '#1A1A1A', lineHeight: '1.2' }}>
              Find a place where <br /> <span style={{ color: '#1A432F' }}>life begins.</span>
            </h1>
            <p className="text-muted lead mb-5" style={{ maxWidth: '500px' }}>
              We offer the most complete database of homes for sale, including many properties you won't find anywhere else.
            </p>

            <div className="row g-4">
              {[
                { icon: <FaHome />, title: "350+ Listings", desc: "Updated daily" },
                { icon: <FaSearch />, title: "Smart Filters", desc: "Find exactly what you need" }
              ].map((item, index) => (
                <div className="col-sm-6" key={index}>
                  <div className="p-4 rounded-4 border-0 shadow-sm bg-light h-100">
                    <div className="mb-3 fs-3" style={{ color: '#1A432F' }}>{item.icon}</div>
                    <h6 className="fw-bold">{item.title}</h6>
                    <p className="small text-muted mb-0">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Search Form */}
          <div className="col-lg-5 offset-lg-1">
            <div className="card border-0 shadow-lg p-4 p-md-5 rounded-5" style={{ background: '#fff' }}>
              <h3 className="fw-bold mb-4 text-center">Customize Your Search</h3>
              
              <div className="mb-4">
                <label className="form-label small fw-bold text-uppercase">Location</label>
                <div className="input-group bg-light rounded-3 p-1">
                  <span className="input-group-text border-0 bg-transparent text-muted"><FaMapMarkerAlt /></span>
                  <input type="text" className="form-control border-0 bg-transparent py-3" placeholder="Enter city or area" />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-uppercase">Property Type</label>
                <select className="form-select border-0 bg-light py-3 rounded-3 shadow-none">
                  <option>Select Type</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Townhouse</option>
                </select>
              </div>

              <div className="mb-5">
                <label className="form-label small fw-bold text-uppercase">Max Budget</label>
                <div className="input-group bg-light rounded-3 p-1">
                  <span className="input-group-text border-0 bg-transparent text-muted"><FaDollarSign /></span>
                  <input type="number" className="form-control border-0 bg-transparent py-3" placeholder="e.g. 500,000" />
                </div>
              </div>

              <button className="btn w-100 py-3 rounded-3 fw-bold text-white shadow" style={{ background: '#1A432F' }}>
                Search Properties
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyHomeDetail;