import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom"; // Link import zaroori hai

// Images Import
import home1 from "../assets/images/h47.png.png"; 
import home2 from "../assets/images/h48.png.png";

const FindHomeCTA = () => {
  // Common Button Style taake code saaf rahe
  const buttonStyle = {
    background: "#1A432F", // Theme Green Color
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "10px",
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "600",
    textDecoration: "none", // Link ki underline khatam karne ke liye
    transition: "0.3s ease"
  };

  return (
    <section style={{ padding: "80px 0", background: "#fdf7f5" }}>
      <div className="container">
        <div className="row g-4">

          {/* Card 1: Looking for new home (Buying) */}
          <div className="col-lg-6">
            <div
              className="cta-card"
              style={{
                background: "#F2F2F2", // Light Grey Background
                padding: "40px",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "100%",
                overflow: "hidden",
                position: "relative"
              }}
            >
              <div style={{ flex: 1, zIndex: 1 }}>
                <h4 style={{ fontWeight: "700", marginBottom: "15px", color: "#1A1A1A" }}>
                  Looking for the <br /> new home?
                </h4>

                <p
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    lineHeight: "1.6",
                    marginBottom: "25px",
                    maxWidth: "250px"
                  }}
                >
                  10 new offers every day. 350 offers on site, trusted by
                  a community of thousands of users.
                </p>

                {/* Link to Buy Home Page */}
                <Link 
                  to="/buy-home" 
                  style={buttonStyle}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
                  onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Get Started <FaArrowRight size={14} />
                </Link>
              </div>

              {/* Illustration 1 */}
              <img
                src={home1}
                alt="Find Home"
                style={{ 
                  width: "180px", 
                  height: "auto", 
                  objectFit: "contain",
                  marginBottom: "-20px" 
                }}
              />
            </div>
          </div>

          {/* Card 2: Want to sell home (Selling) */}
          <div className="col-lg-6">
            <div
              className="cta-card"
              style={{
                background: "#F2E7E3", // Peach/Light Brown Background
                padding: "40px",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "100%",
                overflow: "hidden",
                position: "relative"
              }}
            >
              <div style={{ flex: 1, zIndex: 1 }}>
                <h4 style={{ fontWeight: "700", marginBottom: "15px", color: "#1A1A1A" }}>
                  Want to sell <br /> your home?
                </h4>

                <p
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    lineHeight: "1.6",
                    marginBottom: "25px",
                    maxWidth: "250px"
                  }}
                >
                  10 new offers every day. 350 offers on site, trusted by
                  a community of thousands of users.
                </p>

                {/* Link to Sell Home Page */}
                <Link 
                  to="/sell-home" 
                  style={buttonStyle}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
                  onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Get Started <FaArrowRight size={14} />
                </Link>
              </div>

              {/* Illustration 2 */}
              <img
                src={home2}
                alt="Sell Home"
                style={{ 
                  width: "180px", 
                  height: "auto", 
                  objectFit: "contain",
                  marginBottom: "-20px"
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FindHomeCTA;