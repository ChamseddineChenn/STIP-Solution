import React from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import Footer from './components/Footer';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Blogs from './pages/Blogs';
import BlogPage from './pages/BlogPage';
import Careers from './pages/Careers';
import JobPage from './pages/JobPage';
import CustomManufacturing from './pages/Services/CustomManufacturing';
import Engineering3DScanning from './pages/Services/Engineering3DScanning';
import WeldingAssembly from './pages/Services/WeldingAssembly';
import IndustrialCleaning from './pages/Services/IndustrialCleaning';
import IndustrialMaintenance from './pages/Services/IndustrialMaintenance';
import PaintingSandblasting from './pages/Services/PaintingSandblasting';
import MobileWelding from './pages/Services/MobileWelding';
import LaborRental from './pages/Services/LaborRental';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/case-studies" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:id" element={<JobPage />} />
          <Route path="/services" element={<Services />} />
          <Route
            path="/services/custom-manufacturing"
            element={<CustomManufacturing />}
          />
          <Route
            path="/services/engineering-3d-scanning"
            element={<Engineering3DScanning />}
          />
          <Route
            path="/services/welding-assembly"
            element={<WeldingAssembly />}
          />
          <Route
            path="/services/industrial-cleaning"
            element={<IndustrialCleaning />}
          />
          <Route
            path="/services/industrial-maintenance"
            element={<IndustrialMaintenance />}
          />
          <Route
            path="/services/painting-sandblasting"
            element={<PaintingSandblasting />}
          />
          <Route path="/services/mobile-welding" element={<MobileWelding />} />
          <Route path="/services/labor-rental" element={<LaborRental />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
