import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiDownload,
  FiTrash2,
  FiLoader,
  FiAlertCircle,
  FiCheckCircle,
  FiEdit2,
  FiEye,
} from 'react-icons/fi';
import { applicationAPI } from '../services/api';
import ApplicationModal from '../components/ApplicationModal';
import CustomSelect from '../components/CustomSelect';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  const statusOptions = [
    {
      value: 'Nouvelle',
      label: 'Nouvelle',
      color: 'bg-blue-100 text-blue-800',
    },
    {
      value: 'En cours de révision',
      label: 'En cours de révision',
      color: 'bg-yellow-100 text-yellow-800',
    },
    {
      value: 'Entretien planifié',
      label: 'Entretien planifié',
      color: 'bg-purple-100 text-purple-800',
    },
    {
      value: 'Acceptée',
      label: 'Acceptée',
      color: 'bg-green-100 text-green-800',
    },
    { value: 'Refusée', label: 'Refusée', color: 'bg-red-100 text-red-800' },
  ];

  // Fetch applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await applicationAPI.getAll();
        if (response.data.success) {
          setApplications(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError('Erreur lors du chargement des candidatures');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Download CV
  const handleDownloadCV = async (application) => {
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

  // Delete application
  const handleDeleteApplication = async (id) => {
    if (
      window.confirm('Êtes-vous sûr de vouloir supprimer cette candidature?')
    ) {
      try {
        const response = await applicationAPI.delete(id);
        if (response.data.success) {
          setApplications(applications.filter((app) => app._id !== id));
        }
      } catch (err) {
        console.error('Error deleting application:', err);
        setError('Erreur lors de la suppression');
      }
    }
  };

  // Update status
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await applicationAPI.updateStatus(id, newStatus);
      if (response.data.success) {
        setApplications(
          applications.map((app) =>
            app._id === id ? { ...app, status: newStatus } : app
          )
        );
      }
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Erreur lors de la mise à jour du statut');
    }
  };

  // Filtered applications
  const filteredApplications =
    filterStatus === 'all'
      ? applications
      : applications.filter((app) => app.status === filterStatus);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">
            Chargement des candidatures...
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Candidatures
          </h1>
          <p className="text-gray-600">
            Gérez les candidatures reçues pour vos offres d'emploi
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-center gap-3"
          >
            <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
            {error}
          </motion.div>
        )}

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
            Toutes ({applications.length})
          </button>
          {statusOptions.map((option) => {
            const count = applications.filter(
              (app) => app.status === option.value
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

        {/* Applications Table */}
        {filteredApplications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <FiAlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Aucune candidature
            </h3>
            <p className="text-gray-500">
              Aucune candidature ne correspond à vos critères de filtre
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Candidat
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Téléphone
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Poste
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
                  {filteredApplications.map((application) => (
                    <motion.tr
                      key={application._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      hover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
                      className="transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="font-medium">
                          {application.firstName} {application.lastName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {application.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <a
                          href={`mailto:${application.email}`}
                          className="text-primary hover:underline"
                        >
                          {application.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <a
                          href={`tel:${application.phone}`}
                          className="text-primary hover:underline"
                        >
                          {application.phone}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {application.job?.title || 'Non spécifié'}
                      </td>
                      <td className="px-6 py-4">
                        <CustomSelect
                          value={application.status || 'Nouvelle'}
                          onChange={(newStatus) =>
                            handleStatusChange(application._id, newStatus)
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
                              setSelectedApplication(application);
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
                            onClick={() => handleDownloadCV(application)}
                            className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded-lg transition-all"
                            title="Télécharger le CV"
                          >
                            <FiDownload className="w-5 h-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              handleDeleteApplication(application._id)
                            }
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

        {/* Application Detail Modal */}
        {showModal && selectedApplication && (
          <ApplicationModal
            application={selectedApplication}
            statusOptions={statusOptions}
            onStatusChange={handleStatusChange}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Applications;
