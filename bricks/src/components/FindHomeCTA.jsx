import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom"; 

// Images Import
import home1 from "../assets/images/h47.png.png"; 

const FindHomeCTA = () => {
  return (
    <section style={{ padding: "80px 0", background: "#fdf7f5" }}>
      <div className="container">
        <div className="row justify-content-center">

          {/* Card 1: Looking for new home */}
          <div className="col-lg-10">
            <div
              style={{
                background: "#F2F2F2", 
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

                <Link
                  to="/get-started"
                  className="text-decoration-none"
                  style={{
                    background: "#1A432F", 
                    color: "#fff",
                    padding: "12px 24px",
                    borderRadius: "10px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    fontWeight: "600",
                    transition: "0.3s",
                    border: "none"
                  }}
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

        </div>
      </div>
    </section>
  );
};

export default FindHomeCTA;