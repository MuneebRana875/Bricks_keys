import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PropertiesByArea = () => {
  const navigate = useNavigate();
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://bricks-keys.vercel.app/api/properties/areas')
      .then(res => {
        setAreas(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching areas:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-5" style={{ backgroundColor: "#fdfdfd" }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold" style={{ color: "#1b4332", fontSize: "32px" }}>
            Find Properties in These Cities
          </h2>
          <p className="text-muted">Explore our listings by location</p>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {areas.map((area) => (
              <div key={area.id || area.slug} className="col-lg-4 col-md-6">
                <div
                  onClick={() => navigate(`/city/${area.slug}`)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "20px",
                    backgroundColor: "#fff",
                    borderRadius: "20px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    border: "1px solid #e0e0e0",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.borderColor = "#2d6a4f";
                    e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "#e0e0e0";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      width: "90px",
                      height: "90px",
                      borderRadius: "15px",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={area.img || area.image_url || "https://via.placeholder.com/90"}
                      alt={area.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div className="ms-4">
                    <h5 className="mb-1 fw-bold" style={{ color: "#1b4332" }}>
                      {area.name}
                    </h5>
                    <p className="mb-0 fw-semibold" style={{ fontSize: "14px", color: "#52b788" }}>
                      {area.count} {parseInt(area.count) === 1 ? 'Property' : 'Properties'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesByArea;