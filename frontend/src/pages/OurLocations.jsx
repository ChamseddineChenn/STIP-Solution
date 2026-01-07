import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMapPin,
  FiHome,
  FiPackage,
  FiPhone,
  FiMail,
  FiGlobe,
} from 'react-icons/fi';
import { assets } from '../assets/assets';

const OurLocations = () => {
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const hoverTimeoutRef = useRef(null);

  const locations = {
    headquarters: {
      id: 'headquarters',
      title: 'Siège social et bureau principal',
      city: 'Montréal, Québec',
      address: '2828 Boul Laurier Tour 1 Étage 7, Québec, QC G1V 0B9',
      image: assets.STIP_Siege_Image,
      icon: <FiHome className="w-8 h-8" />,
      phone: '+1 (418) 990-4459 / +1 (501) 458-5859',
      email: 'contact@stip.ca',
      coordinates: { top: '76%', left: '62.5%' },
    },
    facility: {
      id: 'facility',
      title: 'Centre opérationnel',
      city: 'Québec, Québec',
      address: '500 Rue St. George, Moncton, NB E1C 1Y3',
      image: assets.Warehouse_Image,
      icon: <FiPackage className="w-8 h-8" />,
      phone: '+1 (418) 990-4459 / +1 (501) 458-5859',
      email: 'contact@stip.ca',
      coordinates: { top: '73%', left: '68%' },
    },
    capsante: {
      id: 'capsante',
      title: 'Espace manufacturier et entreposage',
      city: 'Cap-Santé, Québec',
      address: '23 Rte DelageCap-Santé, QC G0A 1L0',
      image: assets.Warehouse_Image,
      icon: <FiPackage className="w-8 h-8" />,
      phone: '+1 (418) 990-4459 / +1 (501) 458-5859',
      email: 'contact@stip.ca',
      coordinates: { top: '80%', left: '60%' },
    },
  };

  const handleMouseEnter = (locationId) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredLocation(locationId);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredLocation(null);
    }, 150);
  };

  const handleOverlayEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  const handleOverlayLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredLocation(null);
    }, 150);
  };

  // Calculate overlay position to prevent clipping
  const getOverlayPosition = () => {
    if (!hoveredLocation) return {};

    const location = locations[hoveredLocation];
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Center on mobile
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
    }

    // For desktop, calculate viewport boundaries
    const overlayWidth = 420; // Slightly wider for better spacing
    const overlayHeight = 500; // MUCH taller for better spacing
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Convert pin position to viewport coordinates
    const pinLeftPercent = parseFloat(location.coordinates.left);
    const pinTopPercent = parseFloat(location.coordinates.top);

    // Calculate pin position in pixels
    const pinLeftPx = (pinLeftPercent / 100) * viewportWidth;
    const pinTopPx = (pinTopPercent / 100) * viewportHeight;

    // Default position: below and to the right of pin
    let top = pinTopPx + 60;
    let left = pinLeftPx + 30;

    // Check if overlay would go off right side of viewport
    if (left + overlayWidth > viewportWidth) {
      left = pinLeftPx - overlayWidth - 30;
    }

    // Check if overlay would go off left side
    if (left < 0) {
      left = 20;
    }

    // Check if overlay would go off bottom
    if (top + overlayHeight > viewportHeight) {
      top = pinTopPx - overlayHeight - 20;
    }

    // Check if overlay would go off top
    if (top < 0) {
      top = 20;
    }

    return {
      top: `${top}px`,
      left: `${left}px`,
    };
  };

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center mb-6"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Opérations basées au Québec
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Installations stratégiquement situées à travers le Québec, au
            service des clients industriels à l'échelle de la province et
            au-delà
          </p>
        </div>

        {/* Map Container - NO ROUNDED CORNERS */}
        <div className="relative h-[600px] w-full overflow-hidden border-2 border-gray-200 shadow-xl mb-12">
          {/* Canada Map Background */}
          <div className="absolute inset-0 bg-dark-blue">
            <img
              src={assets.canada_map_img}
              alt="Canada Map"
              className="w-full h-full object-contain opacity-40"
              style={{ filter: 'brightness(1.1) contrast(1.1)' }}
            />
          </div>

          {/* Map Legend - NO ROUNDED CORNERS */}
          <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-sm p-6 shadow-2xl border border-gray-200 z-30">
            <h3 className="font-bold text-gray-900 mb-4 text-lg">
              Emplacements
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-primary mr-3" />
                <span className="text-gray-900 font-medium">Siège social</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-800 mr-3" />
                <span className="text-gray-900 font-medium">
                  Centre opérationnel
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-accent mr-3" />
                <span className="text-gray-900 font-medium">
                  Espace manufacturier
                </span>
              </div>
            </div>
          </div>

          {/* Statistics Overlay - NO ROUNDED CORNERS */}
          <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm p-6 shadow-2xl border border-gray-200 z-30">
            <div className="flex items-center mb-4">
              <FiGlobe className="w-6 h-6 text-primary mr-3" />
              <h3 className="font-bold text-gray-900 text-lg">
                Opérations au Québec
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">3</div>
                <div className="text-sm text-gray-600">Emplacements</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">120K+</div>
                <div className="text-sm text-gray-600">pi²</div>
              </div>
            </div>
          </div>

          {/* Montreal Marker - Headquarters */}
          <div
            className="absolute z-20 group"
            style={{
              top: locations.headquarters.coordinates.top,
              left: locations.headquarters.coordinates.left,
            }}
            onMouseEnter={() => handleMouseEnter('headquarters')}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shadow-2xl group-hover:shadow-3xl transition-all duration-300 border-4 border-white">
                <FiMapPin className="w-6 h-6" />
              </div>
              <motion.div
                className="absolute inset-0 w-10 h- bg-primary rounded-full opacity-30 border-4 border-white"
                animate={{ scale: [1, 1.8, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </motion.div>
          </div>

          {/* Quebec City Marker - Facility */}
          <div
            className="absolute z-20 group"
            style={{
              top: locations.facility.coordinates.top,
              left: locations.facility.coordinates.left,
            }}
            onMouseEnter={() => handleMouseEnter('facility')}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white shadow-2xl group-hover:shadow-3xl transition-all duration-300 border-4 border-white">
                <FiMapPin className="w-6 h-6" />
              </div>
              <motion.div
                className="absolute inset-0 w-10 h-10 bg-gray-800 rounded-full opacity-30 border-4 border-white"
                animate={{ scale: [1, 1.8, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              />
            </motion.div>
          </div>

          {/* Cap-Santé Marker - Manufacturing Space */}
          <div
            className="absolute z-20 group"
            style={{
              top: locations.capsante.coordinates.top,
              left: locations.capsante.coordinates.left,
            }}
            onMouseEnter={() => handleMouseEnter('capsante')}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white shadow-2xl group-hover:shadow-3xl transition-all duration-300 border-4 border-white">
                <FiMapPin className="w-6 h-6" />
              </div>
              <motion.div
                className="absolute inset-0 w-10 h-10 bg-accent rounded-full opacity-30 border-4 border-white"
                animate={{ scale: [1, 1.8, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: 1 }}
              />
            </motion.div>
          </div>
        </div>

        {/* Hover Overlay - SHARP CORNERS, MORE HEIGHT, BETTER SPACING */}
        <AnimatePresence>
          {hoveredLocation && (
            <motion.div
              key={hoveredLocation}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed z-9999 bg-white shadow-2xl w-[420px] max-w-[90vw] border border-gray-200"
              style={getOverlayPosition()}
              onMouseEnter={handleOverlayEnter}
              onMouseLeave={handleOverlayLeave}
            >
              {/* Image - 70% of overlay height */}
              <div className="h-[350px] overflow-hidden">
                <img
                  src={locations[hoveredLocation].image}
                  alt={locations[hoveredLocation].title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Content - 30% of overlay height - WITH PROPER SPACING */}
              <div className="h-[150px] p-6 flex flex-col justify-center space-y-4">
                {/* Title - PROPER SPACING */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                  {locations[hoveredLocation].title}
                </h3>

                {/* Essential Information - WITH SPACING */}
                <div className="space-y-3">
                  {/* Phone - WITH SPACING */}
                  <div className="flex items-center">
                    <FiPhone className="w-5 h-5 text-primary mr-3 shrink-0" />
                    <div className="flex-1">
                      <span className="text-base text-gray-900 font-medium">
                        {locations[hoveredLocation].phone}
                      </span>
                    </div>
                  </div>

                  {/* Email - WITH SPACING */}
                  <div className="flex items-center">
                    <FiMail className="w-5 h-5 text-primary mr-3 shrink-0" />
                    <div className="flex-1">
                      <span className="text-base text-gray-900 font-medium wrap-break-word">
                        {locations[hoveredLocation].email}
                      </span>
                    </div>
                  </div>

                  {/* Location - WITH SPACING */}
                  <div className="flex items-center">
                    <FiMapPin className="w-5 h-5 text-primary mr-3 shrink-0" />
                    <div className="flex-1">
                      <span className="text-base text-gray-900 font-medium">
                        {locations[hoveredLocation].city}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            <span className="font-semibold text-primary">
              Survolez un marqueur
            </span>{' '}
            pour voir les détails de l'emplacement
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurLocations;
