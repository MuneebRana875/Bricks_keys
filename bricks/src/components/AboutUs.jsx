import React from 'react';
import { useNavigate } from 'react-router-dom';

function AboutUs() {
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
        },
        content: {
            maxWidth: "800px",
            margin: "0 auto",
            padding: "40px",
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        },
        section: {
            marginBottom: "30px",
        },
        sectionTitle: {
            color: "#2C4B40",
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "15px",
        },
        text: {
            color: "#555555",
            lineHeight: "1.8",
            marginBottom: "15px",
        },
        stats: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginTop: "40px",
            paddingTop: "30px",
            borderTop: "1px solid #e0e0e0",
        },
        statItem: {
            textAlign: "center",
        },
        statNumber: {
            fontSize: "32px",
            fontWeight: "700",
            color: "#E6BA5F",
            marginBottom: "10px",
        },
        statLabel: {
            color: "#777777",
            fontSize: "14px",
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
                    <span className="category-tag">About Us</span>
                    <h1 style={styles.title}>About Bricks&Keys</h1>
                    <div className="heading-line"></div>
                    <p style={styles.subtitle}>Your trusted partner in finding the perfect home</p>
                </div>

                <div style={styles.content}>
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>Our Story</h2>
                        <p style={styles.text}>
                            Founded in 2020, Bricks&Keys has grown to become one of the most trusted real estate platforms in the industry.
                            Our mission is simple: to help people find their perfect home with ease and confidence.
                        </p>
                    </div>

                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>What We Do</h2>
                        <p style={styles.text}>
                            We connect buyers, sellers, and renters with the best properties on the market.
                            Our platform offers a seamless experience from search to closing, with expert guidance every step of the way.
                        </p>
                    </div>

                    <div style={styles.stats}>
                        <div style={styles.statItem}>
                            <div style={styles.statNumber}>745K+</div>
                            <div style={styles.statLabel}>Properties Listed</div>
                        </div>
                        <div style={styles.statItem}>
                            <div style={styles.statNumber}>50K+</div>
                            <div style={styles.statLabel}>Happy Customers</div>
                        </div>
                        <div style={styles.statItem}>
                            <div style={styles.statNumber}>10+</div>
                            <div style={styles.statLabel}>Years Experience</div>
                        </div>
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

export default AboutUs;