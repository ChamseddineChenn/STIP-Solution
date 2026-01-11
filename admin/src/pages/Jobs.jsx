import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  RiBriefcaseLine,
  RiAddLine,
  RiLoader4Line,
  RiCheckLine,
  RiCloseLine,
  RiEditLine,
  RiDeleteBinLine,
  RiEyeLine,
  RiMapPinLine,
  RiTimeLine,
} from 'react-icons/ri';
import { jobAPI } from '../services/api';
import JobPreview from '../components/job/JobPreview';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [previewJob, setPreviewJob] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobAPI.getAll();
      if (response.data.success) {
        setJobs(response.data.data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des offres:', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePublish = async (id, currentStatus) => {
    setUpdatingId(id);
    try {
      const response = await jobAPI.update(id, {
        published: !currentStatus,
      });
      if (response.data.success) {
        setJobs(
          jobs.map((job) =>
            job._id === id ? { ...job, published: !currentStatus } : job
          )
        );
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette offre?')) {
      return;
    }
    setDeletingId(id);
    try {
      const response = await jobAPI.delete(id);
      if (response.data.success) {
        setJobs(jobs.filter((job) => job._id !== id));
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="animate-fadeIn">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Emplois</h1>
          <p className="text-gray-500 mt-1">Gérer les offres d'emploi</p>
        </div>
        <Link
          to="/jobs/create"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-200 active:scale-[0.98] cursor-pointer"
        >
          <RiAddLine className="w-5 h-5" />
          <span className="hidden sm:inline">Nouvelle offre</span>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <RiLoader4Line className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : jobs.length === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow-card border border-border text-center">
          <RiBriefcaseLine className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Aucune offre d'emploi
          </h3>
          <p className="text-gray-500 mb-6">
            Commencez par créer votre première offre d'emploi.
          </p>
          <Link
            to="/jobs/create"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            <RiAddLine className="w-5 h-5" />
            Créer une offre
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
                      <RiMapPinLine className="w-3 h-3" />
                      {job.location}
                    </span>
                    <span className="inline-block px-3 py-1 bg-purple-50 text-purple-600 text-xs font-semibold rounded-full">
                      {job.contractType}
                    </span>
                    <span className="inline-block px-3 py-1 bg-orange-50 text-orange-600 text-xs font-semibold rounded-full">
                      {job.department}
                    </span>
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        job.published
                          ? 'bg-green-50 text-green-700'
                          : 'bg-yellow-50 text-yellow-700'
                      }`}
                    >
                      {job.published ? 'Publié' : 'Brouillon'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <RiTimeLine className="w-4 h-4" />
                      Créé le {formatDate(job.createdAt)}
                    </span>
                    {job.experienceLevel && (
                      <span>Niveau: {job.experienceLevel}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap justify-end">
                  {/* Preview button */}
                  <button
                    onClick={() => setPreviewJob(job)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 font-medium transition-all duration-200 active:scale-[0.98] cursor-pointer"
                  >
                    <RiEyeLine className="w-5 h-5" />
                    <span className="hidden sm:inline">Aperçu</span>
                  </button>

                  {/* Edit button */}
                  <Link
                    to={`/jobs/edit/${job._id}`}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-medium transition-all duration-200 active:scale-[0.98] cursor-pointer"
                  >
                    <RiEditLine className="w-5 h-5" />
                    <span className="hidden sm:inline">Modifier</span>
                  </Link>

                  {/* Delete button */}
                  <button
                    onClick={() => deleteJob(job._id)}
                    disabled={deletingId === job._id}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {deletingId === job._id ? (
                      <RiLoader4Line className="w-5 h-5 animate-spin" />
                    ) : (
                      <RiDeleteBinLine className="w-5 h-5" />
                    )}
                    <span className="hidden sm:inline">Supprimer</span>
                  </button>

                  {/* Publish button */}
                  <button
                    onClick={() => togglePublish(job._id, job.published)}
                    disabled={updatingId === job._id}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
                      job.published
                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                        : 'bg-green-50 text-green-600 hover:bg-green-100'
                    }`}
                  >
                    {updatingId === job._id ? (
                      <RiLoader4Line className="w-5 h-5 animate-spin" />
                    ) : job.published ? (
                      <>
                        <RiCloseLine className="w-5 h-5" />
                        <span className="hidden sm:inline">Dépublier</span>
                      </>
                    ) : (
                      <>
                        <RiCheckLine className="w-5 h-5" />
                        <span className="hidden sm:inline">Publier</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {previewJob && (
        <JobPreview job={previewJob} onClose={() => setPreviewJob(null)} />
      )}
    </div>
  );
};

export default Jobs;
