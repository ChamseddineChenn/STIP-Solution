import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

// Explore Service Button Component with Color Fill Effect
const ExploreServiceButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const colorProgress = useMotionValue(0);
  const colorClipPathValue = useTransform(colorProgress, (value) => {
    return `inset(0 0 0 ${Math.max(-0.5, 100 - value)}%)`;
  });

  const BRONZE_GOLD = '#ae8f62';

  // Color fill animation on hover
  useEffect(() => {
    if (isHovered) {
      let animationFrameId;
      const startTime = performance.now();
      const animDuration = 500;
      const startProgress = colorProgress.get();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progressRatio = Math.min(elapsed / animDuration, 1);
        const progress = startProgress + (100 - startProgress) * progressRatio;
        colorProgress.set(progress);

        if (progressRatio < 1) {
          animationFrameId = requestAnimationFrame(animate);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [isHovered, colorProgress]);

  // Reverse color animation on hover exit
  useEffect(() => {
    if (!isHovered && colorProgress.get() > 0) {
      let animationFrameId;
      const startTime = performance.now();
      const animDuration = 500;
      const startProgress = colorProgress.get();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progressRatio = Math.min(elapsed / animDuration, 1);
        const currentValue = startProgress * (1 - progressRatio);
        colorProgress.set(Math.max(currentValue, 0));

        if (progressRatio < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          colorProgress.set(0);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [isHovered, colorProgress]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const isButtonAnimating = isHovered || colorProgress.get() > 0;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="relative inline-flex items-center gap-2 text-white font-medium bg-black/90 backdrop-blur-sm px-5 py-3 w-full justify-center sharp overflow-hidden"
      aria-label="Explore Service"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        border: '2px solid #ae8f62',
        outline: 'none',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Color fill background overlay */}
      {isButtonAnimating && (
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{
            backgroundColor: BRONZE_GOLD,
            clipPath: colorClipPathValue,
            boxShadow: 'inset 0 0 0 2px ' + BRONZE_GOLD,
          }}
        />
      )}

      {/* Color fill text overlay */}
      {isButtonAnimating && (
        <motion.div
          className="absolute inset-0 flex items-center gap-2 justify-center font-medium px-5 py-3"
          style={{
            color: 'white',
            clipPath: colorClipPathValue,
          }}
        >
          <FiArrowRight className="w-4 h-4" />
          <span className="text-sm font-semibold tracking-wide">
            Découvrir le service
          </span>
        </motion.div>
      )}

      {/* Button content */}
      <motion.div className="flex items-center justify-center">
        <FiArrowRight className="w-4 h-4" />
      </motion.div>
      <span className="text-sm font-semibold tracking-wide">
        Découvrir le service
      </span>
    </button>
  );
};

const ServicesSection = () => {
  const navigate = useNavigate();
  const [hoveredService, setHoveredService] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0); // eslint-disable-line no-unused-vars
  const [itemsPerView, setItemsPerView] = useState(4);
  const [isDragging, setIsDragging] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Handle responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const services = [
    {
      id: 1,
      title: 'Fabrication personnalisée et réparation',
      shortDescription:
        "Services de fabrication et réparation de précision pour l'équipement industriel.",
      fullDescription:
        "Nous fournissons des solutions complètes de fabrication personnalisée et de réparation avec des professionnels certifiés prêts à s'intégrer de manière fluide dans vos opérations.",
      features: [
        'Pièces de machinery personnalisées',
        "Réparation et révision d'équipement",
        'Fabrication de précision',
        'Systèmes de contrôle de qualité',
      ],
      stats: [
        { label: 'Tolérance de précision', value: '±0.05mm' },
        { label: 'Livraison à temps', value: '99%' },
      ],
      image: assets.Fabrication_Perso_Image,
      overlayType: 'blue',
    },
    {
      id: 2,
      title: 'Soudage et assemblage',
      shortDescription:
        "Services professionnels de soudage et d'assemblage pour composants structurels et mécaniques.",
      fullDescription:
        "Solutions de fabrication personnalisée avec équipement de pointe et soudeurs certifiés livrant précision et durabilité pour composants d'acier structurel et de machinery.",
      features: [
        'Soudage structurel',
        'Assemblage de précision',
        'Inspection de qualité',
        'Intégration CAD/CAM',
      ],
      stats: [
        { label: 'Certification de soudure', value: '100%' },
        { label: 'Matériaux disponibles', value: '45+' },
      ],
      image: assets.Soudage_Assemblage_Image,
      overlayType: 'black',
    },
    {
      id: 3,
      title: 'Ingénierie et numérisation 3D',
      shortDescription:
        "Services avancés de numérisation 3D et d'ingénierie numérique.",
      fullDescription:
        "Implémentez des technologies de numérisation 3D et d'ingénierie de pointe pour transformer la fabrication avec des mesures précises, ingénierie inverse et jumeaux numériques.",
      features: [
        'Numérisation laser 3D',
        'Ingénierie inverse',
        'Création de jumeaux numériques',
        'Modélisation CAO',
      ],
      stats: [
        { label: 'Précision de balayage', value: '±0.1mm' },
        { label: "Délai d'exécution du projet", value: '24-48h' },
      ],
      image: assets.Engineering_3D_Image,
      overlayType: 'blue',
    },
    {
      id: 4,
      title: 'Nettoyage industriel',
      shortDescription:
        'Services complets de nettoyage et dégraissage industriel.',
      fullDescription:
        "Services de nettoyage industriel professionnels avec équipement spécialisé pour l'entretien des usines, le nettoyage de machinery et la conformité environnementale.",
      features: [
        'Nettoyage haute pression',
        'Dégraissage chimique',
        'Nettoyage de réservoirs',
        'Conformité environnementale',
      ],
      stats: [
        { label: 'Temps de réponse', value: '24/7' },
        { label: 'Dossier de sécurité', value: '100%' },
      ],
      image: assets.Nettoyage_Industrielle_Image,
      overlayType: 'black',
    },
    {
      id: 5,
      title: 'Maintenance industrielle',
      shortDescription:
        'Services de maintenance 24/7 pour minimiser les arrêts opérationnels.',
      fullDescription:
        "Services complets de maintenance et réparation avec équipes mobiles pour réparations d'urgence, maintenance préventive et révisions d'équipement pour maximiser l'efficacité.",
      features: [
        'Maintenance préventive',
        "Réparations d'urgence",
        "Révisions d'équipement",
        'Équipes de service mobiles',
      ],
      stats: [
        { label: 'Temps de réponse', value: '24/7' },
        { label: 'Garantie de disponibilité', value: '99.5%' },
      ],
      image: assets.Maintenance_Industrielle_Image,
      overlayType: 'blue',
    },
    {
      id: 6,
      title: 'Peinture et sablage',
      shortDescription:
        'Services professionnels de préparation de surface et de revêtement industriel.',
      fullDescription:
        'Services de peinture et sablage haute qualité pour équipement industriel, acier structurel et machinery avec revêtements durables et préparation de surface.',
      features: [
        'Sablage industriel',
        'Revêtements de protection',
        'Préparation de surface',
        'Inspection de qualité',
      ],
      stats: [
        { label: 'Durabilité du revêtement', value: '10+ ans' },
        { label: 'Options de finition', value: '30+' },
      ],
      image: assets.Peinture_Sablage_Image,
      overlayType: 'black',
    },
    {
      id: 7,
      title: 'Soudage mobile',
      shortDescription:
        'Services de soudage mobile sur site pour urgences et emplacements loignés.',
      fullDescription:
        "Services de soudage mobile qui se déplacent à votre emplacement avec véhicules équipés complets et soudeurs certifiés pour réparations sur site, fabrication et services d'urgence.",
      features: [
        'Soudage sur site',
        "Réparations d'urgence",
        'Fabrication sur terrain',
        'Équipement portable',
      ],
      stats: [
        { label: 'Rayon de mobilité', value: '500km' },
        { label: 'Temps de réponse', value: '2-4h' },
      ],
      image: assets.Soudage_Mobile_Image,
      overlayType: 'blue',
    },
    {
      id: 8,
      title: "Location main d'oeuvre",
      shortDescription:
        "Main-d'uvre industrielle qualifiée pour projets court ou long terme.",
      fullDescription:
        "Nous fournissons des solutions complètes de main-d'uvre industrielle avec des professionnels certifiés prêts à s'intégrer de manière fluide dans vos opérations.",
      features: [
        'Soudeurs qualifiés',
        'Mécaniciens industriels',
        'Opérateurs CNC',
        'Techniciens de production',
      ],
      stats: [
        { label: 'Temps de réponse', value: '2-4 heures' },
        { label: 'Taux de certification', value: '98%' },
      ],
      image: assets.Location_Main_Oeuvre_Image,
      overlayType: 'black',
    },
  ];

  // Get visible services for the current slide
  const getVisibleServices = () => {
    const visible = [];
    for (let i = 0; i < itemsPerView; i++) {
      const index = (currentSlide + i) % services.length;
      visible.push(services[index]);
    }
    return visible;
  };

  const visibleServices = getVisibleServices(); // eslint-disable-line no-unused-vars

  const maxPosition = services.length - itemsPerView + 1;

  const nextSlide = () => {
    setSlideDirection(1);
    setCurrentSlide((prev) => (prev + 1) % maxPosition);
  };

  const prevSlide = () => {
    setSlideDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + maxPosition) % maxPosition);
  };

  // Mapping of service IDs to their pages
  const serviceRoutes = {
    1: '/services/custom-manufacturing',
    2: '/services/welding-assembly',
    3: '/services/engineering-3d-scanning',
    4: '/services/industrial-cleaning',
    5: '/services/industrial-maintenance',
    6: '/services/painting-sandblasting',
    7: '/services/mobile-welding',
    8: '/services/labor-rental',
  };

  const handleServiceClick = (serviceId) => {
    // Only navigate if NOT dragging
    if (!isDragging) {
      const route = serviceRoutes[serviceId];
      if (route) {
        navigate(route);
      }
    }
  };

  const handleServiceHover = (serviceId, isEntering) => {
    if (isEntering) {
      setHoveredService(serviceId);
    } else {
      setHoveredService(null);
    }
  };

  return (
    <section ref={sectionRef} className="section-dark pb-20 md:pb-28 sharp">
      <div className="container mx-auto px-4">
        <div>
          {/* Centered Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="py-16 md:py-20 text-center"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold leading-tight text-white"
            >
              Solutions industrielles qui livrent des résultats
            </motion.h2>
          </motion.div>
        </div>

        {/* Carousel Container */}
        <div className="relative mb-8 pt-8">
          {/* Carousel Wrapper with overflow hidden */}
          <div className="relative overflow-hidden">
            {/* Carousel content */}
            <motion.div
              animate={{
                x: -currentSlide * (100 / itemsPerView) + '%',
              }}
              transition={{
                duration: 0.8,
                ease: 'easeInOut',
              }}
              drag="x"
              dragElastic={0.3}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(e, info) => {
                setIsDragging(false);
                const swipeThreshold = 50;
                if (info.offset.x > swipeThreshold) {
                  prevSlide();
                } else if (info.offset.x < -swipeThreshold) {
                  nextSlide();
                }
              }}
              className="flex gap-4 cursor-grab active:cursor-grabbing"
            >
              {services.map((service) => (
                <div
                  key={service.id}
                  className="relative overflow-hidden cursor-pointer sharp group"
                  style={{
                    width: `calc(${100 / itemsPerView}% - 1rem)`,
                    height: '500px',
                    flexShrink: 0,
                    borderRight: '1px solid rgba(174, 143, 98, 0.3)',
                    boxShadow: 'inset -6px 0 6px rgba(174, 143, 98, 0.1)',
                  }}
                  onMouseEnter={() => handleServiceHover(service.id, true)}
                  onMouseLeave={() => handleServiceHover(service.id, false)}
                  onClick={() => handleServiceClick(service.id)}
                >
                  <div className="absolute inset-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Static overlay */}
                    <div className="absolute inset-0 bg-black opacity-40 pointer-events-none z-1" />

                    {/* Hover overlay */}
                    <div
                      className={`absolute inset-0 bg-black pointer-events-none transition-opacity duration-300 ${
                        hoveredService === service.id
                          ? 'opacity-40'
                          : 'opacity-0'
                      }`}
                      style={{ zIndex: 2 }}
                    />

                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/80 z-3" />
                  </div>

                  {/* Animated border glow effect on hover */}
                  {hoveredService === service.id && (
                    <>
                      <div
                        className="absolute top-0 left-0 h-px z-10 pointer-events-none"
                        style={{
                          width: '60px',
                          background: `linear-gradient(90deg, transparent, #ae8f62, transparent)`,
                          boxShadow: '0 0 6px #ae8f62',
                          animation: 'topBorder 2s linear infinite',
                        }}
                      />
                      <div
                        className="absolute right-0 top-0 w-px z-10 pointer-events-none"
                        style={{
                          height: '60px',
                          background: `linear-gradient(180deg, transparent, #ae8f62, transparent)`,
                          boxShadow: '0 0 6px #ae8f62',
                          animation: 'rightBorder 2s linear infinite 0s',
                        }}
                      />
                      <div
                        className="absolute bottom-0 right-0 h-px z-10 pointer-events-none"
                        style={{
                          width: '60px',
                          background: `linear-gradient(90deg, transparent, #ae8f62, transparent)`,
                          boxShadow: '0 0 6px #ae8f62',
                          animation: 'bottomBorder 2s linear infinite 0s',
                        }}
                      />
                      <div
                        className="absolute left-0 bottom-0 w-px z-10 pointer-events-none"
                        style={{
                          height: '60px',
                          background: `linear-gradient(180deg, transparent, #ae8f62, transparent)`,
                          boxShadow: '0 0 6px #ae8f62',
                          animation: 'leftBorder 2s linear infinite 0s',
                        }}
                      />
                    </>
                  )}

                  {/* Top Button */}
                  {hoveredService === service.id && (
                    <motion.div
                      className="absolute top-0 left-0 right-0 z-20 pt-4 px-6"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <ExploreServiceButton
                        serviceId={service.id}
                        onClick={() => handleServiceClick(service.id)}
                      />
                    </motion.div>
                  )}

                  {/* Service Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 z-20">
                    <div
                      className={`h-32 flex flex-col justify-end p-6 sharp ${
                        service.overlayType === 'blue'
                          ? 'overlay-blue'
                          : 'overlay-black'
                      }/95`}
                    >
                      <h3
                        className="text-xl md:text-2xl font-bold text-white leading-tight transition-opacity duration-300"
                        style={{
                          opacity: hoveredService === service.id ? 1 : 0.8,
                        }}
                      >
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Thin dividing line - animated on hover */}
                  <div
                    className="absolute bottom-32 left-0 right-0 h-0.5 z-20 transition-all duration-300"
                    style={{
                      transform:
                        hoveredService === service.id
                          ? 'scaleX(1)'
                          : 'scaleX(0)',
                      transformOrigin: 'center left',
                      backgroundColor:
                        hoveredService === service.id
                          ? '#ae8f62'
                          : 'transparent',
                    }}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 border-2 items-center justify-center text-white backdrop-blur-sm hover:bg-[#ae8f62] hover:border-[#ae8f62] transition-all duration-300 -ml-20 p-2"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              borderColor: '#ae8f62',
            }}
            aria-label="Previous services"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 border-2 items-center justify-center text-white backdrop-blur-sm hover:bg-[#ae8f62] hover:border-[#ae8f62] transition-all duration-300 -mr-20 p-2"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              borderColor: '#ae8f62',
            }}
            aria-label="Next services"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Carousel Dots Indicator */}
        <div className="flex justify-center mt-12 space-x-2">
          {Array.from({ length: maxPosition }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setSlideDirection(index > currentSlide ? 1 : -1);
                setCurrentSlide(index);
              }}
              className={`w-2 h-2 transition-all duration-300 ${
                currentSlide === index ? 'bg-[#ae8f62] w-4' : 'bg-gray-600'
              }`}
              aria-label={`Go to service ${index + 1}`}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 pt-12 border-t border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-3 text-light">
                Besoin d'une solution personnalisée?
              </h3>
              <p className="text-gray-400">
                Nos experts peuvent adapter les services à vos besoins
                spécifiques.
              </p>
            </div>
            <button
              onClick={() => navigate('/contact')}
              className="bg-[#ae8f62] text-white py-3 px-8 font-semibold hover:bg-[#9a7a4e] transition-colors duration-300"
            >
              Planifier une consultation
            </button>
          </div>
        </div>
      </div>

      {/* Add CSS animations for the border glow */}
      <style>{`
        @keyframes topBorder {
          0% {
            left: -60px;
          }
          100% {
            left: calc(100% + 60px);
          }
        }
        @keyframes rightBorder {
          0% {
            top: -60px;
          }
          100% {
            top: calc(100% + 60px);
          }
        }
        @keyframes bottomBorder {
          0% {
            right: -60px;
          }
          100% {
            right: calc(100% + 60px);
          }
        }
        @keyframes leftBorder {
          0% {
            bottom: -60px;
          }
          100% {
            bottom: calc(100% + 60px);
          }
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
