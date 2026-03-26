import React from "react";
// Maan lijiye aapki image ka naam 'house-bg.png' hai aur wo src folder mein hai
import houseBg from "../assets/images/div.elementor-element.png"; 

function HeroSection() {
  const styles = {
    section: {
      paddingTop: "80px",
      minHeight: "90vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#ffffff",
      // Background Image Settings
      backgroundImage: `url(${houseBg})`,
      backgroundPosition: "bottom center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain", // Isse image poori width par adjust ho jayegi
    },
    guideBtn: {
      backgroundColor: "transparent",
      border: "1px solid #777777",
      color: "#777777",
      fontSize: "10px",
      letterSpacing: "1px",
      padding: "8px 20px",
      marginBottom: "20px",
      textTransform: "uppercase",
    },
    subtitle: {
      color: "#777777",
      fontSize: "14px",
      marginBottom: "10px",
    },
    title: {
      color: "#2C4B40", 
      fontSize: "48px",
      fontWeight: "700",
      marginBottom: "30px",
    },
    searchContainer: {
      maxWidth: "600px",
      width: "100%",
      position: "relative",
      marginBottom: "40px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      borderRadius: "50px",
      zIndex: 2, // Taake search box image ke upar rahe
    },
    searchInput: {
      padding: "15px 65px 15px 25px",
      border: "1px solid #D4DCE0",
      borderRadius: "50px",
      fontSize: "16px",
      color: "#2C4B40",
      width: "100%",
      outline: "none",
      backgroundColor: "#ffffff",
    },
    searchIconBtn: {
      position: "absolute",
      right: "6px",
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: "#E6BA5F", 
      border: "none",
      borderRadius: "50%",
      width: "44px",
      height: "44px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      cursor: "pointer",
    },
    exploreText: {
      color: "#2C4B40",
      fontSize: "14px",
      fontWeight: "600",
      marginBottom: "20px",
    },
    filterBtn: {
      backgroundColor: "#ffffff", // White background taake image ke upar clear dikhe
      border: "1px solid #D4DCE0",
      color: "#777777",
      padding: "8px 22px",
      fontSize: "13px",
      cursor: "pointer",
    },
    filterBtnActive: {
      borderColor: "#E6BA5F", 
      color: "#2C4B40",
    }
  };

  return (
    <section style={styles.section}>
      <div className="container text-center" style={{ zIndex: 1 }}>
        
        <button style={styles.guideBtn} className="rounded-pill">
          LET US GUIDE YOUR HOME
        </button>

        <p style={styles.subtitle}>
          We've more than 745,000 apartments, place & plot.
        </p>

        <h1 style={styles.title}>
          Find Your Perfect Home
        </h1>

        <div style={styles.searchContainer} className="mx-auto">
          <input
            type="text"
            style={styles.searchInput}
            placeholder="Enter Name, Keywords..."
          />
          <button style={styles.searchIconBtn}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </div>

        <p style={styles.exploreText}>
          Explore all things property
        </p>

        <div className="d-flex justify-content-center gap-3">
          <button style={{...styles.filterBtn, ...styles.filterBtnActive}} className="rounded-pill">
            All Properties
          </button>
          <button style={styles.filterBtn} className="rounded-pill">
            For Sale
          </button>
          <button style={styles.filterBtn} className="rounded-pill">
            For Rent
          </button>
        </div>

      </div>
    </section>
  );
}

export default HeroSection;