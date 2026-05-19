import React from "react";
import { useNavigate } from "react-router-dom";

// Images Import
import nyImg from "../assets/images/div.location-banner (5).png"; 
import sdImg from "../assets/images/div.location-banner (1).png";
import azImg from "../assets/images/div.location-banner (2).png";
import miImg from "../assets/images/div.location-banner (3).png";
import laImg from "../assets/images/h45.jpg.png"; 
import hwImg from "../assets/images/div.location-banner (4).png";
import flImg from "../assets/images/div.location-banner.png"; 
import chImg from "../assets/images/h48.jpg.png";
import waImg from "../assets/images/h410.jpg.png";

const PropertiesByArea = () => {
  const navigate = useNavigate();

  const areas = [
    { id: 1, name: "New York", count: "8 Properties", img: nyImg, slug: "new-york" },
    { id: 2, name: "San Diego", count: "0 Properties", img: sdImg, slug: "san-diego" },
    { id: 3, name: "Arizona", count: "0 Properties", img: azImg, slug: "arizona" },
    { id: 4, name: "Miami", count: "2 Properties", img: miImg, slug: "miami" },
    { id: 5, name: "Los Angeles", count: "1 Property", img: laImg, slug: "los-angeles" },
    { id: 6, name: "Hawaii", count: "0 Properties", img: hwImg, slug: "hawaii" },
    { id: 7, name: "Florida", count: "3 Properties", img: flImg, slug: "florida" },
    { id: 8, name: "Chicago", count: "2 Properties", img: chImg, slug: "chicago" },
    { id: 9, name: "Washington", count: "0 Properties", img: waImg, slug: "washington" },
  ];

  return (
    <section className="py-5" style={{ backgroundColor: "#f8faf9" }}>
      <div className="container">
        {/* Section Heading */}
        <div className="text-center mb-5">
          <h2 className="fw-bold" style={{ color: "#1b4332", fontSize: "2.8rem" }}>
            Properties by Area
          </h2>
          <div 
            style={{ 
                width: "80px", 
                height: "4px", 
                backgroundColor: "#2d6a4f", 
                margin: "15px auto",
                borderRadius: "10px"
            }} 
          ></div>
          <p className="text-muted">Find your dream home in these top locations</p>
        </div>

        {/* Areas Grid */}
        <div className="row g-4">
          {areas.map((area) => (
            <div key={area.id} className="col-12 col-md-6 col-lg-4">
              <div 
                onClick={() => navigate(`/properties/${area.slug}`)}
                className="area-card d-flex align-items-center p-3 shadow-sm" 
                style={{ 
                  cursor: "pointer", 
                  transition: "all 0.3s ease",
                  backgroundColor: "#ffffff",
                  borderRadius: "20px",
                  border: "1px solid #e0e0e0"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.borderColor = "#2d6a4f";
                  e.currentTarget.style.boxShadow = "0 10px 20px rgba(45, 106, 79, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "#e0e0e0";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Square Image with Green Border Effect on Hover */}
                <div 
                  style={{ 
                    width: "90px", 
                    height: "90px", 
                    borderRadius: "15px", 
                    overflow: "hidden",
                    flexShrink: 0,
                    border: "2px solid transparent"
                  }}
                >
                  <img 
                    src={area.img} 
                    alt={area.name} 
                    className="w-100 h-100" 
                    style={{ objectFit: "cover" }} 
                  />
                </div>

                {/* Text Content */}
                <div className="ms-4">
                  <h5 className="mb-1 fw-bold" style={{ color: "#1b4332" }}>
                    {area.name}
                  </h5>
                  <p className="mb-0 fw-semibold" style={{ fontSize: "14px", color: "#52b788" }}>
                    {area.count}
                  </p>
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
