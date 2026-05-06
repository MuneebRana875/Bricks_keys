import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function AllProperties() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllProperties();
  }, []);

  const fetchAllProperties = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://bricks-keys.vercel.app/admin/properties');
      setProperties(response.data.properties);
      console.log('Properties loaded:', response.data.properties.length);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

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
    },
    cardImage: {
      width: "100%",
      height: "250px",
      objectFit: "cover",
    },
    cardContent: {
      padding: "20px",
    },
    propertyTitle: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#2C4B40",
      marginBottom: "10px",
    },
    propertyPrice: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#E6BA5F",
      marginBottom: "10px",
    },
    propertyLocation: {
      color: "#777777",
      fontSize: "14px",
      marginBottom: "15px",
    },
    propertyDetails: {
      display: "flex",
      gap: "15px",
      fontSize: "14px",
      color: "#777777",
    },
    propertyType: {
      display: "inline-block",
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600",
    },
    typeForSale: {
      backgroundColor: "#e6f4e6",
      color: "#2d6a4f",
    },
    typeForRent: {
      backgroundColor: "#fde6e6",
      color: "#c41e1e",
    },
    backButton: {
      backgroundColor: "#E6BA5F",
      color: "#ffffff",
      border: "none",
      padding: "10px 25px",
      borderRadius: "25px",
      cursor: "pointer",
      fontSize: "14px",
      marginTop: "30px",
      textAlign: "center",
      display: "inline-block",
    },
    loading: {
      textAlign: "center",
      padding: "50px",
      fontSize: "18px",
      color: "#777",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>All Properties</h1>
        <p style={styles.subtitle}>Browse our complete collection of properties</p>
      </div>

      {loading ? (
        <div style={styles.loading}>Loading properties...</div>
      ) : (
        <div style={styles.grid}>
          {properties.map(property => (
            <div
              key={property.id}
              style={styles.card}
              onClick={() => navigate(`/property/${property.id}`)}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <img
                src={property.image_url || 'https://via.placeholder.com/600x400'}
                alt={property.title}
                style={styles.cardImage}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400'; }}
              />
              <div style={styles.cardContent}>
                <h3 style={styles.propertyTitle}>{property.title}</h3>
                <div style={styles.propertyPrice}>{property.price}</div>
                <div style={styles.propertyLocation}>
                  <i className="bi bi-geo-alt-fill" style={{ marginRight: "5px", color: "#E6BA5F" }}></i>
                  {property.city_name || property.location || 'Location not specified'}
                </div>
                <div style={styles.propertyDetails}>
                  <span>{property.bedrooms || 0} beds</span>
                  <span>{property.bathrooms || 0} baths</span>
                  <span>{property.area || 'N/A'} sqft</span>
                  <span style={{
                    ...styles.propertyType,
                    ...(property.property_type === 'For Sale' ? styles.typeForSale : styles.typeForRent)
                  }}>
                    {property.property_type || 'For Sale'}
                  </span>
                </div>
                {property.category && (
                  <div style={{ marginTop: "10px", fontSize: "12px", color: "#999" }}>
                    <i className="bi bi-tag"></i> {property.category}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && properties.length === 0 && (
        <div style={{ textAlign: "center", padding: "50px", color: "#777" }}>
          <p>No properties found.</p>
        </div>
      )}

      <div style={{ textAlign: "center" }}>
        <Link to="/">
          <button style={styles.backButton}>Back to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default AllProperties;