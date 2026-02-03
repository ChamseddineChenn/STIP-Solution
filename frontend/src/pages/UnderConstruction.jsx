import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { assets } from '../assets/assets';
import { FiTool, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

// Pre-generated particle data to avoid impure function calls during render
const PARTICLE_DATA = [
  { id: 0, size: 4.5, x: 15, y: 20, duration: 18, delay: 1 },
  { id: 1, size: 3.2, x: 85, y: 45, duration: 22, delay: 3 },
  { id: 2, size: 5.1, x: 42, y: 78, duration: 16, delay: 0 },
  { id: 3, size: 2.8, x: 68, y: 12, duration: 20, delay: 4 },
  { id: 4, size: 4.0, x: 25, y: 55, duration: 19, delay: 2 },
  { id: 5, size: 3.5, x: 92, y: 88, duration: 24, delay: 1.5 },
  { id: 6, size: 5.5, x: 8, y: 65, duration: 17, delay: 3.5 },
  { id: 7, size: 2.5, x: 55, y: 30, duration: 21, delay: 0.5 },
  { id: 8, size: 4.2, x: 78, y: 72, duration: 15, delay: 2.5 },
  { id: 9, size: 3.8, x: 35, y: 95, duration: 23, delay: 4.5 },
  { id: 10, size: 4.8, x: 62, y: 8, duration: 18, delay: 1.2 },
  { id: 11, size: 3.0, x: 18, y: 42, duration: 20, delay: 3.2 },
  { id: 12, size: 5.3, x: 88, y: 58, duration: 16, delay: 0.8 },
  { id: 13, size: 2.6, x: 48, y: 85, duration: 22, delay: 4.2 },
  { id: 14, size: 4.4, x: 72, y: 25, duration: 19, delay: 2.8 },
  { id: 15, size: 3.3, x: 5, y: 92, duration: 25, delay: 1.8 },
  { id: 16, size: 5.0, x: 95, y: 35, duration: 17, delay: 3.8 },
  { id: 17, size: 2.9, x: 38, y: 68, duration: 21, delay: 0.2 },
  { id: 18, size: 4.6, x: 82, y: 15, duration: 15, delay: 2.2 },
  { id: 19, size: 3.6, x: 28, y: 48, duration: 23, delay: 4.8 },
];

const UnderConstruction = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Use memoized particle data
  const particles = useMemo(() => PARTICLE_DATA, []);

  return (
    <div className="relative min-h-screen bg-dark-blue overflow-hidden flex items-center justify-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, #104377 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, #104377 0%, transparent 50%)',
              'radial-gradient(circle at 50% 20%, #104377 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, #104377 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary-50/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(#12a6e0 1px, transparent 1px), linear-gradient(90deg, #12a6e0 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Logo with parallax effect */}
        <motion.div
          className="mb-12"
          style={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 30 }}
        >
          <motion.img
            src={assets.stip_logo}
            alt="STIP Solutions"
            className="h-24 md:h-32 mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </motion.div>

        {/* Animated construction icon */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 border border-primary-50/30"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FiTool className="w-10 h-10 text-primary-50" />
          </motion.div>
        </motion.div>

        {/* Main heading with staggered animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-text-light mb-4 tracking-tight">
            Site en{' '}
            <span className="relative">
              <span className="text-primary-50">construction</span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-accent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              />
            </span>
          </h1>
        </motion.div>

        <motion.p
          className="text-lg md:text-xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Nous travaillons actuellement sur notre nouveau site web pour mieux
          vous servir. Revenez bientôt pour découvrir nos services industriels
          de qualité supérieure.
        </motion.p>

        {/* Animated progress bar */}
        <motion.div
          className="max-w-md mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <div className="flex justify-between text-sm text-text-secondary mb-2">
            <span>Progression</span>
            <span>Bientôt prêt</span>
          </div>
          <div className="h-2 bg-card-bg rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-linear-to-r from-primary to-primary-50"
              initial={{ width: 0 }}
              animate={{ width: '85%' }}
              transition={{ delay: 1.1, duration: 1.5, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        {/* Contact information */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          <a
            href="mailto:contact@stip.ca"
            className="group flex flex-col items-center p-6 bg-card-bg/50 backdrop-blur-sm border border-primary-50/10 hover:border-primary-50/30 transition-all duration-300 h-full"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/20 text-primary-50 mb-3 group-hover:scale-110 transition-transform flex-shrink-0">
              <FiMail className="w-5 h-5" />
            </div>
            <span className="text-text-secondary text-sm">Email</span>
            <span className="text-text-light font-medium text-center">
              contact@stip.ca
            </span>
          </a>

          <a
            href="tel:+14189904459"
            className="group flex flex-col items-center p-6 bg-card-bg/50 backdrop-blur-sm border border-primary-50/10 hover:border-primary-50/30 transition-all duration-300 h-full"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/20 text-primary-50 mb-3 group-hover:scale-110 transition-transform flex-shrink-0">
              <FiPhone className="w-5 h-5" />
            </div>
            <span className="text-text-secondary text-sm">Téléphone</span>
            <span className="text-text-light font-medium text-center">
              +1 (418) 990-4459
            </span>
          </a>

          <div className="group flex flex-col items-center p-6 bg-card-bg/50 backdrop-blur-sm border border-primary-50/10 hover:border-primary-50/30 transition-all duration-300 h-full">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/20 text-primary-50 mb-3 group-hover:scale-110 transition-transform flex-shrink-0">
              <FiMapPin className="w-5 h-5" />
            </div>
            <span className="text-text-secondary text-sm">Adresse</span>
            <span className="text-text-light font-medium text-center text-sm">
              2828 Bv Laurier, Tour 1, Étage 7, Québec QC, G1V 0B9
            </span>
          </div>
        </motion.div>

        {/* Animated decorative elements */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 border border-primary-50/20 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-32 h-32 border border-accent/20 rounded-full"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute top-1/4 right-1/4 w-16 h-16 border border-primary/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Bottom decorative line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary-50 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      />
    </div>
  );
};

export default UnderConstruction;
