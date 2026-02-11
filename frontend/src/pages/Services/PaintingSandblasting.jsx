import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FiChevronLeft,
  FiArrowRight,
  FiDroplet,
  FiBox,
  FiCheckCircle,
} from 'react-icons/fi';
import { assets } from '../../assets/assets';
import CTAButton from '../../components/CTAButton';

const PaintingSandblasting = () => {
  const sectionRef = useRef(null);

  const relatedServices = [
    {
      id: 1,
      title: 'Fabrication sur mesure et Réparation',
      path: '/services/custom-manufacturing',
    },
    {
      id: 2,
      title: 'Soudage et Assemblage',
      path: '/services/welding-assembly',
    },
    {
      id: 5,
      title: 'Maintenance Industrielle',
      path: '/services/industrial-maintenance',
    },
  ];

  return (
    <div className="min-h-screen section-white sharp">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0">
          <img
            src={assets.Peinture_Sablage_Image}
            alt="Painting & Sandblasting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-60" />
        </div>

        <div className="relative container mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors mb-8"
          >
            <FiChevronLeft />
            Retour à l'accueil
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: 'linear', duration: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="h-1 bg-accent"
              />
              <span className="text-accent font-semibold">
                Traitement de surface
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Peinture & sablage
            </h1>
            <p className="text-xl text-white max-w-4xl leading-relaxed font-semibold">
              Finition des surfaces
            </p>
            <p className="text-lg text-white max-w-4xl leading-relaxed mt-4 opacity-95">
              Protection professionnelle de vos équipements industriels contre
              la corrosion et l'usure. Nous combinons préparation de surface
              rigoureuse et revêtements de haute qualité pour assurer la
              durabilité maximale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section ref={sectionRef} className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ease: 'linear', duration: 0.6 }}
                className="mb-12 pl-6 border-l-4 border-accent"
              >
                <h2 className="text-3xl font-bold text-accent mb-8">
                  Solutions de traitement de surface
                </h2>
                <div className="space-y-6">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    STIP propose des solutions de traitement de surface :
                    sablage et peinture.
                  </p>
                  <div className="bg-linear-to-r from-accent/10 to-transparent p-6 rounded-lg border-l-4 border-accent">
                    <p className="text-gray-800 leading-relaxed font-medium text-lg">
                      Le sablage, ou grenaillage, est une technique de nettoyage
                      industriel permettant de décaper en profondeur les
                      surfaces métalliques et de les préparer aux revêtements
                      ultérieurs.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ease: 'linear', duration: 0.6, delay: 0.1 }}
                className="mb-12 pl-6 border-l-4 border-accent"
              >
                <h2 className="text-3xl font-bold text-accent mb-8">
                  Services de peinture professionnelle
                </h2>
                <div className="space-y-6">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Notre atelier propose tous types de peintures pour la
                    protection contre la corrosion et la détérioration.
                  </p>
                  <div className="bg-linear-to-r from-accent/10 to-transparent p-6 rounded-lg border-l-4 border-accent">
                    <p className="text-gray-800 leading-relaxed font-medium text-lg">
                      La peinture en poudre, également appelée peinture cuite au
                      four, se distingue par son économie, son gain de temps
                      (pas de temps de séchage) et son respect de
                      l'environnement. La peinture liquide est appliquée au
                      pistolet sur une ligne de production, dans une cabine sans
                      poussière.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Advantages Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: 'linear', duration: 0.6, delay: 0.2 }}
                className="mb-12"
              >
                <h3 className="text-3xl font-bold text-accent mb-8">
                  Nos avantages
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    whileHover={{ y: -4, borderColor: '#ae8f62' }}
                    className="bg-white p-8 border border-gray-200 hover:border-accent transition-all duration-300 group"
                  >
                    <div className="text-5xl text-accent mb-4 flex items-center justify-center">
                      <FiBox className="filter drop-shadow-sm" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-3 text-center">
                      Préparation Complète
                    </h4>
                    <p className="text-sm text-gray-600 text-center leading-relaxed">
                      Sablage professionnel et nettoyage en profondeur des
                      surfaces
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    whileHover={{ y: -4, borderColor: '#ae8f62' }}
                    className="bg-white p-8 border border-gray-200 hover:border-accent transition-all duration-300 group"
                  >
                    <div className="text-5xl text-accent mb-4 flex items-center justify-center">
                      <FiDroplet className="filter drop-shadow-sm" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-3 text-center">
                      Revêtements Durables
                    </h4>
                    <p className="text-sm text-gray-600 text-center leading-relaxed">
                      Protection contre la corrosion et la détérioration
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    whileHover={{ y: -4, borderColor: '#ae8f62' }}
                    className="bg-white p-8 border border-gray-200 hover:border-accent transition-all duration-300 group"
                  >
                    <div className="text-5xl text-accent mb-4 flex items-center justify-center">
                      <FiCheckCircle className="filter drop-shadow-sm" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-3 text-center">
                      Conformité Environnementale
                    </h4>
                    <p className="text-sm text-gray-600 text-center leading-relaxed">
                      Processus respectueux de l'environnement
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: 'linear', duration: 0.15, delay: 0.3 }}
                className="mb-12"
              >
                <h3 className="text-2xl font-bold text-accent mb-6">
                  Capacités techniques
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Sablage industriel',
                    'Peinture en poudre',
                    'Peinture liquide au pistolet',
                    'Grenaillage de précision',
                    'Cabine de pulvérisation sans poussière',
                    'Contrôle qualité rigoureux',
                  ].map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08, duration: 0.4 }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: 'rgba(174, 143, 98, 0.1)',
                        borderLeftColor: '#ae8f62',
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="group flex items-center gap-3 p-4 transition-all duration-100 cursor-pointer border-l-2 border-transparent"
                    >
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span className="text-gray-700 group-hover:text-accent transition-colors font-medium">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: 'linear', duration: 0.15, delay: 0.4 }}
              >
                <Link to="/contact" className="inline-flex items-center gap-2">
                  <CTAButton text="Nous contacter" />
                </Link>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: 'linear', duration: 0.6 }}
                className="sticky top-24"
              >
                <div className="bg-white shadow-lg p-8 border-t-4 border-accent">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-0.5 w-8 bg-accent" />
                    <h3 className="text-xl font-bold text-gray-900">
                      Services connexes
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {relatedServices.map((service, idx) => (
                      <Link key={service.id} to={service.path}>
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1, duration: 0.4 }}
                          whileHover={{
                            x: 8,
                            backgroundColor: 'rgba(174, 143, 98, 0.15)',
                            borderLeftColor: '#ae8f62',
                          }}
                          whileTap={{ scale: 0.98 }}
                          className="p-4 transition-all duration-100 cursor-pointer group border-l-2 border-transparent"
                        >
                          <p className="text-gray-700 group-hover:text-accent font-medium transition-colors flex items-center justify-between">
                            {service.title}
                            <motion.span
                              initial={{ x: -4, opacity: 0 }}
                              whileHover={{ x: 4, opacity: 1 }}
                              transition={{ ease: 'linear', duration: 0.2 }}
                              className="text-accent"
                            >
                              <FiArrowRight />
                            </motion.span>
                          </p>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mt-8 bg-linear-to-br from-white to-amber-50 shadow-lg p-8 border-t-4 border-accent">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-0.5 w-8 bg-accent" />
                    <h4 className="text-lg font-bold text-gray-900">
                      Service de finition ?
                    </h4>
                  </div>
                  <p className="text-gray-700 text-sm mb-6">
                    Contactez nos experts en traitement de surface.
                  </p>
                  <Link to="/contact">
                    <CTAButton text="Nous contacter" variant="full-width" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaintingSandblasting;
