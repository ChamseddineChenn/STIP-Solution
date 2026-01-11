import React from 'react';
import { motion } from 'framer-motion';
import {
  FiX,
  FiDownload,
  FiMail,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiGlobe,
} from 'react-icons/fi';
import { createPortal } from 'react-dom';
import CustomSelect from './CustomSelect';

const ApplicationModal = ({
  application,
  statusOptions,
  onStatusChange,
  onClose,
}) => {
  const handleDownloadCV = () => {
    if (application.cv?.url) {
      const a = document.createElement('a');
      a.href = application.cv.url;
      a.download =
        application.cv.filename ||
        `CV_${application.firstName}_${application.lastName}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const modalContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary to-primary-dark text-white p-6 flex items-center justify-between border-b border-primary-dark/30">
          <div>
            <h2 className="text-2xl font-bold mb-1">
              {application.firstName} {application.lastName}
            </h2>
            <p className="text-primary-light text-sm">
              {application.job?.title || 'Non spécifié'}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-all"
          >
            <FiX className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Selection */}
          <div>
            <CustomSelect
              label="Statut de la candidature"
              value={application.status || 'Nouvelle'}
              onChange={(newStatus) => {
                onStatusChange(application._id, newStatus);
              }}
              options={statusOptions}
            />
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
              Coordonnées
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <FiMail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href={`mailto:${application.email}`}
                  className="text-primary hover:underline break-all"
                >
                  {application.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href={`tel:${application.phone}`}
                  className="text-gray-700 hover:text-primary"
                >
                  {application.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FiMapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-gray-700">{application.location}</span>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          {(application.linkedIn || application.portfolio) && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                Profils en ligne
              </h3>
              <div className="space-y-2">
                {application.linkedIn && (
                  <div className="flex items-center gap-3">
                    <FiLinkedin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <a
                      href={application.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline break-all"
                    >
                      Profil LinkedIn
                    </a>
                  </div>
                )}
                {application.portfolio && (
                  <div className="flex items-center gap-3">
                    <FiGlobe className="w-5 h-5 text-primary flex-shrink-0" />
                    <a
                      href={application.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline break-all"
                    >
                      Portfolio
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CV Section */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide mb-3">
              Documents
            </h3>
            {application.cv?.url ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownloadCV}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all"
              >
                <FiDownload className="w-5 h-5" />
                Télécharger le CV ({application.cv.filename || 'Document'})
              </motion.button>
            ) : (
              <p className="text-gray-600 text-sm">Aucun CV fourni</p>
            )}
          </div>

          {/* Cover Letter */}
          {application.coverLetter && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide mb-3">
                Lettre de motivation
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
                {application.coverLetter}
              </p>
            </div>
          )}

          {/* Admin Notes */}
          <div className="bg-yellow-50 rounded-lg p-4">
            <label className="block font-semibold text-gray-800 text-sm uppercase tracking-wide mb-3">
              Notes administrateur
            </label>
            <textarea
              defaultValue={application.adminNotes || ''}
              placeholder="Ajouter des notes personnelles sur cette candidature..."
              className="w-full px-3 py-2 bg-white border border-yellow-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
              rows={4}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return createPortal(modalContent, document.body);
};

export default ApplicationModal;
