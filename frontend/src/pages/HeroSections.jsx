import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const HeroSection = () => {
  const navigate = useNavigate();
  // Use your video from assets
  const videoSrc = assets.hero_bg_vid;
  const posterSrc = assets.STIP_Website_Thumbnail;

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc}
        >
          <source src={videoSrc} type="video/mp4" />
          <img
            src={posterSrc}
            alt="Industrial manufacturing facility"
            className="w-full h-full object-cover"
          />
        </video>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/60" />

        {/* Subtle gradient accents */}
        <div className="absolute inset-0 bg-linear-to-r from-blue-900/10 via-transparent to-blue-900/10" />
      </div>

      {/* Hero Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl"
        >
          {/* Main Title */}
          <motion.h1
            className="font-bold mb-6 tracking-tight leading-[1.1] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Fabrication industrielle
            <br />
            <span className="text-blue-400 drop-shadow-lg">
              et experts en soudage
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto text-gray-200 drop-shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Ingénierie de précision • Qualité certifiée • Solutions fiables
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex gap-6 flex-wrap justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase tracking-wider text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Demandez une consultation gratuite
            </motion.button>

            <motion.button
              onClick={() => navigate('/services')}
              className="px-8 py-4 border-2 border-white hover:border-blue-400 text-white hover:text-blue-400 font-semibold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Voir nos services
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-widest mb-2 text-gray-300">
              Faites défiler
            </span>
            <motion.div
              className="w-px h-12 bg-linear-to-b from-blue-400 to-transparent"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
