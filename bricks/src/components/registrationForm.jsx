import React, { useState } from "react";

const RegistrationForm = ({ isOpen, onClose }) => {

  const [authType, setAuthType] = useState("login");

  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay} onClick={onClose}>
      <div style={modalStyles.content} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={modalStyles.closeBtn}>&times;</button>
        
        <h3 style={{ color: "#2C4B40", marginBottom: "20px" }}>
          {authType === "login" ? "Login" : "Create Account"}
        </h3>

        <form style={modalStyles.form}>
         
          {authType === "signup" && (
            <input type="text" placeholder="Full Name" style={modalStyles.input} />
          )}
          
          <input type="email" placeholder="Email Address" style={modalStyles.input} />
          <input type="password" placeholder="Password" style={modalStyles.input} />
          
          <button type="submit" style={modalStyles.submitBtn}>
            {authType === "login" ? "Login" : "Register"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
          {authType === "login" ? (
            <p>
              Don't have an account?{" "}
              <span 
                style={modalStyles.link} 
                onClick={() => setAuthType("signup")}
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span 
                style={modalStyles.link} 
                onClick={() => setAuthType("login")}
              >
                Login
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const modalStyles = {
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2000 },
  content: { background: "white", padding: "40px", borderRadius: "15px", width: "100%", maxWidth: "400px", position: "relative" },
  closeBtn: { position: "absolute", top: "15px", right: "20px", border: "none", background: "none", fontSize: "24px", cursor: "pointer" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: { padding: "12px", borderRadius: "8px", border: "1px solid #D4DCE0", outline: "none" },
  submitBtn: { padding: "12px", backgroundColor: "#2C4B40", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" },
  link: { color: "#2C4B40", fontWeight: "bold", cursor: "pointer", textDecoration: "underline" }
};

export default RegistrationForm;