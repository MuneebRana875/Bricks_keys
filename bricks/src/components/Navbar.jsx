import React, { useState } from "react";
import { FaPhoneAlt, FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import RegistrationForm from "./registrationForm";

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      textDecoration: "none",
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
      textDecoration: "none",
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
      display: "block",
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
      cursor: "pointer"
    }
  };

  const renderDropdown = (title, items) => (
    <li className="nav-item dropdown custom-dropdown">
      <Link className="nav-link dropdown-toggle" to="#" style={styles.navLink}>
        {title}
      </Link>
      <ul className="dropdown-menu shadow-sm" style={styles.dropdownMenu}>
        {items.map((item, index) => (
          <li key={index}>
            <Link className="dropdown-item custom-item" to={item.path} style={styles.dropdownItem}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );

  return (
    <>
      <style>
        {`
          @media (min-width: 992px) {
            .custom-dropdown:hover > .nav-link {
              color: #2C4B40 !important; 
              opacity: 0.7;
            }
            .custom-dropdown:hover > .dropdown-menu {
              display: block;
              animation: fadeInUp 0.3s ease;
            }
          }
          .custom-item:hover {
            background-color: #2C4B40 !important;
            color: #ffffff !important;
          }
          .contact-link:hover {
            opacity: 0.7;
            transition: 0.3s;
          }
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

      <nav className="navbar navbar-expand-lg" style={styles.navbar}>
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/" style={styles.brand}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 21h18M3 7l9-4 9 4v14H3V7z" /><path d="M9 21V9h6v12" />
            </svg>
            Bricks&Keys
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center" id="navbarMenu">
            <ul className="navbar-nav gap-3">
              <li className="nav-item">
                <Link to="/" className="nav-link" style={styles.navLink}>
                  Home
                </Link>
              </li>
              
              {renderDropdown("Listings", [
                { name: "Grid Layout", path: "/listings/grid" },
                { name: "List Layout", path: "/listings/list" },
                { name: "Map View", path: "/listings/map" }
              ])}
              
              {renderDropdown("Blog", [
                { name: "About Us", path: "/about" },
                { name: "FAQ", path: "/faq" }
              ])}
              
              <li className="nav-item">
                <Link to="/contact" className="nav-link contact-link" style={styles.navLink}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center gap-4 ms-auto">
            <div className="d-none d-lg-flex align-items-center gap-2" style={{color: "#2C4B40", fontWeight: "600"}}>
              <FaPhoneAlt size={14} />
              <span>+923286561587</span>
            </div>

            <div style={styles.userIconCircle} onClick={() => setIsModalOpen(true)}>
              <FaRegUser size={18} />
            </div>

            <Link to="/add-property">
              <button className="btn rounded-pill custom-btn-outline" style={{border: "1px solid #2C4B40", color: "#2C4B40", padding: "8px 22px", fontWeight: "500"}}>
                Add Property
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <RegistrationForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default Navbar;