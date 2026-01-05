import React from 'react';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiArrowRight } from 'react-icons/fi';
import { assets } from '../../assets/assets';
import CTAButton from '../../components/CTAButton';

const MobileWelding = () => {
  const sectionRef = useRef(null);

  const relatedServices = [
    {
      id: 3,
      title: 'Soudage et Assemblage',
      path: '/services/welding-assembly',
    },
    {
      id: 1,
      title: 'Fabrication sur mesure et Réparation',
      path: '/services/custom-manufacturing',
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
            src={assets.laser_welding_machine}
            alt="Mobile Welding"
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
                Intervention Rapide
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Soudage Mobile & Unités d'Intervention
            </h1>
            <p className="text-xl text-white max-w-4xl leading-relaxed">
              L'Excellence sur votre Terrain. Une urgence sur un chantier ? Une
              réparation critique en pleine usine ? STIP Solution déploie ses
              ateliers mobiles autonomes directement chez vous. Nous ne nous
              contentons pas de souder ; nous restaurons votre capacité
              opérationnelle là où vous en avez besoin, quand vous en avez
              besoin.
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
                <h2 className="text-3xl font-bold text-accent mb-6">
                  1. Mobilité Totale et Autonomie Technique
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Nos unités mobiles sont de véritables usines sur roues. Chaque
                  véhicule est configuré pour répondre aux standards industriels
                  les plus élevés sans dépendre de vos infrastructures internes.
                </p>
                <ul className="space-y-3">
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="flex gap-3 text-gray-700 leading-relaxed"
                  >
                    <span className="text-accent font-bold mt-1">■</span>
                    <span>
                      <strong className="text-accent">
                        Équipement de Pointe :
                      </strong>{' '}
                      Soudeuses multiprocédés haute performance, outils de
                      découpe plasma et matériel de manutention intégrés.
                    </span>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="flex gap-3 text-gray-700 leading-relaxed"
                  >
                    <span className="text-accent font-bold mt-1">■</span>
                    <span>
                      <strong className="text-accent">
                        Intervention Tout-Terrain :
                      </strong>{' '}
                      Que ce soit en milieu urbain, sur des sites de
                      construction complexes ou dans des zones industrielles
                      restreintes.
                    </span>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="flex gap-3 text-gray-700 leading-relaxed"
                  >
                    <span className="text-accent font-bold mt-1">■</span>
                    <span>
                      <strong className="text-accent">
                        Consommables Inclus :
                      </strong>{' '}
                      Nous arrivons avec tout le matériel nécessaire pour
                      finaliser le projet, éliminant les allées-retours
                      inutiles.
                    </span>
                  </motion.li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ease: 'linear', duration: 0.6, delay: 0.1 }}
                className="mb-12 pl-6 border-l-4 border-accent"
              >
                <h2 className="text-3xl font-bold text-accent mb-6">
                  2. Rigueur et Contrôle Qualité Hors-Site
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  L'aspect mobile ne sacrifie jamais la précision. Nous
                  appliquons la même rigueur technique en extérieur qu'en
                  atelier.
                </p>
                <ul className="space-y-3">
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="flex gap-3 text-gray-700 leading-relaxed"
                  >
                    <span className="text-accent font-bold mt-1">■</span>
                    <span>
                      <strong className="text-accent">
                        Suivi des Procédés :
                      </strong>{' '}
                      Respect strict des procédures de soudage (WPS) adaptées à
                      chaque type d'alliage et de structure.
                    </span>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="flex gap-3 text-gray-700 leading-relaxed"
                  >
                    <span className="text-accent font-bold mt-1">■</span>
                    <span>
                      <strong className="text-accent">
                        Inspection Rigoureuse :
                      </strong>{' '}
                      Contrôle visuel et tests de conformité systématiques pour
                      garantir la solidité des réparations.
                    </span>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="flex gap-3 text-gray-700 leading-relaxed"
                  >
                    <span className="text-accent font-bold mt-1">■</span>
                    <span>
                      <strong className="text-accent">Traçabilité :</strong> Un
                      suivi complet de l'intervention est fourni, assurant que
                      vos standards de qualité et d'assurance sont respectés à
                      100 %.
                    </span>
                  </motion.li>
                </ul>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: 'linear', duration: 0.15, delay: 0 }}
                className="mb-12"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Nos Services
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Soudage sur Site',
                    "Réparations d'Urgence",
                    'Fabrication sur Terrain',
                    'Équipement Portable',
                    'Couverture Nationale',
                    'Équipes Certifiées',
                  ].map((feature, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: 'rgba(174, 143, 98, 0.15)',
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="group flex items-center gap-3 p-4 transition-all duration-100 cursor-pointer "
                    >
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span className="text-gray-700 group-hover:text-accent transition-colors">
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
                  <CTAButton text="Demander un soudage mobile" />
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
                      Réponse d'urgence ?
                    </h4>
                  </div>
                  <p className="text-gray-700 text-sm mb-6">
                    Appelez notre équipe pour une réponse rapide en soudage
                    mobile.
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

export default MobileWelding;
