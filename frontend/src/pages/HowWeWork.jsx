import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FiPlus,
  FiChevronRight,
  FiClipboard,
  FiCalendar,
  FiUsers,
} from 'react-icons/fi';
import { assets } from '../assets/assets';

const HowWeWork = () => {
  const navigate = useNavigate();
  const steps = [
    {
      number: '01',
      title: 'Évaluation et planification',
      description:
        "Nous commençons par une évaluation complète du site et la collecte des exigences afin d'élaborer un plan de projet détaillé avec protocoles de sécurité.",
      features: [
        'Évaluation du site',
        'Analyse des exigences',
        'Planification de la sécurité',
        'Calendrier du projet',
      ],
      image: assets.Work_Etape_1_Image,
    },
    {
      number: '02',
      title: 'Fabrication et exécution',
      description:
        "Nos professionnels certifiés réalisent des opérations de soudage de précision, d'usinage et des interventions industrielles avec des équipements de pointe.",
      features: [
        'Soudage de précision',
        "Opérations d'usinage",
        'Technologie Industrie 4.0',
        'Déploiement qualifié',
      ],
      image: assets.Work_Etape_2_Image,
    },
    {
      number: '03',
      title: 'Assurance qualité',
      description:
        "Chaque projet fait l'objet d'inspections et d'essais rigoureux avant la livraison sur site, accompagnés d'une documentation complète.",
      features: [
        'Inspection qualité',
        "Protocoles d'essai",
        'Livraison sur site',
        'Documentation complète',
      ],
      image: assets.Work_Etape_3_Image,
    },
  ];

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 pt-20">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Notre façon de travailler
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Une approche structurée en trois étapes qui garantit précision,
            sécurité et qualité à chaque phase
          </p>
        </div>

        {/* Steps - 2x3 Alternating Layout */}
        <div className="space-y-8 md:space-y-0">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`group relative cursor-pointer ${
                index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
              } flex flex-col md:flex-row gap-0 md:gap-0`}
            >
              {/* Hover Background - Full width dark blue */}
              <div className="absolute inset-0 bg-white group-hover:bg-gray-900 transition-all duration-500 ease-in-out -mx-4 px-4 md:mx-0 md:px-0" />

              {/* Image Column */}
              <div className="w-full md:w-1/2 h-72 md:h-96 relative overflow-hidden z-10 p-6 md:p-12">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-500"
                />

                {/* Step Number on Image */}
                <div className="absolute top-6 left-6 w-16 h-16 bg-dark-blue text-accent group-hover:bg-[#12a6e0] group-hover:text-white flex items-center justify-center text-2xl font-bold transition-colors duration-500">
                  {step.number}
                </div>
              </div>

              {/* Content Column */}
              <div className="w-full md:w-1/2 z-10 p-8 md:p-12">
                <div className="mb-6">
                  <div className="text-sm font-semibold tracking-wider text-[#12a6e0] group-hover:text-[#12a6e0] uppercase mb-2 transition-colors duration-500">
                    Étape {step.number}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-white mb-4 transition-colors duration-500">
                    {step.title}
                  </h3>
                </div>

                <p className="text-gray-600 group-hover:text-gray-300 mb-8 leading-relaxed transition-colors duration-500">
                  {step.description}
                </p>

                {/* Features with Plus Icons */}
                <div className="space-y-4 mb-8">
                  {step.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-6 h-6 flex items-center justify-center mr-4">
                        <FiPlus className="w-5 h-5 text-gray-900 group-hover:text-white transition-colors duration-500" />
                      </div>
                      <span className="text-gray-900 group-hover:text-white font-medium transition-colors duration-500">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative mt-28 pt-16 pb-20 overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 bg-linear-to-br from-gray-50 via-white to-gray-100 border-t border-b border-gray-200" />

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px),
                               linear-gradient(to bottom, #000 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          {/* Decorative Corner Elements */}
          <div className="absolute top-0 left-0 w-32 h-32">
            <div className="absolute top-0 left-0 w-16 h-1 bg-primary" />
            <div className="absolute top-0 left-0 w-1 h-16 bg-primary" />
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32">
            <div className="absolute bottom-0 right-0 w-16 h-1 bg-primary" />
            <div className="absolute bottom-0 right-0 w-1 h-16 bg-primary" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Démarrez votre projet avec nous
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Obtenez une évaluation détaillée du projet et un calendrier de
                nos experts
              </p>
            </div>

            {/* Stats/Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 flex items-center justify-center mr-4">
                    <FiClipboard className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">
                      Évaluation détaillée
                    </div>
                    <div className="text-sm text-gray-600">
                      Analyse complète du projet
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 flex items-center justify-center mr-4">
                    <FiCalendar className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">
                      Calendrier clair
                    </div>
                    <div className="text-sm text-gray-600">
                      Planning réaliste du projet
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 flex items-center justify-center mr-4">
                    <FiUsers className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">
                      Équipe d'experts
                    </div>
                    <div className="text-sm text-gray-600">
                      Professionnels certifiés
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/contact')}
                className="group relative bg-primary text-white px-10 py-4 font-bold text-lg transition-all duration-300 hover:bg-primary-dark hover:scale-[1.02] min-w-[220px]"
              >
                <span className="relative z-10">
                  Demander une évaluation de projet
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-primary to-primary-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary group-hover:w-20 transition-all duration-300" />
              </button>

              {/* <button className="group relative border-2 border-primary text-primary px-10 py-4 font-bold text-lg transition-all duration-300 hover:bg-primary hover:text-white min-w-[220px]">
                <span className="relative z-10">Voir les études de cas</span>
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button> */}
            </div>

            {/* Additional Info */}
            <div className="text-center mt-8">
              <p className="text-sm text-gray-500">
                Délai de réponse moyen :{' '}
                <span className="font-semibold text-gray-700">
                  2 heures ouvrées
                </span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                La consultation est{' '}
                <span className="font-semibold text-primary">
                  gratuite et sans obligation
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowWeWork;
