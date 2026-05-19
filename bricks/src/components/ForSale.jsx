import React from 'react';
import { Link } from 'react-router-dom';

function ForSale() {
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
      "&:hover": {
        transform: "translateY(-5px)",
      }
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
    }
  };

  const properties = [
    {
      id: 1,
      title: "Modern Villa",
      price: "$850,000",
      location: "Beverly Hills, CA",
      beds: 4,
      baths: 3,
      sqft: "2,500",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop",
      alt: "Modern luxury villa with swimming pool"
    },
    {
      id: 2,
      title: "Downtown Condo",
      price: "$450,000",
      location: "Los Angeles, CA",
      beds: 2,
      baths: 2,
      sqft: "1,200",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
      alt: "Modern downtown apartment with city view"
    },
    {
      id: 3,
      title: "Family Home",
      price: "$620,000",
      location: "San Francisco, CA",
      beds: 3,
      baths: 2.5,
      sqft: "1,800",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop",
      alt: "Beautiful family home with garden"
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Properties For Sale</h1>
        <p style={styles.subtitle}>Discover amazing homes available for purchase</p>
      </div>
      
      <div style={styles.grid}>
        {properties.map(property => (
          <div key={property.id} style={styles.card}>
            <img 
              src={property.image} 
              alt={property.alt}
              style={styles.cardImage}
            />
            <div style={styles.cardContent}>
              <h3 style={styles.propertyTitle}>{property.title}</h3>
              <div style={styles.propertyPrice}>{property.price}</div>
              <div style={styles.propertyLocation}>{property.location}</div>
              <div style={styles.propertyDetails}>
                <span>{property.beds} beds</span>
                <span>{property.baths} baths</span>
                <span>{property.sqft} sqft</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{textAlign: "center"}}>
        <Link to="/">
          <button style={styles.backButton}>Back to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default ForSale;