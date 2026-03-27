import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "1. Browse verified listings in your area",
      description: "Explore a wide range of properties with detailed photos and accurate pricing to find your perfect match.",
      imageSrc: "/images/h41.png"
    },
    {
      id: 2,
      name: "Make a visit appointment with our agents",
      title: "2. Schedule a guided tour with experts",
      description: "Connect with our professional agents to arrange private viewings and get expert advice on your favorite homes.",
      imageSrc: "/images/h42.png"
    },
    {
      id: 3,
      title: "3. Fast-track your home ownership",
      description: "Complete the legal paperwork seamlessly and move into your dream house in 30 days or even less.",
      imageSrc: "/images/h43.png"
    }
  ];

  return (
    <section className="py-5 bg-white">
      <div className="container text-center">
        <div className="mb-5">
          <h2 className="fw-bold mb-3" style={{ fontSize: '2.5rem', color: '#1A1A1A' }}>
            Find Your Dream House as Easy as 1,2,3
          </h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
            We simplify the process of buying a home so you can focus on making memories.
          </p>
        </div>

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
                      backgroundColor: '#FDF7F5' 
                    }}
                  >
                    <img 
                      src={step.imageSrc} 
                      alt={step.title} 
                      className="img-fluid"
                      style={{ maxHeight: '100px', objectFit: 'contain' }}
                    />
                  </div>
                </div>

                <h5 className="fw-bold mb-3 px-lg-4" style={{ lineHeight: '1.4', color: '#1A432F' }}>
                  {step.title}
                </h5>
                <p className="text-secondary small px-lg-5" style={{ lineHeight: '1.6' }}>
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