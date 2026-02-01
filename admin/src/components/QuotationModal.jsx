import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
  FiX,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiUser,
  FiCalendar,
  FiClipboard,
  FiCheck,
  FiAlertCircle,
  FiSettings,
  FiTruck,
  FiFileText,
} from 'react-icons/fi';
import { createPortal } from 'react-dom';
import CustomSelect from './CustomSelect';
import { quotationAPI } from '../services/api';

const QuotationModal = ({
  quotation,
  statusOptions,
  onStatusChange,
  onClose,
  onUpdate,
}) => {
  const [adminNotes, setAdminNotes] = useState(quotation.adminNotes || '');
  const [assignedTo, setAssignedTo] = useState(quotation.assignedTo || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await quotationAPI.update(quotation._id, {
        adminNotes,
        assignedTo,
      });
      if (response.data.success) {
        setSaveMessage({ type: 'success', text: 'Modifications sauvegardées' });
        onUpdate(response.data.data);
        setTimeout(() => setSaveMessage(null), 2000);
      }
    } catch (error) {
      console.error('Error saving quotation:', error);
      setSaveMessage({ type: 'error', text: 'Erreur lors de la sauvegarde' });
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // eslint-disable-next-line no-unused-vars
  const InfoSection = ({ icon: Icon, title, children }) => (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );

  const InfoRow = ({ label, value }) => (
    <div className="flex justify-between py-1">
      <span className="text-gray-600 text-sm">{label}:</span>
      <span className="text-gray-900 text-sm font-medium">{value || '-'}</span>
    </div>
  );

  const modalContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto z-50"
      >
        {/* Header */}
        <div className="sticky top-0 bg-linear-to-r from-primary to-primary-dark text-white p-6 flex items-center justify-between border-b border-primary-dark/30 z-40">
          <div>
            <h2 className="text-2xl font-bold mb-1">
              {quotation.firstName} {quotation.lastName}
            </h2>
            <p className="text-primary-light text-sm">
              {quotation.company} • {quotation.projectType}
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
          <div className="relative z-10">
            <CustomSelect
              label="Statut de la demande"
              value={quotation.status || 'Nouvelle'}
              onChange={(newStatus) => {
                onStatusChange(quotation._id, newStatus);
              }}
              options={statusOptions}
            />
          </div>

          {/* Date submitted */}
          <div className="flex items-center gap-2 text-gray-600">
            <FiCalendar className="w-4 h-4" />
            <span className="text-sm">
              Soumis le {formatDate(quotation.createdAt)}
            </span>
          </div>

          {/* Two column layout */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Contact Information */}
              <InfoSection icon={FiUser} title="Informations de contact">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <FiMail className="w-4 h-4 text-primary shrink-0" />
                    <a
                      href={`mailto:${quotation.email}`}
                      className="text-primary hover:underline text-sm"
                    >
                      {quotation.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiPhone className="w-4 h-4 text-primary shrink-0" />
                    <a
                      href={`tel:${quotation.phone}`}
                      className="text-gray-700 hover:text-primary text-sm"
                    >
                      {quotation.phone}
                    </a>
                  </div>
                  {quotation.position && (
                    <div className="flex items-center gap-3">
                      <FiBriefcase className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-gray-700 text-sm">
                        {quotation.position}
                      </span>
                    </div>
                  )}
                </div>
              </InfoSection>

              {/* Company Information */}
              <InfoSection icon={FiBriefcase} title="Entreprise">
                <InfoRow label="Entreprise" value={quotation.company} />
                <InfoRow label="Secteur" value={quotation.industry} />
              </InfoSection>

              {/* Project Details */}
              <InfoSection icon={FiClipboard} title="Détails du projet">
                <InfoRow label="Type de projet" value={quotation.projectType} />
                <InfoRow label="Délai" value={quotation.timeline} />
                <InfoRow label="Budget" value={quotation.budgetRange} />
                <InfoRow label="Matériaux" value={quotation.materials} />
                <InfoRow label="Quantité" value={quotation.quantity} />
              </InfoSection>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Technical Specifications */}
              <InfoSection icon={FiSettings} title="Spécifications techniques">
                <InfoRow
                  label="Dessins disponibles"
                  value={quotation.drawingsAvailable === 'yes' ? 'Oui' : 'Non'}
                />
                <InfoRow
                  label="Fichiers CAO"
                  value={
                    quotation.cadFiles === 'no'
                      ? 'Non'
                      : quotation.cadFiles?.toUpperCase()
                  }
                />
                {quotation.qualityStandards?.length > 0 && (
                  <div className="mt-2">
                    <span className="text-gray-600 text-sm">
                      Normes de qualité:
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {quotation.qualityStandards.map((standard, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                        >
                          {standard}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </InfoSection>

              {/* Logistics */}
              <InfoSection icon={FiTruck} title="Logistique">
                <InfoRow
                  label="Lieu de livraison"
                  value={quotation.deliveryLocation}
                />
                <InfoRow
                  label="Installation requise"
                  value={
                    quotation.installationRequired === 'yes'
                      ? 'Oui'
                      : quotation.installationRequired === 'maybe'
                        ? 'À discuter'
                        : 'Non'
                  }
                />
                <InfoRow
                  label="Support continu"
                  value={quotation.ongoingSupport === 'yes' ? 'Oui' : 'Non'}
                />
                <InfoRow
                  label="Contact préféré"
                  value={quotation.preferredContact}
                />
              </InfoSection>

              {/* Newsletter */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  {quotation.subscribeUpdates ? (
                    <FiCheck className="w-5 h-5 text-green-600" />
                  ) : (
                    <FiX className="w-5 h-5 text-gray-400" />
                  )}
                  <span className="text-sm text-gray-700">
                    {quotation.subscribeUpdates
                      ? 'Abonné aux mises à jour'
                      : 'Non abonné aux mises à jour'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Project Description - Full Width */}
          <InfoSection icon={FiFileText} title="Description du projet">
            <p className="text-gray-700 text-sm whitespace-pre-wrap">
              {quotation.projectDescription || 'Aucune description fournie'}
            </p>
          </InfoSection>

          {/* Admin Section */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <h3 className="font-semibold text-gray-800 text-lg">
              Section administrative
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assigné à
                </label>
                <input
                  type="text"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  placeholder="Nom du responsable"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes administratives
              </label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows={4}
                placeholder="Ajoutez vos notes ici..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                disabled={isSaving}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  isSaving
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary hover:bg-primary-dark text-white'
                }`}
              >
                {isSaving ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
              </motion.button>

              {saveMessage && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-center gap-2 ${
                    saveMessage.type === 'success'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {saveMessage.type === 'success' ? (
                    <FiCheck className="w-4 h-4" />
                  ) : (
                    <FiAlertCircle className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">
                    {saveMessage.text}
                  </span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return createPortal(modalContent, document.body);
};

export default QuotationModal;
