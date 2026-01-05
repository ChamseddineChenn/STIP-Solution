import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FiArrowRight,
  FiCalendar,
  FiUser,
  FiSearch,
  FiX,
} from 'react-icons/fi';
import Button from '../components/Button';

const Blogs = () => {
  const navigate = useNavigate();
  const [hoveredBlog, setHoveredBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const blogs = [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] overflow-hidden bg-linear-to-br from-dark-blue via-dark-blue to-black flex items-center">
        {/* Animated background grid */}
        <motion.div
          className="absolute inset-0 opacity-10"
          initial={{ backgroundPosition: '0% 0%' }}
          animate={{ backgroundPosition: '100% 100%' }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage: `linear-gradient(45deg, transparent 48%, rgba(59, 130, 246, 0.1) 49%, rgba(59, 130, 246, 0.1) 51%, transparent 52%)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Vertical accent lines */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute left-1/4 top-0 w-px h-full bg-linear-to-b from-primary via-primary/30 to-transparent"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute right-1/4 top-0 w-px h-full bg-linear-to-b from-primary/50 via-primary/10 to-transparent"
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="h-1 w-16 bg-primary mb-8"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />

              <motion.h1
                className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tighter leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Blogue
                <motion.span
                  className="block text-primary mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Industriel
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-text-secondary max-w-3xl leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Insights, tendances et bonnes pratiques pour les professionnels
                du secteur industriel. Restez informé des dernières innovations
                et stratégies.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            {/* Search Bar */}
            <div className="relative mb-8">
              <div className="relative flex items-center">
                <FiSearch className="absolute left-4 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher des articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 md:py-4 border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors text-gray-900 placeholder:text-gray-400"
                />
                {searchTerm && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </motion.button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
                Catégories
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  'Tous',
                  'Technologie',
                  'Conformité',
                  'Sécurité',
                  'Durabilité',
                  'Tendances',
                  'Gestion',
                  'Maintenance',
                  'Ressources humaines',
                  'Qualité',
                ].map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 border ${
                      selectedCategory === category
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-primary'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Filtered Blogs Grid */}
          {(() => {
            const filteredBlogs = blogs.filter((blog) => {
              const matchesSearch =
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
              const matchesCategory =
                selectedCategory === 'Tous' ||
                blog.category === selectedCategory;
              return matchesSearch && matchesCategory;
            });

            return filteredBlogs.length > 0 ? (
              <motion.div
                key={`${searchTerm}-${selectedCategory}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredBlogs.map((blog) => (
                  <motion.div
                    key={blog.id}
                    variants={cardVariants}
                    onMouseEnter={() => setHoveredBlog(blog.id)}
                    onMouseLeave={() => setHoveredBlog(null)}
                    className="group flex flex-col overflow-hidden border border-gray-200 hover:border-primary transition-all duration-300 bg-white hover:shadow-lg"
                  >
                    {/* Blog Image */}
                    <div
                      className="h-48 md:h-56 relative overflow-hidden bg-cover bg-center"
                      style={{ backgroundImage: `url(${blog.image})` }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-dark-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <button
                          onClick={() => navigate(`/blog/${blog.id}`)}
                          className="pointer-events-auto"
                        >
                          <Button text="Lire plus" />
                        </button>
                      </motion.div>
                    </div>

                    {/* Blog Content */}
                    <div className="flex flex-col flex-grow p-6 md:p-8">
                      {/* Category Badge */}
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-primary-50/10 text-primary font-semibold text-xs uppercase tracking-wider">
                          {blog.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {blog.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 text-sm md:text-base mb-6 flex-grow leading-relaxed">
                        {blog.excerpt}
                      </p>

                      {/* Meta Information */}
                      <div className="flex flex-col gap-2 pt-6 border-t border-gray-200">
                        <div className="flex items-center text-gray-500 text-xs md:text-sm">
                          <FiCalendar className="w-4 h-4 mr-2" />
                          {blog.date}
                        </div>
                        <div className="flex items-center text-gray-500 text-xs md:text-sm">
                          <FiUser className="w-4 h-4 mr-2" />
                          {blog.author}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center py-20 md:py-32"
              >
                {/* Animated SVG Icon */}
                <motion.div
                  className="flex justify-center mb-8"
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <svg
                    width="120"
                    height="120"
                    viewBox="0 0 120 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primary"
                  >
                    {/* Animated book/document */}
                    <motion.g
                      animate={{ rotate: [0, 5, 0, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <path
                        d="M30 20C30 18.8954 30.8954 18 32 18H88C89.1046 18 90 18.8954 90 20V100C90 101.105 89.1046 102 88 102H32C30.8954 102 30 101.105 30 100V20Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      <line
                        x1="60"
                        y1="18"
                        x2="60"
                        y2="102"
                        stroke="currentColor"
                        strokeWidth="2"
                        opacity="0.3"
                      />
                      <rect
                        x="38"
                        y="35"
                        width="18"
                        height="12"
                        rx="1"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      <rect
                        x="64"
                        y="35"
                        width="18"
                        height="12"
                        rx="1"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      <line
                        x1="38"
                        y1="55"
                        x2="56"
                        y2="55"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line
                        x1="38"
                        y1="65"
                        x2="56"
                        y2="65"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line
                        x1="38"
                        y1="75"
                        x2="56"
                        y2="75"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line
                        x1="64"
                        y1="55"
                        x2="82"
                        y2="55"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line
                        x1="64"
                        y1="65"
                        x2="82"
                        y2="65"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line
                        x1="64"
                        y1="75"
                        x2="82"
                        y2="75"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </motion.g>

                    {/* Animated sparkles */}
                    <motion.circle
                      cx="35"
                      cy="25"
                      r="3"
                      fill="currentColor"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0,
                      }}
                    />
                    <motion.circle
                      cx="95"
                      cy="35"
                      r="2.5"
                      fill="currentColor"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.3,
                      }}
                    />
                    <motion.circle
                      cx="40"
                      cy="105"
                      r="2"
                      fill="currentColor"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.6,
                      }}
                    />
                  </svg>
                </motion.div>

                {/* Animated Text */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    Aucun contenu pour le moment
                  </h3>
                  <motion.p
                    className="text-gray-600 text-base md:text-lg max-w-md mx-auto leading-relaxed"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    Nos articles arrivent bientôt ! Revenez plus tard pour
                    découvrir les dernières tendances et insights du secteur
                    industriel.
                  </motion.p>
                </motion.div>

                {/* Animated dots */}
                <motion.div className="flex gap-2 justify-center mt-8">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-primary rounded-full"
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            );
          })()}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-dark-blue text-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage: `linear-gradient(45deg, transparent 48%, rgba(255, 255, 255, 0.1) 49%, rgba(255, 255, 255, 0.1) 51%, transparent 52%)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="h-1 w-20 bg-primary mx-auto mb-8"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />

              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter">
                Restez informé
              </h2>

              <p className="text-text-secondary text-lg mb-10 leading-relaxed">
                Abonnez-vous à notre newsletter pour recevoir les dernières
                articles, tendances industrielles et conseils d'experts
                directement dans votre boîte de réception.
              </p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <input
                  type="email"
                  placeholder="Votre adresse e-mail"
                  className="px-6 py-4 bg-white/10 border border-primary/30 text-white placeholder:text-text-secondary focus:outline-none focus:border-primary transition-colors flex-1 sm:flex-initial"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-primary hover:bg-primary-dark text-white font-bold tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  S'abonner
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
