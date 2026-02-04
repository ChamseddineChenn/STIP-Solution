import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiArrowRight } from 'react-icons/fi';
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
      id: 4,
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
                Finition de Qualité
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Peinture et Sablage
            </h1>
            <p className="text-xl text-white max-w-4xl leading-relaxed">
              Solutions de finition et traitement de surface par STIP Solution.
              Nous combinons le sablage industriel et les revêtements de
              peinture de haute qualité pour protéger et préparer vos
              équipements. De la préparation de surface au revêtement final,
              notre expertise garantit une protection durable contre la
              corrosion et une finition professionnelle.
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: 'linear', duration: 0.6 }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold text-accent mb-6">
                  Traitement de Surface et Solutions de Finition
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  STIP offre des solutions de traitement de surface : sablage et
                  peinture. Le sablage, ou grenaillage, est une technique de
                  nettoyage industriel qui permet un nettoyage en profondeur des
                  surfaces métalliques et les prépare aux revêtements
                  ultérieurs. Notre atelier propose tous types de peintures pour
                  la protection contre la corrosion et la détérioration.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  La peinture en poudre, aussi appelée peinture cuite au four,
                  se distingue par son économie, l'économie de temps (pas de
                  temps de séchage) et le respect de l'environnement. La
                  peinture liquide est appliquée au pistolet pulvérisateur sur
                  une chaîne de production, dans une cabine sans poussière. Nous
                  garantissons que chaque finition répond à vos spécifications
                  et offre une protection durable pour vos équipements
                  industriels.
                </p>
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
                    Notre Capacité Technique
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Sablage Industriel',
                    'Revêtements Protecteurs',
                    'Préparation de Surface',
                    'Inspection Qualité',
                    'Finition Poudre',
                    'Application de Peinture Liquide',
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
                  <CTAButton text="Obtenir un devis" />
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
                      Besoin d'aide ?
                    </h4>
                  </div>
                  <p className="text-gray-700 text-sm mb-6">
                    Laissez nos experts en finition vous aider à protéger votre
                    équipement.
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
