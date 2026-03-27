import React from 'react';
import HeroSection from './HeroSection';
import Companies from './Companies';
import HowItWorks from './HowItWork';
import FeaturedCategories from './FeaturedCategories';
import RecentProperties from './RecentProperties';
import WhyWorkWithUs from './WhyWorkWithUs';
import TestimonialSection from './TestimonialSection';
import Companies1 from './Companies1';
import PropertiesByArea from './PropertiesByArea';
import RecentArticles from './RecentArticles';
import FindHomeCTA from './FindHomeCTA';

function HomePage() {
  return (
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
  );
}

export default HomePage;