import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMail, FiPhone } from 'react-icons/fi';
import { HiOutlineSparkles, HiOutlineCheckCircle } from 'react-icons/hi2';

const Careers = () => {
  const benefits = [
    {
      icon: <HiOutlineSparkles className="w-6 h-6" />,
      title: 'Environnement innovant',
      description:
        'Travaillez avec des technologies de pointe et des processus industriels modernes.',
    },
    {
      icon: <HiOutlineCheckCircle className="w-6 h-6" />,
      title: 'Équipe compétente',
      description:
        'Rejoignez une équipe de professionnels certifiés et expérimentés.',
    },
    {
      icon: <FiMail className="w-6 h-6" />,
      title: 'Opportunités de croissance',
      description:
        'Développez vos compétences avec des formations et des certifications continues.',
    },
    {
      icon: <FiPhone className="w-6 h-6" />,
      title: 'Culture collaborative',
      description:
        'Participer à un environnement où le respect et la communication sont prioritaires.',
    },
  ];

  const values = [
    { title: 'Respect', description: 'Valoriser chaque membre de l\'équipe et leurs contributions.' },
    { title: 'Excellence', description: 'Poursuivre les plus hauts standards professionnels.' },
    { title: 'Sécurité', description: 'Maintenir un environnement de travail sûr et sain.' },
    { title: 'Ouverture', description: 'Accueillir les idées nouvelles et les perspectives diverses.' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-blue via-dark-blue to-dark-blue/95">
      {/* Hero Section */}
      <motion.section
        className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Rejoignez l'équipe
              <span className="block text-primary-50 mt-2">STIP Solutions</span>
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto mb-8">
              Construisez une carrière enrichissante dans l'industrie manufacturière et de services
              industriels avec une équipe qui valorise l'excellence et l'innovation.
            </p>

            {/* No Open Positions Badge */}
            <motion.div
              className="inline-flex items-center gap-3 bg-primary-50/10 border border-primary-50/30 rounded-lg px-6 py-4 mb-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="w-3 h-3 bg-primary-50 rounded-full animate-pulse" />
              <p className="text-primary-50 font-semibold">
                Aucun poste ouvert actuellement
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Background accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-50/5 rounded-full blur-3xl -z-10" />
      </motion.section>

      {/* Why STIP Solutions Section */}
      <motion.section
        className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Pourquoi rejoindre STIP Solutions?
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Découvrez ce qui rend STIP Solutions un employeur de choix dans le secteur industriel.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white/5 border border-primary-50/20 rounded-xl p-6 hover:bg-white/10 hover:border-primary-50/40 transition-all duration-300 group"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="text-primary-50 mb-4 group-hover:text-white transition-colors duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Our Values Section */}
      <motion.section
        className="relative py-20 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Nos valeurs fondamentales
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Les principes qui guident notre équipe et nos décisions au quotidien.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-primary-50/10 to-primary-50/5 border border-primary-50/20 rounded-xl p-8 hover:border-primary-50/40 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary-50/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-6 h-6 border-2 border-primary-50 rounded" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-gradient-to-r from-primary-50/10 via-primary-50/5 to-primary-50/10 border border-primary-50/20 rounded-2xl p-8 sm:p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Intéressé par une opportunité chez STIP Solutions?
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
              Bien qu'il n'y ait actuellement aucun poste ouvert, nous vous invitons à nous contacter
              pour discuter des opportunités futures ou soumettre votre profil.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:careers@stipsolutions.com"
                className="inline-flex items-center gap-2 bg-primary-50 text-dark-blue px-8 py-3 rounded-lg font-semibold hover:bg-white transition-all duration-300 group"
              >
                <FiMail className="w-5 h-5" />
                Envoyer votre CV
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 border border-primary-50 text-primary-50 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50/10 transition-all duration-300 group"
              >
                Nous contacter
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Background accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50/5 rounded-full blur-3xl -z-10" />
      </motion.section>

      {/* FAQ-like Section */}
      <motion.section
        className="relative py-20 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              À propos de nos opportunités
            </h2>
          </motion.div>

          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white/5 border border-primary-50/20 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold text-white mb-3">
                Quels types de postes offrez-vous?
              </h3>
              <p className="text-text-secondary">
                STIP Solutions recrute pour diverses positions, notamment des soudeurs, techniciens,
                ingénieurs, superviseurs et personnel d'assistance. Nous valorisons l'expérience industrielle
                et les certifications pertinentes.
              </p>
            </motion.div>

            <motion.div
              className="bg-white/5 border border-primary-50/20 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold text-white mb-3">
                Offrez-vous une formation?
              </h3>
              <p className="text-text-secondary">
                Oui! Nous investissons dans le développement professionnel de nos employés. Nous proposons
                des formations continues, des certifications (AWS, CWB, etc.) et des opportunités de progression.
              </p>
            </motion.div>

            <motion.div
              className="bg-white/5 border border-primary-50/20 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold text-white mb-3">
                Comment puis-je soumettre mon candidature?
              </h3>
              <p className="text-text-secondary">
                Vous pouvez envoyer votre CV et une lettre de motivation à{' '}
                <a href="mailto:careers@stipsolutions.com" className="text-primary-50 hover:underline">
                  careers@stipsolutions.com
                </a>
                , ou nous contacter directement via le formulaire de contact.
              </p>
            </motion.div>

            <motion.div
              className="bg-white/5 border border-primary-50/20 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold text-white mb-3">
                Quel est l'environnement de travail?
              </h3>
              <p className="text-text-secondary">
                Nous opérons dans des installations industrielles modernes et bien équipées. La sécurité est
                notre priorité absolue, et nous maintenons les normes les plus élevées d'environnement de travail.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Careers;
