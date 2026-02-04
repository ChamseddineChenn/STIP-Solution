import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiCalendar,
  FiUser,
  FiArrowLeft,
  FiShare2,
  FiLoader,
} from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { blogAPI } from '../services/api';

const BlogPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await blogAPI.getOne(id);
        if (response.data.success) {
          setBlog(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Article non trouvé');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Sanitize HTML content - aggressively strip ALL styles and problematic attributes
  const sanitizeHTML = (html) => {
    if (!html) return '';

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Remove ALL inline styles, classes, and attributes from ALL elements
    const allElements = tempDiv.querySelectorAll('*');
    allElements.forEach((el) => {
      // Remove ALL attributes except href for links
      const attrs = Array.from(el.attributes);
      attrs.forEach((attr) => {
        if (
          attr.name !== 'href' &&
          attr.name !== 'target' &&
          attr.name !== 'rel'
        ) {
          el.removeAttribute(attr.name);
        }
      });
    });

    return tempDiv.innerHTML;
  };

  // Render content block
  const renderContentBlock = (block, index) => {
    switch (block.type) {
      case 'title':
        return (
          <h2
            key={index}
            className="text-2xl md:text-3xl font-bold mt-12 mb-6 pt-8 border-t-2 border-primary"
            style={{ color: block.color || '#1f2937' }}
          >
            {block.content}
          </h2>
        );
      case 'paragraph':
        return (
          <div
            key={index}
            className="blog-content text-sm md:text-base text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: sanitizeHTML(block.content) }}
          />
        );
      case 'image':
        return (
          <figure key={index} className="my-8">
            <img
              src={block.content}
              alt="Blog image"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </figure>
        );
      default:
        return null;
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <FiLoader className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  // Error state
  if (error || !blog) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {error || 'Article non trouvé'}
        </h2>
        <button
          onClick={() => navigate('/case-studies')}
          className="flex items-center text-primary hover:underline"
        >
          <FiArrowLeft className="w-5 h-5 mr-2" />
          Retour aux articles
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white max-w-full">
      {/* CSS overrides for blog content - simple and clean */}
      <style>{`
        .blog-content {
          display: block;
          width: 100%;
        }
        .blog-content p,
        .blog-content span,
        .blog-content div,
        .blog-content li,
        .blog-content ul,
        .blog-content ol,
        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content strong,
        .blog-content em,
        .blog-content a {
          display: inline;
        }
        .blog-content p {
          display: block;
          margin-bottom: 1em;
        }
        .blog-content ul,
        .blog-content ol {
          display: block;
          padding-left: 1.5em;
          margin-bottom: 1em;
        }
        .blog-content li {
          display: list-item;
        }
        .blog-content h1,
        .blog-content h2,
        .blog-content h3 {
          display: block;
          font-weight: bold;
          margin-top: 1em;
          margin-bottom: 0.5em;
        }
      `}</style>
      {/* Hero Section with Background Design */}
      <section className="relative min-h-[70vh] overflow-hidden bg-linear-to-br from-dark-blue via-dark-blue to-black flex items-center">
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

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 text-wrap">
          <div className="max-w-4xl">
            {/* Back Button */}
            <motion.button
              whileHover={{ x: -4 }}
              onClick={() => navigate('/case-studies')}
              className="flex items-center text-white hover:text-primary-light transition-colors mb-8 group"
            >
              <FiArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Retour aux articles
            </motion.button>

            {/* Title and Meta */}
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

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-white mb-6 tracking-tighter leading-tight">
                {blog.mainTitle}
              </h1>

              {/* Category and Meta Info */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-gray-200">
                <span className="inline-block px-4 py-2 bg-primary text-white text-sm font-semibold rounded-full w-fit">
                  {blog.category}
                </span>
                <div className="flex items-center">
                  <FiUser className="w-5 h-5 mr-2" />
                  <span className="text-sm md:text-base">
                    {blog.author || 'STIP Solutions'}
                  </span>
                </div>
                <div className="flex items-center">
                  <FiCalendar className="w-5 h-5 mr-2" />
                  <span className="text-sm md:text-base">
                    {formatDate(blog.createdAt)}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="w-full py-8 md:py-12 px-4 md:px-8 overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Blog Content - Dynamic Content Blocks */}
            <article className="w-full">
              <div className="text-gray-700 leading-relaxed space-y-8">
                {blog.contentBlocks
                  ?.sort((a, b) => a.order - b.order)
                  .map(renderContentBlock)}
              </div>
            </article>
          </motion.div>

          {/* Divider */}
          <div className="my-12 md:my-16 border-t-2 border-gray-200" />

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
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold text-xl shrink-0">
                {(blog.author || 'S').charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {blog.author || 'STIP Solutions'}
                </p>
                <p className="text-sm text-gray-500">
                  Expert en technologie industrielle
                </p>
              </div>
            </div>

            {/* Share Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center space-x-2 px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 whitespace-nowrap"
            >
              <FiShare2 className="w-5 h-5" />
              <span>Partager</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Related Articles CTA */}
      <section className="w-full py-20 md:py-32 bg-dark-blue text-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage: `linear-gradient(45deg, transparent 48%, rgba(255, 255, 255, 0.1) 49%, rgba(255, 255, 255, 0.1) 51%, transparent 52%)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
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

            <p className="text-gray-200 text-lg mb-10 leading-relaxed">
              Découvrez d'autres insights et tendances industrielles dans notre
              blogue.
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
      </section>
    </div>
  );
};

export default BlogPage;
