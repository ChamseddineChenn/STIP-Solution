import React from 'react';
import HeroSection from './HeroSections';
import ServicesSection from './ServicesSection';
import CertificationsRow from './CertificationsRow';
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
      <CertificationsRow />
      <HowWeWork />
      <OurLocations />
      {/* <CaseStudies /> */}
      <WhyChooseStip />
      <QuoteForm />
    </div>
  );
};

export default LandingPage;
