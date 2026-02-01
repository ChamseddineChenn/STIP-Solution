import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';
import { assets } from '../assets/assets';

const TempCertifications = () => {
  const [hoveredCert, setHoveredCert] = useState(null);

  const certifications = [
    {
      id: 1,
      name: 'CNESST',
      description:
        "Commission des normes, de l'équité, de la santé et de la sécurité du travail",
      image: assets.cnesst_image,
    },
    {
      id: 2,
      name: 'COGNIBOX',
      description: 'Certification de gestion des risques et conformité',
      image: assets.cognibox_image,
    },
  ];

  return (
    <section className="py-5 md:py-10 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark-blue mb-4">
            Nos Certifications
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Certifiés selon les normes industrielles les plus strictes
          </p>
        </motion.div>

        {/* Two Fixed Certification Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto items-start">
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onMouseEnter={() => setHoveredCert(cert.id)}
              onMouseLeave={() => setHoveredCert(null)}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              {/* Box Container - No Border */}
              <div className="flex flex-col items-center justify-start">
                {/* Logo Container */}
                <motion.div
                  className="w-full flex items-center justify-center p-8 mb-6 bg-white transition-all duration-300 group-hover:bg-primary-50/10"
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-32 h-32 md:w-48 rounded-full md:h-48 object-contain"
                  />
                </motion.div>

                {/* Certification Info */}
                <div className="text-center w-full">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {cert.name}
                  </h3>

                  <p className="text-gray-600 text-sm md:text-base mb-4">
                    {cert.description}
                  </p>

                  {/* Hover text - Download Certification PDF */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                      hoveredCert === cert.id
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 10 }
                    }
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center gap-2 text-primary-50 text-sm font-semibold"
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TempCertifications;
