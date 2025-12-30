import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExpand } from 'react-icons/fa';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const galleryItems = [
    {
      id: 1,
      title: 'Precision Welding',
      category: 'Welding',
      image:
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
      description: 'High-precision TIG welding for aerospace components',
      cols: 'md:col-span-2',
    },
    {
      id: 2,
      title: 'Industrial Fabrication',
      category: 'Fabrication',
      image:
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
      description: 'Custom machinery parts fabrication',
      cols: 'md:col-span-1',
    },
    {
      id: 3,
      title: 'Laser Technology',
      category: 'Industry 4.0',
      image:
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
      description: 'Advanced laser welding systems',
      cols: 'md:col-span-1',
    },
    {
      id: 4,
      title: 'Skilled Labor Team',
      category: 'Labor',
      image:
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
      description: 'On-site technician deployment',
      cols: 'md:col-span-2',
    },
    {
      id: 5,
      title: 'Quality Control',
      category: 'QA',
      image:
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
      description: 'Rigorous inspection process',
      cols: 'md:col-span-1',
    },
    {
      id: 6,
      title: 'Plant Operations',
      category: 'Manufacturing',
      image:
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
      description: 'Large-scale manufacturing facility',
      cols: 'md:col-span-1',
    },
  ];

  // Effect to handle body overflow when lightbox opens/closes
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [lightboxOpen]);

  const openLightbox = (item) => {
    setSelectedImage(item);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    // Don't clear selectedImage immediately, wait for animation
    setTimeout(() => setSelectedImage(null), 300);
  };

  return (
    <>
      <section className="py-20 bg-bg-dark container-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-light">
              Process Gallery
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              A visual journey through our industrial manufacturing and welding
              processes
            </p>
          </motion.div>

          {/* Masonry Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative group cursor-pointer ${item.cols}`}
                onClick={() => openLightbox(item)}
              >
                <div className="relative overflow-hidden border border-border bg-bg-light">
                  {/* Image */}
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-bg-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="inline-block px-3 py-1 bg-primary text-bg text-xs font-bold uppercase tracking-wider mb-3">
                        {item.category}
                      </span>
                      <h3 className="text-xl font-bold text-text-light mb-2">
                        {item.title}
                      </h3>
                      <p className="text-text-muted text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Expand Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-bg/90 border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <FaExpand className="w-4 h-4 text-text-light" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Gallery Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 pt-16 border-t border-border"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-text-light mb-8">
                Our Capabilities
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: 'Welding & Fabrication', count: '250+' },
                  { label: 'CNC Machining', count: '150+' },
                  { label: 'Industrial Labor', count: '500+' },
                  { label: 'Quality Control', count: '100%' },
                ].map((capability, idx) => (
                  <div
                    key={idx}
                    className="p-6 border border-border bg-bg hover:border-primary transition-colors duration-300"
                  >
                    <div className="text-2xl font-bold text-primary mb-2">
                      {capability.count}
                    </div>
                    <div className="text-text text-sm uppercase tracking-wider">
                      {capability.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-surface border border-border max-w-6xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-surface border-b border-border p-6 flex items-center justify-between">
                <div>
                  <span className="px-3 py-1 bg-primary text-bg text-xs font-bold uppercase tracking-wider mr-4">
                    {selectedImage.category}
                  </span>
                  <h3 className="text-2xl font-bold text-text inline-block">
                    {selectedImage.title}
                  </h3>
                </div>
                <button
                  onClick={closeLightbox}
                  className="w-10 h-10 flex items-center justify-center border border-border hover:border-primary hover:bg-primary hover:text-bg transition-all duration-300"
                  aria-label="Close lightbox"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Image */}
                <div className="mb-8 border border-border overflow-hidden">
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="w-full h-96 object-cover"
                  />
                </div>

                {/* Description */}
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <h4 className="text-lg font-bold text-text mb-4">
                      Project Details
                    </h4>
                    <p className="text-text leading-relaxed">
                      {selectedImage.description}. This project showcases our
                      commitment to quality and precision in industrial
                      manufacturing. Our team of certified professionals ensures
                      every detail meets the highest industry standards.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-bg border border-border">
                      <h5 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-2">
                        Technology Used
                      </h5>
                      <ul className="space-y-2">
                        <li className="text-text text-sm">
                          • Advanced Welding Systems
                        </li>
                        <li className="text-text text-sm">
                          • Precision Measurement Tools
                        </li>
                        <li className="text-text text-sm">
                          • Quality Control Equipment
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 bg-bg border border-border">
                      <h5 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-2">
                        Project Stats
                      </h5>
                      <ul className="space-y-2">
                        <li className="text-text text-sm">
                          • Duration: 8 weeks
                        </li>
                        <li className="text-text text-sm">
                          • Team Size: 15 technicians
                        </li>
                        <li className="text-text text-sm">
                          • Quality Rating: 99.8%
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
