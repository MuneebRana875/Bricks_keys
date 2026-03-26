import React from 'react';

const FooterSection = () => {
  const customColors = {
    forestGreen: '#1d4239',
    charcoal: '#333333',
    accentGold: '#d4b062'
  };

  return (
    <div className="container-fluid p-0 font-sans">
      {/* Newsletter Section */}
      <section 
        className="py-5 text-center text-white" 
        style={{ backgroundColor: customColors.forestGreen }}
      >
        <div className="container py-5">
          <div className="mb-4 d-inline-flex align-items-center justify-content-center" 
               style={{ 
                 backgroundColor: customColors.accentGold, 
                 width: '50px', 
                 height: '50px', 
                 borderRadius: '50%' 
               }}>
            <i className="bi bi-send-fill text-dark"></i>
          </div>
          
          <h2 className="fw-bold mb-3">Stay Up to Date</h2>
          <p className="mb-4 opacity-75">Subscribe to our newsletter to receive our weekly feed.</p>
          
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="input-group mb-3 bg-white bg-opacity-10 rounded-pill p-2 border border-white border-opacity-25">
                <input 
                  type="email" 
                  className="form-control bg-transparent border-0 text-white shadow-none ps-4" 
                  placeholder="Your e-mail"
                  aria-label="Your e-mail"
                />
                <button className="btn text-white fw-bold pe-4" type="button">
                  Send <i className="bi bi-arrow-right ms-1"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      <footer 
        className="py-4 text-white" 
        style={{ backgroundColor: customColors.charcoal }}
      >
        <div className="container">
          <div className="row align-items-center">
           
            <div className="col-md-4 text-center text-md-start mb-3 mb-md-0 opacity-75 small">
              Copyright © 2026. Brick&keys. All rights reserved.
            </div>

            
            <div className="col-md-4 text-center mb-3 mb-md-0">
              <div className="d-flex align-items-center justify-content-center gap-2">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
                <span className="h4 mb-0 fw-bold">Bricks&Keys</span>
              </div>
            </div>

           
            <div className="col-md-2 d-flex justify-content-center justify-content-md-end align-items-center gap-4">
              <div className="d-flex gap-3">
                <i className="bi bi-facebook cursor-pointer"></i>
                <i className="bi bi-twitter-x cursor-pointer"></i>
                <i className="bi bi-instagram cursor-pointer"></i>
                <i className="bi bi-linkedin cursor-pointer"></i>
              </div>
              <button className="btn btn-dark rounded-circle btn-sm p-2 shadow footerbutton" style={{backgroundColor: '#222'}} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <i className="bi bi-arrow-up p-1"></i>
              </button>
            </div>
            
          </div>
        </div>
        
      </footer>
      
    </div>
  );
};

export default FooterSection;