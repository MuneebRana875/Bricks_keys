import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FAQ() {
    const navigate = useNavigate();
    const [openIndex, setOpenIndex] = useState(null);

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
        faqContainer: {
            maxWidth: "800px",
            margin: "0 auto",
            padding: "20px",
        },
        faqItem: {
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            marginBottom: "15px",
            overflow: "hidden",
            boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
            transition: "all 0.3s ease",
        },
        question: {
            padding: "20px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: "600",
            color: "#2C4B40",
        },
        answer: {
            padding: "0 20px 20px 20px",
            color: "#777777",
            lineHeight: "1.6",
            borderTop: "1px solid #f0f0f0",
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

    const faqs = [
        {
            question: "How do I search for properties?",
            answer: "You can search for properties using our search bar on the homepage. Enter keywords like location, property type, or price range to find matching properties."
        },
        {
            question: "How can I list my property for sale?",
            answer: "Click on the 'Add Property' button in the navbar. Fill out the property details form with photos, description, price, and other information. Our team will review and list your property."
        },
        {
            question: "Is there a fee for using Bricks&Keys?",
            answer: "Basic property search and browsing is completely free. There may be fees for premium listing services or when a transaction is completed through our platform."
        },
        {
            question: "How do I schedule a property viewing?",
            answer: "Once you find a property you're interested in, click 'Explore Details' and use the contact form to schedule a viewing with the property owner or agent."
        },
        {
            question: "Can I save my favorite properties?",
            answer: "Yes! Click the heart icon on any property card to save it to your favorites. Your favorite properties will be tracked and you'll see a summary at the bottom of the page."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
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
                    <span className="category-tag">FAQ</span>
                    <h1 style={styles.title}>Frequently Asked Questions</h1>
                    <div className="heading-line"></div>
                    <p style={styles.subtitle}>Find answers to common questions about our platform</p>
                </div>

                <div style={styles.faqContainer}>
                    {faqs.map((faq, index) => (
                        <div key={index} style={styles.faqItem}>
                            <div
                                style={styles.question}
                                onClick={() => toggleFAQ(index)}
                            >
                                <span>{faq.question}</span>
                                <span style={{ fontSize: "20px", transition: "transform 0.3s", transform: openIndex === index ? "rotate(180deg)" : "rotate(0)" }}>
                                    ▼
                                </span>
                            </div>
                            {openIndex === index && (
                                <div style={styles.answer}>
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .category-tag { background: #f1f8f6; color: #2C4B40; padding: 8px 20px; border-radius: 50px; font-size: 0.85rem; font-weight: 800; letter-spacing: 1px; border: 1px solid #d1e2dd; display: inline-block; margin-bottom: 15px; }
        .heading-line { width: 60px; height: 4px; background: #2C4B40; border-radius: 10px; margin: 15px auto 0; }
      `}</style>
        </div>
    );
}

export default FAQ;