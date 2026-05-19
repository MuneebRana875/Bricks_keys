import React from 'react';
import { Link } from 'react-router-dom';

function ForRent() {
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

  const rentals = [
    {
      id: 1,
      title: "Luxury Apartment",
      price: "$2,500/month",
      location: "Manhattan, NY",
      beds: 2,
      baths: 2,
      sqft: "1,100",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
      alt: "Luxury apartment with modern interior"
    },
    {
      id: 2,
      title: "Beachfront Studio",
      price: "$1,800/month",
      location: "Miami, FL",
      beds: 1,
      baths: 1,
      sqft: "750",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
      alt: "Beautiful beachfront property with ocean view"
    },
    {
      id: 3,
      title: "Suburban House",
      price: "$3,200/month",
      location: "Austin, TX",
      beds: 3,
      baths: 2,
      sqft: "2,000",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop",
      alt: "Spacious suburban house with garden"
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Properties For Rent</h1>
        <p style={styles.subtitle}>Find your perfect rental home today</p>
      </div>
      
      <div style={styles.grid}>
        {rentals.map(property => (
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

export default ForRent;