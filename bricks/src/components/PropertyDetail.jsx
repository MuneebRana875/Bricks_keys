// PropertyDetail.jsx
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// This will almost always fail or be unnecessary
import A1 from "../assets/images/A1.jpeg";
import A2 from "../assets/images/A2.jpeg";
import A3 from "../assets/images/A3.jpeg";
import A4 from "../assets/images/A4.jpeg";
import A5 from "../assets/images/A5.jpeg";
import A6 from "../assets/images/A6.jpeg";
import A7 from "../assets/images/A7.jpg";
import A8 from "../assets/images/A8.jpeg";
import A9 from "../assets/images/A9.jpeg";
import A10 from "../assets/images/A10.jpeg";
import A11 from "../assets/images/A11.jpeg";
import A12 from "../assets/images/A12.jpeg";
import A13 from "../assets/images/A13.jpeg";
import A14 from "../assets/images/A14.jpeg";
import A15 from "../assets/images/A15.jpeg";
import A16 from "../assets/images/A16.jpeg";
import A17 from "../assets/images/A17.jpeg";
import A18 from "../assets/images/A18.jpeg";
import A19 from "../assets/images/A19.jpeg";
import A20 from "../assets/images/A20.jpeg";
import A21 from "../assets/images/A21.jpeg";
import A22 from "../assets/images/A22.jpeg";
import A23 from "../assets/images/A23.jpeg";
import A24 from "../assets/images/A24.jpeg";
import A25 from "../assets/images/A25.jpg";
import A26 from "../assets/images/A26.jpg";
import A27 from "../assets/images/A27.jpeg";
import A28 from "../assets/images/A28.jpeg";
import A29 from "../assets/images/A29.jpeg";
import A30 from "../assets/images/A30.jpeg";
import A31 from "../assets/images/A31.jpeg";
import A32 from "../assets/images/A32.jpeg";
import A33 from "../assets/images/A33.jpeg";
import A34 from "../assets/images/A34.jpeg";
import A35 from "../assets/images/A35.jpg";
import A36 from "../assets/images/A36.jpeg";


