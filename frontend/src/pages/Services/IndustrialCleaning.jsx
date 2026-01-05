import React from 'react';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiArrowRight } from 'react-icons/fi';
import { assets } from '../../assets/assets';
import CTAButton from '../../components/CTAButton';

const IndustrialCleaning = () => {
  const sectionRef = useRef(null);

  const relatedServices = [
    {
      id: 4,
      title: 'Maintenance Industrielle',
      path: '/services/industrial-maintenance',
    },
    {
      id: 6,
      title: 'Peinture et Sablage',
      path: '/services/painting-sandblasting',
    },
    { id: 5, title: 'Soudage Mobile', path: '/services/mobile-welding' },
  ];

  return (
    <div className="min-h-screen section-white sharp">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0">
          <img
            src={assets.Industrial_Maintenance_Image}
            alt="Industrial Cleaning"
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
                Nettoyage Professionnel
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Nettoyage Industriel de Haute Performance
            </h1>
            <p className="text-xl text-white max-w-4xl leading-relaxed">
              Hygiène, Sécurité et Conformité. Le nettoyage industriel ne se
              limite pas à l'entretien de surface ; c'est un pilier de votre
              stratégie de maintenance. Chez STIP Solution, nous intervenons là
              où la propreté devient une question de sécurité et d'efficacité
              opérationnelle. Nos équipes spécialisées traitent les
              environnements les plus exigeants avec une rigueur mathématique.
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
                  1. Expertise en Environnements à Haut Risque
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Nous formons nos experts pour intervenir dans des zones
                  critiques où l'erreur n'est pas permise. Chaque intervention
                  est planifiée pour minimiser l'impact sur votre production.
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
                        Espaces Clos et Confinés :
                      </strong>{' '}
                      Maîtrise totale des protocoles d'entrée et de surveillance
                      pour un nettoyage sécuritaire.
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
                        Travaux en Hauteur :
                      </strong>{' '}
                      Utilisation d'équipements d'accès spécialisés pour
                      l'assainissement de structures complexes et de plafonds
                      industriels.
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
                        Gestion des Produits Spécifiques :
                      </strong>{' '}
                      Sélection rigoureuse de solvants et d'agents de nettoyage
                      adaptés à vos types de contaminants (graisses, poudres,
                      résidus chimiques).
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
                  2. La Sécurité : Notre Standard de Performance
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Pour STIP Solution, une intervention réussie se mesure par
                  l'absence totale d'incidents et un niveau de propreté
                  dépassant les audits les plus stricts.
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
                        Normes Rigoureuses :
                      </strong>{' '}
                      Application systématique des standards SST et des
                      protocoles spécifiques.
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
                        Contrôles Qualité Fréquents :
                      </strong>{' '}
                      Audit post-intervention pour valider l'atteinte des
                      objectifs de salubrité.
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
                        Formation Continue :
                      </strong>{' '}
                      Nos techniciens sont régulièrement recyclés sur les
                      dernières normes de sécurité et les nouvelles technologies
                      de nettoyage industriel.
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
                    Nos Services de Nettoyage
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Nettoyage Haute Pression',
                    'Dégraissage Chimique',
                    'Nettoyage de Réservoirs',
                    'Conformité Environnementale',
                    'Opérations Certifiées Sécurité',
                    'Intervention 24/7',
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
                  <CTAButton text="Réserver un service" />
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
                    Contactez nos spécialistes en nettoyage 24/7.
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

export default IndustrialCleaning;
