import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from "./components/ScrollToTop";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Layout Components
import Navbar from './components/Navbar';
import FooterSection from './components/footer.jsx';

// Home Page Sections
import HeroSection from './components/HeroSection';
import Companies from './components/Companies';
import Companies1 from './components/Companies1';
import HowItWorks from './components/HowItWork';
import FeaturedCategories from './components/FeaturedCategories';
import RecentProperties from './components/RecentProperties.jsx';
import WhyWorkWithUs from './components/WhyWorkWithUs.jsx';
import TestimonialSection from './components/TestimonialSection.jsx';
import PropertiesByArea from './components/PropertiesByArea.jsx';
import RecentArticles from './components/RecentArticles.jsx';
import FindHomeCTA from './components/FindHomeCTA.jsx';

// Page Components
import Contact from './components/Contact.jsx';
import CityDetailPage from './components/CityDetailPage';
import PropertyDetail from './components/PropertyDetail';
import CategoryPage from './components/CategoryPage';
import CategoryDetails from './components/CategoryDetails';
import ArticleDetails from './components/ArticleDetail.jsx';
// import GetStartedDetail from './components/GetStartedDetail';
import BuyHomeDetail from './components/BuyHomeDetail';
import SellHomeDetail from './components/SellHomeDetail';

// Global Styles
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Navbar />

        <Routes>
          {/* Main Route */}
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <Companies />
                <HowItWorks />
                <FeaturedCategories />
                <RecentProperties />
                <WhyWorkWithUs />
                <TestimonialSection />
                <Companies1 />
                <PropertiesByArea />
                <RecentArticles />
                <FindHomeCTA />
              </>
            }
          />

          {/* Dynamic Category Route */}
          <Route path="/category/:categoryType" element={<CategoryPage />} />
          <Route path="/property/:propertyId" element={<CategoryDetails />} />

          {/* City Detail Route */}
          <Route path="/properties/:slug" element={<CityDetailPage />} />

          {/* Property Detail Route */}
          <Route path="/properties/:citySlug/:propertySlug" element={<PropertyDetail />} />

          {/* Contact Page Route */}
          <Route path="/contact" element={<Contact />} />

          <Route path="/article/:id" element={<ArticleDetails />} />
          {/* <Route path="/get-started" element={<GetStartedDetail />} /> */}
          <Route path="/buy-home" element={<BuyHomeDetail />} />
          <Route path="/sell-home" element={<SellHomeDetail />} />
        </Routes>

        <FooterSection />
      </div>
    </Router>
  );
}

export default App;