const PropertyDetail = () => {
  const { citySlug, propertySlug } = useParams();
  const navigate = useNavigate();

  // Complete data for all cities with their properties
  const allProperties = {
    // New York Properties
    "new-york": {
      name: "New York",
      properties: [
        { 
          id: 1, 
          title: "Manhattan Luxury Loft", 
          price: "$1,200,000", 
          slug: "manhattan-luxury-loft",
          img: "A1.jpeg",
          bedrooms: 3, 
          bathrooms: 2, 
          area: "2,500 sq ft", 
          yearBuilt: 2020,
          description: "Experience luxury living in the heart of Manhattan. This stunning loft features floor-to-ceiling windows, open concept layout, and premium finishes throughout.",
          features: ["Hardwood floors", "Central AC", "Smart home system", "Private terrace", "Doorman", "Gym access"],
          address: "123 Broadway, New York, NY 10001"
        },
        { 
          id: 2, 
          title: "Brooklyn Modern Condo", 
          price: "$850,000", 
          slug: "brooklyn-modern-condo",
          img: "A2.jpeg",
          bedrooms: 2, 
          bathrooms: 2, 
          area: "1,200 sq ft", 
          yearBuilt: 2019,
          description: "Modern condo in the heart of Brooklyn with stunning city views. Features high-end appliances, custom cabinetry, and a private balcony.",
          features: ["Stainless steel appliances", "Quartz countertops", "In-unit laundry", "Rooftop deck", "Parking available"],
          address: "456 Bedford Ave, Brooklyn, NY 11201"
        },
        { 
          id: 3, 
          title: "Central Park Penthouse", 
          price: "$3,500,000", 
          slug: "central-park-penthouse",
          img: "A3.jpeg",
          bedrooms: 4, 
          bathrooms: 3, 
          area: "3,800 sq ft", 
          yearBuilt: 2018,
          description: "Spectacular penthouse overlooking Central Park. This architectural masterpiece offers panoramic views, expansive terraces, and unparalleled luxury.",
          features: ["Private elevator", "Wine cellar", "Home theater", "Terraces", "Concierge service", "Pool access"],
          address: "789 5th Ave, New York, NY 10022"
        },
        { 
          id: 4, 
          title: "Queens Family Home", 
          price: "$720,000", 
          slug: "queens-family-home",
          img: "A4.jpeg",
          bedrooms: 4, 
          bathrooms: 3, 
          area: "2,200 sq ft", 
          yearBuilt: 2015,
          description: "Beautiful family home in quiet Queens neighborhood. Features a large backyard, updated kitchen, and finished basement perfect for entertaining.",
          features: ["Backyard", "Finished basement", "2-car garage", "Updated kitchen", "Hardwood floors"],
          address: "321 Elmhurst Ave, Queens, NY 11375"
        }
      ]
    },

    // San Diego Properties
    "san-diego": {
      name: "San Diego",
      properties: [
        { 
          id: 5, 
          title: "La Jolla Villa", 
          price: "$2,100,000", 
          slug: "la-jolla-villa",
          img: "A5.jpeg",
          bedrooms: 4, 
          bathrooms: 4, 
          area: "3,200 sq ft", 
          yearBuilt: 2021,
          description: "Mediterranean-style villa in prestigious La Jolla. Ocean views, courtyard with fountain, and luxurious finishes throughout.",
          features: ["Ocean view", "Pool", "Courtyard", "Chef's kitchen", "Wine room", "Guest house"],
          address: "123 Coast Blvd, La Jolla, CA 92037"
        },
        { 
          id: 6, 
          title: "Oceanfront Cottage", 
          price: "$1,450,000", 
          slug: "oceanfront-cottage",
          img: "A6.jpeg",
          bedrooms: 2, 
          bathrooms: 2, 
          area: "1,500 sq ft", 
          yearBuilt: 1950,
          description: "Charming oceanfront cottage with direct beach access. Recently renovated while preserving original character.",
          features: ["Beach access", "Deck", "Fireplace", "Renovated kitchen", "Outdoor shower"],
          address: "456 Pacific Ave, San Diego, CA 92109"
        },
        { 
          id: 7, 
          title: "Downtown Studio", 
          price: "$450,000", 
          slug: "downtown-studio",
          img: "A7.jpg",
          bedrooms: 1, 
          bathrooms: 1, 
          area: "650 sq ft", 
          yearBuilt: 2020,
          description: "Modern studio in downtown San Diego. Perfect for urban living with access to all amenities.",
          features: ["Floor-to-ceiling windows", "Rooftop lounge", "Fitness center", "Pet friendly"],
          address: "789 Market St, San Diego, CA 92101"
        },
        { 
          id: 8, 
          title: "Mission Valley Condo", 
          price: "$550,000", 
          slug: "mission-valley-condo",
          img: "A8.jpeg",
          bedrooms: 2, 
          bathrooms: 2, 
          area: "1,100 sq ft", 
          yearBuilt: 2018,
          description: "Spacious condo in Mission Valley with resort-style amenities. Close to shopping and dining.",
          features: ["Pool", "Tennis courts", "Gym", "Covered parking", "In-unit laundry"],
          address: "321 Camino Del Rio, San Diego, CA 92108"
        }
      ]
    },

    // Arizona Properties
    "arizona": {
      name: "Arizona",
      properties: [
        { 
          id: 9, 
          title: "Scottsdale Manor", 
          price: "$1,250,000", 
          slug: "scottsdale-manor",
          img: "A9.jpeg",
          bedrooms: 5, 
          bathrooms: 4, 
          area: "4,000 sq ft", 
          yearBuilt: 2019,
          description: "Magnificent manor in Scottsdale with stunning desert views. Features resort-style pool, outdoor kitchen, and spacious entertaining areas.",
          features: ["Desert views", "Resort pool", "Outdoor kitchen", "Wine cellar", "Home theater", "Golf course access"],
          address: "456 Desert Mountain Dr, Scottsdale, AZ 85262"
        },
        { 
          id: 10, 
          title: "Phoenix Desert Villa", 
          price: "$890,000", 
          slug: "phoenix-desert-villa",
          img: "A10.jpeg",
          bedrooms: 3, 
          bathrooms: 3, 
          area: "2,800 sq ft", 
          yearBuilt: 2020,
          description: "Contemporary desert villa with mountain views. Open floor plan, modern finishes, and beautiful landscaping.",
          features: ["Mountain views", "Saltwater pool", "Smart home", "Solar panels", "3-car garage", "Guest casita"],
          address: "789 Camelback Rd, Phoenix, AZ 85018"
        },
        { 
          id: 11, 
          title: "Sedona Red Rock Home", 
          price: "$1,100,000", 
          slug: "sedona-red-rock-home",
          img: "A11.jpeg",
          bedrooms: 3, 
          bathrooms: 3, 
          area: "2,500 sq ft", 
          yearBuilt: 2017,
          description: "Stunning home surrounded by Sedona's famous red rocks. Perfect for nature lovers with hiking trails nearby.",
          features: ["Red rock views", "Hiking access", "Hot tub", "Screened patio", "Artist studio", "Organic garden"],
          address: "123 Red Rock Loop, Sedona, AZ 86336"
        },
        { 
          id: 12, 
          title: "Tucson Ranch House", 
          price: "$420,000", 
          slug: "tucson-ranch-house",
          img: "A12.jpeg",
          bedrooms: 3, 
          bathrooms: 2, 
          area: "1,800 sq ft", 
          yearBuilt: 1985,
          description: "Classic ranch-style home with modern updates. Large lot, mature trees, and peaceful desert surroundings.",
          features: ["Horse property", "Barn", "Corrals", "Workshop", "Fruit trees", "Mountain views"],
          address: "456 Sabino Canyon Rd, Tucson, AZ 85750"
        }
      ]
    },

    // Miami Properties
    "miami": {
      name: "Miami",
      properties: [
        { 
          id: 13, 
          title: "South Beach Penthouse", 
          price: "$3,200,000", 
          slug: "south-beach-penthouse",
          img: "A13.jpeg",
          bedrooms: 3, 
          bathrooms: 3, 
          area: "2,800 sq ft", 
          yearBuilt: 2021,
          description: "Luxury penthouse in the heart of South Beach. Direct ocean views, private rooftop terrace, and designer finishes.",
          features: ["Ocean front", "Rooftop pool", "Private elevator", "Wet bar", "Smart home", "Concierge"],
          address: "123 Ocean Dr, Miami Beach, FL 33139"
        },
        { 
          id: 14, 
          title: "Coral Gables Estate", 
          price: "$2,100,000", 
          slug: "coral-gables-estate",
          img: "A14.jpeg",
          bedrooms: 5, 
          bathrooms: 5, 
          area: "4,500 sq ft", 
          yearBuilt: 2018,
          description: "Mediterranean-style estate in prestigious Coral Gables. Lush gardens, pool, and elegant entertaining spaces.",
          features: ["Mediterranean architecture", "Pool & spa", "Tennis court", "Guest house", "Wine cellar", "Home theater"],
          address: "456 Granada Blvd, Coral Gables, FL 33134"
        },
        { 
          id: 15, 
          title: "Brickell Bay Condo", 
          price: "$750,000", 
          slug: "brickell-bay-condo",
          img: "A15.jpeg",
          bedrooms: 2, 
          bathrooms: 2, 
          area: "1,400 sq ft", 
          yearBuilt: 2020,
          description: "Modern condo with stunning bay views. Located in the heart of Miami's financial district.",
          features: ["Bay views", "Infinity pool", "Fitness center", "Rooftop lounge", "Pet spa", "Valet parking"],
          address: "789 Brickell Ave, Miami, FL 33131"
        },
        { 
          id: 16, 
          title: "Key Biscayne Villa", 
          price: "$4,500,000", 
          slug: "key-biscayne-villa",
          img: "A16.jpeg",
          bedrooms: 6, 
          bathrooms: 6, 
          area: "5,200 sq ft", 
          yearBuilt: 2019,
          description: "Waterfront villa with private dock. Perfect for boating enthusiasts with direct ocean access.",
          features: ["Private dock", "Boat lift", "Infinity pool", "Outdoor kitchen", "Beach access", "Elevator"],
          address: "123 Harbor Dr, Key Biscayne, FL 33149"
        }
      ]
    },

    // Los Angeles Properties
    "los-angeles": {
      name: "Los Angeles",
      properties: [
        { 
          id: 17, 
          title: "Beverly Hills Mansion", 
          price: "$5,800,000", 
          slug: "beverly-hills-mansion",
          img: "A17.jpeg",
          bedrooms: 6, 
          bathrooms: 7, 
          area: "6,500 sq ft", 
          yearBuilt: 2022,
          description: "Brand new mansion in the heart of Beverly Hills. Celebrity-worthy amenities and impeccable design.",
          features: ["Infinity pool", "Home theater", "Wine room", "Gym", "Spa", "Smart home", "Guest house"],
          address: "123 Rodeo Dr, Beverly Hills, CA 90210"
        },
        { 
          id: 18, 
          title: "Santa Monica Beach House", 
          price: "$2,400,000", 
          slug: "santa-monica-beach-house",
          img: "A18.jpeg",
          bedrooms: 4, 
          bathrooms: 3, 
          area: "2,800 sq ft", 
          yearBuilt: 2015,
          description: "Steps from the sand, this beach house captures the essence of California coastal living.",
          features: ["Beach access", "Ocean views", "Roof deck", "Outdoor shower", "Surfboard storage", "Fire pit"],
          address: "456 Ocean Ave, Santa Monica, CA 90401"
        },
        { 
          id: 19, 
          title: "Hollywood Hills Modern", 
          price: "$3,100,000", 
          slug: "hollywood-hills-modern",
          img: "A19.jpeg",
          bedrooms: 4, 
          bathrooms: 4, 
          area: "3,500 sq ft", 
          yearBuilt: 2020,
          description: "Architectural masterpiece with city lights views. Floor-to-ceiling glass and indoor-outdoor living.",
          features: ["City views", "Infinity pool", "Glass walls", "Home automation", "Rooftop deck", "Recording studio"],
          address: "789 Sunset Plaza Dr, Los Angeles, CA 90069"
        },
        { 
          id: 20, 
          title: "Silver Lake Bungalow", 
          price: "$980,000", 
          slug: "silver-lake-bungalow",
          img: "A20.jpeg",
          bedrooms: 3, 
          bathrooms: 2, 
          area: "1,600 sq ft", 
          yearBuilt: 1920,
          description: "Charming craftsman bungalow with modern updates. Original details meet contemporary style.",
          features: ["Original hardwood", "Fireplace", "Gardens", "Detached studio", "Permaculture garden", "Solar"],
          address: "321 Sunset Blvd, Los Angeles, CA 90026"
        }
      ]
    },

    // Hawaii Properties
    "hawaii": {
      name: "Hawaii",
      properties: [
        { 
          id: 21, 
          title: "Maui Beachfront Villa", 
          price: "$2,900,000", 
          slug: "maui-beachfront-villa",
          img: "A21.jpeg",
          bedrooms: 4, 
          bathrooms: 4, 
          area: "3,200 sq ft", 
          yearBuilt: 2021,
          description: "Direct beachfront on Maui's golden coast. Wake up to the sound of waves in this tropical paradise.",
          features: ["Private beach", "Infinity pool", "Tiki bar", "Outdoor shower", "Landscaped gardens", "Volcanic stone"],
          address: "123 Kaanapali Beach, Maui, HI 96761"
        },
        { 
          id: 22, 
          title: "Oahu Mountain Retreat", 
          price: "$1,200,000", 
          slug: "oahu-mountain-retreat",
          img: "A22.jpeg",
          bedrooms: 3, 
          bathrooms: 3, 
          area: "2,400 sq ft", 
          yearBuilt: 2018,
          description: "Secluded retreat in the mountains of Oahu. Surrounded by tropical forest and waterfalls.",
          features: ["Waterfall views", "Rainforest setting", "Yoga deck", "Outdoor bath", "Fruit trees", "Hiking trails"],
          address: "456 Tantalus Dr, Honolulu, HI 96822"
        },
        { 
          id: 23, 
          title: "Honolulu Skyline Suite", 
          price: "$850,000", 
          slug: "honolulu-skyline-suite",
          img: "A23.jpeg",
          bedrooms: 2, 
          bathrooms: 2, 
          area: "1,300 sq ft", 
          yearBuilt: 2019,
          description: "Luxury condo with panoramic ocean and mountain views. Modern finishes and resort amenities.",
          features: ["Ocean views", "Resort pool", "Tennis courts", "Fitness center", "Concierge", "Parking"],
          address: "789 Kalakaua Ave, Honolulu, HI 96815"
        },
        { 
          id: 24, 
          title: "Kauai Eco House", 
          price: "$1,100,000", 
          slug: "kauai-eco-house",
          img: "A24.jpeg",
          bedrooms: 3, 
          bathrooms: 2, 
          area: "2,000 sq ft", 
          yearBuilt: 2020,
          description: "Sustainable paradise on the Garden Isle. Solar-powered home with organic gardens and waterfalls.",
          features: ["Solar powered", "Rainwater collection", "Organic farm", "Waterfall views", "Composting", "Permaculture"],
          address: "321 Na Pali Coast, Kauai, HI 96746"
        }
      ]
    },

    // Florida Properties
    "florida": {
      name: "Florida",
      properties: [
        { 
          id: 25, 
          title: "Orlando Theme Park Villa", 
          price: "$650,000", 
          slug: "orlando-theme-park-villa",
          img: "A25.jpg",
          bedrooms: 4, 
          bathrooms: 3, 
          area: "2,500 sq ft", 
          yearBuilt: 2022,
          description: "Perfect vacation home minutes from Disney World. Pool home with themed rooms and entertainment.",
          features: ["Private pool", "Game room", "Movie theater", "Near Disney", "Themed rooms", "Outdoor kitchen"],
          address: "123 Magic Kingdom Way, Orlando, FL 32836"
        },
        { 
          id: 26, 
          title: "Tampa Bay Waterfront", 
          price: "$1,200,000", 
          slug: "tampa-bay-waterfront",
          img: "A26.jpg",
          bedrooms: 3, 
          bathrooms: 3, 
          area: "2,200 sq ft", 
          yearBuilt: 2019,
          description: "Waterfront home with direct bay access. Perfect for boating and water sports.",
          features: ["Boat dock", "Seawall", "Pool", "Outdoor kitchen", "Sunset views", "Fish cleaning station"],
          address: "456 Bayshore Blvd, Tampa, FL 33606"
        },
        { 
          id: 27, 
          title: "Naples Luxury Mansion", 
          price: "$3,400,000", 
          slug: "naples-luxury-mansion",
          img: "A27.jpeg",
          bedrooms: 5, 
          bathrooms: 5, 
          area: "4,800 sq ft", 
          yearBuilt: 2021,
          description: "Gulf-front mansion with private beach access. The epitome of Florida luxury living.",
          features: ["Gulf front", "Private beach", "Infinity pool", "Tennis court", "Guest house", "Elevator"],
          address: "789 Gulf Shore Blvd, Naples, FL 34102"
        },
        { 
          id: 28, 
          title: "Jacksonville Family Estate", 
          price: "$550,000", 
          slug: "jacksonville-family-estate",
          img: "A28.jpeg",
          bedrooms: 4, 
          bathrooms: 3, 
          area: "2,300 sq ft", 
          yearBuilt: 2017,
          description: "Spacious family home with pool and large yard. Great schools and family-friendly neighborhood.",
          features: ["Pool", "Playground", "Large yard", "Finished basement", "Home office", "3-car garage"],
          address: "321 San Jose Blvd, Jacksonville, FL 32257"
        }
      ]
    },

    // Chicago Properties
    "chicago": {
      name: "Chicago",
      properties: [
        { 
          id: 29, 
          title: "Lake Shore Drive Apt", 
          price: "$1,100,000", 
          slug: "lake-shore-drive-apt",
          img: "A29.jpeg",
          bedrooms: 2, 
          bathrooms: 2, 
          area: "1,500 sq ft", 
          yearBuilt: 2020,
          description: "Luxury apartment with stunning lake views. Located on iconic Lake Shore Drive.",
          features: ["Lake views", "Doorman", "Gym", "Pool", "Rooftop deck", "Parking included"],
          address: "123 Lake Shore Dr, Chicago, IL 60611"
        },
        { 
          id: 30, 
          title: "Lincoln Park Brick House", 
          price: "$920,000", 
          slug: "lincoln-park-brick-house",
          img: "A30.jpeg",
          bedrooms: 4, 
          bathrooms: 3, 
          area: "2,800 sq ft", 
          yearBuilt: 1910,
          description: "Classic Chicago brick home in desirable Lincoln Park. Original details with modern updates.",
          features: ["Original woodwork", "Fireplaces", "Garden", "Deck", "Wine cellar", "Attic storage"],
          address: "456 Fullerton Ave, Chicago, IL 60614"
        },
        { 
          id: 31, 
          title: "River North Modern Loft", 
          price: "$680,000", 
          slug: "river-north-modern-loft",
          img: "A31.jpeg",
          bedrooms: 2, 
          bathrooms: 2, 
          area: "1,400 sq ft", 
          yearBuilt: 2018,
          description: "Industrial-chic loft in the heart of River North. Exposed brick and modern finishes.",
          features: ["Exposed brick", "High ceilings", "Concrete floors", "Rooftop access", "Dog run", "Bike storage"],
          address: "789 Kinzie St, Chicago, IL 60654"
        },
        { 
          id: 32, 
          title: "Wicker Park Trendy Condo", 
          price: "$540,000", 
          slug: "wicker-park-trendy-condo",
          img: "A32.jpeg",
          bedrooms: 2, 
          bathrooms: 1, 
          area: "1,100 sq ft", 
          yearBuilt: 2016,
          description: "Trendy condo in hip Wicker Park. Walk to shops, restaurants, and nightlife.",
          features: ["Balcony", "In-unit laundry", "Rooftop deck", "Fitness center", "Storage locker", "Bike room"],
          address: "321 Milwaukee Ave, Chicago, IL 60622"
        }
      ]
    },

    // Washington Properties
    "washington": {
      name: "Washington",
      properties: [
        { 
          id: 33, 
          title: "Capital Hill Manor", 
          price: "$1,800,000", 
          slug: "capital-hill-manor",
          img: "A33.jpeg",
          bedrooms: 5, 
          bathrooms: 4, 
          area: "4,200 sq ft", 
          yearBuilt: 1905,
          description: "Historic manor on Capitol Hill. Steps from the US Capitol and Supreme Court.",
          features: ["Historic landmark", "Original details", "Grand staircase", "Ballroom", "Garden", "Carriage house"],
          address: "123 Pennsylvania Ave, Washington, DC 20003"
        },
        { 
          id: 34, 
          title: "Georgetown Classic", 
          price: "$2,200,000", 
          slug: "georgetown-classic",
          img: "A34.jpeg",
          bedrooms: 4, 
          bathrooms: 4, 
          area: "3,800 sq ft", 
          yearBuilt: 1890,
          description: "Elegant Federal-style home in historic Georgetown. Cobblestone streets and waterfront nearby.",
          features: ["Federal architecture", "Private garden", "Fireplaces", "Wine cellar", "Rooftop terrace", "Parking"],
          address: "456 M St NW, Washington, DC 20007"
        },
        { 
          id: 35, 
          title: "Dupont Circle Condo", 
          price: "$670,000", 
          slug: "dupont-circle-condo",
          img: "A35.jpg",
          bedrooms: 2, 
          bathrooms: 2, 
          area: "1,300 sq ft", 
          yearBuilt: 2019,
          description: "Modern condo in vibrant Dupont Circle. Walk to embassies, restaurants, and nightlife.",
          features: ["Rooftop pool", "Fitness center", "Concierge", "Pet spa", "Bike storage", "Parking available"],
          address: "789 Connecticut Ave, Washington, DC 20008"
        },
        { 
          id: 36, 
          title: "Potomac View Estate", 
          price: "$3,500,000", 
          slug: "potomac-view-estate",
          img: "A36.jpeg",
          bedrooms: 6, 
          bathrooms: 6, 
          area: "5,500 sq ft", 
          yearBuilt: 2021,
          description: "Magnificent estate overlooking the Potomac River. Gated community with resort amenities.",
          features: ["River views", "Pool & spa", "Tennis court", "Home theater", "Wine room", "Guest house"],
          address: "321 Potomac River Rd, McLean, VA 22102"
        }
      ]
    }
  };

  const cityData = allProperties[citySlug];
  
  if (!cityData) {
    return (
      <div className="container py-5 mt-5 text-center">
        <div className="bg-white p-5 rounded-4 shadow-sm" style={{ maxWidth: "500px", margin: "0 auto" }}>
          <h2 className="mb-3" style={{ color: "#1b4332" }}>City Not Found</h2>
          <p className="text-muted mb-4">The city you're looking for doesn't exist or has no listings.</p>
          <button 
            onClick={() => navigate(-1)} 
            className="btn btn-success px-4 py-2"
            style={{ backgroundColor: "#2d6a4f" }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const property = cityData.properties.find(p => p.slug === propertySlug);

  if (!property) {
    return (
      <div className="container py-5 mt-5 text-center">
        <div className="bg-white p-5 rounded-4 shadow-sm" style={{ maxWidth: "500px", margin: "0 auto" }}>
          <h2 className="mb-3" style={{ color: "#1b4332" }}>Property Not Found</h2>
          <p className="text-muted mb-4">The property you're looking for doesn't exist in {cityData.name}.</p>
          <button 
            onClick={() => navigate(-1)} 
            className="btn btn-success px-4 py-2"
            style={{ backgroundColor: "#2d6a4f" }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f8faf9", minHeight: "100vh" }}>
      {/* Hero Section with Image */}
      <div 
        style={{ 
          height: "500px", 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${property.img})`,
          backgroundSize: "cover", 
          backgroundPosition: "center",
          position: "relative"
        }}
      >
        <div className="container h-100 d-flex align-items-end pb-5">
          <div className="text-white">
            <Link 
              to={`/properties/${citySlug}`} 
              className="text-white text-decoration-none mb-3 d-inline-block"
              style={{ fontSize: "1.1rem" }}
            >
              ← Back to {cityData.name} listings
            </Link>
            <h1 className="display-4 fw-bold">{property.title}</h1>
            <p className="fs-5">{property.address}</p>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="container py-5">
        <div className="row">
          {/* Main Content */}
          <div className="col-lg-8">
            {/* Quick Facts */}
            <div className="bg-white p-4 rounded-4 shadow-sm mb-4">
              <h3 className="fw-bold mb-4" style={{ color: "#1b4332" }}>Property Overview</h3>
              <div className="row g-4">
                <div className="col-6 col-md-3">
                  <div className="text-center p-3 bg-light rounded-3">
                    <i className="bi bi-house-door fs-4" style={{ color: "#2d6a4f" }}></i>
                    <p className="mb-0 mt-2 text-muted small">Bedrooms</p>
                    <p className="fw-bold mb-0">{property.bedrooms}</p>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="text-center p-3 bg-light rounded-3">
                    <i className="bi bi-droplet fs-4" style={{ color: "#2d6a4f" }}></i>
                    <p className="mb-0 mt-2 text-muted small">Bathrooms</p>
                    <p className="fw-bold mb-0">{property.bathrooms}</p>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="text-center p-3 bg-light rounded-3">
                    <i className="bi bi-arrows-angle-expand fs-4" style={{ color: "#2d6a4f" }}></i>
                    <p className="mb-0 mt-2 text-muted small">Area</p>
                    <p className="fw-bold mb-0">{property.area}</p>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="text-center p-3 bg-light rounded-3">
                    <i className="bi bi-calendar fs-4" style={{ color: "#2d6a4f" }}></i>
                    <p className="mb-0 mt-2 text-muted small">Year Built</p>
                    <p className="fw-bold mb-0">{property.yearBuilt}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-4 rounded-4 shadow-sm mb-4">
              <h3 className="fw-bold mb-3" style={{ color: "#1b4332" }}>Description</h3>
              <p className="text-muted" style={{ lineHeight: "1.8", fontSize: "1.1rem" }}>
                {property.description}
              </p>
            </div>

            {/* Features */}
            <div className="bg-white p-4 rounded-4 shadow-sm mb-4">
              <h3 className="fw-bold mb-3" style={{ color: "#1b4332" }}>Features & Amenities</h3>
              <div className="row">
                {property.features.map((feature, index) => (
                  <div key={index} className="col-md-6 mb-3">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-check-circle-fill me-3 fs-5" style={{ color: "#2d6a4f" }}></i>
                      <span>{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            {/* Price Card */}
            <div className="bg-white p-4 rounded-4 shadow-sm mb-4">
              <h2 className="fw-bold text-success mb-3">{property.price}</h2>
              <button 
                className="btn w-100 py-3 mb-3 text-white fw-bold"
                style={{ backgroundColor: "#2d6a4f", borderRadius: "50px" }}
              >
                <i className="bi bi-calendar-check me-2"></i>
                Schedule a Tour
              </button>
              
              {/* Contact Agent Button - Updated with Link */}
              <Link 
                to="/contact"
                className="btn w-100 py-3 text-success fw-bold text-decoration-none d-block text-center"
                style={{ 
                  backgroundColor: "transparent", 
                  border: "2px solid #2d6a4f",
                  borderRadius: "50px"
                }}
              >
                <i className="bi bi-envelope me-2"></i>
                Contact Agent
              </Link>
            </div>

            {/* Location Card */}
            <div className="bg-white p-4 rounded-4 shadow-sm">
              <h4 className="fw-bold mb-3" style={{ color: "#1b4332" }}>Location</h4>
              <p className="mb-3">
                <i className="bi bi-geo-alt-fill me-2" style={{ color: "#2d6a4f" }}></i>
                {property.address}
              </p>
              {/* Simple Map Placeholder */}
              <div 
                className="bg-light rounded-3 d-flex align-items-center justify-content-center"
                style={{ height: "150px", background: "#e9ecef" }}
              >
                <p className="text-muted mb-0">
                  <i className="bi bi-map fs-2 d-block text-center mb-2"></i>
                  Map View
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;