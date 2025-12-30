import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
  FiCheckCircle,
  FiArrowRight,
  FiClock,
  FiAward,
  FiTool,
  FiShield,
  FiTrendingUp,
} from 'react-icons/fi';
import { assets } from '../assets/assets';

const WhyChooseStip = () => {
  const features = [
    {
      id: 1,
      title: 'Excellence opérationnelle 24/7',
      description:
        "Support 24h/24 avec réponse immédiate pour les réparations d'urgence et les projets critiques qui ne peuvent pas attendre.",
      icon: <FiClock className="w-8 h-8" />,
      gradient: 'from-white to-blue-900',
      bgImage:
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop',
    },
    {
      id: 2,
      title: 'Maîtrise certifiée',
      description:
        "Professionnels certifiés CWB, AWS et ISO, formés de manière spécialisée et bénéficiant de décennies d'expérience combinée dans l'industrie.",
      icon: <FiAward className="w-8 h-8" />,
      gradient: 'from-white to-blue-900',
      bgImage:
        'https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=800&auto=format&fit=crop',
    },
    {
      id: 3,
      title: 'Échelle et précision inégalées',
      description:
        "Opérations industrielles à grande échelle prêtes pour des projets de toute envergure, de la micro-précision à la mise en œuvre à l'échelle de l'usine.",
      icon: <FiTool className="w-8 h-8" />,
      gradient: 'from-white to-blue-900',
      bgImage:
        'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&auto=format&fit=crop',
    },
    {
      id: 4,
      title: 'La sécurité avant tout',
      description:
        'Zéro incident majeur sur des milliers de projets grâce à des protocoles de sécurité de pointe et une surveillance continue.',
      icon: <FiShield className="w-8 h-8" />,
      gradient: 'from-white to-blue-900',
      bgImage: assets.Warehouse_Image,
    },
  ];

  const commitments = [
    'Achèvement du projet garanti dans les délais convenus',
    'Tarification transparente avec ventilations complètes',
    'Support post-projet et maintenance inclus',
    'Optimisation continue des processus et innovation',
    'Responsabilité environnementale dans toutes les opérations',
    'Solutions sur mesure adaptées aux besoins spécifiques',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(0,0,0,0.03) 2px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Accent Lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-emerald-500 to-orange-500 opacity-20" />
        <div className="absolute bottom-0 right-0 w-full h-1 bg-linear-to-l from-indigo-500 via-purple-500 to-pink-500 opacity-20" />
      </div>

      <div className="relative container mx-auto px-4 py-20 md:py-28">
        {/* Cinematic Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
            Pourquoi{' '}
            <span className="relative">
              <span className="relative z-10">STIP</span>
              <motion.span
                className="absolute bottom-0 left-0 w-full h-4 bg-linear-to-r from-blue-500/20 to-emerald-500/20 z-0"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3 }}
              />
            </span>{' '}
            Solutions
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Où l'expertise industrielle rencontre l'innovation constante et un
            engagement indéfectible envers l'excellence
          </p>
        </motion.div>

        {/* Cinematic Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className="group relative h-[300px] overflow-hidden cursor-pointer"
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <div
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url(${feature.bgImage})` }}
                />
                <div
                  className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="relative h-full p-8 flex flex-col justify-end">
                <div className="mb-4">
                  <motion.div
                    className="inline-block mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>

                  <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                    {feature.title}
                  </h3>

                  <p className="text-gray-200 opacity-90 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Animated Indicator Line */}
                <div className="w-0 h-0.5 bg-linear-to-r from-white to-transparent group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Our Unwavering Commitment Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notre engagement indéfectible
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chaque projet est soutenu par nos promesses fondamentales qui
              définissent l'expérience STIP
            </p>
          </div>

          {/* Commitment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {commitments.map((commitment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group p-6 bg-linear-to-br from-white to-gray-50 border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 180 }}
                    transition={{ duration: 0.4 }}
                    className="shrink-0"
                  >
                    <FiCheckCircle className="w-6 h-6 text-blue-800" />
                  </motion.div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {commitment}
                    </h4>
                    <div className="h-0.5 w-0 group-hover:w-16 bg-linear-to-r from-black to-blue-500 transition-all duration-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Cinematic CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-linear-to-br from-gray-900 to-black text-white p-12 overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(45deg, transparent 48%, white 50%, transparent 52%)`,
                  backgroundSize: '40px 40px',
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <FiTrendingUp className="w-12 h-12 text-blue-400 mx-auto mb-6" />

              <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Prêt à transformer vos opérations ?
              </h3>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Découvrez la différence STIP avec une évaluation complète de vos
                besoins industriels
              </p>

              {/* Animated CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-linear-to-r from-blue-600 to-emerald-500 text-white px-12 py-4 text-lg font-bold transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Planifier une consultation d'expert
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiArrowRight className="w-5 h-5 ml-3" />
                  </motion.span>
                </span>

                {/* Button Background Animation */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-blue-700 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>

              {/* Additional Info */}
              <p className="mt-6 text-sm text-gray-400">
                Délai de réponse moyen :{' '}
                <span className="font-semibold text-white">90 minutes</span> •
                Consultation initiale :{' '}
                <span className="font-semibold text-emerald-400">Gratuite</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseStip;
