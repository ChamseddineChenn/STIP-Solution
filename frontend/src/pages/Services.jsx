import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { assets } from '../assets/assets';
import CTAButton from '../components/CTAButton';

const Services = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Scroll to top on component mount to fix mobile viewport issues
  useEffect(() => {
    window.scrollTo(0, 0);
    // Reset zoom level
    if (document.body.style) {
      document.body.style.zoom = '1';
    }
  }, []);

  const servicesData = [
    {
      id: 1,
      title: 'Fabrication personnalisée et réparation',
      shortDesc:
        'Solutions de fabrication et réparation de précision pour équipements industriels',
      image: assets.Fabrication_Perso_Image,
      path: '/services/custom-manufacturing',
    },
    {
      id: 2,
      title: 'Soudage et assemblage',
      shortDesc:
        'Services de soudage et assemblage professionnels pour composants structuraux',
      image: assets.Soudage_Assemblage_Image,
      path: '/services/welding-assembly',
    },
    {
      id: 3,
      title: 'Scan et ingénierie',
      shortDesc: "Services avancés d'ingénierie numérique",
      image: assets.Engineering_3D_Image,
      path: '/services/engineering-3d-scanning',
    },
    {
      id: 5,
      title: 'Maintenance industrielle',
      shortDesc:
        'Services de maintenance 24/7 pour minimiser les arrêts opérationnels',
      image: assets.Maintenance_Industrielle_Image,
      path: '/services/industrial-maintenance',
    },
    {
      id: 7,
      title: 'Soudage mobile',
      shortDesc:
        'Services de soudage mobile sur place pour urgences et lieux éloignés',
      image: assets.Soudage_Mobile_Image,
      path: '/services/mobile-welding',
    },
    {
      id: 8,
      title: "Location main d'oeuvre",
      shortDesc:
        "Main-d'oeuvre industrielle qualifiée pour projets court ou long terme",
      image: assets.Location_Main_Oeuvre_Image,
      path: '/services/labor-rental',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] overflow-hidden bg-linear-to-br from-dark-blue via-dark-blue to-black flex items-center">
        {/* Animated background grid */}
        <motion.div
          className="absolute inset-0 opacity-10"
          initial={{ backgroundPosition: '0% 0%' }}
          animate={{ backgroundPosition: '100% 100%' }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage: `linear-gradient(45deg, transparent 48%, rgba(59, 130, 246, 0.1) 49%, rgba(59, 130, 246, 0.1) 51%, transparent 52%)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Vertical accent lines */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute left-1/4 top-0 w-px h-full bg-linear-to-b from-primary via-primary/30 to-transparent"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute right-1/4 top-0 w-px h-full bg-linear-to-b from-primary/50 via-primary/10 to-transparent"
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="h-1 w-16 bg-primary mb-8"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />

              <motion.h1
                className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tighter leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Services Industriels
                <motion.span
                  className="block text-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Complets & Fiables
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-secondary mb-8 leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Solutions industrielles adaptées à vos besoins — de la
                fabrication personnalisée aux réparations d'urgence, avec
                l'expertise et la fiabilité que vous méritez.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-0  left-1/2 -translate-x-1/2 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-widest mb-2 text-gray-300">
              Faites défiler
            </span>
            <motion.div
              className="w-px h-12 bg-linear-to-b from-primary to-transparent"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Services Grid Section */}
      <section ref={sectionRef} className="section-white py-12 md:py-20 sharp">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ ease: 'easeOut', duration: 0.5 }}
            className="text-center mb-16 md:mb-24"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Services Industriels Complets
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              De la fabrication personnalisée aux réparations d'urgence, nous
              livrons l'excellence dans chaque service avec des solutions
              adaptées à vos besoins uniques.
            </p>
          </motion.div>

          {/* Services Grid - 2x4 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {servicesData.map((service) => (
              <Link key={service.id} to={service.path} className="group">
                <motion.div
                  variants={cardVariants}
                  whileHover={{ opacity: 0.9 }}
                  className="relative h-[300px] sm:h-[350px] md:h-[420px] overflow-hidden sharp bg-card-bg border border-gray-700/50 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/20 hover:brightness-110 cursor-pointer"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-black/20" />
                    {/* Accent overlay on hover */}
                    <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300" />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-end">
                    {/* Service Number */}
                    <div className="mb-4">
                      <div className="inline-flex w-12 h-12 bg-accent items-center justify-center text-dark-blue font-bold text-base leading-none">
                        {String(service.id).padStart(2, '0')}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-light mb-3 group-hover:text-accent transition-colors duration-300 leading-tight">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-secondary text-sm mb-4 leading-relaxed line-clamp-2">
                      {service.shortDesc}
                    </p>

                    {/* Learn More Link */}
                    <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all duration-300">
                      <span>Découvrir</span>
                      <motion.div
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiArrowRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Border accent on hover */}
                  <motion.div
                    className="absolute inset-0 border-2 border-accent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ ease: 'easeOut', duration: 0.5, delay: 0.4 }}
            className="mt-20 md:mt-32 px-4 md:px-0 py-16 md:py-20 bg-linear-to-br from-dark-blue via-dark-blue to-black"
          >
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">
                Prêt à collaborer avec STIP Solutions ?
              </h2>
              <p className="text-secondary text-lg mb-10">
                Que vous ayez besoin de réparations d'urgence ou de solutions
                industrielles à long terme, nous sommes votre partenaire de
                confiance au Québec et au Nouveau-Brunswick.
              </p>
              <Link to="/contact">
                <CTAButton text="Prenez Contact Maintenant" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;
