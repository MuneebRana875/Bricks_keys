import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AllProperties() {
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        // API se sab properties fetch karna
        const res = await axios.get('https://bricks-keys.vercel.app/api/properties');
        setAllProperties(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching all properties:", error);
        setLoading(false);
      }
    };

    fetchAllProperties();
    window.scrollTo(0, 0); // Page ke start par scroll karne ke liye
  }, []);

  const styles = {
    container: {
      paddingTop: "100px",
      minHeight: "100vh",
      backgroundColor: "#f8f9fa",
      paddingBottom: "50px"
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
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "30px",
      padding: "0 20px",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    card: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      transition: "transform 0.3s ease",
      cursor: "pointer",
      textDecoration: "none",
      color: "inherit",
      display: "block"
    },
    cardImage: {
      width: "100%",
      height: "220px",
      objectFit: "cover",
    },
    cardContent: {
      padding: "20px",
    },
    propertyTitle: {
      fontSize: "19px",
      fontWeight: "600",
      color: "#2C4B40",
      marginBottom: "8px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    },
    propertyPrice: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#E6BA5F",
      marginBottom: "8px",
    },
    propertyLocation: {
      color: "#666",
      fontSize: "14px",
      marginBottom: "15px",
    },
    propertyDetails: {
      display: "flex",
      justifyContent: "space-between",
      paddingTop: "15px",
      borderTop: "1px solid #eee",
      fontSize: "13px",
      color: "#888",
    },
    badge: {
      position: "absolute",
      top: "10px",
      right: "10px",
      backgroundColor: "#2C4B40",
      color: "white",
      padding: "5px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600"
    }
  };

  if (loading) {
    return (
      <div style={{ ...styles.container, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>All Properties</h1>
        <p style={styles.subtitle}>Browse our complete collection of properties</p>
      </div>
      
      {allProperties.length > 0 ? (
        <div style={styles.grid}>
          {allProperties.map(property => (
            <Link 
              key={property.id} 
              to={`/properties/detail/${property.slug || property.id}`} 
              style={styles.card}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-8px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div className="position-relative">
                <img 
                  src={property.image_url || property.image} 
                  alt={property.title}
                  style={styles.cardImage}
                />
                <span style={styles.badge}>{property.type}</span>
              </div>
              <div style={styles.cardContent}>
                <h3 style={styles.propertyTitle}>{property.title}</h3>
                <div style={styles.propertyPrice}>{property.price}</div>
                <div style={styles.propertyLocation}>
                  <i className="bi bi-geo-alt me-1"></i>{property.location}
                </div>
                <div style={styles.propertyDetails}>
                  <span><i className="bi bi-door-open me-1"></i>{property.bedrooms} Beds</span>
                  <span><i className="bi bi-droplet me-1"></i>{property.bathrooms} Baths</span>
                  <span><i className="bi bi-aspect-ratio me-1"></i>{property.area_size}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h3 className="text-muted">No properties found.</h3>
          <Link to="/" className="btn btn-success mt-3">Back to Home</Link>
        </div>
      )}
      
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Link to="/" style={{ color: "#2C4B40", fontWeight: "600", textDecoration: "none", borderBottom: "2px solid #E6BA5F" }}>
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default AllProperties;