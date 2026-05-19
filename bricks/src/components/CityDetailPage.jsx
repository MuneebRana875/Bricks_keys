import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const CityDetailPage = () => {

  const { slug } = useParams();
  
  const navigate = useNavigate();

  const cityData = {
    // New York City Data
    "new-york": {
      name: "New York",
      desc: "Experience the iconic skyline and bustling streets of the Big Apple.",
      banner: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1200",
      properties: [
        { 
          id: 1, 
          title: "Manhattan Luxury Loft", 
          price: "$1,200,000", 
          img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600",
          slug: "manhattan-luxury-loft", // Unique slug for this property
          bedrooms: 3,
          bathrooms: 2,
          area: "2,500 sq ft"
        },
        { 
          id: 2, 
          title: "Brooklyn Modern Condo", 
          price: "$850,000", 
          img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=600",
          slug: "brooklyn-modern-condo",
          bedrooms: 2,
          bathrooms: 2,
          area: "1,200 sq ft"
        },
        { 
          id: 3, 
          title: "Central Park Penthouse", 
          price: "$3,500,000", 
          img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600",
          slug: "central-park-penthouse",
          bedrooms: 4,
          bathrooms: 3,
          area: "3,800 sq ft"
        },
        { 
          id: 4, 
          title: "Queens Family Home", 
          price: "$720,000", 
          img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=600",
          slug: "queens-family-home",
          bedrooms: 4,
          bathrooms: 3,
          area: "2,200 sq ft"
        }
      ]
    },
    
    // San Diego Data
    "san-diego": {
      name: "San Diego",
      desc: "Coastal beauty and perfect weather in America's Finest City.",
      banner: "https://images.unsplash.com/photo-1513366408769-f1d9b0dc9aa0?q=80&w=1200",
      properties: [
        { 
          id: 5, 
          title: "La Jolla Villa", 
          price: "$2,100,000", 
          img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600",
          slug: "la-jolla-villa",
          bedrooms: 4,
          bathrooms: 4,
          area: "3,200 sq ft"
        },
        { 
          id: 6, 
          title: "Oceanfront Cottage", 
          price: "$1,450,000", 
          img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600",
          slug: "oceanfront-cottage",
          bedrooms: 2,
          bathrooms: 2,
          area: "1,500 sq ft"
        },
        { 
          id: 7, 
          title: "Downtown Studio", 
          price: "$450,000", 
          img: "https://images.unsplash.com/photo-1536376074432-a228d217929a?q=80&w=600",
          slug: "downtown-studio",
          bedrooms: 1,
          bathrooms: 1,
          area: "650 sq ft"
        },
        { 
          id: 8, 
          title: "Mission Valley Condo", 
          price: "$550,000", 
          img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=600",
          slug: "mission-valley-condo",
          bedrooms: 2,
          bathrooms: 2,
          area: "1,100 sq ft"
        }
      ]
    },
    
    // Arizona Data
    "arizona": {
      name: "Arizona",
      desc: "Beautiful desert landscapes and luxury golf resorts.",
      banner: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200",
      properties: [
        { 
          id: 9, 
          title: "Scottsdale Manor", 
          price: "$1,250,000", 
          img: "https://images.unsplash.com/photo-1472224371017-08207f84aaae?q=80&w=600",
          slug: "scottsdale-manor",
          bedrooms: 5,
          bathrooms: 4,
          area: "4,000 sq ft"
        },
        { 
          id: 10, 
          title: "Phoenix Desert Villa", 
          price: "$890,000", 
          img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600",
          slug: "phoenix-desert-villa",
          bedrooms: 3,
          bathrooms: 3,
          area: "2,800 sq ft"
        },
        { 
          id: 11, 
          title: "Sedona Red Rock Home", 
          price: "$1,100,000", 
          img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=600",
          slug: "sedona-red-rock-home",
          bedrooms: 3,
          bathrooms: 3,
          area: "2,500 sq ft"
        },
        { 
          id: 12, 
          title: "Tucson Ranch House", 
          price: "$420,000", 
          img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=600",
          slug: "tucson-ranch-house",
          bedrooms: 3,
          bathrooms: 2,
          area: "1,800 sq ft"
        }
      ]
    },
    
    // Miami Data
    "miami": {
      name: "Miami",
      desc: "Vibrant beaches and luxury oceanfront living.",
      banner: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?q=80&w=1200",
      properties: [
        { 
          id: 13, 
          title: "South Beach Penthouse", 
          price: "$3,200,000", 
          img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=600",
          slug: "south-beach-penthouse",
          bedrooms: 3,
          bathrooms: 3,
          area: "2,800 sq ft"
        },
        { 
          id: 14, 
          title: "Coral Gables Estate", 
          price: "$2,100,000", 
          img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=600",
          slug: "coral-gables-estate",
          bedrooms: 5,
          bathrooms: 5,
          area: "4,500 sq ft"
        },
        { 
          id: 15, 
          title: "Brickell Bay Condo", 
          price: "$750,000", 
          img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=600",
          slug: "brickell-bay-condo",
          bedrooms: 2,
          bathrooms: 2,
          area: "1,400 sq ft"
        },
        { 
          id: 16, 
          title: "Key Biscayne Villa", 
          price: "$4,500,000", 
          img: "https://images.unsplash.com/photo-1575517111478-7f6afd0973db?q=80&w=600",
          slug: "key-biscayne-villa",
          bedrooms: 6,
          bathrooms: 6,
          area: "5,200 sq ft"
        }
      ]
    },
    
    // Los Angeles Data
    "los-angeles": {
      name: "Los Angeles",
      desc: "The heart of entertainment and sunny California lifestyle.",
      banner: "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200",
      properties: [
        { 
          id: 17, 
          title: "Beverly Hills Mansion", 
          price: "$5,800,000", 
          img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=600",
          slug: "beverly-hills-mansion",
          bedrooms: 6,
          bathrooms: 7,
          area: "6,500 sq ft"
        },
        { 
          id: 18, 
          title: "Santa Monica Beach House", 
          price: "$2,400,000", 
          img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=600",
          slug: "santa-monica-beach-house",
          bedrooms: 4,
          bathrooms: 3,
          area: "2,800 sq ft"
        },
        { 
          id: 19, 
          title: "Hollywood Hills Modern", 
          price: "$3,100,000", 
          img: "https://images.unsplash.com/photo-1430285561322-7808604715df?q=80&w=600",
          slug: "hollywood-hills-modern",
          bedrooms: 4,
          bathrooms: 4,
          area: "3,500 sq ft"
        },
        { 
          id: 20, 
          title: "Silver Lake Bungalow", 
          price: "$980,000", 
          img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=600",
          slug: "silver-lake-bungalow",
          bedrooms: 3,
          bathrooms: 2,
          area: "1,600 sq ft"
        }
      ]
    },
    
    // Hawaii Data
    "hawaii": {
      name: "Hawaii",
      desc: "Tropical paradise with stunning ocean views.",
      banner: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200",
      properties: [
        { 
          id: 21, 
          title: "Maui Beachfront Villa", 
          price: "$2,900,000", 
          img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600",
          slug: "maui-beachfront-villa",
          bedrooms: 4,
          bathrooms: 4,
          area: "3,200 sq ft"
        },
        { 
          id: 22, 
          title: "Oahu Mountain Retreat", 
          price: "$1,200,000", 
          img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=600",
          slug: "oahu-mountain-retreat",
          bedrooms: 3,
          bathrooms: 3,
          area: "2,400 sq ft"
        },
        { 
          id: 23, 
          title: "Honolulu Skyline Suite", 
          price: "$850,000", 
          img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600",
          slug: "honolulu-skyline-suite",
          bedrooms: 2,
          bathrooms: 2,
          area: "1,300 sq ft"
        },
        { 
          id: 24, 
          title: "Kauai Eco House", 
          price: "$1,100,000", 
          img: "https://images.unsplash.com/photo-1472224371017-08207f84aaae?q=80&w=600",
          slug: "kauai-eco-house",
          bedrooms: 3,
          bathrooms: 2,
          area: "2,000 sq ft"
        }
      ]
    },
    
    // Florida Data
    "florida": {
      name: "Florida",
      desc: "Sun-soaked properties in the Sunshine State.",
      banner: "https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=1200",
      properties: [
        { 
          id: 25, 
          title: "Orlando Theme Park Villa", 
          price: "$650,000", 
          img: "https://images.unsplash.com/photo-1580587767303-94101789516a?q=80&w=600",
          slug: "orlando-theme-park-villa",
          bedrooms: 4,
          bathrooms: 3,
          area: "2,500 sq ft"
        },
        { 
          id: 26, 
          title: "Tampa Bay Waterfront", 
          price: "$1,200,000", 
          img: "https://images.unsplash.com/photo-1448630305456-91e8d6afb575?q=80&w=600",
          slug: "tampa-bay-waterfront",
          bedrooms: 3,
          bathrooms: 3,
          area: "2,200 sq ft"
        },
        { 
          id: 27, 
          title: "Naples Luxury Mansion", 
          price: "$3,400,000", 
          img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600",
          slug: "naples-luxury-mansion",
          bedrooms: 5,
          bathrooms: 5,
          area: "4,800 sq ft"
        },
        { 
          id: 28, 
          title: "Jacksonville Family Estate", 
          price: "$550,000", 
          img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=600",
          slug: "jacksonville-family-estate",
          bedrooms: 4,
          bathrooms: 3,
          area: "2,300 sq ft"
        }
      ]
    },
    
    // Chicago Data
    "chicago": {
      name: "Chicago",
      desc: "Iconic architecture along the Windy City skyline.",
      banner: "https://images.unsplash.com/photo-1494522324078-65176ac99495?q=80&w=1200",
      properties: [
        { 
          id: 29, 
          title: "Lake Shore Drive Apt", 
          price: "$1,100,000", 
          img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=600",
          slug: "lake-shore-drive-apt",
          bedrooms: 2,
          bathrooms: 2,
          area: "1,500 sq ft"
        },
        { 
          id: 30, 
          title: "Lincoln Park Brick House", 
          price: "$920,000", 
          img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=600",
          slug: "lincoln-park-brick-house",
          bedrooms: 4,
          bathrooms: 3,
          area: "2,800 sq ft"
        },
        { 
          id: 31, 
          title: "River North Modern Loft", 
          price: "$680,000", 
          img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600",
          slug: "river-north-modern-loft",
          bedrooms: 2,
          bathrooms: 2,
          area: "1,400 sq ft"
        },
        { 
          id: 32, 
          title: "Wicker Park Trendy Condo", 
          price: "$540,000", 
          img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=600",
          slug: "wicker-park-trendy-condo",
          bedrooms: 2,
          bathrooms: 1,
          area: "1,100 sq ft"
        }
      ]
    },
    
    // Washington Data
    "washington": {
      name: "Washington",
      desc: "Historic neighborhoods and modern metropolitan living.",
      banner: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=1200",
      properties: [
        { 
          id: 33, 
          title: "Capital Hill Manor", 
          price: "$1,800,000", 
          img: "https://images.unsplash.com/photo-1464146072230-91cabc968266?q=80&w=600",
          slug: "capital-hill-manor",
          bedrooms: 5,
          bathrooms: 4,
          area: "4,200 sq ft"
        },
        { 
          id: 34, 
          title: "Georgetown Classic", 
          price: "$2,200,000", 
          img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=600",
          slug: "georgetown-classic",
          bedrooms: 4,
          bathrooms: 4,
          area: "3,800 sq ft"
        },
        { 
          id: 35, 
          title: "Dupont Circle Condo", 
          price: "$670,000", 
          img: "https://images.unsplash.com/photo-1536376074432-a228d217929a?q=80&w=600",
          slug: "dupont-circle-condo",
          bedrooms: 2,
          bathrooms: 2,
          area: "1,300 sq ft"
        },
        { 
          id: 36, 
          title: "Potomac View Estate", 
          price: "$3,500,000", 
          img: "https://images.unsplash.com/photo-1575517111478-7f6afd0973db?q=80&w=600",
          slug: "potomac-view-estate",
          bedrooms: 6,
          bathrooms: 6,
          area: "5,500 sq ft"
        }
      ]
    }
  };

 
  const currentCity = cityData[slug];

  // If city not found, show error message with link back to home
  if (!currentCity) {
    return (
      <div className="container py-5 mt-5 text-center">
        <h2 style={{ color: "#1b4332" }}>Content Not Available</h2>
        <p className="text-muted mb-4">The city you're looking for doesn't exist or has no listings.</p>
        <Link to="/" className="btn btn-success mt-3" style={{ backgroundColor: "#2d6a4f" }}>
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f8faf9", minHeight: "100vh" }}>
      {/* Hero Banner Section */}
      <div 
        style={{ 
          height: "400px", 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${currentCity.banner})`,
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
          {/* City Name */}
          <h1 className="display-3 fw-bold">{currentCity.name}</h1>
          {/* City Description */}
          <p className="fs-5">{currentCity.desc}</p>
        </div>
      </div>

      {/* Properties Listing Section */}
      <div className="container py-5">
        {/* Header with title and back button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold" style={{ color: "#1b4332" }}>
            Listings in {currentCity.name}
          </h3>
          <Link to="/" className="btn btn-outline-success px-4 rounded-pill">
            Back Home
          </Link>
        </div>

        {/* Properties Grid - 4 cards per row on large screens */}
        <div className="row g-4">
          {currentCity.properties.map((property) => (
            <div key={property.id} className="col-12 col-md-6 col-lg-3">
              {/* Property Card */}
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                {/* Property Image - Clickable to navigate to property detail */}
                <img 
                  src={property.img} 
                  alt={property.title} 
                  style={{ 
                    height: "200px", 
                    objectFit: "cover",
                    cursor: "pointer" 
                  }}
                  onClick={() => navigate(`/properties/${slug}/${property.slug}`)}
                  className="hover-scale"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.transition = "transform 0.3s ease";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
                
                {/* Card Body */}
                <div className="card-body">
                  {/* Property Title */}
                  <h6 className="fw-bold mb-2" style={{ color: "#1b4332" }}>
                    {property.title}
                  </h6>
                  
                  {/* Quick property specs */}
                  <div className="d-flex gap-2 mb-2 text-muted small">
                    <span>{property.bedrooms} beds</span>
                    <span>•</span>
                    <span>{property.bathrooms} baths</span>
                    <span>•</span>
                    <span>{property.area}</span>
                  </div>
                  
                  {/* Price and View Button */}
                  <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                    <span className="fw-bold text-success">{property.price}</span>
                    <button 
                      onClick={() => navigate(`/properties/${slug}/${property.slug}`)}
                      className="btn btn-success btn-sm px-3 rounded-pill" 
                      style={{ backgroundColor: "#2d6a4f" }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add custom CSS for hover effects */}
      <style jsx>{`
        .hover-scale {
          transition: transform 0.3s ease;
        }
        .hover-scale:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default CityDetailPage;