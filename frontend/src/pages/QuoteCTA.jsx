import React, { useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiPhone, FiMail, FiClock } from 'react-icons/fi';

const QuoteCTA = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const quickContacts = [
    {
      icon: <FiPhone className="w-5 h-5" />,
      label: 'Téléphone',
      value: '+1 (418) 990-4459',
      href: 'https://wa.me/14189904459',
    },
    {
      icon: <FiMail className="w-5 h-5" />,
      label: 'Email',
      value: 'contact@stip.ca',
      href: 'mailto:contact@stip.ca',
    },
    {
      icon: <FiClock className="w-5 h-5" />,
      label: 'Réponse',
      value: 'Sous 4 heures',
      href: null,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-linear-to-br from-dark-blue via-primary-dark to-primary overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Main Content */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-primary-50 text-sm font-semibold mb-6 rounded-full border border-white/20"
          >
            Prêt à démarrer votre projet?
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight"
          >
            Demandez votre <span className="text-primary-50">soumission</span>{' '}
            dès aujourd'hui
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Notre équipe d'experts est prête à analyser vos besoins et vous
            proposer des solutions sur mesure pour tous vos projets industriels.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <motion.button
              onClick={() => navigate('/contact')}
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-primary font-bold text-lg rounded-none overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Demander une soumission</span>
              <FiArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <motion.div
                className="absolute inset-0 bg-primary-50"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>

          {/* Quick Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8"
          >
            {quickContacts.map((contact, index) => (
              <div key={index} className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  {contact.icon}
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-400 uppercase tracking-wider">
                    {contact.label}
                  </p>
                  {contact.href ? (
                    <a
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:text-primary-50 transition-colors"
                    >
                      {contact.value}
                    </a>
                  ) : (
                    <p className="font-semibold">{contact.value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteCTA;
