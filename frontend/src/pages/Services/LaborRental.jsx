import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FiChevronLeft,
  FiArrowRight,
  FiUsers,
  FiAward,
  FiGlobe,
} from 'react-icons/fi';
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
                In the field of welding
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Location de Main-d'Œuvre
            </h1>
            <p className="text-xl text-white max-w-4xl leading-relaxed font-semibold">
              Vous souhaitez diversifier vos produits et augmenter votre volume
              de production ?
            </p>
            <p className="text-lg text-white max-w-4xl leading-relaxed mt-4 opacity-95">
              Vous recherchez une entreprise capable de vous proposer un service
              complet de location de main-d'œuvre, de la simple opération à la
              fabrication complète de pièces en aluminium, en acier inoxydable
              ou en acier ?
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
                  La Solution : STIP !
                </h2>
                <div className="space-y-6">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Nous sommes prêts à vous proposer un service de location de
                    main-d'œuvre adapté à vos besoins, vous permettant ainsi de
                    gagner du temps et de l'argent.
                  </p>
                  <div className="bg-gradient-to-r from-accent/10 to-transparent p-6 rounded-lg border-l-4 border-accent">
                    <p className="text-gray-800 leading-relaxed font-medium text-lg">
                      Nous garantissons des services de qualité qui dépassent
                      vos attentes, pour tous vos besoins de production, de
                      petite, moyenne et grande série.
                    </p>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Nous pouvons être votre partenaire de confiance et vous
                    aider à atteindre vos objectifs plus rapidement.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ease: 'linear', duration: 0.6, delay: 0.1 }}
                className="mb-12 pl-6 border-l-4 border-accent"
              >
                <h2 className="text-3xl font-bold text-accent mb-8">
                  Effectifs Disponibles dans Notre Entreprise
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg mb-8">
                  Une équipe polyvalente et mobilisable partout :
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="bg-accent/10 p-5 rounded-lg border-l-4 border-accent"
                  >
                    <h4 className="font-bold text-gray-900 mb-2">Soudeur</h4>
                    <p className="text-sm text-gray-700">
                      Expertise en soudage sur tous types de métaux
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="bg-accent/10 p-5 rounded-lg border-l-4 border-accent"
                  >
                    <h4 className="font-bold text-gray-900 mb-2">
                      Soudeur/Ajusteur en lecture de plans
                    </h4>
                    <p className="text-sm text-gray-700">
                      Interprétation technique et exécution précise
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="bg-accent/10 p-5 rounded-lg border-l-4 border-accent"
                  >
                    <h4 className="font-bold text-gray-900 mb-2">
                      Superviseur en soudage
                    </h4>
                    <p className="text-sm text-gray-700">
                      Gestion d'équipe et contrôle qualité
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="bg-accent/10 p-5 rounded-lg border-l-4 border-accent"
                  >
                    <h4 className="font-bold text-gray-900 mb-2">
                      Mécanicien industriel (machines fixes et mobiles)
                    </h4>
                    <p className="text-sm text-gray-700">
                      Maintenance et dépannage d'équipements
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="bg-accent/10 p-5 rounded-lg border-l-4 border-accent"
                  >
                    <h4 className="font-bold text-gray-900 mb-2">Machiniste</h4>
                    <p className="text-sm text-gray-700">
                      Usinage de précision et fabrication
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="bg-accent/10 p-5 rounded-lg border-l-4 border-accent"
                  >
                    <h4 className="font-bold text-gray-900 mb-2">
                      Équipe Polyvalente
                    </h4>
                    <p className="text-sm text-gray-700">
                      Déployable partout au Canada
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ease: 'linear', duration: 0.6, delay: 0.2 }}
                className="mb-12 pl-6 border-l-4 border-accent"
              >
                <h2 className="text-3xl font-bold text-accent mb-8">
                  Nos Avantages
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg mb-8">
                  Une solution complète et professionnelle pour tous vos besoins
                  en ressources humaines.
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
                      <FiUsers className="filter drop-shadow-sm" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-3 text-center">
                      Équipes Qualifiées
                    </h4>
                    <p className="text-sm text-gray-600 text-center leading-relaxed">
                      Personnel rigoureusement sélectionné et expérimenté
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
                      <FiAward className="filter drop-shadow-sm" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-3 text-center">
                      Polyvalence
                    </h4>
                    <p className="text-sm text-gray-600 text-center leading-relaxed">
                      Adaptabilité et intégration rapide
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
                      <FiGlobe className="filter drop-shadow-sm" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-3 text-center">
                      Mobilité Nationale
                    </h4>
                    <p className="text-sm text-gray-600 text-center leading-relaxed">
                      Déploiement partout au Canada
                    </p>
                  </motion.div>
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
                  Spécialités et Compétences
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Soudeurs Qualifiés',
                    'Ajusteurs en lecture de plans',
                    'Superviseurs en soudage',
                    'Mécaniciens industriels',
                    'Machinistes de précision',
                    'Personnel polyvalent mobile',
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
                  <CTAButton text="Réserver votre équipe" />
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
                      Besoin de talents ?
                    </h4>
                  </div>
                  <p className="text-gray-700 text-sm mb-6">
                    Discutez avec nos experts en ressources humaines de vos
                    besoins.
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
