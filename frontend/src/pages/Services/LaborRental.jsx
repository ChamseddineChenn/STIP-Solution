import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiArrowRight } from 'react-icons/fi';
import { assets } from '../../assets/assets';
import CTAButton from '../../components/CTAButton';

const LaborRental = () => {
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
            src={assets.Location_Main_Oeuvre_Image}
            alt="Labor Rental"
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
                Expertise Qualifiée
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Location de Main-d'Œuvre Spécialisée
            </h1>
            <p className="text-xl text-white max-w-4xl leading-relaxed">
              Une Solution Flexible pour Optimiser votre ROI. Faites face aux
              fluctuations du marché et boostez votre capacité de production
              sans alourdir votre structure fixe. STIP Solution offre un service
              de location de main-d'œuvre hautement qualifiée, conçu pour les
              entreprises exigeantes qui visent l'excellence opérationnelle, de
              la production à l'unité jusqu'aux grandes séries.
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
                  Une Solution Flexible pour Optimiser votre ROI
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  L'externalisation de vos besoins en personnel avec STIP vous
                  permet de transformer vos coûts fixes en coûts variables, tout
                  en accélérant vos cycles de livraison.
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
                        Agilité de Production :
                      </strong>{' '}
                      Que ce soit pour une opération ponctuelle ou la prise en
                      charge complète d'une ligne de fabrication (acier, acier
                      inoxydable, aluminium).
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
                        Scalabilité Immédiate :
                      </strong>{' '}
                      Adaptez la taille de votre équipe en fonction de vos
                      contrats, que ce soit pour de la petite, moyenne ou grande
                      série.
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
                        Réduction des Risques RH :
                      </strong>{' '}
                      Économisez sur le recrutement et la formation. Nous
                      fournissons des experts opérationnels dès leur arrivée sur
                      votre site.
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
                <p className="text-gray-700 leading-relaxed mb-8">
                  Tous nos employés sont rigoureusement sélectionnés pour leur
                  polyvalence et leur capacité à s'intégrer rapidement dans des
                  environnements techniques complexes.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ease: 'linear', duration: 0.6, delay: 0.2 }}
                className="mb-12 pl-6 border-l-4 border-accent"
              >
                <h2 className="text-3xl font-bold text-accent mb-6">
                  Nos Corps de Métiers Disponibles :
                </h2>
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
                        Soudeurs Certifiés :
                      </strong>{' '}
                      Maîtrise des procédés de pointe sur tous types de métaux.
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
                        Soudeurs-Ajusteurs (Lecture de plans) :
                      </strong>{' '}
                      Experts en interprétation technique pour une exécution
                      sans erreur.
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
                        Superviseurs en Soudage :
                      </strong>{' '}
                      Gestion d'équipe et contrôle qualité rigoureux sur le
                      terrain.
                    </span>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="flex gap-3 text-gray-700 leading-relaxed"
                  >
                    <span className="text-accent font-bold mt-1">■</span>
                    <span>
                      <strong className="text-accent">
                        Mécaniciens Industriels (Fixes et Mobiles) :
                      </strong>{' '}
                      Maintenance proactive et dépannage d'équipements de
                      production.
                    </span>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="flex gap-3 text-gray-700 leading-relaxed"
                  >
                    <span className="text-accent font-bold mt-1">■</span>
                    <span>
                      <strong className="text-accent">
                        Machinistes de Précision :
                      </strong>{' '}
                      Usinage et fabrication de pièces aux tolérances critiques.
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
                    Notre Main d'Œuvre Qualifiée
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Soudeurs Qualifiés',
                    'Mécaniciens Industriels',
                    'Opérateurs CNC',
                    'Techniciens de Production',
                    'Contractants Polyvalents',
                    'Personnel Certifié',
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
                  <CTAButton text="Réserver de la main-d'œuvre qualifiée" />
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
                      Prêt à réserver ?
                    </h4>
                  </div>
                  <p className="text-gray-700 text-sm mb-6">
                    Connectez-vous avec notre équipe pour discuter de vos
                    besoins en personnel.
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

export default LaborRental;
