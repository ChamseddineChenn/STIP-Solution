import React from 'react';
import HeroSection from './HeroSections';
import ServicesSection from './ServicesSection';
import TempCertifications from './TempCertifications';
import QuoteForm from './QuoteForm';
import HowWeWork from './HowWeWork';
import CaseStudies from './CaseStudies';
import WhyChooseStip from './WhyChooseStip';
import OurLocations from './OurLocations';

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <HowWeWork />
      <OurLocations />
      {/* <CaseStudies /> */}
      <WhyChooseStip />
      <TempCertifications />
      <QuoteForm />
    </div>
  );
};

export default LandingPage;
