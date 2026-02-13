import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { assets } from '../assets/assets';
import Button from './Button.jsx';
import {
  FiChevronDown,
  FiZap,
  FiTool,
  FiCpu,
  FiDroplet,
  FiSettings,
  FiFeather,
  FiTruck,
  FiUsers,
} from 'react-icons/fi';

// Move ServicesDropdown outside of Navbar component to fix component creation error
const ServicesDropdown = React.memo(
  ({ services, onClose, dropdownRef, setServicesOpen }) => {
    const navigate = useNavigate();
    const contentRef = useRef(null);

    const handleMouseLeave = useCallback(() => {
      setServicesOpen(false);
    }, [setServicesOpen]);

    return (
      <motion.div
        ref={dropdownRef}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="fixed top-16 left-0 right-0 z-40 bg-dark-blue shadow-2xl"
        onMouseEnter={() => setServicesOpen(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Invisible hitbox extension to top (connects to navbar) */}
        <div className="absolute -top-6 left-0 right-0 h-6" />

        {/* Full-width services grid - no scrolling */}
        <div ref={contentRef} className="w-full px-6 sm:px-8 lg:px-12 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-max">
            {services.map((service) => (
              <Link
                key={service.href}
                to={service.href}
                className="group relative p-4 transition-all duration-300"
                onClick={onClose}
              >
                {/* Minimal underline on hover */}
                <div className="absolute bottom-0 left-4 right-4 h-px bg-primary-50/0 group-hover:bg-primary-50 transition-all duration-300" />

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center text-primary-50/70 group-hover:text-primary-50 transition-colors shrink-0 mt-0.5">
                    {service.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-text-light group-hover:text-primary-50 transition-colors leading-tight">
                      {service.label}
                    </div>
                    <div className="text-xs text-text-secondary mt-1">
                      {service.category}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA Section - Minimal Design */}
          <div className="mt-8 pt-6 border-t border-primary-50/10">
            {/* Text on one line */}
            <div className="flex flex-col items-start gap-4 mb-4">
              <h4 className="text-sm font-bold text-text-light whitespace-nowrap">
                Solution personnalisée?
              </h4>
              <p className="text-xs text-text-secondary">
                Nos experts peuvent adapter les services à vos besoins
              </p>
            </div>

            {/* Buttons on second line with justify-between */}
            <div className="flex items-center justify-between">
              {/* Quotation Button */}
              <button
                onClick={() => {
                  navigate('/contact');
                  setServicesOpen(false);
                }}
                className="inline-block"
              >
                <Button text="Demander une soumission" duration={0.5} />
              </button>

              {/* Discover Services Button */}
              <button
                onClick={() => {
                  navigate('/services');
                  setServicesOpen(false);
                }}
                className="inline-block"
              >
                <Button text="Découvrir nos services" duration={0.5} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  },
);

ServicesDropdown.displayName = 'ServicesDropdown';

const Navbar = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [servicesMobileOpen, setServicesMobileOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [sparks, setSparks] = useState([]);
  const servicesRef = useRef(null);
  const dropdownRef = useRef(null);
  const lastScrollY = useRef(0);
  const scrollTimeoutRef = useRef(null);

  // Determine if navbar should show with opaque background
  const shouldShowBackground = isScrolled || servicesOpen;
  const textColorClass = shouldShowBackground
    ? 'text-text-light hover:text-white'
    : 'text-white hover:text-primary';

  // Services with icons - memoized to prevent recreation on each render
  const services = React.useMemo(
    () => [
      {
        label: 'Fabrication personnalisée et réparation',
        href: '/services/custom-manufacturing',
        icon: <FiTool className="w-5 h-5" />,
        category: 'Fabrication',
      },
      {
        label: 'Soudage et assemblage',
        href: '/services/welding-assembly',
        icon: <FiZap className="w-5 h-5" />,
        category: 'Fabrication',
      },
      {
        label: 'Scan et ingénierie',
        href: '/services/engineering-3d-scanning',
        icon: <FiCpu className="w-5 h-5" />,
        category: 'Solutions numériques',
      },
      {
        label: 'Maintenance industrielle',
        href: '/services/industrial-maintenance',
        icon: <FiSettings className="w-5 h-5" />,
        category: 'Maintenance',
      },
      {
        label: 'Soudage mobile',
        href: '/services/mobile-welding',
        icon: <FiTruck className="w-5 h-5" />,
        category: 'Services mobiles',
      },
      {
        label: "Location de main d'oeuvre",
        href: '/services/labor-rental',
        icon: <FiUsers className="w-5 h-5" />,
        category: "Main-d'uvre",
      },
      {
        label: 'Nettoyage industriel',
        href: '/services/industrial-cleaning',
        icon: <FiDroplet className="w-5 h-5" />,
        category: 'Maintenance',
      },
      {
        label: 'Peinture & sablage',
        href: '/services/painting-sandblasting',
        icon: <FiZap className="w-5 h-5" />,
        category: 'Finition',
      },
    ],
    [],
  );

  // Services grouped by category - no longer needed in simplified design
  // const servicesByCategory = React.useMemo(() => {
  //   return services.reduce((acc, service) => {
  //     if (!acc[service.category]) {
  //       acc[service.category] = [];
  //     }
  //     acc[service.category].push(service);
  //     return acc;
  //   }, {});
  // }, [services]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(event.target) &&
        (!dropdownRef.current || !dropdownRef.current.contains(event.target))
      ) {
        setServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle scroll with proper state management
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Update background state
    const newIsScrolled = currentScrollY > 50;
    if (newIsScrolled !== isScrolled) {
      setIsScrolled(newIsScrolled);
    }

    // Show/hide scroll to top button
    setShowScrollToTop(currentScrollY > 300);

    // Handle hide/show on scroll
    if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
      setIsVisible(false);
    } else if (currentScrollY < lastScrollY.current) {
      setIsVisible(true);
    }

    // Close services dropdown on scroll
    if (servicesOpen) {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setServicesOpen(false);
      }, 50);
    }

    lastScrollY.current = currentScrollY;
  }, [isScrolled, servicesOpen]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, [handleScroll]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Handle body overflow when mobile menu opens
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Auto scroll to top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);

  // Smooth scroll to top function
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  // Create welding spark effect
  const createSpark = useCallback((x, y) => {
    const sparkCount = 12;
    const newSparks = [];

    for (let i = 0; i < sparkCount; i++) {
      const angle = (Math.random() * Math.PI) / 2 - Math.PI / -10;
      const speed = 1.5 + Math.random() * 1.5;
      const distance = 80 + Math.random() * 120;
      const duration = 400 + Math.random() * 300;
      const size = 1 + Math.random() * 2;

      newSparks.push({
        id: Date.now() + i,
        x,
        y,
        angle,
        speed,
        distance,
        duration,
        size,
        opacity: 0.8 + Math.random() * 0.2,
        color:
          Math.random() > 0.7
            ? '#fff8ed'
            : Math.random() > 0.5
              ? '#fce4bb'
              : '#ffd9d9',
      });
    }

    setSparks((prev) => [...prev, ...newSparks]);

    // Remove sparks after animation
    setTimeout(() => {
      setSparks((prev) =>
        prev.filter((spark) => !newSparks.find((s) => s.id === spark.id)),
      );
    }, 800);
  }, []);

  // Handle mouse click for spark effect
  useEffect(() => {
    const handleClick = (e) => {
      createSpark(e.clientX, e.clientY);
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [createSpark]);

  const navItems = [
    { label: 'Accueil', href: '/', hasDropdown: false },
    {
      label: 'Services',
      href: '/services',
      hasDropdown: true,
    },
    { label: 'Blogues', href: '/case-studies', hasDropdown: false },
    { label: 'Carrières', href: '/careers', hasDropdown: false },
    { label: 'À propos', href: '/about', hasDropdown: false },
    { label: 'Contact', href: '/contact', hasDropdown: false },
  ];

  // Helper function to handle link clicks (for in-page anchors)
  const handleLinkClick = useCallback((e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
    setServicesOpen(false);
  }, []);

  return (
    <>
      {/* Welding Sparks */}
      <AnimatePresence>
        {sparks.map((spark) => (
          <motion.div
            key={spark.id}
            className="fixed pointer-events-none z-100 rounded-full blur-sm"
            initial={{
              x: spark.x,
              y: spark.y,
              opacity: spark.opacity,
              scale: 1,
              rotate: 0,
            }}
            animate={{
              x: spark.x + Math.cos(spark.angle) * spark.distance,
              y:
                spark.y -
                Math.sin(Math.abs(spark.angle)) * spark.distance * 1.5,
              opacity: 0,
              scale: 0.1,
              rotate: 360,
            }}
            transition={{
              duration: spark.duration / 1000,
              ease: 'easeOut',
            }}
            style={{
              width: spark.size,
              height: spark.size * 3,
              backgroundColor: spark.color,
              boxShadow: `0 0 10px ${spark.color}, 0 0 20px ${spark.color}`,
            }}
          />
        ))}
      </AnimatePresence>

      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-24 ${
          shouldShowBackground
            ? 'bg-dark-blue/95 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{
          y: isVisible ? 0 : -100,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
      >
        {/* Full width content */}
        <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between h-24">
          {/* Logo - Using your assets */}
          <motion.div
            className="text-2xl font-bold tracking-wider"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <Link to="/">
              {shouldShowBackground ? (
                <div className="rounded-lg bg-white/95 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden h-fit">
                  <img
                    src={assets.blue_stip_logo}
                    alt="STIP Solutions"
                    className="h-12 lg:h-20 w-auto object-contain"
                  />
                </div>
              ) : (
                <img
                  src={assets.blue_stip_logo}
                  alt="STIP Solutions"
                  className="h-12 lg:h-20 w-auto object-contain"
                  style={{
                    filter: 'brightness(1.1) drop-shadow(0 0 12px rgba(255,255,255,0.4)) drop-shadow(0 0 20px rgba(255,255,255,0.2))',
                  }}
                />
              )}
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                  ref={item.hasDropdown ? servicesRef : null}
                >
                  {item.hasDropdown ? (
                    <button
                      onMouseEnter={() => setServicesOpen(true)}
                      className={`text-sm uppercase tracking-wider relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full transition-colors duration-300 flex items-center gap-2 ${textColorClass} ${
                        servicesOpen ? 'after:w-full text-primary' : ''
                      }`}
                    >
                      {item.label}
                      <motion.div
                        animate={{ rotate: servicesOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiChevronDown className="w-4 h-4" />
                      </motion.div>
                    </button>
                  ) : item.href.startsWith('#') ? (
                    <a
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className={`text-sm uppercase tracking-wider relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full transition-colors duration-300 ${textColorClass}`}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className={`text-sm uppercase tracking-wider relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full transition-colors duration-300 ${textColorClass}`}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full transition-transform ${
                  mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                } ${shouldShowBackground ? 'bg-text-light' : 'bg-white'}`}
              />
              <span
                className={`block h-0.5 w-full ${
                  mobileMenuOpen ? 'opacity-0' : ''
                } ${shouldShowBackground ? 'bg-text-light' : 'bg-white'}`}
              />
              <span
                className={`block h-0.5 w-full transition-transform ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                } ${shouldShowBackground ? 'bg-text-light' : 'bg-white'}`}
              />
            </div>
          </motion.button>
        </div>
      </motion.nav>

      {/* Services Dropdown Overlay - Full Screen Width */}
      <AnimatePresence>
        {servicesOpen && (
          <ServicesDropdown
            services={services}
            onClose={() => setServicesOpen(false)}
            dropdownRef={dropdownRef}
            setServicesOpen={setServicesOpen}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              className="fixed top-0 right-0 h-full w-80 bg-dark-blue shadow-2xl z-50 flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
            >
              <div className="flex justify-end px-6 pt-3 shrink-0">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-text-light hover:text-primary transition-colors"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <ul className="flex flex-col px-8 overflow-y-auto grow">
                {navItems.map((item) => (
                  <React.Fragment key={item.label}>
                    {item.hasDropdown ? (
                      <div className="mb-2">
                        <button
                          onClick={() =>
                            setServicesMobileOpen(!servicesMobileOpen)
                          }
                          className="w-full flex items-center justify-between text-xl font-medium text-text-light hover:text-primary active:text-primary/80 transition-colors py-4 active:scale-95"
                        >
                          <span>{item.label}</span>
                          <motion.div
                            animate={{ rotate: servicesMobileOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <FiChevronDown className="w-5 h-5" />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {servicesMobileOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 py-2 border-l-2 border-primary/30 ml-2">
                                {services.map((service) => (
                                  <Link
                                    key={service.href}
                                    to={service.href}
                                    className="flex items-center py-3 text-text-light hover:text-primary active:text-primary/80 active:scale-95 transition-all duration-150 border-b border-card-bg last:border-0"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    <div className="w-8 h-8 flex items-center justify-center bg-primary/20 text-primary mr-3">
                                      {service.icon}
                                    </div>
                                    <span>{service.label}</span>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <motion.li
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="mb-2"
                      >
                        {item.href.startsWith('#') ? (
                          <a
                            href={item.href}
                            onClick={(e) => handleLinkClick(e, item.href)}
                            className="block text-xl font-medium text-text-light hover:text-primary active:text-primary/80 active:scale-95 transition-all duration-150 py-4"
                          >
                            {item.label}
                          </a>
                        ) : (
                          <Link
                            to={item.href}
                            className="block text-xl font-medium text-text-light hover:text-primary active:text-primary/80 active:scale-95 transition-all duration-150 py-4"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        )}
                      </motion.li>
                    )}
                  </React.Fragment>
                ))}

                {/* Mobile CTA */}
                <div className="mt-8 pt-8 border-t border-primary/20">
                  <div className="p-4 bg-primary/10 mb-6">
                    <h4 className="text-text-light font-bold mb-2 text-sm md:text-base">
                      Besoin d'une solution personnalisée?
                    </h4>
                    <p className="text-text-secondary text-xs md:text-sm mb-4 leading-relaxed">
                      Nos experts peuvent adapter les services à vos exigences
                      spécifiques
                    </p>
                  </div>
                  <Link
                    to="/contact"
                    className="block w-full px-6 py-3 bg-primary text-dark-blue font-bold text-center rounded transition-all duration-150 hover:bg-primary/90 active:scale-95 active:bg-primary/80"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Demander un devis
                  </Link>
                </div>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-primary text-white rounded-full shadow-lg hover:bg-primary/80 flex items-center justify-center transition-colors duration-300"
            aria-label="Scroll to top"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7-7m0 0L5 14m7-7v12"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
