import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FiClipboard,
  FiCalendar,
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiFileText,
  FiCheck,
  FiAlertCircle,
  FiClock,
} from 'react-icons/fi';

// Move components outside of render to fix the error
const InputField = ({
  // eslint-disable-next-line no-unused-vars
  icon: IconComponent,
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = true,
  activeInput,
  setActiveInput,
}) => (
  <div className="relative group">
    {/* Label */}
    <div className="flex items-center mb-4">
      <IconComponent className="w-5 h-5 text-blue-600 mr-3" />
      <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
        {label} {required && '*'}
      </label>
      {error && (
        <div className="ml-auto flex items-center">
          <FiAlertCircle className="w-4 h-4 text-red-500 mr-1" />
          <span className="text-xs text-red-500 font-medium">{error}</span>
        </div>
      )}
    </div>

    {/* Input Container */}
    <div
      className={`relative transition-all duration-300 ${
        error ? 'bg-linear-to-r from-red-50 to-white' : 'bg-gray-50'
      }`}
    >
      {/* Animated Background Line */}
      <motion.div
        className={`absolute left-0 right-0 bottom-0 h-0.5 ${
          error ? 'bg-red-500' : 'bg-linear-to-r from-blue-500 to-emerald-500'
        } opacity-0 group-hover:opacity-100`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: activeInput === name ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Input */}
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setActiveInput(name)}
          onBlur={() => setActiveInput('')}
          rows={5}
          className={`w-full px-6 py-5 bg-transparent text-gray-900 focus:outline-none resize-none transition-all duration-300 ${
            error ? 'placeholder-red-300' : 'placeholder-gray-400'
          }`}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setActiveInput(name)}
          onBlur={() => setActiveInput('')}
          className={`w-full px-6 py-5 bg-transparent text-gray-900 focus:outline-none transition-all duration-300 ${
            error ? 'placeholder-red-300' : 'placeholder-gray-400'
          }`}
          placeholder={placeholder}
        />
      )}
    </div>
  </div>
);

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required = true,
  activeInput,
  setActiveInput,
}) => (
  <div className="relative group">
    <div className="flex items-center mb-4">
      <FiBriefcase className="w-5 h-5 text-blue-600 mr-3" />
      <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
        {label} {required && '*'}
      </label>
      {error && (
        <div className="ml-auto flex items-center">
          <FiAlertCircle className="w-4 h-4 text-red-500 mr-1" />
          <span className="text-xs text-red-500 font-medium">{error}</span>
        </div>
      )}
    </div>

    <div
      className={`relative ${
        error ? 'bg-linear-to-r from-red-50 to-white' : 'bg-gray-50'
      }`}
    >
      <motion.div
        className={`absolute left-0 right-0 bottom-0 h-0.5 ${
          error ? 'bg-red-500' : 'bg-linear-to-r from-blue-500 to-emerald-500'
        } opacity-0 group-hover:opacity-100`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: activeInput === name ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <select
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setActiveInput(name)}
        onBlur={() => setActiveInput('')}
        className={`w-full px-6 py-5 bg-transparent text-gray-900 focus:outline-none appearance-none cursor-pointer transition-all duration-300 ${
          error ? 'text-red-300' : ''
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232563eb' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 1.5rem center',
          backgroundSize: '1.2rem',
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);

const CheckboxField = ({ checked, onChange, error, label }) => (
  <div className="mt-8">
    <div className="flex items-start space-x-4 p-6 bg-linear-to-r from-gray-50 to-white">
      <div className="relative">
        <input
          type="checkbox"
          id="agreeToTerms"
          name="agreeToTerms"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <motion.label
          htmlFor="agreeToTerms"
          className={`flex items-center justify-center w-6 h-6 cursor-pointer border transition-all duration-300 ${
            checked ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-400'
          }`}
          whileTap={{ scale: 0.9 }}
        >
          {checked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <FiCheck className="w-4 h-4 text-white" />
            </motion.div>
          )}
        </motion.label>
      </div>
      <label
        htmlFor="agreeToTerms"
        className="text-sm text-gray-700 flex-1 leading-relaxed"
      >
        {label}
      </label>
    </div>
    {error && (
      <div className="flex items-center mt-2 ml-10">
        <FiAlertCircle className="w-4 h-4 text-red-500 mr-2" />
        <span className="text-sm text-red-500">{error}</span>
      </div>
    )}
  </div>
);

const QuoteForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    clientType: '',
    companyName: '',
    projectDetails: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeInput, setActiveInput] = useState('');

  const clientTypes = [
    { value: '', label: 'Sélectionnez le type de client' },
    { value: 'individual', label: 'Particulier' },
    { value: 'small', label: 'Petite entreprise (1-50 employés)' },
    { value: 'medium', label: 'Entreprise moyenne (51-250 employés)' },
    { value: 'large', label: 'Grande entreprise (250+ employés)' },
  ];

  const consultationSlots = [
    'Lun 9h00',
    'Lun 14h00',
    'Mar 10h00',
    'Mar 15h00',
    'Mer 11h00',
    'Mer 16h00',
    'Jeu 9h00',
    'Jeu 14h00',
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.email.trim()) {
      newErrors.email = "L'adresse e-mail est requise";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'adresse e-mail n'est pas valide";
    }
    if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis';
    if (!formData.clientType)
      newErrors.clientType = 'Veuillez sélectionner le type de client';
    if (formData.clientType !== 'individual' && !formData.companyName.trim()) {
      newErrors.companyName =
        "Le nom de l'entreprise est requis pour les entreprises";
    }
    if (!formData.projectDetails.trim())
      newErrors.projectDetails = 'Les détails du projet sont requis';
    if (!formData.agreeToTerms)
      newErrors.agreeToTerms = 'Vous devez accepter les conditions';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      setFormData({
        name: '',
        email: '',
        phone: '',
        clientType: '',
        companyName: '',
        projectDetails: '',
        agreeToTerms: false,
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Background Industrial Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(45deg, transparent 49%, #000 50%, transparent 51%),
                            linear-gradient(-45deg, transparent 49%, #000 50%, transparent 51%)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Section Header */}
      <div className="relative container mx-auto px-4 mb-16">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Demandez votre devis
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complétez le formulaire ci-dessous pour obtenir une estimation
            complète du projet ou planifier une consultation avec nos experts
          </p>
        </div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Consultation Info */}
          <div className="lg:w-2/5">
            <div className="sticky top-24">
              {/* Consultation Header */}
              <div className="mb-10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-dark-blue rounded-full flex items-center justify-center mr-4">
                    <FiCalendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Consultation d'expert
                    </h3>
                    <p className="text-gray-600">
                      30 minutes avec nos spécialistes
                    </p>
                  </div>
                </div>

                <div className="h-0.5 w-full bg-linear-to-r from-blue-600/20 via-emerald-500/20 to-transparent" />
              </div>

              {/* Consultation Features */}
              <div className="space-y-6 mb-10">
                <div className="flex items-start">
                  <div className="w-8 h-8 flex items-center justify-center mr-4">
                    <FiClock className="w-8 h-8 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      Séance de 30 minutes
                    </h4>
                    <p className="text-gray-600">
                      Analyse approfondie du projet et collecte des exigences
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 flex items-center justify-center mr-4">
                    <FiClipboard className="w-8 h-8 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      Avis d'experts
                    </h4>
                    <p className="text-gray-600">
                      Recommandations sectorielles et meilleures pratiques
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 flex items-center justify-center mr-4">
                    <FiFileText className="w-8 h-8 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      Sans obligation
                    </h4>
                    <p className="text-gray-600">
                      Consultation gratuite avec étapes suivantes claires
                    </p>
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-4 h-0.5 bg-blue-600 mr-3"></span>
                  Créneaux disponibles
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {consultationSlots.map((slot, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="py-3 px-4 bg-linear-to-r from-gray-50 to-white text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 group"
                    >
                      <span className="relative">
                        {slot}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quote Form */}
          <div className="lg:w-3/5">
            <div className="bg-linear-to-br from-white via-white to-gray-50">
              {/* Form Header */}
              <div className="mb-10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-gray-900 to-gray-800 flex items-center justify-center mr-4">
                    <FiClipboard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Demander un devis détaillé
                    </h3>
                    <p className="text-gray-600">
                      Complétez pour obtenir une estimation complète du projet
                    </p>
                  </div>
                </div>
                <div className="h-0.5 w-full bg-linear-to-r from-gray-900/20 via-gray-800/20 to-transparent" />
              </div>

              {/* Success Message */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-8 p-6 bg-linear-to-r from-emerald-50 to-green-50"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-emerald-500 flex items-center justify-center mr-4">
                        <FiCheck className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-emerald-900">
                          Envoi réussi !
                        </h4>
                        <p className="text-emerald-700">
                          Votre demande de devis a été soumise. Notre équipe
                          vous contactera sous 24 heures.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form
                id="quote-form"
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <InputField
                    icon={FiUser}
                    label="Nom complet"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="Jean Dupont"
                    activeInput={activeInput}
                    setActiveInput={setActiveInput}
                  />

                  <InputField
                    icon={FiMail}
                    label="Adresse e-mail"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="prenom@entreprise.com"
                    activeInput={activeInput}
                    setActiveInput={setActiveInput}
                  />

                  <InputField
                    icon={FiPhone}
                    label="Numéro de téléphone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    placeholder="(555) 123-4567"
                    activeInput={activeInput}
                    setActiveInput={setActiveInput}
                  />

                  <SelectField
                    label="Type de client"
                    name="clientType"
                    value={formData.clientType}
                    onChange={handleChange}
                    options={clientTypes}
                    error={errors.clientType}
                    activeInput={activeInput}
                    setActiveInput={setActiveInput}
                  />
                </div>

                {formData.clientType &&
                  formData.clientType !== 'individual' && (
                    <InputField
                      icon={FiBriefcase}
                      label="Nom de l'entreprise"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      error={errors.companyName}
                      placeholder="Nom de l'entreprise ou site web"
                      required={formData.clientType !== 'individual'}
                      activeInput={activeInput}
                      setActiveInput={setActiveInput}
                    />
                  )}

                <InputField
                  icon={FiFileText}
                  label="Description du projet"
                  name="projectDetails"
                  type="textarea"
                  value={formData.projectDetails}
                  onChange={handleChange}
                  error={errors.projectDetails}
                  placeholder="Veuillez décrire les exigences du projet, le calendrier, les matériaux et les défis spécifiques..."
                  activeInput={activeInput}
                  setActiveInput={setActiveInput}
                />

                <CheckboxField
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  error={errors.agreeToTerms}
                  label="J'accepte les conditions générales et consens à recevoir des devis par e-mail/téléphone. Toutes les informations sont confidentielles. Nous ne partageons pas vos données avec des tiers."
                />

                {/* Privacy Note */}
                <div className="text-center pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Toutes les informations sont strictement confidentielles.
                    Nous ne partageons ni ne vendons vos données.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Aligned Buttons Section - Both buttons at same level */}
        <div className="flex flex-col lg:flex-row gap-12 mt-10">
          {/* Left Button - Consultation */}
          <div className="lg:w-2/5">
            <motion.button
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-linear-to-r from-blue-600 to-dark-blue text-white font-bold text-lg transition-all duration-300 group overflow-hidden relative"
            >
              <span className="relative z-10">Planifier Une Consultation</span>
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-blue-700 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </div>

          {/* Right Button - Submit Form */}
          <div className="lg:w-3/5">
            <motion.button
              type="submit"
              form="quote-form"
              disabled={isSubmitting}
              className={`w-full py-4 text-white font-bold text-lg transition-all duration-300 relative overflow-hidden ${
                isSubmitting
                  ? 'bg-linear-to-r from-gray-600 to-gray-500 cursor-not-allowed'
                  : 'bg-linear-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700'
              }`}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                  />
                  TRAITEMENT...
                </span>
              ) : (
                <span className="relative z-10">
                  DEMANDER UN DEVIS DÉTAILLÉ
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;
