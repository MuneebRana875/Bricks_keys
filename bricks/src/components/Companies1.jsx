import React from "react";
import ama from "../assets/images/ama.png";
import spotify from "../assets/images/spotify.png";
import amd from "../assets/images/amd.png";
import logi from "../assets/images/logi.png";
import cisco from "../assets/images/cisco.png";
import drop from "../assets/images/drop.png";

function Companies1() {
  const companyLogos = [
    { src: ama, alt: "Amazon" },
    { src: amd, alt: "AMD" },
    { src: cisco, alt: "Cisco" },
    { src: drop, alt: "Dropbox" },
    { src: logi, alt: "Logitech" },
    { src: spotify, alt: "Spotify" },
  ];

  return (
    // Background White kar diya hai
    <div className="TrustedCompnaies-div py-5" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        {/* Heading Text ko Dark Grey/Black kar diya hai */}
        <p className="text-center mb-5" style={{ color: '#666666', fontSize: '16px', fontWeight: '400' }}>
          Thousands of world's leading companies trust Space
        </p>

        {/* Logos Grid */}
        <div className="row justify-content-center align-items-center g-4">
          {companyLogos.map((logo, index) => (
            <div key={index} className="col-4 col-md-2 text-center">
              <img 
                src={logo.src} 
                alt={logo.alt}
                className="img-fluid" 
                style={{ 
                  maxHeight: '30px', 
                  // Filter ko remove ya change kiya taake logos black/original dikhein
                  filter: 'grayscale(100%) brightness(0)', 
                }} 
               
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Companies1;