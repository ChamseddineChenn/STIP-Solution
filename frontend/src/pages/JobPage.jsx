import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiMapPin,
  FiBriefcase,
  FiClock,
  FiArrowLeft,
  FiLoader,
  FiUser,
  FiMail,
  FiPhone,
  FiUpload,
  FiCheck,
  FiX,
  FiLinkedin,
  FiGlobe,
} from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { jobAPI, applicationAPI } from '../services/api';

const JobPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Application form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    linkedIn: '',
    portfolio: '',
    coverLetter: '',
  });
  const [cvFile, setCvFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Fetch job data
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await jobAPI.getOne(id);
        if (response.data.success) {
          setJob(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching job:', err);
        setError('Offre non trouvée');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle CV file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      if (!allowedTypes.includes(file.type)) {
        setSubmitStatus({
          type: 'error',
          message: 'Veuillez sélectionner un fichier PDF ou Word',
        });
        return;
      }
      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setSubmitStatus({
          type: 'error',
          message: 'Le fichier ne doit pas dépasser 10 Mo',
        });
        return;
      }
      setCvFile(file);
      setSubmitStatus(null);
    }
  };

  // Submit application
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.location
    ) {
      setSubmitStatus({
        type: 'error',
        message: 'Veuillez remplir tous les champs obligatoires',
      });
      return;
    }

    if (!cvFile) {
      setSubmitStatus({
        type: 'error',
        message: 'Veuillez télécharger votre CV',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const submitData = new FormData();
      submitData.append('jobId', id);
      submitData.append('firstName', formData.firstName);
      submitData.append('lastName', formData.lastName);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('location', formData.location);
      submitData.append('linkedIn', formData.linkedIn);
      submitData.append('portfolio', formData.portfolio);
      submitData.append('coverLetter', formData.coverLetter);
      submitData.append('cv', cvFile);

      const response = await applicationAPI.submit(submitData);

      if (response.data.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Votre candidature a été envoyée avec succès!',
        });
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          location: '',
          linkedIn: '',
          portfolio: '',
          coverLetter: '',
        });
        setCvFile(null);
      }
    } catch (err) {
      console.error('Submit error:', err);
      setSubmitStatus({
        type: 'error',
        message:
          err.response?.data?.message ||
          "Une erreur est survenue lors de l'envoi de votre candidature",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render content block
  const renderContentBlock = (block, index) => {
    switch (block.type) {
      case 'title':
        return (
          <h2
            key={index}
            className="text-2xl md:text-3xl font-bold mt-12 mb-6 pt-8 border-t-1 border-primary break-words overflow-hidden"
            style={{ color: block.color || '#1f2937' }}
          >
            {block.content}
          </h2>
        );
      case 'paragraph':
        return (
          <div
            key={index}
            className="text-sm md:text-base text-gray-700 leading-relaxed overflow-hidden break-words"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        );
      case 'image':
        return (
          <figure key={index} className="my-8">
            <img
              src={block.content}
              alt="Job image"
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
  if (error || !job) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {error || 'Offre non trouvée'}
        </h2>
        <button
          onClick={() => navigate('/careers')}
          className="flex items-center text-primary hover:underline"
        >
          <FiArrowLeft className="w-5 h-5 mr-2" />
          Retour aux offres
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full bg-dark-blue">
        <div className="relative w-full max-w-full px-4 md:px-8 pt-20 pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <motion.button
              whileHover={{ x: -4 }}
              onClick={() => navigate('/careers')}
              className="flex items-center text-white hover:text-primary-light transition-colors mb-6 group"
            >
              <FiArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Retour aux offres
            </motion.button>

            {/* Title and Meta */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight break-words">
                {job.title}
              </h1>

              {/* Job Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white text-sm font-semibold rounded-full">
                  <FiMapPin className="w-4 h-4" />
                  {job.location}
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white text-sm font-semibold rounded-full">
                  <FiBriefcase className="w-4 h-4" />
                  {job.contractType}
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white text-sm font-semibold rounded-full">
                  <FiClock className="w-4 h-4" />
                  {job.experienceLevel}
                </span>
              </div>

              {/* Department */}
              <span className="inline-block px-4 py-2 bg-primary text-white text-sm font-semibold rounded-full">
                {job.department}
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Short Description */}
      {job.shortDescription && (
        <section className="px-4 md:px-8 pt-12 bg-white border-gray-100">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed">
              {job.shortDescription}
            </p>
          </div>
        </section>
      )}

      {/* Content Section */}
      <section className="w-full py-4 md:py-0 px-2 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <article className="max-w-none">
              <div className="text-gray-700 leading-relaxed space-y-8 overflow-hidden">
                {job.contentBlocks
                  ?.sort((a, b) => a.order - b.order)
                  .map(renderContentBlock)}
              </div>
            </article>
          </motion.div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply" className="w-full py-16 px-4 md:px-8 bg-dark-blue">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              Postuler à cette offre
            </h2>
            <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
              Remplissez le formulaire ci-dessous pour soumettre votre
              candidature. Les champs marqués d'un * sont obligatoires.
            </p>

            {/* Success/Error Message */}
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-8 p-4 rounded-lg flex items-center gap-3 ${
                  submitStatus.type === 'success'
                    ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                    : 'bg-red-500/20 text-red-300 border border-red-500/30'
                }`}
              >
                {submitStatus.type === 'success' ? (
                  <FiCheck className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <FiX className="w-5 h-5 flex-shrink-0" />
                )}
                {submitStatus.message}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Prénom *
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Votre prénom"
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Nom de famille *
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Votre nom"
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="votre@email.com"
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Téléphone *
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (514) 000-0000"
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Localisation *
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Ville, Province, Pays"
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                    required
                  />
                </div>
              </div>

              {/* Optional Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    LinkedIn (optionnel)
                  </label>
                  <div className="relative">
                    <FiLinkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="url"
                      name="linkedIn"
                      value={formData.linkedIn}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Portfolio (optionnel)
                  </label>
                  <div className="relative">
                    <FiGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="url"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      placeholder="https://..."
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>
              </div>

              {/* CV Upload */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  CV *
                </label>
                <div className="relative">
                  <label
                    htmlFor="cv-upload"
                    className={`flex items-center justify-center gap-3 w-full p-6 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                      cvFile
                        ? 'border-green-500 bg-green-500/10'
                        : 'border-white/30 hover:border-primary/50 hover:bg-white/5'
                    }`}
                  >
                    {cvFile ? (
                      <>
                        <FiCheck className="w-6 h-6 text-green-400" />
                        <span className="text-green-400 font-medium">
                          {cvFile.name}
                        </span>
                      </>
                    ) : (
                      <>
                        <FiUpload className="w-6 h-6 text-gray-400" />
                        <span className="text-gray-400">
                          Cliquez pour télécharger votre CV (PDF ou Word, max 10
                          Mo)
                        </span>
                      </>
                    )}
                  </label>
                  <input
                    id="cv-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Lettre de motivation (optionnel)
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  placeholder="Présentez-vous et expliquez pourquoi vous êtes le candidat idéal pour ce poste..."
                  rows={6}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <FiLoader className="w-5 h-5 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer ma candidature
                      <FiArrowLeft className="w-5 h-5 rotate-180" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 px-4 md:px-8 bg-amber-50/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Des questions sur ce poste?
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              N'hésitez pas à nous contacter pour plus d'informations.
            </p>
            <motion.a
              href="mailto:contact@stip.ca"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl"
            >
              <FiMail className="w-5 h-5" />
              contact@stip.ca
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default JobPage;
