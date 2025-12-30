import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';
import { assets } from '../assets/assets';

const CertificationsRow = () => {
  const carouselRef = useRef(null);
  const animationRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const isHoveredRef = useRef(false);
  const lastTimestampRef = useRef(null);
  const [hoveredCert, setHoveredCert] = useState(null);

  const certifications = [
    { id: 1, name: 'Certifié CWB', image: assets.cert_cwb },
    { id: 2, name: 'ISO 9001', image: assets.cert_iso },
    { id: 3, name: 'Certifié AWS', image: assets.cert_aws_eng },
    { id: 4, name: 'Certifié TSSA', image: assets.cert_tssa },
    { id: 5, name: 'ASME BPVC', image: assets.cert_asme_bpvc },
    { id: 6, name: 'Conforme à OSHA', image: assets.cert_aws_ins },
    { id: 7, name: 'Certifié CWB', image: assets.cert_cwb },
    { id: 8, name: 'ISO 9001', image: assets.cert_iso },
    { id: 9, name: 'Certifié AWS', image: assets.cert_aws_eng },
    { id: 10, name: 'Certifié TSSA', image: assets.cert_tssa },
    { id: 11, name: 'ASME BPVC', image: assets.cert_asme_bpvc },
    { id: 12, name: 'Conforme à OSHA', image: assets.cert_aws_ins },
  ];

  // Carousel animation
  useEffect(() => {
    if (!carouselRef.current) return;

    const measure = () => {
      return carouselRef.current?.scrollWidth || 0;
    };

    const PIXELS_PER_SECOND = 40;

    const tick = (timestamp) => {
      if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
      const delta = timestamp - lastTimestampRef.current;
      lastTimestampRef.current = timestamp;

      const fullWidth = measure();
      const halfWidth = fullWidth / 2;

      if (!isHoveredRef.current && carouselRef.current && halfWidth > 0) {
        scrollPositionRef.current += (PIXELS_PER_SECOND * delta) / 1000;

        if (scrollPositionRef.current >= halfWidth) {
          scrollPositionRef.current -= halfWidth;
        }

        carouselRef.current.style.transform = `translate3d(-${scrollPositionRef.current}px, 0, 0)`;
      }

      animationRef.current = requestAnimationFrame(tick);
    };

    animationRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      lastTimestampRef.current = null;
    };
  }, []);

  const handleMouseEnterCarousel = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeaveCarousel = () => {
    isHoveredRef.current = false;
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Certifications industrielles
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Certifiés selon les normes industrielles les plus strictes
          </p>
        </motion.div>

        {/* Auto-scrolling Carousel */}
        <div className="relative mb-16">
          <div
            className="relative overflow-hidden"
            onMouseEnter={handleMouseEnterCarousel}
            onMouseLeave={handleMouseLeaveCarousel}
          >
            <div
              ref={carouselRef}
              className="flex gap-10 md:gap-14 will-change-transform py-4"
            >
              {certifications.map((cert) => (
                <motion.div
                  key={cert.id}
                  className="shrink-0 flex flex-col items-center justify-center cursor-pointer group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => setHoveredCert(cert.id)}
                  onMouseLeave={() => setHoveredCert(null)}
                >
                  {/* Logo Container */}
                  <div className="w-48 h-48 md:w-56 md:h-56 flex items-center justify-center p-6 mb-4 bg-gray-50 transition-all duration-300">
                    <img
                      src={cert.image}
                      alt={cert.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Certification Name */}
                  <div className="text-center">
                    <h4
                      className={`text-lg font-bold transition-colors duration-300 ${
                        hoveredCert === cert.id
                          ? 'text-blue-600'
                          : 'text-gray-900'
                      }`}
                    >
                      {cert.name}
                    </h4>

                    {/* Hover text - Download Certification PDF */}
                    <div
                      className={`mt-2 transition-all duration-300 ${
                        hoveredCert === cert.id
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-2'
                      }`}
                    >
                      <div className="flex items-center justify-center text-blue-600 text-sm font-medium">
                        <FiDownload className="w-4 h-4 mr-2" />
                        Télécharger le PDF de la certification
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Certification Benefits - Simple */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Quality Assurance */}
          <div className="p-8 border border-gray-200 hover:bg-hover-dark hover:text-white transition-all duration-300 group cursor-pointer">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3">
              Assurance qualité
            </h3>
            <p className="text-gray-600 group-hover:text-white">
              Système de management de la qualité certifié ISO 9001.
            </p>
          </div>

          {/* Safety Compliance */}
          <div className="p-8 border border-gray-200 hover:bg-hover-dark hover:text-white transition-all duration-300 group cursor-pointer">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3">
              Sécurité et conformité
            </h3>
            <p className="text-gray-600 group-hover:text-white">
              Protocoles de sécurité conformes à la TSSA et à l'OSHA.
            </p>
          </div>

          {/* Professional Excellence */}
          <div className="p-8 border border-gray-200 hover:bg-hover-dark hover:text-white transition-all duration-300 group cursor-pointer">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3">
              Excellence professionnelle
            </h3>
            <p className="text-gray-600 group-hover:text-white">
              Soudeurs certifiés CWB et AWS.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsRow;
