import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ListLayout() {
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
        listContainer: {
            maxWidth: "1000px",
            margin: "0 auto",
            padding: "0 20px",
        },
        listItem: {
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            marginBottom: "20px",
            overflow: "hidden",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            display: "flex",
            flexDirection: "row",
            animation: "slideInLeft 0.6s ease-out both",
        },
        listImage: {
            width: "280px",
            height: "200px",
            objectFit: "cover",
            transition: "transform 0.5s ease",
        },
        listContent: {
            flex: 1,
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        },
        propertyTitle: {
            fontSize: "22px",
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
            marginBottom: "10px",
        },
        propertyDetails: {
            display: "flex",
            gap: "15px",
            fontSize: "14px",
            color: "#777777",
            marginBottom: "15px",
        },
        buttonContainer: {
            display: "flex",
            gap: "15px",
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
            transition: "all 0.3s ease",
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
            transition: "all 0.3s ease",
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
            image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
            alt: "Modern luxury villa"
        },
        {
            id: 2,
            title: "Luxury Apartment",
            price: "$2,500/month",
            location: "Manhattan, NY",
            beds: 2,
            baths: 2,
            sqft: "1,100",
            image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
            alt: "Luxury apartment"
        },
        {
            id: 3,
            title: "Downtown Condo",
            price: "$450,000",
            location: "Los Angeles, CA",
            beds: 2,
            baths: 2,
            sqft: "1,200",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
            alt: "Downtown condo"
        }
    ];

    const toggleFavorite = (propertyId) => {
        setFavorites(prevState => ({
            ...prevState,
            [propertyId]: !prevState[propertyId]
        }));
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
                    <span className="category-tag">List Layout</span>
                    <h1 style={styles.title}>Properties List View</h1>
                    <div className="heading-line"></div>
                    <p style={styles.subtitle}>Browse properties in an easy-to-read list format</p>
                </div>

                <div style={styles.listContainer}>
                    {properties.map((property, index) => (
                        <div
                            key={property.id}
                            style={{
                                ...styles.listItem,
                                animationDelay: `${index * 0.1}s`
                            }}
                            className="list-item"
                        >
                            <img src={property.image} alt={property.alt} style={styles.listImage} className="list-image" />
                            <div style={styles.listContent}>
                                <div>
                                    <h3 style={styles.propertyTitle}>{property.title}</h3>
                                    <div style={styles.propertyPrice}>{property.price}</div>
                                    <div style={styles.propertyLocation}>
                                        <i className="bi bi-geo-alt-fill" style={{ color: "#2C4B40", marginRight: "5px" }}></i>
                                        {property.location}
                                    </div>
                                    <div style={styles.propertyDetails}>
                                        <span>{property.beds} beds</span>
                                        <span>{property.baths} baths</span>
                                        <span>{property.sqft} sqft</span>
                                    </div>
                                </div>
                                <div style={styles.buttonContainer}>
                                    <button
                                        style={styles.exploreBtn}
                                        onClick={() => navigate(`/property/${property.id}`)}
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
                                        onClick={() => toggleFavorite(property.id)}
                                    >
                                        <i className={`bi ${favorites[property.id] ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .list-item { animation: slideInLeft 0.6s ease-out both; }
        .list-item:hover { transform: translateX(5px); box-shadow: 0 5px 20px rgba(0,0,0,0.15); }
        .list-item:hover .list-image { transform: scale(1.05); }
        .list-image { transition: transform 0.5s ease; }
        .category-tag { background: #f1f8f6; color: #2C4B40; padding: 8px 20px; border-radius: 50px; font-size: 0.85rem; font-weight: 800; letter-spacing: 1px; border: 1px solid #d1e2dd; display: inline-block; margin-bottom: 15px; }
        .heading-line { width: 60px; height: 4px; background: #2C4B40; border-radius: 10px; margin: 15px auto 0; }
      `}</style>
        </div>
    );
}

export default ListLayout;