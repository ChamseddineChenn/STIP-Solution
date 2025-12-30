import React from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiArrowLeft, FiShare2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const BlogPage = ({ blogId = 1 }) => {
  const navigate = useNavigate();

  // Example blog content - first blog
  const blog = {
    id: 1,
    title: 'Avancées en technologie de soudage 3D',
    category: 'Technologie',
    author: 'Jean Dupont',
    date: '15 décembre 2024',
    image: 'https://picsum.photos/1200/600?random=1',
    excerpt:
      'Découvrez comment les innovations en soudage 3D transforment la fabrication industrielle et améliorent la précision des projets complexes.',
    content: `La technologie de soudage 3D révolutionne le secteur industriel en permettant une fabrication plus précise et efficace. Les systèmes automatisés réduisent les défauts et accélèrent les délais de production.

Le soudage 3D représente une avancée majeure dans les techniques de fabrication moderne. Contrairement aux méthodes de soudage traditionnelles bidimensionnelles, cette technologie permet de créer des structures complexes avec une précision millimétrique.

## Les avantages du soudage 3D

La technologie 3D offre plusieurs avantages significatifs :

**Précision accrue** : Les systèmes de soudage 3D peuvent reproduire exactement les spécifications de conception, éliminant les variations humaines.

**Réduction des défauts** : L'automatisation complète réduit les erreurs de soudage et améliore la qualité globale des produits finis.

**Gain de temps** : Les processus automatisés travaillent 24/7 sans interruption, augmentant considérablement la productivité.

**Efficacité des matériaux** : La précision réduit le gaspillage de matériaux et optimise l'utilisation des ressources.

## Applications pratiques

Le soudage 3D trouve des applications dans plusieurs secteurs :

- **Aérospatiale** : Fabrication de composants complexes pour les aéronefs
- **Automobile** : Production de châssis et structures de véhicules
- **Construction navale** : Assemblage de structures marines
- **Équipements industriels** : Création de machines et systèmes lourds

## L'avenir du soudage

À mesure que la technologie 3D continue d'évoluer, nous pouvons nous attendre à :

- Une meilleure intégration avec l'intelligence artificielle
- Des systèmes plus compacts et flexibles
- Une réduction continue des coûts d'implémentation
- De nouvelles applications dans des secteurs émergents

Chez STIP Solutions, nous adoptons cette technologie pour offrir à nos clients des solutions de soudage de pointe qui garantissent qualité, fiabilité et efficacité.`,
    readTime: '5 min',
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Blog Image */}
      <section className="relative h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${blog.image})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative h-full flex flex-col justify-between p-4 md:p-8">
          {/* Back Button */}
          <motion.button
            whileHover={{ x: -4 }}
            onClick={() => navigate('/case-studies')}
            className="flex items-center text-white hover:text-primary-light transition-colors w-fit"
          >
            <FiArrowLeft className="w-5 h-5 mr-2" />
            Retour aux articles
          </motion.button>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-4xl">
              <div className="inline-block px-4 py-2 bg-primary text-white font-semibold text-sm uppercase tracking-wider mb-6">
                {blog.category}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {blog.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-gray-200">
                <div className="flex items-center">
                  <FiUser className="w-5 h-5 mr-2" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center">
                  <FiCalendar className="w-5 h-5 mr-2" />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm">{blog.readTime}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="prose prose-lg max-w-none"
            >
              {/* Blog Content - Formatted Text */}
              <div className="text-gray-700 leading-relaxed space-y-6">
                {blog.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('##')) {
                    return (
                      <h2
                        key={index}
                        className="text-3xl font-bold text-gray-900 mt-12 mb-6 pt-8 border-t-2 border-primary"
                      >
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('**')) {
                    return (
                      <p
                        key={index}
                        className="text-lg font-semibold text-primary"
                      >
                        {paragraph}
                      </p>
                    );
                  }
                  if (paragraph.startsWith('-')) {
                    return (
                      <ul
                        key={index}
                        className="list-disc list-inside space-y-2 pl-4"
                      >
                        {paragraph.split('\n').map((item, i) => (
                          <li key={i} className="ml-4">
                            {item.replace('- ', '')}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={index} className="text-base md:text-lg">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </motion.div>

            {/* Divider */}
            <div className="my-12 border-t-2 border-gray-200" />

            {/* Article Footer with Share and CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 py-8"
            >
              {/* Author Info */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold text-xl">
                  {blog.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{blog.author}</p>
                  <p className="text-sm text-gray-500">
                    Expert en technologie industrielle
                  </p>
                </div>
              </div>

              {/* Share Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center space-x-2 px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                <FiShare2 className="w-5 h-5" />
                <span>Partager</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Articles CTA */}
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
                Explorez plus d'articles
              </h2>

              <p className="text-text-secondary text-lg mb-10 leading-relaxed">
                Découvrez d'autres insights et tendances industrielles dans
                notre blogue.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/case-studies')}
                className="px-10 py-4 bg-primary hover:bg-primary-dark text-white font-bold tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Retour au blogue
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
