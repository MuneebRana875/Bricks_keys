import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function GridLayout() {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState({});

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
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            transition: "transform 0.5s ease, box-shadow 0.5s ease",
            cursor: "pointer",
            animation: "slideInUpBlur 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
        },
        imgWrapper: {
            overflow: "hidden",
            position: "relative",
        },
        cardImage: {
            width: "100%",
            height: "250px",
            objectFit: "cover",
            transition: "transform 1.2s ease",
        },
        priceOverlay: {
            position: "absolute",
            bottom: "15px",
            left: "15px",
            backgroundColor: "#2C4B40",
            color: "white",
            padding: "6px 18px",
            borderRadius: "50px",
            fontWeight: "700",
            fontSize: "0.85rem",
            zIndex: 5,
        },
        imgShine: {
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "50%",
            height: "100%",
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)",
            transform: "skewX(-25deg)",
            transition: "0.75s",
            pointerEvents: "none",
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
            marginBottom: "15px",
        },
        buttonContainer: {
            paddingTop: "15px",
            borderTop: "1px solid #e0e0e0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        exploreBtn: {
            backgroundColor: "#2C4B40",
            color: "white",
            border: "none",
            padding: "8px 20px",
            borderRadius: "50px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.4s ease",
        },
        heartCircle: {
            width: "42px",
            height: "42px",
            backgroundColor: "#f9fbfb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            color: "#ccd6d4",
            cursor: "pointer",
            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            border: "1px solid #edf2f1",
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
        },
        favoritesBar: {
            backgroundColor: "#f1f8f6",
            border: "1px solid #d1e2dd",
            color: "#2C4B40",
            fontWeight: "600",
            maxWidth: "400px",
            margin: "30px auto 0",
            padding: "12px 20px",
            borderRadius: "50px",
            textAlign: "center",
            boxShadow: "0 5px 15px rgba(26, 60, 52, 0.1)",
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
            id: 3,
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
            id: 4,
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
            id: 5,
            title: "Family Home",
            price: "$620,000",
            location: "San Francisco, CA",
            beds: 3,
            baths: 2.5,
            sqft: "1,800",
            image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop",
            alt: "Beautiful family home with garden"
        },
        {
            id: 6,
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

    const toggleFavorite = (propertyId) => {
        setFavorites(prevState => ({
            ...prevState,
            [propertyId]: !prevState[propertyId]
        }));
    };

    const handleExploreDetails = (propertyId) => {
        navigate(`/property/${propertyId}`);
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
                    <span className="category-tag">Grid Layout</span>
                    <h1 style={styles.title}>Properties Grid View</h1>
                    <div className="heading-line"></div>
                    <p style={styles.subtitle}>Browse all properties in a clean grid layout</p>
                </div>

                <div style={styles.grid}>
                    {properties.map((property, index) => (
                        <div
                            key={property.id}
                            style={{
                                ...styles.card,
                                animationDelay: `${index * 0.15}s`
                            }}
                            className="property-card"
                        >
                            <div style={styles.imgWrapper} className="img-wrapper">
                                <img
                                    src={property.image}
                                    alt={property.alt}
                                    style={styles.cardImage}
                                    className="property-img"
                                />
                                <div style={styles.priceOverlay}>{property.price}</div>
                                <div style={styles.imgShine} className="img-shine"></div>
                            </div>
                            <div style={styles.cardContent}>
                                <h3 style={styles.propertyTitle}>{property.title}</h3>
                                <div style={styles.propertyLocation}>
                                    <i className="bi bi-geo-alt-fill" style={{ color: "#2C4B40", marginRight: "5px" }}></i>
                                    {property.location}
                                </div>
                                <div style={styles.propertyDetails}>
                                    <span>{property.beds} beds</span>
                                    <span>{property.baths} baths</span>
                                    <span>{property.sqft} sqft</span>
                                </div>
                                <div style={styles.buttonContainer}>
                                    <button
                                        style={styles.exploreBtn}
                                        className="explore-btn"
                                        onClick={() => handleExploreDetails(property.id)}
                                    >
                                        Explore Details
                                    </button>
                                    <div
                                        style={{
                                            ...styles.heartCircle,
                                            ...(favorites[property.id] && {
                                                backgroundColor: "#fff1f0",
                                                color: "#ff4d4f",
                                                borderColor: "#ff4d4f"
                                            })
                                        }}
                                        className="heart-circle"
                                        onClick={() => toggleFavorite(property.id)}
                                    >
                                        <i className={`bi ${favorites[property.id] ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {Object.values(favorites).filter(Boolean).length > 0 && (
                    <div style={styles.favoritesBar}>
                        <i className="bi bi-heart-fill" style={{ color: "#ff4d4f", marginRight: "8px" }}></i>
                        You have {Object.values(favorites).filter(Boolean).length} favorite properties
                    </div>
                )}
            </div>

            <style>{`
        @keyframes slideInUpBlur {
          0% { opacity: 0; transform: translateY(50px) scale(0.95); filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        .property-card { animation: slideInUpBlur 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
        .property-card:hover { transform: translateY(-12px) !important; box-shadow: 0 25px 50px rgba(26, 60, 52, 0.15) !important; }
        .property-card:hover .property-img { transform: scale(1.1) rotate(1deg); }
        .property-card:hover .img-shine { left: 125%; }
        .img-wrapper { overflow: hidden; position: relative; }
        .property-img { transition: transform 1.2s ease; }
        .img-shine { transition: 0.75s; }
        .explore-btn { transition: all 0.4s ease; }
        .explore-btn:hover { background-color: #244e44; transform: translateY(-2px); box-shadow: 0 8px 15px rgba(26, 60, 52, 0.3); }
        .heart-circle { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .heart-circle:hover { background: #fff1f0; color: #ff4d4f; transform: scale(1.15) rotate(15deg); border-color: #ffccc7; box-shadow: 0 5px 15px rgba(255, 77, 79, 0.15); }
        .category-tag { background: #f1f8f6; color: #2C4B40; padding: 8px 20px; border-radius: 50px; font-size: 0.85rem; font-weight: 800; letter-spacing: 1px; border: 1px solid #d1e2dd; display: inline-block; margin-bottom: 15px; }
        .heading-line { width: 60px; height: 4px; background: #2C4B40; border-radius: 10px; margin: 15px auto 0; }
      `}</style>
        </div>
    );
}

export default GridLayout;