import React from 'react';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FiChevronLeft,
  FiArrowRight,
  FiBriefcase,
  FiTool,
  FiAward,
} from 'react-icons/fi';
import { assets } from '../../assets/assets';
import CTAButton from '../../components/CTAButton';

const CustomManufacturing = () => {
  const sectionRef = useRef(null);

  const relatedServices = [
    {
      id: 2,
      title: 'Scan et ingénierie',
      path: '/services/engineering-3d-scanning',
    },
    {
      id: 3,
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
            src={assets.Fabrication_Perso_Image}
            alt="Custom Manufacturing"
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
                Excellence Industrielle
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Fabrication sur Mesure
            </h1>
            <p className="text-xl text-white max-w-4xl leading-relaxed font-semibold">
              STIP Solution, votre partenaire de confiance pour la
              sous-traitance en soudage, la fabrication sur mesure et les
              réparations.
            </p>
            <p className="text-lg text-white max-w-4xl leading-relaxed mt-4 opacity-95">
              Nous excellons aussi bien dans les petits projets minutieux que
              dans les grands projets complexes.
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
                  Chaque projet est unique
                </h2>
                <div className="space-y-6">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Nous savons que chaque projet est unique. Notre équipe
                    hautement qualifiée allie expertise technique et créativité
                    pour répondre aux besoins spécifiques de chaque client.
                  </p>
                  <div className="bg-gradient-to-r from-accent/10 to-transparent p-6 rounded-lg border-l-4 border-accent">
                    <p className="text-gray-800 leading-relaxed font-medium">
                      Que vous ayez besoin de pièces sur mesure, de réparations
                      précises ou de solutions de soudage innovantes, nous
                      sommes là pour concrétiser vos idées.
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
                  Qualité et Excellence
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg mb-8">
                  Forts d'une solide expérience dans le secteur, nous sommes
                  fiers de notre engagement envers la qualité et l'excellence.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    whileHover={{ y: -4, borderColor: '#ae8f62' }}
                    className="bg-white p-8 border border-gray-200 hover:border-accent transition-all duration-300 group"
                  >
                    <div className="text-5xl text-accent mb-4 flex items-center justify-center">
                      <FiBriefcase className="filter drop-shadow-sm" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-3 text-center">
                      Compétences Techniques
                    </h4>
                    <p className="text-sm text-gray-600 text-center leading-relaxed">
                      Avancées et reconnues dans l'industrie
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
                      <FiTool className="filter drop-shadow-sm" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-3 text-center">
                      Équipements de Pointe
                    </h4>
                    <p className="text-sm text-gray-600 text-center leading-relaxed">
                      Technologie moderne et fiable
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    whileHover={{ y: -4, borderColor: '#ae8f62' }}
                    className="bg-white p-8 border border-gray-200 hover:border-accent transition-all duration-300 group"
                  >
                    <div className="text-5xl text-accent mb-4 flex items-center justify-center">
                      <FiAward className="filter drop-shadow-sm" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-3 text-center">
                      Résultats Exceptionnels
                    </h4>
                    <p className="text-sm text-gray-600 text-center leading-relaxed">
                      À chaque étape du projet
                    </p>
                  </motion.div>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg font-medium">
                  Nos compétences techniques avancées, nos équipements de pointe
                  et notre approche professionnelle garantissent des résultats
                  exceptionnels à chaque étape.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ease: 'linear', duration: 0.6, delay: 0.2 }}
                className="mb-12 pl-6 border-l-4 border-accent"
              >
                <h2 className="text-3xl font-bold text-accent mb-8">
                  Vos projets, Notre Engagement
                </h2>
                <div className="space-y-6">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Explorez notre portefeuille diversifié pour découvrir nos
                    réalisations passées et imaginez les possibilités pour vos
                    futurs projets.
                  </p>
                  <div className="bg-gradient-to-r from-accent/5 via-transparent to-accent/5 p-8 rounded-lg border border-accent/20">
                    <p className="text-gray-800 leading-relaxed text-lg font-semibold">
                      Des petits projets exigeants aux grands projets ambitieux,
                      STIP Solution est votre partenaire de confiance pour des
                      solutions de soudage sur mesure.
                    </p>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg bg-amber-50 p-6 rounded-lg border-l-4 border-amber-400">
                    <span className="font-semibold text-amber-900">
                      Contactez-nous dès aujourd'hui
                    </span>{' '}
                    pour discuter de la manière dont nous pouvons collaborer et
                    concrétiser vos projets les plus ambitieux.
                  </p>
                </div>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: 'linear', duration: 0.15, delay: 0 }}
                className="mb-12"
              >
                <h3 className="text-2xl font-bold text-accent mb-6">
                  Pourquoi STIP Solution ?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Sous-traitance en Soudage',
                    'Fabrication sur Mesure',
                    'Services de Réparation',
                    'Projets Minutieux',
                    'Grands Projets Complexes',
                    'Partenaire de Confiance',
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
                transition={{ ease: 'linear', duration: 0.15, delay: 0.1 }}
              >
                <Link to="/contact" className="inline-flex items-center gap-2">
                  <CTAButton text="Demander un devis" />
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
                <div className="mt-8 bg-gradient-to-br from-white to-amber-50 shadow-lg p-8 border-t-4 border-accent">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-0.5 w-8 bg-accent" />
                    <h4 className="text-lg font-bold text-gray-900">
                      Besoin d'aide ?
                    </h4>
                  </div>
                  <p className="text-gray-700 text-sm mb-6">
                    Mettez-vous en contact avec notre équipe pour discuter de
                    vos exigences de projet.
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

export default CustomManufacturing;
