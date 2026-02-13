import React, { useState, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiUser,
  FiCheck,
  FiDollarSign,
  FiClipboard,
  FiSettings,
  FiTool,
  FiAlertCircle,
} from 'react-icons/fi';
import { quotationAPI } from '../services/api';

// Custom Serpapi Map component - displays location information
const IndustrialSerpApiMap = () => {
  const [activeLocation, setActiveLocation] = useState('montreal');
  const [showInfoCard, setShowInfoCard] = useState(window.innerWidth >= 768); // Show by default on desktop only

  const locations = {
    montreal: {
      id: 'montreal',
      title: 'Siège social',
      address: '2828 Boul Laurier Tour 1 Étage 7, Québec, QC G1V 0B9',
      coordinates: { lat: 46.76791850281603, lng: -71.28880097450394 },
      phone1: '+1 (418) 990-4459',
      phone2: '+1 (506) 458-5859',
      email: 'contact@stip.ca',
      hours: 'Lun-Ven: 7h00 - 17h00',
      description:
        "Bureau principal avec la gestion générale et les équipes d'ingénierie.",
      mapUrl:
        'https://maps.google.com/maps?q=2828+Boulevard+Laurier+Quebec+QC&output=embed',
    },
    quebec: {
      id: 'quebec',
      title: 'Usine',
      address: '500 Rue St. George, Moncton, NB E1C 1Y3',
      coordinates: { lat: 46.08859577186401, lng: -64.79452728988272 },
      phone1: '+1 (418) 990-4459',
      phone2: '+1 (506) 458-5859',
      email: 'contact@stip.ca',
      hours: 'Lun-Sam: 7h00 - 17H00',
      description:
        'le cœur technique de notre activité. Ce site dédié regroupe nos équipes logistiques et nos services de gestion',
      mapUrl:
        'https://maps.google.com/maps?q=500+Rue+St+George+Moncton+NB+E1C+1Y3&output=embed',
    },
    capsante: {
      id: 'capsante',
      title: 'Espace manufacturier et entreposage',
      address: '23 Rte DelageCap-Santé, QC G0A 1L0',
      coordinates: { lat: 46.728339, lng: -71.801867 },
      phone1: '+1 (418) 990-4459',
      phone2: '+1 (506) 458-5859',
      email: 'contact@stip.ca',
      hours: 'Lun-Sam: 7h00 - 17h00',
      description:
        'Espace de fabrication et entreposage pour la production manufacturière.',
      mapUrl:
        'https://maps.google.com/maps?q=23+Rte+Delage+Cap+Santé+QC+G0A+1L0&output=embed',
    },
  };

  return (
    <div className="relative h-[60vh] w-full overflow-hidden">
      {/* Embedded Google Map */}
      <motion.div
        key={activeLocation}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full h-full"
        style={{
          filter: 'grayscale(100%)',
        }}
      >
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          src={locations[activeLocation].mapUrl}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
        />
      </motion.div>

      {/* Location Info Card */}
      <AnimatePresence>
        {showInfoCard && (
          <motion.div
            key={`${activeLocation}-info`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-8 left-8 bg-dark-blue/95 backdrop-blur-sm text-white p-6 max-w-xs sm:max-w-md shadow-2xl border border-primary/30 z-40"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-4">
                <FiMapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  {locations[activeLocation].title}
                </h3>
                <p className="text-text-secondary text-sm">
                  {locations[activeLocation].description}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center">
                <FiMapPin className="w-4 h-4 text-primary mr-3" />
                <span className="text-sm">
                  {locations[activeLocation].address}
                </span>
              </div>
              <div className="flex items-center">
                <FiPhone className="w-4 h-4 text-primary mr-3" />
                <div className="flex flex-col gap-1">
                  <a
                    href={`https://wa.me/${locations[
                      activeLocation
                    ].phone1.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {locations[activeLocation].phone1}
                  </a>
                  <a
                    href={`https://wa.me/${locations[
                      activeLocation
                    ].phone2.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {locations[activeLocation].phone2}
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <FiClock className="w-4 h-4 text-primary mr-3" />
                <span className="text-sm">
                  {locations[activeLocation].hours}
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 w-full py-2 bg-primary hover:bg-primary-dark transition-colors text-sm font-semibold"
              onClick={() => {
                const coord = locations[activeLocation].coordinates;
                window.open(
                  `https://maps.google.com/?q=${coord.lat},${coord.lng}`,
                  '_blank',
                );
              }}
            >
              Obtenir les directions
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button - Show/Hide Info Card */}
      <motion.button
        onClick={() => setShowInfoCard(!showInfoCard)}
        className="absolute bottom-8 right-8 bg-primary hover:bg-primary-dark text-white px-4 py-2 font-semibold text-sm shadow-lg z-40 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {showInfoCard ? 'Masquer infos' : 'Voir infos'}
      </motion.button>

      {/* Map Controls Button */}
      <div className="absolute top-8 right-8 flex flex-col gap-2 z-40">
        {Object.entries(locations).map(([key]) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveLocation(key)}
            className={`px-4 py-2 text-sm font-semibold transition-all backdrop-blur-sm border ${
              activeLocation === key
                ? 'bg-primary text-white border-primary'
                : 'bg-gray-900/70 text-gray-100 hover:bg-gray-800/80 border-gray-700 hover:border-gray-600'
            }`}
          >
            {key === 'montreal'
              ? 'Siège social'
              : key === 'quebec'
                ? 'Usine de Québec'
                : 'Cap-Santé'}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// Detailed Quote Form Component
const DetailedQuoteForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeInput, setActiveInput] = useState(''); // eslint-disable-line no-unused-vars
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const [formData, setFormData] = useState({
    // Step 1: Contact Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    industry: '',

    // Step 2: Project Details
    projectType: '',
    projectDescription: '',
    timeline: '',
    budgetRange: '',
    materials: '',
    quantity: '',

    // Step 3: Technical Specifications
    drawingsAvailable: 'no',
    cadFiles: 'no',
    qualityStandards: [],
    certificationsRequired: [],

    // Step 4: Logistics & Support
    deliveryLocation: '',
    installationRequired: 'no',
    ongoingSupport: 'no',
    preferredContact: 'email',

    // Terms
    agreeToTerms: false,
    subscribeUpdates: false,
  });

  const [errors, setErrors] = useState({});

  const projectTypes = [
    'Fabrication personnalisée',
    'Soudage et fabrication',
    'Maintenance industrielle',
    "Services d'ingénierie",
    'Scan et ingénierie',
    'Traitement de surface',
    "Location de main-d'œuvre",
    'Services mobiles',
    'Consultation',
    'Autre',
  ];

  const qualityStandards = [
    'ISO 9001',
    'ASME Standards',
    'AWS D1.1',
    'CWB Certified',
    'Military Standards',
    'Aerospace Standards',
    'Automotive Standards',
    'Food Grade',
    'Medical Grade',
    'Other',
  ];

  const timelineOptions = [
    'Urgent (1-2 semaines)',
    'Standard (3-4 semaines)',
    'Moyen terme (1-2 mois)',
    'Long terme (3+ mois)',
    'Incertain',
  ];

  const budgetRanges = [
    'Moins de 5 000 $',
    '5 000 $ - 20 000 $',
    '20 000 $ - 50 000 $',
    '50 000 $ - 100 000 $',
    '100 000 $ - 250 000 $',
    '250 000 $ +',
    'Budget à déterminer',
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (name === 'qualityStandards' || name === 'certificationsRequired') {
        const newValue = formData[name].includes(value)
          ? formData[name].filter((item) => item !== value)
          : [...formData[name], value];
        setFormData((prev) => ({ ...prev, [name]: newValue }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (stepNumber) => {
    const newErrors = {};

    switch (stepNumber) {
      case 1:
        if (!formData.firstName.trim())
          newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim())
          newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Email is invalid';
        }
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        if (!formData.company.trim())
          newErrors.company = 'Company name is required';
        break;

      case 2:
        if (!formData.projectType)
          newErrors.projectType = 'Please select project type';
        if (!formData.projectDescription.trim())
          newErrors.projectDescription = 'Project description is required';
        if (!formData.timeline) newErrors.timeline = 'Please select timeline';
        if (!formData.budgetRange)
          newErrors.budgetRange = 'Please select budget range';
        break;

      case 4:
        if (!formData.agreeToTerms)
          newErrors.agreeToTerms = 'You must agree to the terms';
        break;
    }

    return newErrors;
  };

  const nextStep = () => {
    const stepErrors = validateStep(step);
    if (Object.keys(stepErrors).length === 0) {
      setStep((prev) => Math.min(prev + 1, 4));
      setErrors({});
    } else {
      setErrors(stepErrors);
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    setErrors({});
  };

  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalErrors = validateStep(4);
    if (Object.keys(finalErrors).length > 0) {
      setErrors(finalErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Submit to API
      const response = await quotationAPI.submit(formData);

      if (response.data.success) {
        setIsSubmitted(true);

        // Reset form after submission
        setTimeout(() => {
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            position: '',
            industry: '',
            projectType: '',
            projectDescription: '',
            timeline: '',
            budgetRange: '',
            materials: '',
            quantity: '',
            drawingsAvailable: 'no',
            cadFiles: 'no',
            qualityStandards: [],
            certificationsRequired: [],
            deliveryLocation: '',
            installationRequired: 'no',
            ongoingSupport: 'no',
            preferredContact: 'email',
            agreeToTerms: false,
            subscribeUpdates: false,
          });
          setStep(1);
          setIsSubmitted(false);
        }, 5000);
      }
    } catch (error) {
      console.error('Error submitting quotation:', error);
      setSubmitError(
        error.response?.data?.message ||
          'Une erreur est survenue lors de la soumission. Veuillez réessayer.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Prénom *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  } focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`}
                  placeholder="John"
                  onFocus={() => setActiveInput('firstName')}
                  onBlur={() => setActiveInput('')}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  } focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Adresse e-mail *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`}
                placeholder="jean@societe.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Numéro de téléphone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  } focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`}
                  placeholder="(555) 123-4567"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Entreprise *
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${
                    errors.company ? 'border-red-500' : 'border-gray-300'
                  } focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`}
                  placeholder="ABC Fabrication Inc."
                />
                {errors.company && (
                  <p className="text-red-500 text-sm mt-1">{errors.company}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Poste
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Chef de projet"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Secteur d'activité
                </label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Automobile, Aéronautique, etc."
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Type de projet *
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border ${
                  errors.projectType ? 'border-red-500' : 'border-gray-300'
                } focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`}
              >
                <option value="">Sélectionnez un type de projet</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.projectType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.projectType}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description du projet *
              </label>
              <textarea
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleInputChange}
                rows={6}
                className={`w-full px-4 py-3 border ${
                  errors.projectDescription
                    ? 'border-red-500'
                    : 'border-gray-300'
                } focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`}
                placeholder="Décrivez votre projet en détail. Incluez les spécifications, les exigences, les défis et les résultats souhaités..."
              />
              {errors.projectDescription && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.projectDescription}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Délai *
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${
                    errors.timeline ? 'border-red-500' : 'border-gray-300'
                  } focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`}
                >
                  <option value="">Sélectionnez un délai</option>
                  {timelineOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.timeline && (
                  <p className="text-red-500 text-sm mt-1">{errors.timeline}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Étendue du budget *
                </label>
                <select
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${
                    errors.budgetRange ? 'border-red-500' : 'border-gray-300'
                  } focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`}
                >
                  <option value="">Sélectionnez une étendue budgétaire</option>
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
                {errors.budgetRange && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.budgetRange}
                  </p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Matières premières requises
                </label>
                <input
                  type="text"
                  name="materials"
                  value={formData.materials}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Acier, Aluminium, Inoxydable, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantité
                </label>
                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Unités, pièces, ou volume"
                />
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Documentation technique
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="drawingsAvailable"
                        value="yes"
                        checked={formData.drawingsAvailable === 'yes'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <span>Dessins techniques disponibles</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="drawingsAvailable"
                        value="no"
                        checked={formData.drawingsAvailable === 'no'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <span>
                        Aucun dessin disponible (besoin de conception)
                      </span>
                    </label>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Fichiers CAO disponibles?
                  </label>
                  <select
                    name="cadFiles"
                    value={formData.cadFiles}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    <option value="no">Aucun fichier CAO</option>
                    <option value="step">Fichiers STEP</option>
                    <option value="iges">Fichiers IGES</option>
                    <option value="solidworks">SolidWorks</option>
                    <option value="autocad">AutoCAD</option>
                    <option value="other">Autre format</option>
                  </select>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Normes de qualité requises *
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {qualityStandards.map((standard) => (
                    <label
                      key={standard}
                      className="flex items-center space-x-3"
                    >
                      <input
                        type="checkbox"
                        name="qualityStandards"
                        value={standard}
                        checked={formData.qualityStandards.includes(standard)}
                        onChange={handleInputChange}
                        className="rounded"
                      />
                      <span className="text-sm">{standard}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Logistique et soutien
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Lieu de livraison
                  </label>
                  <input
                    type="text"
                    name="deliveryLocation"
                    value={formData.deliveryLocation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Adresse de livraison"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Installation requise?
                  </label>
                  <select
                    name="installationRequired"
                    value={formData.installationRequired}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    <option value="no">Aucune installation requise</option>
                    <option value="yes">Oui, installation requise</option>
                    <option value="maybe">
                      Peut-être, discuter des options
                    </option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Méthode de contact préférée
                </label>
                <div className="flex space-x-6 mt-2">
                  {['email', 'phone', 'video', 'in-person'].map((method) => (
                    <label key={method} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="preferredContact"
                        value={method}
                        checked={formData.preferredContact === method}
                        onChange={handleInputChange}
                      />
                      <span className="capitalize">{method}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <div className="bg-blue-50 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Examen de votre demande de devis
              </h4>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Personne contact</p>
                    <p className="font-semibold">
                      {formData.firstName} {formData.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Entreprise</p>
                    <p className="font-semibold">{formData.company}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Type de projet</p>
                  <p className="font-semibold">{formData.projectType}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Délai</p>
                    <p className="font-semibold">{formData.timeline}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Étendue du budget</p>
                    <p className="font-semibold">{formData.budgetRange}</p>
                  </div>
                </div>

                {formData.qualityStandards.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600">Normes de qualité</p>
                    <p className="font-semibold">
                      {formData.qualityStandards.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  id="terms"
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  J'accepte les conditions générales et je consens à recevoir
                  des devis par e-mail/téléphone. Toutes les informations sont
                  traitées de manière confidentielle. Nous ne partageons pas vos
                  données avec des tiers. *
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>
              )}

              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  name="subscribeUpdates"
                  checked={formData.subscribeUpdates}
                  onChange={handleInputChange}
                  id="subscribe"
                  className="mt-1"
                />
                <label htmlFor="subscribe" className="text-sm text-gray-700">
                  S'abonner aux actualités du secteur, aux informations
                  techniques et aux actualités de l'entreprise
                </label>
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Form Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Demander un devis détaillé
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Remplissez ce formulaire complet pour recevoir un devis détaillé
              et ventilé pour votre projet industriel. Notre équipe analysera
              vos exigences et proposera des solutions optimales.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex justify-between items-start relative">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className="flex flex-col items-center relative z-10 flex-1"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mb-2 transition-all flex-shrink-0 ${
                      step >= stepNumber
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {stepNumber}
                  </div>
                  <span
                    className={`text-sm font-medium text-center max-w-xs ${
                      step >= stepNumber ? 'text-primary' : 'text-gray-500'
                    }`}
                  >
                    {stepNumber === 1 && 'Informations de contact'}
                    {stepNumber === 2 && 'Détails du projet'}
                    {stepNumber === 3 && 'Spécifications'}
                    {stepNumber === 4 && 'Examen et soumission'}
                  </span>
                </div>
              ))}
              <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 -z-10">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((step - 1) / 3) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-white shadow-2xl p-8 md:p-12">
            <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
              <button
                onClick={prevStep}
                disabled={step === 1}
                className={`px-8 py-3 font-semibold transition-all ${
                  step === 1
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-gray-100'
                }`}
              >
                ← Précédent
              </button>

              <div className="flex flex-col items-end gap-3">
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center text-red-600 font-semibold bg-red-50 px-4 py-2 rounded"
                  >
                    <FiAlertCircle className="w-5 h-5 mr-2" />
                    {submitError}
                  </motion.div>
                )}

                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center text-green-600 font-semibold"
                  >
                    <FiCheck className="w-5 h-5 mr-2" />
                    Demande de devis soumise!
                  </motion.div>
                )}

                {step < 4 ? (
                  <button
                    onClick={nextStep}
                    className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-semibold transition-colors"
                  >
                    Étape suivante →
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`px-8 py-3 font-semibold transition-all ${
                      isSubmitting
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-primary hover:bg-primary-dark text-white'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Traitement en cours...
                      </span>
                    ) : (
                      'Soumettre la demande de devis'
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Support */}
          <div className="mt-12 p-6 bg-dark-blue text-white text-center">
            <p className="text-lg font-semibold mb-2">
              Besoin d'une aide immédiate?
            </p>
            <p className="text-text-secondary mb-4">
              Appelez notre ligne d'assistance industrielle:
              <a
                href="https://wa.me/14189904459"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-50 font-bold ml-2 hover:text-primary-50/80 transition-colors"
              >
                +1 (418) 990-4459
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Contact Information Section
const ContactInformation = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const contactPoints = [
    {
      icon: <FiPhone />,
      title: 'Support téléphonique',
      main: '(418) 990-4459',
      sub: 'Urgence 24h: 418-558-2557',
      color: 'bg-primary',
      description: 'Ligne directe vers notre équipe opérationnelle',
      type: 'phone',
      href: 'https://wa.me/14189904459',
    },
    {
      icon: <FiMail />,
      title: 'Email',
      main: 'contact@stip.ca',
      color: 'bg-primary-dark',
      description: 'Réponse dans les plus brefs délais',
      type: 'email',
      href: 'mailto:contact@stip.ca',
    },
    {
      icon: <FiMapPin />,
      title: 'Siège social',
      main: 'Quebec, Canada',
      sub: '2828 Boul Laurier, Québec, QC G1V 0B9',
      color: 'bg-dark-blue',
      description: "Bureau principal de l'entreprise",
    },
    {
      icon: <FiClock />,
      title: "Heures d'affaires",
      main: 'Lun-Sam: 7h00 - 17h00',
      sub: 'Sam: 7h00 - 16h00',
      color: 'bg-primary',
      description: '',
    },
  ];

  return (
    <div ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nous contacter
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connectez-vous avec notre équipe d'experts industriels. Nous
              sommes là pour discuter de votre projet, vous fournir des conseils
              techniques et vous livrer des solutions qui répondent à vos
              besoins de fabrication.
            </p>
          </div>

          {/* Contact Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300 group"
              >
                <div
                  className={`${point.color} w-12 h-12 rounded-full flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {point.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {point.title}
                </h3>
                {point.href ? (
                  <a
                    href={point.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 font-semibold mb-1 hover:text-primary transition-colors"
                  >
                    {point.main}
                  </a>
                ) : (
                  <p className="text-gray-900 font-semibold mb-1">
                    {point.main}
                  </p>
                )}
                <p className="text-gray-500 text-sm">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Departments Banner - Full Width Separator
const DepartmentsBanner = ({ departments, isInView }) => {
  return (
    <div className="bg-dark-blue py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold text-white mb-8 text-center">
          Contacts des départements
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept, index) => (
            <motion.div
              key={dept.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-card-bg p-6 hover:bg-primary/10 transition-colors duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-4">
                  {dept.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">
                    {dept.name}
                  </h4>
                  {dept.contact && (
                    <p className="text-sm text-text-secondary">
                      {dept.contact}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-text-secondary">
                  <FiMail className="w-4 h-4 mr-2" />
                  {dept.email}
                </div>
                <div className="flex items-center text-sm text-text-secondary">
                  <FiPhone className="w-4 h-4 mr-2" />
                  <a
                    href="https://wa.me/14189904459"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {dept.phone}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Contact Page Component
const Contact = () => {
  const heroRef = useRef(null);
  const departmentsRef = useRef(null);
  const departments = [
    {
      name: 'Le Président',
      contact: 'Daly Bejaoui',
      email: 'mbejaoui@stip.ca',
      phone: '(418) 990-4459 Ex 102',
      icon: <FiPhone />,
    },
    {
      name: 'Directeur des relations clients',
      contact: 'Aziz Bahri',
      email: 'mbahri@stip.ca',
      phone: '(418) 990-4459 Ex 103',
      icon: <FiSettings />,
    },
    {
      name: "Directeur d'ingénierie",
      contact: 'Sofien Dridi',
      email: 'mbejaoui@stip.ca',
      phone: '(418) 990-4459 Ex 104',
      icon: <FiClipboard />,
    },
    {
      name: 'Directeur de fabrication',
      contact: 'André Lavoie',
      email: 'mbejaoui@stip.ca',
      phone: '(418) 990-4459 Ex 105',
      icon: <FiTool />,
    },
    {
      name: 'Directrice des ressources humaines',
      contact: 'Véronique Clément',
      email: 'mbejaoui@stip.ca',
      phone: '(418) 990-4459 Ex 106',
      icon: <FiUser />,
    },
    {
      name: 'Chargé de projets',
      contact: 'Dany Roy',
      email: 'mbejaoui@stip.ca',
      phone: '(418) 990-4459 Ex 107',
      icon: <FiClipboard />,
    },
    {
      name: 'Comptabilité',
      contact: 'Guylaine Bédard',
      email: 'payables@stip.ca',
      phone: '(418) 990-4459 Ex 108',
      icon: <FiDollarSign />,
    },
  ];

  const departmentsInView = useInView(departmentsRef, {
    once: true,
    amount: 0.2,
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[90vh] overflow-hidden">
        {/* Background with industrial pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-dark-blue">
            {/* Animated background grid */}
            <motion.div
              className="absolute inset-0 opacity-40"
              initial={{ backgroundPosition: '0% 0%' }}
              animate={{ backgroundPosition: '100% 100%' }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{
                backgroundImage: `linear-gradient(45deg, transparent 48%, rgba(59, 130, 246, 0.3) 49%, rgba(59, 130, 246, 0.3) 51%, transparent 52%)`,
                backgroundSize: '60px 60px',
              }}
            />
          </div>

          {/* Subtle gradient */}
          <div className="absolute inset-0 bg-linear-to-br from-dark-blue via-dark-blue/90 to-black" />

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
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex flex-col justify-center items-center text-center px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <motion.div
              className="h-1 w-16 bg-primary mb-8"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white"
            >
              Expertise industrielle
              <br />
              <span className="text-primary-light">A votre service</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-text-light mb-8 max-w-2xl mx-auto"
            >
              Connectez-vous avec des professionnels certifiés prêts à résoudre
              vos défis de fabrication les plus complexes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex gap-4 flex-wrap justify-center"
            >
              <a
                href="#quote-form"
                className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-semibold uppercase tracking-wider text-sm transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Demander une soumission
              </a>
              <a
                href="#contact-info"
                className="px-8 py-3 border-2 border-white hover:border-primary text-white hover:text-primary font-semibold uppercase tracking-wider text-sm transition-all duration-300"
              >
                Informations de contact
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-widest mb-2 text-gray-300">
              Faites défiler
            </span>
            <motion.div
              className="w-px h-12 bg-linear-to-b from-blue-400 to-transparent"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Contact Information Section */}
      <section id="contact-info">
        <ContactInformation />
      </section>

      {/* Departments Banner - Full Width Separator */}
      <div ref={departmentsRef}>
        {/**<DepartmentsBanner
          departments={departments}
          isInView={departmentsInView}
        /> */}
      </div>

      {/* Serpapi Google Maps Section */}
      <section className="relative">
        <IndustrialSerpApiMap />
      </section>

      {/* Detailed Quote Form Section */}
      <section id="quote-form" className="bg-gray-50">
        <DetailedQuoteForm />
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark-blue">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à transformer vos opérations industrielles?
            </h2>
            <p className="text-text-light mb-8 text-lg">
              Notre équipe de professionnels certifiés est prête à discuter de
              vos exigences de projet et à fournir des solutions personnalisées
              qui délivrent des résultats mesurables.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/14189904459"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold text-lg transition-colors duration-300 inline-flex items-center justify-center"
              >
                <FiPhone className="w-5 h-5 mr-3" />
                Appelez maintenant: <br /> (418) 990-4459
              </a>
              <a
                href="mailto:contact@stip.ca"
                className="px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold text-lg transition-colors duration-300 inline-flex items-center justify-center"
              >
                <FiMail className="w-5 h-5 mr-3" />
                Envoyer un email à notre équipe
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
