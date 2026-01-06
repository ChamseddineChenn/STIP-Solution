import React from 'react';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiArrowRight } from 'react-icons/fi';
import { assets } from '../../assets/assets';
import CTAButton from '../../components/CTAButton';

const CustomManufacturing = () => {
  const sectionRef = useRef(null);

  const relatedServices = [
    {
      id: 2,
      title: 'Ingénierie et Numérisation 3D',
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
              Fabrication sur mesure et Réparation
            </h1>
            <p className="text-xl text-white max-w-4xl leading-relaxed">
              L'Ingénierie de Précision par STIP Solution. Chez STIP Solution,
              nous ne nous contentons pas de souder : nous bâtissons la
              fiabilité de vos infrastructures. Que ce soit pour des composantes
              de haute précision ou des structures industrielles massives, notre
              approche repose sur une synergie entre agilité technique et
              capacité de production.
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
                  Fabrication Métallique sur Mesure : Du Prototype à la Série
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Nous transformons vos concepts les plus complexes en réalités
                  tangibles. Notre service de fabrication couvre 100 % du cycle
                  de vie du produit.
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
                        Polyvalence d'échelle :
                      </strong>{' '}
                      Capacité d'intervention sur des micro-projets exigeant une
                      précision au millimètre jusqu'à des assemblages
                      structurels de grande envergure.
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
                        Expertise Multimatériaux :
                      </strong>{' '}
                      Maîtrise avancée du soudage sur acier, acier inoxydable et
                      aluminium, garantissant une intégrité structurelle
                      maximale.
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
                        Conception Collaborative :
                      </strong>{' '}
                      Une équipe de spécialistes qui allie créativité et
                      faisabilité technique pour optimiser le design de vos
                      pièces et réduire vos coûts de production.
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
                  Réparation et Remise à Neuf : Maximisez la Durée de Vie de vos
                  Actifs
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  L'usure industrielle ne doit pas freiner votre productivité.
                  Nous intervenons pour restaurer vos équipements selon des
                  standards souvent supérieurs à l'original.
                </p>
                <ul className="space-y-3">
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="flex gap-3 text-gray-700 leading-relaxed"
                  >
                    <span className="text-accent font-bold mt-1">■</span>
                    <span>
                      <strong className="text-accent">
                        Récupération de composants critiques :
                      </strong>{' '}
                      Redonnez une seconde vie à vos pièces d'usure plutôt que
                      de les remplacer, permettant une économie directe sur vos
                      CAPEX.
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
                        Interventions de précision :
                      </strong>{' '}
                      Réparations certifiées conformes aux normes de
                      l'industrie, assurant la sécurité et la performance à long
                      terme.
                    </span>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="flex gap-3 text-gray-700 leading-relaxed"
                  >
                    <span className="text-accent font-bold mt-1">■</span>
                    <span>
                      <strong className="text-accent">
                        Réduction des temps d'arrêt :
                      </strong>{' '}
                      Un processus de réparation optimisé pour remettre vos
                      machines en fonction dans les plus brefs délais.
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Fabrication Métallique Personnalisée',
                    'Réparation et Remise à Neuf',
                    'Expertise Multimatériaux',
                    'Assemblage Structurel',
                    'Conception Collaborative',
                    'Production Haute Précision',
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
