import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FiCheckCircle, FiArrowRight, FiTrendingUp } from 'react-icons/fi';
import { assets } from '../assets/assets';

// Professional SVG Icons - Minimalistic & Modern with Creative Animations

const Clock24Icon = () => (
  <img
    src={assets.twentyfourseven_image}
    alt="24/7 Support"
    className="w-16 h-16"
    style={{
      filter:
        'brightness(0) saturate(100%) invert(24%) sepia(91%) saturate(1284%) hue-rotate(193deg) brightness(107%) contrast(96%)',
    }}
  />
);

const CertificationIcon = () => (
  <img
    src={assets.certified_image}
    alt="Certification"
    className="w-16 h-16"
    style={{
      filter:
        'brightness(0) saturate(100%) invert(24%) sepia(91%) saturate(1284%) hue-rotate(193deg) brightness(107%) contrast(96%)',
    }}
  />
);

const PrecisionIcon = () => (
  <img
    src={assets.precision_image}
    alt="Precision"
    className="w-16 h-16"
    style={{
      filter:
        'brightness(0) saturate(100%) invert(24%) sepia(91%) saturate(1284%) hue-rotate(193deg) brightness(107%) contrast(96%)',
    }}
  />
);

const SafetyIcon = () => (
  <img
    src={assets.security_image}
    alt="Security"
    className="w-16 h-16"
    style={{
      filter:
        'brightness(0) saturate(100%) invert(24%) sepia(91%) saturate(1284%) hue-rotate(193deg) brightness(107%) contrast(96%)',
    }}
  />
);

const WhyChooseStip = () => {
  const [activeFeature, setActiveFeature] = useState(null);

  const features = [
    {
      id: 1,
      title: 'Excellence 24/7',
      description:
        "Support 24h/24 avec réponse immédiate pour les réparations d'urgence et les projets critiques.",
      icon: Clock24Icon,
      color: '#104377',
    },
    {
      id: 2,
      title: 'Maîtrise certifiée',
      description:
        "Professionnels certifiés CWB, AWS et ISO, avec décennies d'expérience combinée.",
      icon: CertificationIcon,
      color: '#104377',
    },
    {
      id: 3,
      title: 'Précision inégalée',
      description:
        'De la micro-précision à la mise en œuvre à grande échelle avec fiabilité garantie.',
      icon: PrecisionIcon,
      color: '#104377',
    },
    {
      id: 4,
      title: 'Sécurité avant tout',
      description:
        'Zéro incident majeur grâce à des protocoles de pointe et surveillance continue.',
      icon: SafetyIcon,
      color: '#104377',
    },
  ];

  const commitments = [
    'Achèvement du projet garanti dans les délais',
    'Tarification transparente et complète',
    'Support post-projet inclus',
    'Optimisation continue et innovation',
    'Responsabilité environnementale',
    'Solutions personnalisées',
  ];

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 67, 119, 0.03) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative container mx-auto px-4 py-20 md:py-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
            Pourquoi{' '}
            <span className="relative inline-block">
              <span className="relative z-10">STIP</span>
              <motion.span
                className="absolute bottom-0 left-0 w-full h-4 bg-[#104377]/10 z-0"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </span>{' '}
            Solutions
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Expertise industrielle rencontre innovation constante et excellence
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24"
        >
          {features.map((feature) => {
            const IconComponent = feature.icon;
            const isActive = activeFeature === feature.id;

            return (
              <motion.div
                key={feature.id}
                variants={featureVariants}
                onMouseEnter={() => setActiveFeature(feature.id)}
                onMouseLeave={() => setActiveFeature(null)}
                onClick={() => setActiveFeature(isActive ? null : feature.id)}
                className="group relative p-8 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 cursor-pointer transition-all duration-300 overflow-hidden"
                style={{
                  borderColor: isActive ? '#104377' : '#e5e7eb',
                  backgroundColor: isActive ? '#10437708' : 'white',
                }}
              >
                {/* Animated background accent line */}
                <motion.div
                  className="absolute top-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
                  style={{ backgroundColor: '#104377' }}
                />

                {/* Icon Container with Pulsating Animation */}
                <motion.div
                  className="mb-6 inline-block p-4 rounded transition-all duration-300 relative"
                  style={{
                    backgroundColor: `#10437715`,
                    color: '#104377',
                  }}
                >
                  {/* Icon with gentle pulsating animation */}
                  <motion.div
                    animate={
                      isActive
                        ? {
                            scale: [1, 1.15, 1],
                          }
                        : { scale: 1 }
                    }
                    transition={
                      isActive
                        ? {
                            duration: 2.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }
                        : {}
                    }
                  >
                    <IconComponent />
                  </motion.div>

                  {/* Pulsating border halo effect */}
                  <motion.div
                    className="absolute inset-0 rounded border-2 border-[#104377]"
                    animate={
                      isActive
                        ? {
                            scale: [1, 1.15, 1],
                            opacity: [0.5, 0.2, 0.5],
                          }
                        : {}
                    }
                    transition={
                      isActive
                        ? {
                            duration: 2.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }
                        : {}
                    }
                  />
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Commitments Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notre engagement indéfectible
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chaque projet est soutenu par nos promesses fondamentales
            </p>
          </div>

          {/* Commitment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commitments.map((commitment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="group p-6 bg-white border-2 border-gray-100 hover:border-[#104377] hover:bg-[#104377]/5 transition-all duration-300 overflow-hidden relative"
              >
                {/* Animated diagonal accent */}
                <motion.div
                  className="absolute -top-32 -right-32 w-64 h-64 bg-[#104377]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />

                <div className="flex items-start gap-4 relative z-10">
                  <motion.div
                    className="flex-shrink-0 w-6 h-6 text-[#104377]"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  >
                    <FiCheckCircle className="w-6 h-6" />
                  </motion.div>
                  <div className="flex-grow">
                    <p className="font-semibold text-gray-900">{commitment}</p>
                    <motion.div
                      className="h-0.5 w-0 mt-2 bg-gradient-to-r from-[#104377] to-[#3d79bd]"
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-[#104377] text-white p-12 md:p-16 overflow-hidden"
        >
          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{
              backgroundImage: `linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.1) 50%, transparent 52%)`,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Animated background circles */}
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full opacity-0 group-hover:opacity-100"
            animate={{ x: [0, 30, 0], y: [-20, 20, -20] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Content */}
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-6"
            >
              <FiTrendingUp className="w-12 h-12 text-white mx-auto" />
            </motion.div>

            <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Prêt à transformer vos opérations ?
            </h3>

            <p className="text-lg text-gray-200 mb-8">
              Découvrez la différence STIP avec une évaluation complète de vos
              besoins
            </p>

            {/* CTA Button */}
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 20px rgba(255,255,255,0.4)',
              }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-white text-[#104377] px-10 py-4 font-bold text-lg overflow-hidden transition-all duration-300 hover:bg-gray-100"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Planifier une consultation
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FiArrowRight className="w-5 h-5" />
                </motion.span>
              </span>
            </motion.button>

            <p className="mt-6 text-sm text-gray-300">
              Délai de réponse :{' '}
              <span className="font-semibold text-white">90 minutes</span> •
              Consultation :{' '}
              <span className="font-semibold text-white">Gratuite</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseStip;
