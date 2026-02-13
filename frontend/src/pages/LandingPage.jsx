import React from 'react';
import HeroSection from './HeroSections';
import ServicesSection from './ServicesSection';
import TempCertifications from './TempCertifications';
import QuoteCTA from './QuoteCTA';
import HowWeWork from './HowWeWork';
import ForceSection from './ForceSection';
import CaseStudies from './CaseStudies';
import WhyChooseStip from './WhyChooseStip';
import OurLocations from './OurLocations';

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <HowWeWork />
      <ForceSection />
      <OurLocations />
      {/* 
      <CaseStudies /> 
      <WhyChooseStip />
      */}
      <QuoteCTA />
      <TempCertifications />
    </div>
  );
};

export default LandingPage;
