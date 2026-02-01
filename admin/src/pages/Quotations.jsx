import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
  FiTrash2,
  FiLoader,
  FiAlertCircle,
  FiEye,
  FiSearch,
  FiClipboard,
} from 'react-icons/fi';
import { quotationAPI } from '../services/api';
import QuotationModal from '../components/QuotationModal';
import CustomSelect from '../components/CustomSelect';

const Quotations = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const statusOptions = [
    {
      value: 'Nouvelle',
      label: 'Nouvelle',
      color: 'bg-blue-100 text-blue-800',
    },
    {
      value: 'En cours de traitement',
      label: 'En cours de traitement',
      color: 'bg-yellow-100 text-yellow-800',
    },
    {
      value: 'Devis envoyé',
      label: 'Devis envoyé',
      color: 'bg-purple-100 text-purple-800',
    },
    {
      value: 'Contacté',
      label: 'Contacté',
      color: 'bg-indigo-100 text-indigo-800',
    },
    {
      value: 'Accepté',
      label: 'Accepté',
      color: 'bg-green-100 text-green-800',
    },
    {
      value: 'Refusé',
      label: 'Refusé',
      color: 'bg-red-100 text-red-800',
    },
    {
      value: 'Annulé',
      label: 'Annulé',
      color: 'bg-gray-100 text-gray-800',
    },
  ];

  // Fetch quotations
  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        setLoading(true);
        const params = {};
        if (filterStatus !== 'all') params.status = filterStatus;
        if (searchTerm) params.search = searchTerm;

        const response = await quotationAPI.getAll(params);
        if (response.data.success) {
          setQuotations(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching quotations:', err);
        setError('Erreur lors du chargement des demandes de devis');
      } finally {
        setLoading(false);
      }
    };

    fetchQuotations();
  }, [filterStatus, searchTerm]);

  // Delete quotation
  const handleDeleteQuotation = async (id) => {
    if (
      window.confirm(
        'Êtes-vous sûr de vouloir supprimer cette demande de devis?',
      )
    ) {
      try {
        const response = await quotationAPI.delete(id);
        if (response.data.success) {
          setQuotations(quotations.filter((q) => q._id !== id));
        }
      } catch (err) {
        console.error('Error deleting quotation:', err);
        setError('Erreur lors de la suppression');
      }
    }
  };

  // Update status
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await quotationAPI.updateStatus(id, newStatus);
      if (response.data.success) {
        setQuotations(
          quotations.map((q) =>
            q._id === id ? { ...q, status: newStatus } : q,
          ),
        );
      }
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Erreur lors de la mise à jour du statut');
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-CA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">
            Chargement des demandes de devis...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FiClipboard className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-gray-800">
              Demandes de devis
            </h1>
          </div>
          <p className="text-gray-600">
            Gérez les demandes de devis soumises par les clients
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-center gap-3"
          >
            <FiAlertCircle className="w-5 h-5 shrink-0" />
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              ×
            </button>
          </motion.div>
        )}

        {/* Search and Filter Section */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom, email, entreprise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filterStatus === 'all'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-primary'
            }`}
          >
            Toutes ({quotations.length})
          </button>
          {statusOptions.map((option) => {
            const count = quotations.filter(
              (q) => q.status === option.value,
            ).length;
            return (
              <button
                key={option.value}
                onClick={() => setFilterStatus(option.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === option.value
                    ? option.color + ' ring-2 ring-offset-2 ring-gray-400'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                }`}
              >
                {option.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Quotations Table */}
        {quotations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <FiClipboard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Aucune demande de devis
            </h3>
            <p className="text-gray-500">
              Aucune demande de devis ne correspond à vos critères de recherche
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Client
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Entreprise
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Type de projet
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Budget
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Statut
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {quotations.map((quotation) => (
                    <motion.tr
                      key={quotation._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="font-medium">
                          {quotation.firstName} {quotation.lastName}
                        </div>
                        <a
                          href={`mailto:${quotation.email}`}
                          className="text-xs text-primary hover:underline"
                        >
                          {quotation.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <div className="font-medium">{quotation.company}</div>
                        {quotation.industry && (
                          <div className="text-xs text-gray-500">
                            {quotation.industry}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {quotation.projectType}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {quotation.budgetRange}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(quotation.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <CustomSelect
                          value={quotation.status || 'Nouvelle'}
                          onChange={(newStatus) =>
                            handleStatusChange(quotation._id, newStatus)
                          }
                          options={statusOptions}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setSelectedQuotation(quotation);
                              setShowModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-all"
                            title="Voir les détails"
                          >
                            <FiEye className="w-5 h-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDeleteQuotation(quotation._id)}
                            className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-all"
                            title="Supprimer"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Quotation Detail Modal */}
        {showModal && selectedQuotation && (
          <QuotationModal
            quotation={selectedQuotation}
            statusOptions={statusOptions}
            onStatusChange={handleStatusChange}
            onClose={() => {
              setShowModal(false);
              setSelectedQuotation(null);
            }}
            onUpdate={(updatedQuotation) => {
              setQuotations(
                quotations.map((q) =>
                  q._id === updatedQuotation._id ? updatedQuotation : q,
                ),
              );
              setSelectedQuotation(updatedQuotation);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Quotations;
