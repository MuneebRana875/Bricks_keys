import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://bricks-keys.vercel.app/admin/properties/${id}`);
      setProperty(response.data);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load property');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container py-5 text-center"><p>Loading...</p></div>;
  if (!property) return (
    <div className="container py-5 mt-5 text-center">
      <h2>Property Not Found</h2>
      <button onClick={() => navigate('/')} className="btn btn-success mt-3">Go Back Home</button>
    </div>
  );

  return (
    <div style={{ backgroundColor: "#f8faf9", minHeight: "100vh" }}>
      <div style={{ height: "500px", backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${property.image_url || 'https://via.placeholder.com/1200x500'})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container h-100 d-flex align-items-end pb-5">
          <div className="text-white">
            <button onClick={() => navigate(-1)} className="text-white bg-transparent border-0 mb-3" style={{ fontSize: "1.1rem", cursor: "pointer" }}>← Back</button>
            <h1 className="display-4 fw-bold">{property.title}</h1>
            <p className="fs-5">{property.address || property.location}</p>
          </div>
        </div>
      </div>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <div className="bg-white p-4 rounded-4 shadow-sm mb-4">
              <h3 className="fw-bold mb-4">Property Overview</h3>
              <div className="row g-4">
                <div className="col-6 col-md-3"><div className="text-center p-3 bg-light rounded-3"><i className="bi bi-house-door fs-4"></i><p className="mb-0 mt-2 small">Bedrooms</p><p className="fw-bold mb-0">{property.bedrooms || 0}</p></div></div>
                <div className="col-6 col-md-3"><div className="text-center p-3 bg-light rounded-3"><i className="bi bi-droplet fs-4"></i><p className="mb-0 mt-2 small">Bathrooms</p><p className="fw-bold mb-0">{property.bathrooms || 0}</p></div></div>
                <div className="col-6 col-md-3"><div className="text-center p-3 bg-light rounded-3"><i className="bi bi-arrows-angle-expand fs-4"></i><p className="mb-0 mt-2 small">Area</p><p className="fw-bold mb-0">{property.area || 'N/A'}</p></div></div>
                <div className="col-6 col-md-3"><div className="text-center p-3 bg-light rounded-3"><i className="bi bi-calendar fs-4"></i><p className="mb-0 mt-2 small">Year Built</p><p className="fw-bold mb-0">{property.year_built || 'N/A'}</p></div></div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-4 shadow-sm mb-4">
              <h3 className="fw-bold mb-3">Description</h3>
              <p className="text-muted">{property.description || 'No description available.'}</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="bg-white p-4 rounded-4 shadow-sm mb-4">
              <h2 className="fw-bold text-success mb-3">{property.price}</h2>
              <button className="btn w-100 py-3 mb-3 text-white fw-bold" style={{ backgroundColor: "#2d6a4f", borderRadius: "50px" }}><i className="bi bi-calendar-check me-2"></i>Schedule a Tour</button>
              <Link to="/contact" className="btn w-100 py-3 text-success fw-bold text-decoration-none d-block text-center" style={{ backgroundColor: "transparent", border: "2px solid #2d6a4f", borderRadius: "50px" }}><i className="bi bi-envelope me-2"></i>Contact Agent</Link>
            </div>
            <div className="bg-white p-4 rounded-4 shadow-sm">
              <h4 className="fw-bold mb-3">Location</h4>
              <p><i className="bi bi-geo-alt-fill me-2"></i>{property.address || property.location || 'Address not specified'}</p>
              <p><i className="bi bi-building me-2"></i>{property.city_name || 'City not specified'}</p>
              {property.category && <p><i className="bi bi-tag me-2"></i>Category: {property.category}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;