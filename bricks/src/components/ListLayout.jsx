import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function ListLayout() {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [favorites, setFavorites] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAllProperties();
    }, []);

    const fetchAllProperties = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://bricks-keys.vercel.app/admin/properties');
            setProperties(response.data.properties);
        } catch (error) {
            console.error('Error fetching properties:', error);
            toast.error('Failed to load properties');
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = (propertyId) => {
        setFavorites(prevState => ({
            ...prevState,
            [propertyId]: !prevState[propertyId]
        }));
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
            flexWrap: "wrap",
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
        },
        loading: {
            textAlign: "center",
            padding: "50px",
            fontSize: "18px",
            color: "#777",
        },
    };

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>
                    <i className="fas fa-spinner fa-pulse fa-2x" style={{ color: "#2C4B40" }}></i>
                    <p className="mt-3">Loading properties...</p>
                </div>
            </div>
        );
    }

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
                    <i className="fas fa-arrow-left" style={{ marginRight: "8px" }}></i>
                    Back to Home
                </button>

                <div style={styles.header}>
                    <span className="category-tag">List Layout</span>
                    <h1 style={styles.title}>Properties List View</h1>
                    <div className="heading-line"></div>
                    <p style={styles.subtitle}>Browse properties in an easy-to-read list format</p>
                </div>

                {properties.length === 0 ? (
                    <div style={styles.loading}>
                        <i className="fas fa-home" style={{ fontSize: "48px", opacity: 0.5, color: "#2C4B40" }}></i>
                        <p className="mt-3">No properties found.</p>
                    </div>
                ) : (
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
                                <img
                                    src={property.image_url || 'https://via.placeholder.com/400x300'}
                                    alt={property.title}
                                    style={styles.listImage}
                                    className="list-image"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300'; }}
                                />
                                <div style={styles.listContent}>
                                    <div>
                                        <h3 style={styles.propertyTitle}>{property.title}</h3>
                                        <div style={styles.propertyPrice}>{property.price}</div>
                                        <div style={styles.propertyLocation}>
                                            <i className="fas fa-map-marker-alt" style={{ color: "#E6BA5F", marginRight: "5px" }}></i>
                                            {property.city_name || property.location || 'Location not specified'}
                                        </div>
                                        <div style={styles.propertyDetails}>
                                            <span><i className="fas fa-bed"></i> {property.bedrooms || 0} beds</span>
                                            <span><i className="fas fa-bath"></i> {property.bathrooms || 0} baths</span>
                                            <span><i className="fas fa-expand-alt"></i> {property.area || 'N/A'}</span>
                                            <span style={{
                                                ...styles.propertyType,
                                                ...(property.property_type === 'For Sale' ? styles.typeForSale : styles.typeForRent)
                                            }}>
                                                {property.property_type || 'For Sale'}
                                            </span>
                                        </div>
                                        {property.category && (
                                            <div style={{ marginBottom: "10px", fontSize: "12px", color: "#999" }}>
                                                <i className="fas fa-tag"></i> {property.category}
                                            </div>
                                        )}
                                    </div>
                                    <div style={styles.buttonContainer}>
                                        <button
                                            style={styles.exploreBtn}
                                            onClick={() => navigate(`/property/${property.id}`)}
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = "#244e44";
                                                e.target.style.transform = "translateY(-2px)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = "#2C4B40";
                                                e.target.style.transform = "translateY(0)";
                                            }}
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
                                            onMouseEnter={(e) => {
                                                if (!favorites[property.id]) {
                                                    e.currentTarget.style.background = "#fff1f0";
                                                    e.currentTarget.style.color = "#ff4d4f";
                                                    e.currentTarget.style.transform = "scale(1.15) rotate(15deg)";
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!favorites[property.id]) {
                                                    e.currentTarget.style.background = "#f9fbfb";
                                                    e.currentTarget.style.color = "#ccd6d4";
                                                    e.currentTarget.style.transform = "scale(1) rotate(0deg)";
                                                }
                                            }}
                                        >
                                            <i className={`${favorites[property.id] ? 'fas fa-heart' : 'far fa-heart'}`}></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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
                .explore-btn { transition: all 0.3s ease; }
                .heart-circle { transition: all 0.3s ease; }
            `}</style>
        </div>
    );
}

export default ListLayout;