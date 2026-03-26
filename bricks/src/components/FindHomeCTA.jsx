import React from "react";
import { FaArrowRight } from "react-icons/fa";

// Images Import (Aapne jo export ki hain)
import home1 from "../assets/images/h47.png.png"; 
import home2 from "../assets/images/h48.png.png";

const FindHomeCTA = () => {
  return (
    <section style={{ padding: "80px 0", background: "#fdf7f5" }}>
      <div className="container">
        <div className="row g-4">

          {/* Card 1: Looking for new home */}
          <div className="col-lg-6">
            <div
              style={{
                background: "#F2F2F2", // Light Grey Background
                padding: "40px",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "100%",
                overflow: "hidden"
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

                <button
                  style={{
                    background: "#1A432F", // Aapka theme color
                    color: "#fff",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontWeight: "600",
                    transition: "0.3s"
                  }}
                >
                  Get Started <FaArrowRight size={14} />
                </button>
              </div>

              {/* Illustration 1 */}
              <img
                src={home1}
                alt="Find Home"
                style={{ 
                  width: "180px", 
                  height: "auto", 
                  objectFit: "contain",
                  marginBottom: "-20px" // Slight offset for design
                }}
              />
            </div>
          </div>

          {/* Card 2: Want to sell home */}
          <div className="col-lg-6">
            <div
              style={{
                background: "#F2E7E3", // Peach/Light Brown Background
                padding: "40px",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "100%",
                overflow: "hidden"
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

                <button
                  style={{
                    background: "#1A432F",
                    color: "#fff",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontWeight: "600"
                  }}
                >
                  Get Started <FaArrowRight size={14} />
                </button>
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