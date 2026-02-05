import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FiArrowRight,
  FiMail,
  FiPhone,
  FiSearch,
  FiMapPin,
  FiBriefcase,
  FiChevronDown,
  FiLoader,
} from 'react-icons/fi';
import {
  HiOutlineSparkles,
  HiOutlineCheckCircle,
  HiOutlineBriefcase,
} from 'react-icons/hi2';
import { jobAPI } from '../services/api';

// Custom Dropdown Component
const CustomDropdown = ({
  value,
  onChange,
  options,
  placeholder,
  icon: Icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full pl-12 pr-10 py-3 border-2 border-primary-50/40 rounded-2xl bg-white text-dark-blue font-medium focus:outline-none focus:border-primary-50 focus:ring-2 focus:ring-primary-50/30 transition-all duration-300 cursor-pointer hover:border-primary-50/60 text-left flex items-center justify-between"
      >
        <span className={value === 'all' ? 'text-gray-500' : 'text-dark-blue'}>
          {displayText}
        </span>
      </button>
      <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-50 w-5 h-5 pointer-events-none z-10" />
      <FiChevronDown
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-primary-50 w-5 h-5 pointer-events-none transition-transform duration-300 ${
          isOpen ? 'rotate-180' : ''
        }`}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-primary-50/40 rounded-2xl shadow-xl z-50 overflow-hidden"
          >
            {options.map((option, index) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left font-medium transition-all duration-200 ${
                  value === option.value
                    ? 'bg-primary-50/20 text-primary'
                    : 'text-dark-blue hover:bg-primary-50/10'
                } ${index === 0 ? 'rounded-t-xl' : ''} ${
                  index === options.length - 1 ? 'rounded-b-xl' : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Careers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedField, setSelectedField] = useState('all');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await jobAPI.getAll();
        if (response.data.success) {
          setJobs(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.shortDescription &&
        job.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation =
      selectedLocation === 'all' ||
      job.location.toLowerCase() === selectedLocation.toLowerCase();
    const matchesType =
      selectedType === 'all' ||
      job.contractType.toLowerCase() === selectedType.toLowerCase();
    const matchesField =
      selectedField === 'all' ||
      job.department.toLowerCase() === selectedField.toLowerCase();

    return matchesSearch && matchesLocation && matchesType && matchesField;
  });

  const benefits = [
    {
      icon: <HiOutlineSparkles className="w-6 h-6" />,
      title: 'Environnement innovant',
      description:
        'Travaillez avec des technologies de pointe et des processus industriels modernes.',
    },
    {
      icon: <HiOutlineCheckCircle className="w-6 h-6" />,
      title: 'Équipe compétente',
      description:
        'Rejoignez une équipe de professionnels certifiés et expérimentés.',
    },
    {
      icon: <FiMail className="w-6 h-6" />,
      title: 'Opportunités de croissance',
      description:
        'Développez vos compétences avec des formations et des certifications continues.',
    },
    {
      icon: <FiPhone className="w-6 h-6" />,
      title: 'Culture collaborative',
      description:
        'Participer à un environnement où le respect et la communication sont prioritaires.',
    },
  ];

  const locations = ['Montréal', 'Québec', 'Cap-Santé', 'Télétravail'];
  const jobTypes = ['CDI', 'Contrat', 'Temps partiel', 'Stage'];
  const fields = [
    'Soudage',
    'Fabrication',
    'Ingénierie',
    'Maintenance',
    'Gestion',
  ];

  // Dropdown options formatted for CustomDropdown component
  const locationOptions = [
    { value: 'all', label: 'Tous les lieux' },
    ...locations.map((loc) => ({ value: loc.toLowerCase(), label: loc })),
  ];

  const typeOptions = [
    { value: 'all', label: 'Tous les types' },
    ...jobTypes.map((type) => ({ value: type.toLowerCase(), label: type })),
  ];

  const fieldOptions = [
    { value: 'all', label: 'Tous les domaines' },
    ...fields.map((field) => ({ value: field.toLowerCase(), label: field })),
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Cinematic */}
      <section className="relative min-h-[90vh] overflow-hidden bg-linear-to-br from-dark-blue via-dark-blue to-black flex items-center">
        {/* Animated background grid */}
        <motion.div
          className="absolute inset-0 opacity-10"
          initial={{ backgroundPosition: '0% 0%' }}
          animate={{ backgroundPosition: '100% 100%' }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage: `linear-gradient(45deg, transparent 48%, rgba(59, 130, 246, 0.1) 49%, rgba(59, 130, 246, 0.1) 51%, transparent 52%)`,
            backgroundSize: '60px 60px',
          }}
        />

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

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="h-1 w-16 bg-primary mb-8"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />

              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 tracking-tighter leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Rejoignez notre équipe
                <motion.span
                  className="block text-primary mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  STIP Solutions
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-sm sm:text-base md:text-lg lg:text-xl text-text-secondary max-w-3xl leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Construisez une carrière enrichissante dans l'industrie
                manufacturière avec une équipe qui valorise l'excellence,
                l'innovation et le développement professionnel.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-10"
              >
                <motion.a
                  href="#job-listings"
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center text-primary hover:text-primary-light transition-colors"
                >
                  Voir les opportunités
                  <FiArrowRight className="ml-3" />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-0  left-1/2 transform -translate-x-1/2 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-widest mb-2 text-gray-300">
              Faites défiler
            </span>
            <motion.div
              className="w-px h-12 bg-linear-to-b from-primary to-transparent"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Why STIP Solutions Section */}
      <motion.section
        className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
              Pourquoi rejoindre STIP Solutions?
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Découvrez ce qui rend STIP Solutions un employeur de choix dans le
              secteur industriel.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-primary-50/10 to-primary-50/5 border border-primary-50/40 rounded-xl p-6 hover:shadow-lg hover:border-primary-50/60 transition-shadow duration-300"
              >
                <div className="text-primary-50 mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-dark-blue mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Job Listings Section */}
      <section
        id="job-listings"
        className="relative py-20 px-4 sm:px-6 lg:px-8 bg-dark-blue"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Opportunités d'emploi
            </h2>
            <p className="text-text-light text-lg max-w-2xl mx-auto">
              Explorez nos postes actuellement disponibles et trouvez votre
              place chez STIP Solutions.
            </p>
          </div>

          {/* Filter Section */}
          <div className="bg-gradient-to-br from-dark-blue/5 to-primary-50/10 border-2 border-primary-50/30 rounded-2xl p-8 mb-12">
            <h3 className="text-xl font-semibold text-dark-blue mb-6">
              Filtrer les offres
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Search Bar */}
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-50 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher un poste..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-primary-50/40 rounded-xl bg-white text-dark-blue placeholder-gray-500 focus:outline-none focus:border-primary-50 focus:ring-2 focus:ring-primary-50/30 transition-all duration-300 font-medium"
                />
              </div>

              {/* Location Filter */}
              <CustomDropdown
                value={selectedLocation}
                onChange={setSelectedLocation}
                options={locationOptions}
                placeholder="Tous les lieux"
                icon={FiMapPin}
              />

              {/* Job Type Filter */}
              <CustomDropdown
                value={selectedType}
                onChange={setSelectedType}
                options={typeOptions}
                placeholder="Tous les types"
                icon={FiBriefcase}
              />

              {/* Field Filter */}
              <CustomDropdown
                value={selectedField}
                onChange={setSelectedField}
                options={fieldOptions}
                placeholder="Tous les domaines"
                icon={HiOutlineBriefcase}
              />
            </div>
          </div>

          {/* Job Listings */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <FiLoader className="w-10 h-10 text-primary-50 animate-spin" />
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="text-center">
                <div className="mb-6 flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                    <HiOutlineBriefcase className="w-12 h-12 text-primary-50" />
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-white mb-4">
                  {jobs.length === 0
                    ? 'Aucun poste ouvert actuellement'
                    : 'Aucun poste correspondant'}
                </h3>
                <p className="text-text-light text-lg max-w-2xl mx-auto mb-8">
                  {jobs.length === 0
                    ? 'Nous ne recevons pas de demandes actuellement, mais nous recrutons régulièrement. Restez en contact pour être alerté des futures opportunités!'
                    : 'Essayez de modifier vos filtres pour voir plus de résultats.'}
                </p>

                <div className="inline-flex items-center gap-3 bg-primary/20 border border-primary/50 rounded-2xl px-6 py-4">
                  <div className="w-3 h-3 bg-primary-50 rounded-full animate-pulse" />
                  <p className="text-primary-50 font-semibold">
                    Consultez régulièrement cette page pour les nouvelles offres
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  onClick={() => navigate(`/careers/${job._id}`)}
                >
                  {/* Job Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-dark-blue mb-2 group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
                          <FiMapPin className="w-3 h-3" />
                          {job.location}
                        </span>
                        <span className="inline-block px-3 py-1 bg-purple-50 text-purple-600 text-xs font-semibold rounded-full">
                          {job.contractType}
                        </span>
                        <span className="inline-block px-3 py-1 bg-orange-50 text-orange-600 text-xs font-semibold rounded-full">
                          {job.department}
                        </span>
                      </div>
                    </div>
                    {job.featured && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                        En vedette
                      </span>
                    )}
                  </div>

                  {/* Short Description */}
                  {job.shortDescription && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {job.shortDescription}
                    </p>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500">
                      {job.experienceLevel}
                    </span>
                    <motion.span
                      whileHover={{ x: 4 }}
                      className="inline-flex items-center text-primary font-semibold text-sm group-hover:underline"
                    >
                      Voir l'offre
                      <FiArrowRight className="ml-2 w-4 h-4" />
                    </motion.span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-dark-blue rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Intéressé par une opportunité chez STIP Solutions?
            </h2>
            <p className="text-text-light text-lg mb-8 max-w-2xl mx-auto">
              Soumettez votre CV ou contactez notre équipe des ressources
              humaines pour discuter des opportunités futures ou envoyer une
              candidature spontanée.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:rh@stip.ca"
                className="inline-flex items-center gap-2 bg-primary-50 text-dark-blue px-8 py-3 rounded-lg font-semibold hover:bg-white transition-all duration-300 group"
              >
                <FiMail className="w-5 h-5" />
                Envoyer votre CV
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 border border-primary-50 text-primary-50 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50/10 transition-all duration-300 group"
              >
                Nous contacter
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ-like Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
              À propos de nos opportunités
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary-50/10 to-primary-50/5 border border-primary-50/40 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-dark-blue mb-3">
                Quels types de postes offrez-vous?
              </h3>
              <p className="text-gray-700">
                STIP Solutions recrute pour diverses positions, notamment des
                soudeurs, techniciens, ingénieurs, superviseurs et personnel
                d'assistance. Nous valorisons l'expérience industrielle et les
                certifications pertinentes.
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary-50/10 to-primary-50/5 border border-primary-50/40 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-dark-blue mb-3">
                Offrez-vous une formation?
              </h3>
              <p className="text-gray-700">
                Oui! Nous investissons dans le développement professionnel de
                nos employés. Nous proposons des formations continues, des
                certifications (AWS, CWB, etc.) et des opportunités de
                progression.
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary-50/10 to-primary-50/5 border border-primary-50/40 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-dark-blue mb-3">
                Comment puis-je soumettre mon candidature?
              </h3>
              <p className="text-gray-700">
                Vous pouvez envoyer votre CV et une lettre de motivation à{' '}
                <a
                  href="mailto:rh@stip.ca"
                  className="text-primary-50 font-semibold hover:underline"
                >
                  rh@stip.ca
                </a>
                , ou nous contacter directement via le formulaire de contact.
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary-50/10 to-primary-50/5 border border-primary-50/40 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-dark-blue mb-3">
                Quel est l'environnement de travail?
              </h3>
              <p className="text-gray-700">
                Nous opérons dans des installations industrielles modernes et
                bien équipées. La sécurité est notre priorité absolue, et nous
                maintenons les normes les plus élevées d'environnement de
                travail.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
