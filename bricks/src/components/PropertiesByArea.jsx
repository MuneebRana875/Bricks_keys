import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const PropertiesByArea = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get('https://bricks-keys.vercel.app/admin/cities');
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
      toast.error('Failed to load cities');
    } finally {
      setLoading(false);
    }
  };

  const cityImages = {
    'New York': "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop",
    'San Diego': "https://images.unsplash.com/photo-1513366408769-f1d9b0dc9aa0?w=400&h=300&fit=crop",
    'Arizona': "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop",
    'Miami': "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=400&h=300&fit=crop",
    'Los Angeles': "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=400&h=300&fit=crop",
    'Hawaii': "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
    'Florida': "https://images.unsplash.com/photo-1506466010722-395aa2bef877?w=400&h=300&fit=crop",
    'Chicago': "https://images.unsplash.com/photo-1494522324078-65176ac99495?w=400&h=300&fit=crop",
    'Washington': "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400&h=300&fit=crop"
  };

  if (loading) {
    return (
      <section className="py-5" style={{ backgroundColor: "#f8faf9" }}>
        <div className="container text-center"><p>Loading cities...</p></div>
      </section>
    );
  }

  return (
    <section className="py-5" style={{ backgroundColor: "#f8faf9" }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold" style={{ color: "#1b4332", fontSize: "2.8rem" }}>Properties by Area</h2>
          <div style={{ width: "80px", height: "4px", backgroundColor: "#2d6a4f", margin: "15px auto", borderRadius: "10px" }}></div>
          <p className="text-muted">Find your dream home in these top locations</p>
        </div>

        <div className="row g-4">
          {cities.map((city) => (
            <div key={city.id} className="col-12 col-md-6 col-lg-4">
              <div onClick={() => navigate(`/properties/${city.city_slug}`)} className="area-card d-flex align-items-center p-3 shadow-sm"
                style={{ cursor: "pointer", transition: "all 0.3s ease", backgroundColor: "#ffffff", borderRadius: "20px", border: "1px solid #e0e0e0" }}>
                <div style={{ width: "90px", height: "90px", borderRadius: "15px", overflow: "hidden", flexShrink: 0 }}>
                  <img src={cityImages[city.city_name]} alt={city.city_name} className="w-100 h-100" style={{ objectFit: "cover" }} />
                </div>
                <div className="ms-4">
                  <h5 className="mb-1 fw-bold" style={{ color: "#1b4332" }}>{city.city_name}</h5>
                  <p className="mb-0 fw-semibold" style={{ fontSize: "14px", color: "#52b788" }}>{city.property_count} Properties</p>
                </div>
              </div>
            </div>
          ))}
        </div> 
      </div>
    </section>
  );
};

export default PropertiesByArea;