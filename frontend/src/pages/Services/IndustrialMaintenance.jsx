import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiArrowRight } from 'react-icons/fi';
import { assets } from '../../assets/assets';
import CTAButton from '../../components/CTAButton';

const IndustrialMaintenance = () => {
  const sectionRef = useRef(null);

  const relatedServices = [
    {
      id: 1,
      title: 'Fabrication sur mesure et Réparation',
      path: '/services/custom-manufacturing',
    },
    {
      id: 4,
      title: 'Nettoyage Industriel',
      path: '/services/industrial-cleaning',
    },
    { id: 7, title: 'Soudage Mobile', path: '/services/mobile-welding' },
  ];

  return (
    <div className="min-h-screen section-white sharp">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0">
          <img
            src={assets.Maintenance_Industrielle_Image}
            alt="Industrial Maintenance"
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
              <span className="text-accent font-semibold">Fiabilité 24/7</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Maintenance Industrielle & Mécanique
            </h1>
            <p className="text-xl text-white max-w-4xl leading-relaxed">
              Performance et Disponibilité 24/7. Dans un environnement de
              production, chaque minute d'arrêt a un coût. Chez STIP Solution,
              nous comprenons l'urgence de vos opérations. C'est pourquoi nous
              offrons un service de maintenance agile, expert et disponible 24
              heures sur 24, 7 jours sur 7, pour garantir la continuité de vos
              actifs les plus critiques.
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
                  Une Expertise Multidisciplinaire pour une Usine Performante
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Notre approche de la maintenance ne se limite pas à la
                  réparation. Nous intervenons sur l'ensemble du cycle de vie de
                  vos machines grâce à une équipe de mécaniciens industriels et
                  de techniciens polyvalents.
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
                        Disponibilité 24/7 :
                      </strong>{' '}
                      Nos équipes d'intervention rapide garantissent une réponse
                      en moins de 2 heures pour les urgences critiques.
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
                        Expertise Polyvalente :
                      </strong>{' '}
                      Soudeurs, mécaniciens, électriciens et techniciens
                      spécialisés dans une seule équipe coordonnée.
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
                        Gestion des Arrêts :
                      </strong>{' '}
                      Planification stratégique pour minimiser le temps d'arrêt
                      de production et optimiser la rentabilité.
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
                  1. Maintenance Stratégique et Préventive
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Anticipez les pannes avant qu'elles ne surviennent. Nous
                  élaborons avec vous des plans de maintenance rigoureux pour :
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
                      Augmenter le MTBF (temps moyen entre deux pannes).
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
                      Optimiser le rendement énergétique et mécanique de vos
                      installations.
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
                      Sécuriser vos lignes de production selon les normes en
                      vigueur.
                    </span>
                  </motion.li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ease: 'linear', duration: 0.6, delay: 0.2 }}
                className="mb-12 pl-6 border-l-4 border-accent"
              >
                <h2 className="text-3xl font-bold text-accent mb-6">
                  2. Installation, Modification et Relocalisation
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Que vous fassiez l'acquisition de nouvelles technologies ou
                  que vous modernisiez vos lignes existantes, nous assurons :
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
                      Installation et démontage de machines avec une précision
                      millimetétrique.
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
                      Modification d'équipements pour adapter votre capacité de
                      production.
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
                      Fabrication sur site de pièces de rechange ou de
                      structures de support.
                    </span>
                  </motion.li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ease: 'linear', duration: 0.6, delay: 0.3 }}
                className="mb-12 pl-6 border-l-4 border-accent"
              >
                <h2 className="text-3xl font-bold text-accent mb-6">
                  3. Services Auxiliaires de Chantier
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Pour vous offrir une solution véritablement «clés en main»,
                  nous intégrons des métiers complémentaires indispensables à la
                  remise à neuf de vos installations :
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
                        Sablage et Peinture industrielle :
                      </strong>{' '}
                      Protection anticorrosion haute durabilité.
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
                        Menuiserie et Coffrage industriel :
                      </strong>{' '}
                      Aménagements spécifiques et supports de machinerie.
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
                        Rénovation et Réparation :
                      </strong>{' '}
                      Remise en état complète après sinistre ou usure prolongée.
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
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-0.5 w-12 bg-accent" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    Nos Services de Maintenance
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Maintenance Préventive',
                    "Dépannage d'Urgence",
                    "Révision d'Équipement",
                    'Équipes Mobiles',
                    "Modification d'Équipement",
                    'Installation de Machines',
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
                  <CTAButton text="Demander un plan d'entretien" />
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
                    Contactez notre équipe de maintenance disponible 24/7.
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

export default IndustrialMaintenance;
