import React from 'react';
import { useNavigate } from 'react-router-dom';

function MapView() {
  const navigate = useNavigate();

  const styles = {
    container: {
      paddingTop: "100px",
      minHeight: "100vh",
      backgroundColor: "#f8f9fa",
    },
    header: {
      textAlign: "center",
      marginBottom: "40px",
    },
    title: {
      color: "#2C4B40",
      fontSize: "36px",
      fontWeight: "700",
      marginBottom: "15px",
    },
    subtitle: {
      color: "#777777",
      fontSize: "16px",
      marginBottom: "30px",
    },
    mapContainer: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#ffffff",
      borderRadius: "20px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      textAlign: "center",
    },
    mapPlaceholder: {
      backgroundColor: "#e0e0e0",
      height: "500px",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "20px",
    },
    backButton: {
      backgroundColor: "transparent",
      color: "#2C4B40",
      border: "1px solid #2C4B40",
      padding: "10px 25px",
      borderRadius: "50px",
      cursor: "pointer",
      fontSize: "14px",
      marginTop: "30px",
      marginBottom: "30px",
      textAlign: "center",
      display: "inline-block",
      transition: "all 0.3s ease",
      fontWeight: "600",
    }
  };

  return (
    <div style={styles.container}>
      <div className="container">
        <button 
          style={styles.backButton}
          onClick={() => navigate('/')}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#2C4B40";
            e.target.style.color = "white";
            e.target.style.paddingLeft = "35px";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#2C4B40";
            e.target.style.paddingLeft = "25px";
          }}
        >
          ← Back to Home
        </button>

        <div style={styles.header}>
          <span className="category-tag">Map View</span>
          <h1 style={styles.title}>Properties Map View</h1>
          <div className="heading-line"></div>
          <p style={styles.subtitle}>Find properties in your desired location</p>
        </div>
        
        <div style={styles.mapContainer}>
          <div style={styles.mapPlaceholder}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#2C4B40" strokeWidth="1.5">
              <path d="M21 10.5c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <p style={{color: "#2C4B40", fontSize: "18px"}}>Interactive Map Coming Soon!</p>
            <p style={{color: "#777777"}}>We're working on adding an interactive map feature</p>
          </div>
        </div>
      </div>

      <style>{`
        .category-tag { background: #f1f8f6; color: #2C4B40; padding: 8px 20px; border-radius: 50px; font-size: 0.85rem; font-weight: 800; letter-spacing: 1px; border: 1px solid #d1e2dd; display: inline-block; margin-bottom: 15px; }
        .heading-line { width: 60px; height: 4px; background: #2C4B40; border-radius: 10px; margin: 15px auto 0; }
      `}</style>
    </div>
  );
}

export default MapView;