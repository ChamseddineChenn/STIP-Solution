import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FiChevronRight, FiArrowRight } from 'react-icons/fi';
import {
  HiOutlineSparkles,
  HiOutlineWrench,
  HiOutlineRocketLaunch,
} from 'react-icons/hi2';

const About = () => {
  const [activeValue, setActiveValue] = useState(0);

  // Story sections
  const storySections = [
    {
      title: 'Précision industrielle, solutions sur mesure',
      content:
        "Depuis plus de dix ans, STIP Solution fournit des services complets de soudage, d'assemblage et d'interventions industrielles. Nous concevons des solutions de sous-traitance qui optimisent vos opérations — gagnant du temps et réduisant les coûts tout en maintenant les normes les plus élevées de qualité et de sécurité.",
      accent: "Efficacité d'ingénierie par le partenariat.",
    },
    {
      title: 'Une équipe de spécialistes certifiés',
      content:
        'Notre équipe gère des cycles de projet complets : de la conception et fabrication au soudage, préparation de surface, revêtements spécialisés et installation finale. Nous nous adaptons à vos spécifications exactes, garantissant une intégration transparente et une exécution sans faille des exigences industrielles complexes.',
      accent: "Là où l'expertise rencontre l'exécution.",
    },
    {
      title: "Partenaires stratégiques en main-d'œuvre et planification",
      content:
        "Nous fournissons du personnel qualifié et assistons à la planification des arrêts de production critiques dans divers secteurs industriels. Nos professionnels sont préparés pour répondre à vos normes spécifiques grâce à une formation personnalisée, devenant une extension de votre équipe plutôt qu'un simple prestataire de services.",
      content2:
        "Nous construisons des partenariats durables axés sur l'atteinte de vos objectifs opérationnels avec précision et fiabilité.",
      accent: "Plus qu'un service — un partenariat stratégique.",
    },
  ];

  // Values
  const values = [
    {
      letter: 'F',
      word: 'Fun',
      desc: 'Favoriser un environnement positif qui stimule la créativité et la productivité.',
    },
    {
      letter: 'O',
      word: 'Ouverture',
      desc: 'Adopter de nouvelles idées, méthodes et approches collaboratives.',
    },
    {
      letter: 'R',
      word: 'Respect',
      desc: "Valoriser les clients, les membres de l'équipe, la sécurité et chaque projet que nous entreprenons.",
    },
    {
      letter: 'C',
      word: 'Communication',
      desc: 'Maintenir la clarté et la transparence à chaque phase du projet.',
    },
    {
      letter: 'E',
      word: 'Excellence',
      desc: "Poursuivre les normes les plus élevées dans l'exécution technique et les partenariats.",
    },
  ];

  const timeline = [
    {
      year: '2010',
      title: 'Fondation',
      description: 'Création axée sur le soudage industriel et la fabrication.',
    },
    {
      year: '2014',
      title: 'Certification qualité',
      description:
        "Obtention de certifications industrielles et élargissement du champ d'intervention.",
    },
    {
      year: '2017',
      title: 'Croissance stratégique',
      description:
        'Devenu partenaire de confiance pour la planification des arrêts industriels majeurs.',
    },
    {
      year: '2022',
      title: 'Reconnaissance sectorielle',
      description:
        "Reconnu pour l'excellence dans plusieurs secteurs industriels.",
    },
    {
      year: 'Présent',
      title: 'Solutions intégrées',
      description:
        "Fournir des solutions complètes en matière de main-d'œuvre et techniques.",
    },
  ];

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
                className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tighter leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Solutions industrielles de précision
                <motion.span
                  className="block text-primary mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Depuis 2010
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-text-secondary max-w-3xl leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Nous combinons expertise technique et partenariat stratégique
                pour fournir des services industriels fiables qui améliorent
                l'efficacité opérationnelle et la réussite des projets à travers
                le Canada.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-10"
              >
                <motion.a
                  href="#story"
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center text-primary hover:text-primary-light transition-colors"
                >
                  Découvrez notre histoire
                  <FiArrowRight className="ml-3" />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-widest mb-2 text-gray-300">
              Faites défiler pour découvrir
            </span>
            <motion.div
              className="w-px h-12 bg-linear-to-b from-primary to-transparent"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Introduction Section - Comprehensive Overview */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Animated background accent */}
        <motion.div
          className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Main Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <motion.div
                className="h-1 w-20 bg-primary-light mb-8"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
              <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tighter mb-8">
                STIP Solution : Partenaire de Performance
                <br />
                pour vos Infrastructures Industrielles
              </h2>
              <motion.div
                className="h-1 w-16 bg-primary-light mb-8 origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                STIP Solution Travaux Industriels Pro Inc. est bien plus qu'un
                prestataire de services : nous sommes l'extension stratégique de
                votre chaîne de production. De la conception initiale à
                l'installation finale, nous déployons des solutions d'ingénierie
                et de main-d'œuvre conçues pour maximiser votre productivité et
                minimiser vos coûts d'exploitation.
              </p>
            </motion.div>

            {/* Core Competencies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-20"
            >
              <h3 className="text-3xl font-bold text-primary mb-8">
                Une Expertise de Fabrication et d'Installation de Pointe
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-12">
                Nous maîtrisons l'ensemble de la chaîne de valeur mécanique et
                structurelle. En centralisant vos besoins chez STIP Solution,
                vous simplifiez la gestion de vos projets et accélérez vos
                délais d'exécution.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Ingénierie & Modélisation 3D',
                    description:
                      "Utilisation de scanners laser et de logiciels de pointe pour des conceptions d'une précision absolue.",
                    bgColor: 'from-primary to-primary-light',
                    IconComponent: HiOutlineSparkles,
                  },
                  {
                    title: 'Fabrication & Soudage',
                    description:
                      "Assemblage de pièces complexes et d'équipements industriels sur mesure selon vos plans et devis.",
                    bgColor: 'from-primary-light to-blue-400',
                    IconComponent: HiOutlineWrench,
                  },
                  {
                    title: 'Installation & Chantier',
                    description:
                      "Montage sécuritaire et mise en service d'équipements lourds directement sur vos sites d'exploitation.",
                    bgColor: 'from-primary-light to-primary',
                    IconComponent: HiOutlineRocketLaunch,
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 }}
                    whileHover={{
                      y: -10,
                      boxShadow: '0 20px 40px rgba(16, 67, 119, 0.2)',
                    }}
                    className={`bg-gradient-to-br ${item.bgColor} p-8 rounded-lg text-white overflow-hidden relative group cursor-pointer`}
                  >
                    {/* Animated background */}
                    <motion.div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Animated top accent line */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-1 bg-primary-light"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 + 0.3, duration: 0.6 }}
                      style={{ originX: 0 }}
                    />

                    {/* Background SVG Icon */}
                    <motion.div
                      className="absolute top-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 6, repeat: Infinity }}
                    >
                      <item.IconComponent className="w-32 h-32 text-white" />
                    </motion.div>

                    <div className="relative z-10">
                      <motion.div
                        className="inline-block mb-6 p-4 bg-white/10 rounded-lg"
                        whileHover={{
                          scale: 1.15,
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <item.IconComponent className="w-8 h-8 text-white" />
                      </motion.div>
                      <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                      <p className="leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Shutdowns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-20 bg-gradient-to-r from-primary/10 to-primary-light/10 border-l-4 border-primary-light p-12 rounded-r-lg"
            >
              <h3 className="text-3xl font-bold text-primary mb-8">
                Optimisation des Arrêts de Production (Shutdowns)
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-12">
                Nous excellons dans la gestion des périodes critiques. Notre
                approche proactive de la planification permet de réduire
                significativement la durée des arrêts de production dans les
                secteurs les plus exigeants :
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  'Alumineries et Mines',
                  'Papeteries et Cimenteries',
                  'Usines de transformation lourde',
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 }}
                    whileHover={{ x: 10 }}
                    className="flex items-center group cursor-pointer"
                  >
                    <motion.div
                      className="w-3 h-3 bg-primary-light rounded-full mr-4 flex-shrink-0 group-hover:w-6 group-hover:h-6 transition-all duration-300"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: idx * 0.3,
                      }}
                    />
                    <span className="text-gray-700 font-medium group-hover:text-primary-light transition-colors duration-300">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Staffing Solutions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mb-20"
            >
              <h3 className="text-3xl font-bold text-primary mb-8">
                Nos Solutions de Dotation : Votre Talent à la Demande
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-12">
                Ne laissez plus la pénurie de main-d'œuvre freiner votre
                croissance. Nous fournissons du personnel professionnel et
                polyvalent, capable de s'intégrer instantanément à vos
                opérations, partout au Canada.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: 'Flexibilité Opérationnelle',
                    description:
                      'Location de personnel qualifié pour des mandats de courte ou longue durée.',
                    accentColor: 'border-primary-light',
                  },
                  {
                    title: 'Expertise Technique',
                    description:
                      'Des spécialistes formés aux dernières normes de soudage et de mécanique industrielle fixe ou mobile.',
                    accentColor: 'border-primary-light',
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 }}
                    whileHover={{
                      borderLeftWidth: '8px',
                      boxShadow: '0 10px 30px rgba(16, 67, 119, 0.15)',
                    }}
                    className={`border-l-4 ${item.accentColor} pl-6 py-6 px-8 bg-white hover:bg-gray-50 transition-all duration-300 rounded-r-lg`}
                  >
                    <motion.h4
                      className="text-xl font-bold text-primary mb-3"
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {item.title}
                    </motion.h4>
                    <p className="text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Closing CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-primary via-primary-light to-primary-light p-0 rounded-lg overflow-hidden"
            >
              <motion.div
                className="bg-white m-1 p-12 rounded-[7px] text-center relative overflow-hidden"
                whileHover={{
                  boxShadow: '0 20px 60px rgba(16, 67, 119, 0.2)',
                }}
              >
                {/* Animated background elements */}
                <motion.div
                  className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full"
                  animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full"
                  animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                />

                <div className="relative z-10">
                  <motion.h3
                    className="text-2xl md:text-3xl font-bold text-primary mb-4"
                    initial={{ letterSpacing: '0em' }}
                    whileInView={{ letterSpacing: '0.05em' }}
                    viewport={{ once: true }}
                  >
                    Prêt à propulser votre entreprise vers de nouveaux sommets ?
                  </motion.h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Chez STIP Solution, votre réussite est notre seule mesure de
                    performance. Devenez l'un de nos partenaires privilégiés et
                    bénéficiez d'une expertise qui dépasse les standards de
                    l'industrie.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section - Sharp Design */}
      <section id="story" className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <motion.div
                className="h-1 w-20 bg-primary mb-8"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tighter">
                Notre histoire
              </h2>
            </motion.div>

            {/* Story Cards */}
            <div className="space-y-8">
              {storySections.map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="group relative"
                >
                  {/* Left accent bar */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: idx * 0.15 }}
                  />

                  <div className="bg-white border border-gray-300 hover:border-primary transition-colors duration-300 p-8 md:p-10 ml-8 relative overflow-hidden">
                    {/* Subtle background animation */}
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />

                    <div className="relative z-10">
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 group-hover:text-primary transition-colors duration-300">
                        {section.title}
                      </h3>

                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed text-lg">
                          {section.content}
                        </p>
                        {section.content2 && (
                          <p className="text-gray-700 leading-relaxed text-lg">
                            {section.content2}
                          </p>
                        )}
                      </div>

                      <motion.div
                        className="mt-8 pt-6 border-t border-gray-300"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                      >
                        <p className="text-primary font-bold text-lg">
                          "{section.accent}"
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Interactive */}
      <section className="py-32 bg-dark-blue relative overflow-hidden">
        {/* Background accent */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage: `linear-gradient(90deg, transparent 49%, rgba(255, 255, 255, 0.1) 50%, transparent 51%)`,
            backgroundSize: '80px 80px',
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <motion.div
                className="h-1 w-20 bg-primary mx-auto mb-8"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tighter">
                Nos principes directeurs
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                F.O.R.C.E. — Les valeurs qui définissent notre approche pour
                chaque projet et partenariat
              </p>
            </motion.div>

            {/* Values Grid - Interactive */}
            <div className="grid md:grid-cols-5 gap-6">
              {values.map((value, idx) => (
                <motion.div
                  key={value.letter}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  onMouseEnter={() => setActiveValue(idx)}
                  onClick={() => setActiveValue(idx)}
                  className="cursor-pointer group"
                >
                  <motion.div
                    className="bg-card-bg border border-primary/30 hover:border-primary transition-all duration-300 p-8 h-full flex flex-col relative overflow-hidden"
                    whileHover={{
                      borderColor: '#3b82f6',
                      boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
                    }}
                  >
                    {/* Animated top accent */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-primary-light to-transparent"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="relative z-10">
                      <motion.div
                        className="text-6xl font-bold text-primary mb-4"
                        animate={
                          activeValue === idx ? { scale: [1, 1.15, 1] } : {}
                        }
                        transition={{ duration: 0.5 }}
                      >
                        {value.letter}
                      </motion.div>

                      <h3 className="text-lg font-bold text-text-light mb-3 uppercase tracking-wider group-hover:text-primary transition-colors duration-300">
                        {value.word}
                      </h3>

                      <p className="text-text-secondary text-sm leading-relaxed">
                        {value.desc}
                      </p>

                      {/* Animated line */}
                      <motion.div
                        className="h-px bg-primary/50 mt-6 group-hover:bg-primary"
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section - Cinematic */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <motion.div
                className="h-1 w-20 bg-primary mx-auto mb-8"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tighter">
                Notre évolution
              </h2>
              <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                Bâtir la confiance par des livraisons constantes et l'excellence
              </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Central timeline line with gradient */}
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-linear-to-b from-primary via-primary/50 to-primary"
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
              />

              <div className="space-y-20">
                {timeline.map((item, idx) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className={`relative flex ${
                      idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    } items-center`}
                  >
                    {/* Content card */}
                    <div
                      className={`w-5/12 ${
                        idx % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'
                      }`}
                    >
                      <motion.div
                        className="bg-white border border-gray-300 hover:border-primary transition-all duration-300 p-8 relative group overflow-hidden"
                        whileHover={{
                          boxShadow: '0 10px 40px -10px rgba(16, 67, 119, 0.2)',
                        }}
                      >
                        {/* Animated background */}
                        <motion.div
                          className="absolute inset-0 bg-linear-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6 }}
                        />

                        <div className="relative z-10">
                          <p className="text-primary font-bold text-2xl mb-3">
                            {item.year}
                          </p>
                          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                            {item.title}
                          </h3>
                          <p className="text-gray-700 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Center dot */}
                    <div className="w-2/12 flex justify-center">
                      <motion.div
                        className="relative"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: idx * 0.2,
                        }}
                      >
                        <motion.div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
                        <motion.div className="absolute inset-0 w-4 h-4 border-2 border-primary rounded-full" />
                      </motion.div>
                    </div>

                    <div className="w-5/12" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Industrial */}
      <section className="py-32 bg-dark-blue relative overflow-hidden">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage: `linear-gradient(45deg, transparent 48%, rgba(255, 255, 255, 0.1) 49%, rgba(255, 255, 255, 0.1) 51%, transparent 52%)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="h-1 w-20 bg-primary mx-auto mb-8"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tighter">
                Collaborez avec précision
              </h2>

              <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                Parlons de la manière dont notre expertise spécialisée peut
                améliorer vos opérations grâce à une main-d'œuvre fiable, une
                planification stratégique et des services industriels certifiés.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05, x: 4 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-10 py-4 bg-primary hover:bg-primary-light text-white font-bold tracking-wide transition-all duration-300 shadow-[0_8px_24px_rgba(59,130,246,0.3)] hover:shadow-[0_12px_40px_rgba(59,130,246,0.4)]"
                >
                  Entamer la conversation
                  <FiChevronRight className="ml-3 w-5 h-5" />
                </motion.a>

                <motion.a
                  href="/services"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-10 py-4 bg-white/10 border border-primary hover:bg-primary/20 text-white font-bold tracking-wide transition-all duration-300"
                >
                  Voir nos services
                  <FiArrowRight className="ml-3 w-5 h-5" />
                </motion.a>
              </div>

              <motion.div
                className="mt-16 pt-8 border-t border-primary/30"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-text-secondary text-sm">
                  Nous fournissons des formations et des solutions sur mesure
                  pour répondre à vos exigences industrielles spécifiques
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
