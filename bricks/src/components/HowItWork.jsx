import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "1. Search for your favorite house in your location",
      description: "Pellentesque egestas elementum egestas faucibus sem.",
      imageSrc: "/images/h41.png" // Ensure this is in public/images/h41.png
    },
    {
      id: 2,
      title: "2. Make a visit appointment with one of your agents",
      description: "Pellentesque egestas elementum egestas faucibus sem.",
      imageSrc: "/images/h42.png" // Update to your actual file name
    },
    {
      id: 3,
      title: "3. Get your dream house in a month, or less",
      description: "Pellentesque egestas elementum egestas faucibus sem.",
      imageSrc: "/images/h43.png" // Update to your actual file name
    }
  ];

  return (
    <section className="py-5 bg-white">
      <div className="container text-center">
        {/* Header Section */}
        <div className="mb-5">
          <h2 className="fw-bold mb-3" style={{ fontSize: '2.5rem' }}>
            Find Your Dream House as Easy as 1,2,3
          </h2>
          <p className="text-muted">Lorem ipsum dolor sit amet</p>
        </div>

        {/* Steps Grid */}
        <div className="row g-4 mt-4">
          {steps.map((step) => (
            <div key={step.id} className="col-md-4">
              <div className="px-3">
                <div className="mb-4 d-flex justify-content-center">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{ 
                      width: '180px', 
                      height: '180px', 
                    }}
                  >
                    <img 
                      src={step.imageSrc} 
                      alt={step.title} 
                      className="img-fluid"
                      style={{ maxHeight: '90px', objectFit: 'contain' }}
                     
                      
                    />
                  </div>
                </div>

                <h5 className="fw-bold mb-3 px-lg-4" style={{ lineHeight: '1.4' }}>
                  {step.title}
                </h5>
                <p className="text-secondary small px-lg-5">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;