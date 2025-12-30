import React, { useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const PolicyModal = ({ isOpen, onClose, title, children }) => {
  // Block scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex flex-col"
          >
            {/* Modal Content */}
            <div className="bg-dark-blue shadow-2xl flex flex-col h-full overflow-hidden border border-primary/20">
              {/* Header */}
              <div className="bg-linear-to-r from-dark-blue to-dark-blue/80 border-b border-primary/20 px-6 md:px-8 py-6 flex items-center justify-between">
                <h2 className="text-2xl md:text-3xl font-bold text-text-light">
                  {title}
                </h2>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-text-secondary hover:text-primary transition-colors p-2"
                >
                  <FiX className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 md:px-8 py-8">
                <div className="text-text-secondary leading-relaxed space-y-6 max-w-3xl">
                  {children}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="border-t border-primary/20 bg-dark-blue/50 px-6 md:px-8 py-4 flex justify-end">
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-primary hover:bg-primary/80 text-white font-semibold transition-colors duration-300"
                >
                  Close
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PolicyModal;
