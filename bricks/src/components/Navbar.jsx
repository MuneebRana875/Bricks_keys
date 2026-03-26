import React, { useState } from "react";
import { FaPhoneAlt, FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for navigation without page reload
import RegistrationForm from "./registrationForm";

function Navbar() {
  // State to control the registration modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Inline Styles ---
  const styles = {
    navbar: {
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #f0f0f0",
      padding: "15px 0",
    },
    brand: {
      color: "#2C4B40",
      fontSize: "22px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      textDecoration: "none", // Remove underline from brand link
    },
    navLink: {
      color: "#2C4B40",
      fontWeight: "500",
      fontSize: "15px",
      display: "flex",
      alignItems: "center",
      gap: "4px",
      padding: "10px 15px",
      transition: "0.3s",
      textDecoration: "none", // Remove underline from navigation links
    },
    dropdownMenu: {
      border: "none",
      boxShadow: "0px 8px 24px rgba(0,0,0,0.12)",
      borderRadius: "12px",
      padding: "10px",
      marginTop: "0", 
    },
    dropdownItem: {
      color: "#2C4B40",
      padding: "8px 15px",
      fontSize: "14px",
      borderRadius: "6px",
      transition: "0.2s",
      textDecoration: "none",
    },
    userIconCircle: {
      width: "38px",
      height: "38px",
      borderRadius: "50%",
      border: "1px solid #D4DCE0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#2C4B40",
      cursor: "pointer" // Show hand cursor on hover
    }
  };

  /**
   * Helper function to render dropdown menus
   * @param {string} title - The title of the dropdown
   * @param {Array} items - Array of menu items to display in dropdown
   */
  const renderDropdown = (title, items) => (
    <li className="nav-item dropdown custom-dropdown">
      <a className="nav-link dropdown-toggle" href="#" style={styles.navLink}>
        {title}
      </a>
      <ul className="dropdown-menu shadow-sm" style={styles.dropdownMenu}>
        {items.map((item, index) => (
          <li key={index}>
            <a className="dropdown-item custom-item" href="#" style={styles.dropdownItem}>{item}</a>
          </li>
        ))}
      </ul>
    </li>
  );

  return (
    <>
      {/* Custom CSS for hover effects and animations */}
      <style>
        {`
          @media (min-width: 992px) {
            /* Navbar Link Hover - Green Color with opacity change */
            .custom-dropdown:hover > .nav-link {
              color: #2C4B40 !important; 
              opacity: 0.7;
            }
            
            /* Show Dropdown on Hover with fade-in animation */
            .custom-dropdown:hover > .dropdown-menu {
              display: block;
              animation: fadeInUp 0.3s ease;
            }
          }

          /* Dropdown Item Hover Effect - Green background with white text */
          .custom-item:hover {
            background-color: #2C4B40 !important;
            color: #ffffff !important;
          }

          /* Contact Link Hover Effect */
          .contact-link:hover {
            opacity: 0.7;
            transition: 0.3s;
          }

          /* Fade-in animation for dropdown menus */
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      {/* Main Navigation Bar */}
      <nav className="navbar navbar-expand-lg" style={styles.navbar}>
        <div className="container">
          {/* Brand/Logo - Links to home page */}
          <Link className="navbar-brand fw-bold" to="/" style={styles.brand}>
            {/* House icon SVG */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 21h18M3 7l9-4 9 4v14H3V7z" /><path d="M9 21V9h6v12" />
            </svg>
            Bricks&Keys
          </Link>

          {/* Navigation Menu - Collapsible on mobile */}
          <div className="collapse navbar-collapse justify-content-center" id="navbarMenu">
            <ul className="navbar-nav gap-3">
            <li className="nav-item ">
                <Link 
                  to="/" 
                  className="nav-link" 
                  style={styles.navLink}
                >
                  Home
                </Link>
              </li>
              {/* Dropdown menus */}
              
              {renderDropdown("Listings", ["Grid Layout", "List Layout", "Map View"])}
              {renderDropdown("Blog", ["About Us", "FAQ"])}
              
              {/* Contact Link - Uses React Router Link for navigation */}
              <li className="nav-item">
                <Link 
                  to="/contact" 
                  className="nav-link contact-link" 
                  style={styles.navLink}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Right side elements - Phone, User icon, Add Property button */}
          <div className="d-flex align-items-center gap-4 ms-auto">
            {/* Phone number - Visible only on desktop */}
            <div className="d-none d-lg-flex align-items-center gap-2" style={{color: "#2C4B40", fontWeight: "600"}}>
              <FaPhoneAlt size={14} />
              <span>+923286561587</span>
            </div>

            {/* User icon - Opens registration modal on click */}
            <div style={styles.userIconCircle} onClick={() => setIsModalOpen(true)} className="custom-btn-outline">
              <FaRegUser size={18} />
            </div>

            {/* Add Property button */}
            <button className="btn rounded-pill  custom-btn-outline" style={{border: "1px solid #2C4B40", color: "#2C4B40", padding: "8px 22px", fontWeight: "500"}}>
              Add Property
            </button>
          </div>
        </div>
      </nav>

      {/* Registration Modal Component */}
      <RegistrationForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default Navbar;