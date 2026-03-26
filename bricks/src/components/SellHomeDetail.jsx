import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SellHomeDetail = () => {
  const navigate = useNavigate();
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="py-5" style={{ background: '#FDF7F5' }}>
      <div className="container">
        <button onClick={() => navigate(-1)} className="btn btn-outline-dark mb-4 px-4">← Back</button>
        <div className="row align-items-center">
          <div className="col-md-6 order-md-2">
            <h1 className="fw-bold display-5 mb-4" style={{ color: '#1A3C34' }}>Sell Your Property Fast</h1>
            <p className="text-muted">We use AI-driven valuation tools to ensure you get the maximum market price for your home. Join thousands of happy sellers.</p>
            <div className="card border-0 shadow-sm p-3 mt-4">
              <h5 className="fw-bold">Why sell with us?</h5>
              <p className="small mb-0">Direct access to 50k+ potential buyers and professional photography for your listing.</p>
            </div>
          </div>
          <div className="col-md-6 order-md-1 p-5 rounded-4 bg-white shadow">
            <h4>List Your Property</h4>
            <input type="text" className="form-control mb-3" placeholder="Property Type (e.g. Villa)" />
            <input type="number" className="form-control mb-3" placeholder="Expected Price" />
            <textarea className="form-control mb-3" placeholder="Short Description"></textarea>
            <button className="btn w-100 py-3 text-white" style={{ background: '#1A3C34' }}>Get Free Valuation</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SellHomeDetail;