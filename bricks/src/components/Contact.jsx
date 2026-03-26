// Contact.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic yahan ayegi
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    }, 3000);
  };

  return (
    <div style={{ backgroundColor: "#f8faf9", minHeight: "100vh" }}>
      {/* Hero Banner */}
      <div 
        style={{ 
          height: "300px", 
          backgroundImage: "linear-gradient(rgba(27, 67, 50, 0.8), rgba(27, 67, 50, 0.9)), url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200')",
          backgroundSize: "cover", 
          backgroundPosition: "center",
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          color: "#fff", 
          textAlign: "center"
        }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">Contact Us</h1>
          <p className="fs-5">Get in touch with our real estate experts</p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="container py-5">
        <div className="row">
          {/* Contact Information */}
          <div className="col-lg-4 mb-4">
            <div className="bg-white p-4 rounded-4 shadow-sm">
              <h3 className="fw-bold mb-4" style={{ color: "#1b4332" }}>Get in Touch</h3>
              
              {/* Office Address */}
              <div className="d-flex mb-4">
                <div className="me-3">
                  <div style={{ 
                    width: "50px", 
                    height: "50px", 
                    backgroundColor: "#e8f5e9", 
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <i className="bi bi-geo-alt-fill fs-4" style={{ color: "#2d6a4f" }}></i>
                  </div>
                </div>
                <div>
                  <h5 className="fw-bold mb-2">Office Address</h5>
                  <p className="text-muted mb-0">123 Real Estate Avenue<br />New York, NY 10001</p>
                </div>
              </div>

              {/* Phone Number */}
              <div className="d-flex mb-4">
                <div className="me-3">
                  <div style={{ 
                    width: "50px", 
                    height: "50px", 
                    backgroundColor: "#e8f5e9", 
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <i className="bi bi-telephone-fill fs-4" style={{ color: "#2d6a4f" }}></i>
                  </div>
                </div>
                <div>
                  <h5 className="fw-bold mb-2">Phone Number</h5>
                  <p className="text-muted mb-0">+1 (555) 123-4567<br />+1 (555) 987-6543</p>
                </div>
              </div>

              {/* Email Address */}
              <div className="d-flex mb-4">
                <div className="me-3">
                  <div style={{ 
                    width: "50px", 
                    height: "50px", 
                    backgroundColor: "#e8f5e9", 
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <i className="bi bi-envelope-fill fs-4" style={{ color: "#2d6a4f" }}></i>
                  </div>
                </div>
                <div>
                  <h5 className="fw-bold mb-2">Email Address</h5>
                  <p className="text-muted mb-0">info@realestate.com<br />support@realestate.com</p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="d-flex">
                <div className="me-3">
                  <div style={{ 
                    width: "50px", 
                    height: "50px", 
                    backgroundColor: "#e8f5e9", 
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <i className="bi bi-clock-fill fs-4" style={{ color: "#2d6a4f" }}></i>
                  </div>
                </div>
                <div>
                  <h5 className="fw-bold mb-2">Business Hours</h5>
                  <p className="text-muted mb-0">Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM<br />Sunday: Closed</p>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-4 pt-3 border-top">
                <h5 className="fw-bold mb-3" style={{ color: "#1b4332" }}>Follow Us</h5>
                <div className="d-flex gap-3">
                  <a href="#" className="text-decoration-none">
                    <div style={{ 
                      width: "45px", 
                      height: "45px", 
                      backgroundColor: "#e8f5e9", 
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#2d6a4f";
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.querySelector('i').style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#e8f5e9";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.querySelector('i').style.color = "#2d6a4f";
                    }}
                    >
                      <i className="bi bi-facebook fs-4" style={{ color: "#2d6a4f" }}></i>
                    </div>
                  </a>
                  <a href="#" className="text-decoration-none">
                    <div style={{ 
                      width: "45px", 
                      height: "45px", 
                      backgroundColor: "#e8f5e9", 
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#2d6a4f";
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.querySelector('i').style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#e8f5e9";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.querySelector('i').style.color = "#2d6a4f";
                    }}
                    >
                      <i className="bi bi-twitter-x fs-4" style={{ color: "#2d6a4f" }}></i>
                    </div>
                  </a>
                  <a href="#" className="text-decoration-none">
                    <div style={{ 
                      width: "45px", 
                      height: "45px", 
                      backgroundColor: "#e8f5e9", 
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#2d6a4f";
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.querySelector('i').style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#e8f5e9";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.querySelector('i').style.color = "#2d6a4f";
                    }}
                    >
                      <i className="bi bi-instagram fs-4" style={{ color: "#2d6a4f" }}></i>
                    </div>
                  </a>
                  <a href="#" className="text-decoration-none">
                    <div style={{ 
                      width: "45px", 
                      height: "45px", 
                      backgroundColor: "#e8f5e9", 
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#2d6a4f";
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.querySelector('i').style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#e8f5e9";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.querySelector('i').style.color = "#2d6a4f";
                    }}
                    >
                      <i className="bi bi-linkedin fs-4" style={{ color: "#2d6a4f" }}></i>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-8">
            <div className="bg-white p-5 rounded-4 shadow-sm">
              <h3 className="fw-bold mb-4" style={{ color: "#1b4332" }}>Send us a Message</h3>
              
              {isSubmitted ? (
                <div className="alert alert-success p-4 text-center" role="alert">
                  <i className="bi bi-check-circle-fill fs-1 mb-3 d-block" style={{ color: "#2d6a4f" }}></i>
                  <h4 className="fw-bold mb-2">Thank You!</h4>
                  <p className="mb-0">Your message has been sent successfully. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {/* Name Field */}
                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-semibold">Full Name</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0">
                          <i className="bi bi-person" style={{ color: "#2d6a4f" }}></i>
                        </span>
                        <input
                          type="text"
                          className="form-control form-control-lg border-0 bg-light"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          required
                          style={{ padding: "12px" }}
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-semibold">Email Address</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0">
                          <i className="bi bi-envelope" style={{ color: "#2d6a4f" }}></i>
                        </span>
                        <input
                          type="email"
                          className="form-control form-control-lg border-0 bg-light"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          required
                          style={{ padding: "12px" }}
                        />
                      </div>
                    </div>

                    {/* Phone Field */}
                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-semibold">Phone Number</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0">
                          <i className="bi bi-telephone" style={{ color: "#2d6a4f" }}></i>
                        </span>
                        <input
                          type="tel"
                          className="form-control form-control-lg border-0 bg-light"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          required
                          style={{ padding: "12px" }}
                        />
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-semibold">Subject</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0">
                          <i className="bi bi-chat" style={{ color: "#2d6a4f" }}></i>
                        </span>
                        <input
                          type="text"
                          className="form-control form-control-lg border-0 bg-light"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Enter subject"
                          required
                          style={{ padding: "12px" }}
                        />
                      </div>
                    </div>

                    {/* Message Field */}
                    <div className="col-12 mb-4">
                      <label className="form-label fw-semibold">Message</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0 mt-2" style={{ alignItems: "flex-start" }}>
                          <i className="bi bi-chat-dots" style={{ color: "#2d6a4f" }}></i>
                        </span>
                        <textarea
                          className="form-control form-control-lg border-0 bg-light"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="5"
                          placeholder="Write your message here..."
                          required
                          style={{ padding: "12px" }}
                        ></textarea>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-12 text-center">
                      <button
                        type="submit"
                        className="btn btn-success px-5 py-3 fw-bold"
                        style={{ 
                          backgroundColor: "#2d6a4f",
                          borderRadius: "50px",
                          fontSize: "1.1rem"
                        }}
                      >
                        <i className="bi bi-send me-2"></i>
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-5">
          <div className="bg-white p-4 rounded-4 shadow-sm">
            <h3 className="fw-bold mb-4" style={{ color: "#1b4332" }}>Find Us Here</h3>
            <div 
              style={{ 
                height: "400px", 
                backgroundColor: "#e9ecef",
                borderRadius: "15px",
                overflow: "hidden"
              }}
            >
              {/* Google Map Embed - Replace with actual map */}
              <iframe
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645564612345!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;