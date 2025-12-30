import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaTools,
  FaShieldAlt,
  FaIndustry,
  FaChartLine,
  FaBolt,
  FaDollarSign,
  FaClock,
  FaCogs,
  FaUserCheck,
  FaPercent,
} from 'react-icons/fa';

const CaseStudies = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const caseStudies = [
    {
      id: 1,
      title: "Mise à niveau d'une usine de fabrication automobile",
      description:
        'Refonte complète des systèmes de soudage et de fabrication pour un important fournisseur automobile de niveau 1',
      category: 'Soudage industriel et fabrication',
      kpis: [
        {
          icon: <FaChartLine />,
          label: 'Efficacité de production',
          value: '+42%',
          metric: 'Augmentation du débit',
          color: 'bg-primary-light',
        },
        {
          icon: <FaTools />,
          label: 'Taux de qualité',
          value: '99.8%',
          metric: 'Rendement au premier passage',
          color: 'bg-primary',
        },
        {
          icon: <FaDollarSign />,
          label: 'Réduction des coûts',
          value: '$1.2M',
          metric: 'Économies opérationnelles annuelles',
          color: 'bg-primary',
        },
        {
          icon: <FaShieldAlt />,
          label: 'Incidents de sécurité',
          value: '0',
          metric: 'Blessures enregistrables',
          color: 'bg-primary-dark',
        },
      ],
      additionalMetrics: [
        {
          label: 'Durée du projet',
          value: '8 semaines',
          icon: <FaCalendarAlt />,
        },
        {
          label: "Taille de l'équipe",
          value: '24 ingénieurs',
          icon: <FaUserCheck />,
        },
        { label: 'Disponibilité', value: '99.9%', icon: <FaBolt /> },
      ],
      image:
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 2,
      title: "Intégration numérique d'une usine intelligente",
      description:
        "Automatisation Industrie 4.0 et mise en place d'un système de soudage laser pour la fabrication de précision",
      category: 'Transformation numérique',
      kpis: [
        {
          icon: <FaIndustry />,
          label: 'Temps de cycle',
          value: '-38%',
          metric: 'Réduction du temps de fabrication',
          color: 'bg-primary',
        },
        {
          icon: <FaCogs />,
          label: 'Précision du processus',
          value: '±0.02mm',
          metric: 'Précision du soudage laser',
          color: 'bg-primary-light',
        },
        {
          icon: <FaDollarSign />,
          label: 'Retour sur investissement',
          value: '14 mois',
          metric: 'Période de retour sur investissement',
          color: 'bg-primary',
        },
        {
          icon: <FaClock />,
          label: "Temps d'arrêt",
          value: '-67%',
          metric: 'Réduction des arrêts non planifiés',
          color: 'bg-primary-dark',
        },
      ],
      additionalMetrics: [
        {
          label: 'Mise en œuvre',
          value: '12 semaines',
          icon: <FaCalendarAlt />,
        },
        {
          label: 'Heures de formation',
          value: '240 heures',
          icon: <FaUserCheck />,
        },
        { label: 'Intégration du système', value: '100%', icon: <FaBolt /> },
      ],
      image:
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 3,
      title: "Déploiement à grande échelle de main-d'œuvre",
      description:
        'Gestion spécialisée des effectifs techniques pour la maintenance des raffineries et les opérations de turnaround',
      category: "Solutions de main-d'œuvre",
      kpis: [
        {
          icon: <FaUserCheck />,
          label: "Taille de l'équipe",
          value: '325+',
          metric: 'Techniciens certifiés déployés',
          color: 'bg-primary',
        },
        {
          icon: <FaShieldAlt />,
          label: 'Conformité en matière de sécurité',
          value: '100%',
          metric: 'Conformité aux réglementations OSHA',
          color: 'bg-primary-light',
        },
        {
          icon: <FaPercent />,
          label: 'Achèvement à temps',
          value: '98.5%',
          metric: 'Jalons livrés selon le calendrier',
          color: 'bg-primary',
        },
        {
          icon: <FaDollarSign />,
          label: 'Évitement des coûts',
          value: '$3.7M',
          metric: 'Grâce à une allocation optimale des ressources',
          color: 'bg-primary-dark',
        },
      ],
      additionalMetrics: [
        {
          label: 'Durée du projet',
          value: '6 mois',
          icon: <FaCalendarAlt />,
        },
        { label: 'Disponibilité', value: '24/7', icon: <FaClock /> },
        { label: 'Taux de certification', value: '95%', icon: <FaPercent /> },
      ],
      image:
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  // Auto-rotate case studies every 10 seconds

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === caseStudies.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? caseStudies.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="section-dark py-24 relative overflow-hidden">
      {/* Subtle industrial pattern */}
      <div className="absolute inset-0 opacity-3">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(transparent 95%, rgba(59, 130, 246, 0.05) 100%)`,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-5 py-2 bg-primary text-text-light text-sm font-bold uppercase tracking-wider mb-6 sharp">
            Indicateurs de performance
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text-light">
            Études de cas <span className="text-primary">industrielles</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Résultats mesurables obtenus grâce à l'ingénierie de précision et à
            des solutions de main-d'œuvre
          </p>
        </motion.div>

        {/* Main Panel */}
        <div className="relative bg-card-bg overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="min-h-[600px]"
            >
              {/* Project Header */}
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-6">
                  <div className="flex-1">
                    <div className="inline-block px-4 py-1 bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4 sharp">
                      {caseStudies[currentIndex].category}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-text-light mb-3">
                      {caseStudies[currentIndex].title}
                    </h3>
                    <p className="text-text-secondary text-lg max-w-3xl">
                      {caseStudies[currentIndex].description}
                    </p>
                  </div>

                  {/* Project Counter with Navigation */}
                  <div className="flex flex-col items-end space-y-4">
                    <div className="text-right">
                      <div className="text-primary text-sm font-bold uppercase tracking-wider mb-1">
                        Étude de cas
                      </div>
                      <div className="text-text-light text-4xl font-bold flex items-baseline">
                        <span className="text-3xl mr-1">#</span>
                        {(currentIndex + 1).toString().padStart(2, '0')}
                        <span className="text-primary text-xl ml-2">
                          / {caseStudies.length.toString().padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    {/* Navigation Arrows - Placed directly under counter */}
                    <div className="flex items-center space-x-3 pt-2">
                      <button
                        onClick={prevSlide}
                        onMouseDown={(e) => e.preventDefault()}
                        className="w-10 h-10 flex items-center justify-center bg-primary text-text-light hover:bg-primary-dark active:scale-95 transition-all duration-200 sharp"
                        aria-label="Étude de cas précédente"
                      >
                        <FaChevronLeft className="w-4 h-4" />
                      </button>

                      {/* Dot Indicators */}
                      <div className="flex space-x-2">
                        {caseStudies.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            onMouseDown={(e) => e.preventDefault()}
                            className={`w-2 h-2 transition-all duration-300 cursor-pointer ${
                              currentIndex === index
                                ? 'bg-primary w-6'
                                : 'bg-primary/40 hover:bg-primary/70'
                            }`}
                            aria-label={`Voir l'étude de cas ${index + 1}`}
                          />
                        ))}
                      </div>

                      <button
                        onClick={nextSlide}
                        onMouseDown={(e) => e.preventDefault()}
                        className="w-10 h-10 flex items-center justify-center bg-primary text-text-light hover:bg-primary-dark active:scale-95 transition-all duration-200 sharp"
                        aria-label="Étude de cas suivante"
                      >
                        <FaChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left: KPIs */}
                <div className="p-8 md:p-12">
                  <div className="mb-10">
                    <div className="flex items-center mb-8">
                      <div className="w-8 h-1 bg-primary mr-4"></div>
                      <h4 className="text-text-light text-xl font-bold">
                        Indicateurs clés de performance
                      </h4>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      {caseStudies[currentIndex].kpis.map((kpi, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative group"
                        >
                          {/* Color accent line */}
                          <div
                            className={`absolute top-0 left-0 w-1 h-full ${kpi.color}`}
                          ></div>

                          <div className="ml-3 p-5 bg-dark-blue/50 hover:bg-dark-blue transition-all duration-300">
                            <div className="flex items-start space-x-4">
                              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-card-bg text-primary group-hover:scale-110 transition-transform duration-300">
                                {kpi.icon}
                              </div>
                              <div className="flex-1">
                                <div className="text-text-secondary text-xs uppercase tracking-wider font-semibold mb-1">
                                  {kpi.label}
                                </div>
                                <div className="text-2xl font-bold text-text-light mb-1">
                                  {kpi.value}
                                </div>
                                <div className="text-text-secondary text-sm">
                                  {kpi.metric}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="pt-8">
                    <div className="flex items-center mb-6">
                      <div className="w-6 h-1 bg-primary/50 mr-3"></div>
                      <div className="text-text-light text-lg font-bold">
                        Spécifications du projet
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {caseStudies[currentIndex].additionalMetrics.map(
                        (metric, idx) => (
                          <div
                            key={idx}
                            className="text-center p-4 bg-dark-blue"
                          >
                            <div className="text-primary mb-2 flex justify-center">
                              {metric.icon}
                            </div>
                            <div className="text-text-light font-bold text-sm mb-1">
                              {metric.value}
                            </div>
                            <div className="text-text-secondary text-xs">
                              {metric.label}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Visual & Impact */}
                <div className="relative min-h-[400px] lg:min-h-[500px] bg-gradient-to-br from-dark-blue to-black">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{
                      backgroundImage: `url(${caseStudies[currentIndex].image})`,
                    }}
                  />

                  {/* Impact Summary */}
                  <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
                    <div className="bg-primary/90 p-8 max-w-md">
                      <div className="flex items-center mb-6">
                        <FaBolt className="w-5 h-5 text-primary-light mr-3" />
                        <h5 className="text-text-light text-xl font-bold">
                          Résumé de l'impact STIP
                        </h5>
                      </div>

                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-primary-light rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <div>
                            <div className="text-text-light font-semibold">
                              Efficacité de production améliorée
                            </div>
                            <div className="text-text-secondary text-sm">
                              Flux de travail optimisés et goulots
                              d'étranglement réduits
                            </div>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-primary-light rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <div>
                            <div className="text-text-light font-semibold">
                              Sécurité opérationnelle améliorée
                            </div>
                            <div className="text-text-secondary text-sm">
                              Zéro incident grâce à des protocoles avancés
                            </div>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-primary-light rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <div>
                            <div className="text-text-light font-semibold">
                              Accélération du calendrier de retour sur
                              investissement
                            </div>
                            <div className="text-text-secondary text-sm">
                              Périodes de récupération plus rapides que la
                              moyenne du secteur
                            </div>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-primary-light rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <div>
                            <div className="text-text-light font-semibold">
                              Solutions de main-d'œuvre évolutives
                            </div>
                            <div className="text-text-secondary text-sm">
                              Déploiement flexible de techniciens certifiés
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Company Performance Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 pt-20"
        >
          <div className="text-center mb-12">
            <h4 className="text-text-light text-2xl font-bold mb-4">
              Performance <span className="text-primary">cumulée</span>
            </h4>
            <p className="text-text-secondary max-w-3xl mx-auto">
              Résultats de pointe sur l'ensemble des interventions client
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                number: '200+',
                label: 'Projets industriels',
                subtext: 'Terminés dans les délais',
              },
              {
                number: '99.4%',
                label: 'Satisfaction client',
                subtext: 'Note moyenne',
              },
              {
                number: '1,200+',
                label: 'Techniciens experts',
                subtext: "Main-d'œuvre certifiée",
              },
              {
                number: '$450M+',
                label: 'Économies client',
                subtext: 'Valeur totale livrée',
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-8 bg-card-bg hover:bg-primary/10 transition-colors duration-300 group"
              >
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-3 group-hover:scale-105 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-text-light font-bold text-lg mb-2">
                  {stat.label}
                </div>
                <div className="text-text-secondary text-sm">
                  {stat.subtext}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudies;
