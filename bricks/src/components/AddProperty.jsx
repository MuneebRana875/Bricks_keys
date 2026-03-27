import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProperty() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        location: '',
        beds: '',
        baths: '',
        sqft: '',
        type: 'sale',
        description: ''
    });

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
        formContainer: {
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            padding: "40px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        },
        inputGroup: {
            marginBottom: "20px",
        },
        label: {
            display: "block",
            marginBottom: "8px",
            color: "#2C4B40",
            fontWeight: "500",
            fontSize: "14px",
        },
        input: {
            width: "100%",
            padding: "12px 15px",
            border: "1px solid #e0e0e0",
            borderRadius: "10px",
            fontSize: "14px",
            outline: "none",
            transition: "border-color 0.3s",
        },
        select: {
            width: "100%",
            padding: "12px 15px",
            border: "1px solid #e0e0e0",
            borderRadius: "10px",
            fontSize: "14px",
            outline: "none",
        },
        textarea: {
            width: "100%",
            padding: "12px 15px",
            border: "1px solid #e0e0e0",
            borderRadius: "10px",
            fontSize: "14px",
            outline: "none",
            resize: "vertical",
            fontFamily: "inherit",
        },
        submitBtn: {
            backgroundColor: "#2C4B40",
            color: "white",
            border: "none",
            padding: "12px 30px",
            borderRadius: "50px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            width: "100%",
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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Property listed successfully! Our team will review your listing.');
        navigate('/');
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
                    <span className="category-tag">Add Property</span>
                    <h1 style={styles.title}>List Your Property</h1>
                    <div className="heading-line"></div>
                    <p style={styles.subtitle}>Fill out the form to list your property</p>
                </div>

                <div style={styles.formContainer}>
                    <form onSubmit={handleSubmit}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Property Title</label>
                            <input
                                type="text"
                                name="title"
                                placeholder="e.g., Modern Luxury Villa"
                                style={styles.input}
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Price</label>
                            <input
                                type="text"
                                name="price"
                                placeholder="e.g., $850,000"
                                style={styles.input}
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Location</label>
                            <input
                                type="text"
                                name="location"
                                placeholder="e.g., Beverly Hills, CA"
                                style={styles.input}
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Property Type</label>
                            <select
                                name="type"
                                style={styles.select}
                                value={formData.type}
                                onChange={handleChange}
                            >
                                <option value="sale">For Sale</option>
                                <option value="rent">For Rent</option>
                            </select>
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Bedrooms</label>
                            <input
                                type="number"
                                name="beds"
                                placeholder="Number of bedrooms"
                                style={styles.input}
                                value={formData.beds}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Bathrooms</label>
                            <input
                                type="number"
                                name="baths"
                                placeholder="Number of bathrooms"
                                style={styles.input}
                                value={formData.baths}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Square Footage</label>
                            <input
                                type="text"
                                name="sqft"
                                placeholder="e.g., 2,500 sqft"
                                style={styles.input}
                                value={formData.sqft}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Description</label>
                            <textarea
                                name="description"
                                placeholder="Describe your property..."
                                rows="4"
                                style={styles.textarea}
                                value={formData.description}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            style={styles.submitBtn}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#244e44";
                                e.target.style.transform = "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#2C4B40";
                                e.target.style.transform = "translateY(0)";
                            }}
                        >
                            List Property
                        </button>
                    </form>
                </div>
            </div>

            <style>{`
        .category-tag { background: #f1f8f6; color: #2C4B40; padding: 8px 20px; border-radius: 50px; font-size: 0.85rem; font-weight: 800; letter-spacing: 1px; border: 1px solid #d1e2dd; display: inline-block; margin-bottom: 15px; }
        .heading-line { width: 60px; height: 4px; background: #2C4B40; border-radius: 10px; margin: 15px auto 0; }
      `}</style>
        </div>
    );
}

export default AddProperty;