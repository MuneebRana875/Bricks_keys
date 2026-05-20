import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const PropertyDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://bricks-keys.vercel.app/api/properties/detail/${slug}`);
        setProperty(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching property details:", error);
        setLoading(false);
      }
    };

    fetchPropertyData();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container text-center py-5" style={{ marginTop: "100px" }}>
        <h3>Property not found</h3>
        <button onClick={() => navigate(-1)} className="btn btn-success mt-3">Go Back</button>
      </div>
    );
  }

  return (
    <div className="property-detail-page" style={{ paddingTop: "100px", backgroundColor: "#f8f9fa", paddingBottom: "50px" }}>
      <div className="container">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-success">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/all-properties" className="text-decoration-none text-success">Properties</Link></li>
            <li className="breadcrumb-item active">{property.title}</li>
          </ol>
        </nav>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="position-relative rounded-4 overflow-hidden shadow-lg mb-4">
              <img 
                src={property.image_url || property.image} 
                alt={property.title} 
                className="w-100"
                style={{ height: "500px", objectFit: "cover" }}
              />
              <div className="position-absolute top-0 start-0 m-3">
                <span className="badge bg-success px-4 py-2 fs-6 rounded-pill shadow">
                  {property.type || "For Sale"}
                </span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-4 shadow-sm mb-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h1 className="fw-bold mb-2" style={{ color: "#1b4332" }}>{property.title}</h1>
                  <p className="text-muted fs-5">
                    <i className="bi bi-geo-alt-fill me-2 text-success"></i>{property.location}
                  </p>
                </div>
                <div className="text-end">
                  <h2 className="fw-bold text-success">{property.price}</h2>
                  <p className="text-secondary small">PKR {property.price_numeric || "Negotiable"}</p>
                </div>
              </div>
              <div className="row mt-4 py-3 border-top border-bottom g-3 text-center">
                <div className="col-4">
                  <i className="bi bi-door-open fs-3 text-success d-block mb-1"></i>
                  <span className="fw-bold">{property.bedrooms} Bedrooms</span>
                </div>
                <div className="col-4">
                  <i className="bi bi-droplet fs-3 text-success d-block mb-1"></i>
                  <span className="fw-bold">{property.bathrooms} Bathrooms</span>
                </div>
                <div className="col-4">
                  <i className="bi bi-aspect-ratio fs-3 text-success d-block mb-1"></i>
                  <span className="fw-bold">{property.area_size}</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-4 shadow-sm mb-4">
              <h4 className="fw-bold mb-3" style={{ color: "#1b4332" }}>Description</h4>
              <p style={{ lineHeight: "1.8", color: "#444", whiteSpace: "pre-line" }}>
                {property.description}
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="bg-white p-4 rounded-4 shadow-sm mb-4 sticky-top" style={{ top: "110px", zIndex: 10 }}>
              <h4 className="fw-bold mb-4" style={{ color: "#1b4332" }}>Interested?</h4>
              <div className="d-grid gap-3">
                <a href={`tel:${property.agent_phone || "0000000000"}`} className="btn btn-success py-3 fw-bold rounded-pill shadow-sm">
                  <i className="bi bi-telephone-fill me-2"></i> Call Agent
                </a>
                <a href={`https://wa.me/${property.agent_whatsapp || ""}`} target="_blank" rel="noreferrer" className="btn btn-outline-success py-3 fw-bold rounded-pill border-2">
                  <i className="bi bi-whatsapp me-2"></i> WhatsApp Message
                </a>
              </div>
              <div className="mt-4 pt-3 border-top">
                <div className="d-flex align-items-center">
                  <div className="bg-light rounded-circle p-3 me-3">
                    <i className="bi bi-person-badge fs-3 text-success"></i>
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold">{property.agent_name || "Authorized Dealer"}</h6>
                    <small className="text-muted">Verified Property Consultant</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-4 shadow-sm">
              <h5 className="fw-bold mb-3" style={{ color: "#1b4332" }}>Location on Map</h5>
              <div className="bg-light rounded-3 d-flex align-items-center justify-content-center" style={{ height: "200px" }}>
                <div className="text-center">
                  <i className="bi bi-map-fill display-5 text-muted mb-2"></i>
                  <p className="small text-muted">{property.address || "Area Map Loading..."}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;