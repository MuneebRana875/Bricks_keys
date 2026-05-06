import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CityDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [cityData, setCityData] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) fetchCityProperties();
  }, [slug]);

  const fetchCityProperties = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://bricks-keys.vercel.app/admin/cities/${slug}/properties`);
      setProperties(response.data.properties);
      if (response.data.properties.length > 0) {
        setCityData({ name: response.data.properties[0].city_name, slug });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load city properties');
    } finally {
      setLoading(false);
    }
  };

  const cityBanners = {
    'new-york': "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1200",
    'san-diego': "https://images.unsplash.com/photo-1513366408769-f1d9b0dc9aa0?q=80&w=1200",
    'arizona': "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200",
    'miami': "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?q=80&w=1200",
    'los-angeles': "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200",
    'hawaii': "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200",
    'florida': "https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=1200",
    'chicago': "https://images.unsplash.com/photo-1494522324078-65176ac99495?q=80&w=1200",
    'washington': "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=1200"
  };

  if (loading) return <div className="container py-5 text-center"><p>Loading...</p></div>;
  if (!cityData) return (
    <div className="container py-5 mt-5 text-center">
      <h2 style={{ color: "#1b4332" }}>City Not Found</h2>
      <Link to="/" className="btn btn-success mt-3">Go Back Home</Link>
    </div>
  );

  return (
    <div style={{ backgroundColor: "#f8faf9", minHeight: "100vh" }}>
      <div style={{ height: "400px", backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${cityBanners[slug]})`, backgroundSize: "cover", backgroundPosition: "center", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", textAlign: "center" }}>
        <div className="container"><h1 className="display-3 fw-bold">{cityData.name}</h1></div>
      </div>
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold" style={{ color: "#1b4332" }}>Listings in {cityData.name} ({properties.length})</h3>
          <Link to="/" className="btn btn-outline-success px-4 rounded-pill">Back Home</Link>
        </div>
        {properties.length === 0 ? <div className="text-center py-5"><p>No properties found.</p></div> : (
          <div className="row g-4">
            {properties.map((property) => (
              <div key={property.id} className="col-12 col-md-6 col-lg-3">
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                  <img src={property.image_url || 'https://via.placeholder.com/600x400'} alt={property.title} style={{ height: "200px", objectFit: "cover", cursor: "pointer" }} onClick={() => navigate(`/property/${property.id}`)} />
                  <div className="card-body">
                    <h6 className="fw-bold mb-2" style={{ color: "#1b4332" }}>{property.title}</h6>
                    <div className="d-flex gap-2 mb-2 text-muted small"><span>{property.bedrooms || 0} beds</span><span>•</span><span>{property.bathrooms || 0} baths</span></div>
                    <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                      <span className="fw-bold text-success">{property.price}</span>
                      <button onClick={() => navigate(`/property/${property.id}`)} className="btn btn-success btn-sm px-3 rounded-pill" style={{ backgroundColor: "#2d6a4f" }}>View Details</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CityDetailPage;