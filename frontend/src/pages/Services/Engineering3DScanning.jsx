import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FiChevronLeft,
  FiArrowRight,
  FiBox,
  FiLayers,
  FiSearch,
  FiShield,
} from 'react-icons/fi';
import { assets } from '../../assets/assets';
import CTAButton from '../../components/CTAButton';

const Engineering3DScanning = () => {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState('modelisation');

  const tabs = [
    {
      id: 'modelisation',
      label: 'Modélisation 3D',
      icon: FiBox,
      description:
        'Avec un logiciel de conception, vous pouvez concevoir en trois dimensions et à taille réelle, que ce soit pour une seule pièce ou pour plusieurs exemplaires.',
    },
    {
      id: 'nuage',
      label: 'Nuage de points',
      icon: FiLayers,
      description:
        "Traitement de nuages ​​de points : Modélisation d'équipements existants à partir de nuages ​​de points (scan 3D)",
    },
    {
      id: 'scan',
      label: 'Scan 3D',
      icon: FiSearch,
      description:
        'Service de numérisation aux dimensions réelles. Précision de relevé très avancée grâce à la technologie innovante de numérisation 3D.',
    },
    {
      id: 'securite',
      label: 'Sécurité de machine',
      icon: FiShield,
      description:
        'Sécurisation de machines et de convoyeurs selon les normes de la CNESST, expertise dans ce domaine tout en tenant compte des zones dangereuses et des phénomènes à risques.',
    },
  ];

  const relatedServices = [
    {
      id: 1,
      title: 'Fabrication sur mesure et Réparation',
      path: '/services/custom-manufacturing',
    },
    {
      id: 3,
      title: 'Soudage et Assemblage',
      path: '/services/welding-assembly',
    },
    { id: 7, title: 'Soudage Mobile', path: '/services/mobile-welding' },
  ];

  return (
    <div className="min-h-screen section-white sharp">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0">
          <img
            src={assets.Engineering_3D_Image}
            alt="Engineering 3D Scanning"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-60" />
        </div>

        <div className="relative container mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors mb-8"
          >
            <FiChevronLeft />
            Retour à l'accueil
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: 'linear', duration: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="h-1 bg-accent"
              />
              <span className="text-accent font-semibold">STIP Solution</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Scan et Ingénierie
            </h1>
            <p className="text-xl text-white max-w-4xl leading-relaxed font-semibold mb-4">
              Solide expertise en ingénierie mécanique et modélisation 3D.
            </p>
            <p className="text-lg text-white max-w-4xl leading-relaxed opacity-95">
              Grâce à notre expertise en ingénierie et à l'utilisation de
              logiciels tels qu'Autodesk Inventor, Solidworks et AutoCAD, ainsi
              que de scanners à la fine pointe de la technologie tels que les
              scanners Faro S70 et Creaform, nous sommes en mesure de réaliser
              des inspections précises, des conceptions détaillées, des dessins
              de fabrication et des mesures précises pour répondre à vos besoins
              les plus complexes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section ref={sectionRef} className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Intro Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ease: 'linear', duration: 0.6 }}
                className="mb-12 pl-6 border-l-4 border-accent"
              >
                <h2 className="text-3xl font-bold text-accent mb-6">
                  Nous scannons pratiquement tout !
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Offrez des services rapides, précis et personnalisés grâce à
                  la technologie de contrôle 3D portable, sans besoin de
                  contact.
                </p>
              </motion.div>

              {/* Tabbed Interface */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: 'linear', duration: 0.6, delay: 0.1 }}
                className="mb-12 bg-white rounded-lg shadow-lg overflow-hidden"
              >
                {/* Tab Navigation */}
                <div className="flex flex-wrap border-b border-gray-200 bg-gray-50">
                  {tabs.map((tab, idx) => {
                    const TabIcon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 px-4 py-4 md:px-6 md:py-5 font-medium text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-2 border-b-2 ${
                          isActive
                            ? 'border-accent text-accent bg-white'
                            : 'border-transparent text-gray-600 hover:text-accent'
                        }`}
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0 }}
                      >
                        <TabIcon size={20} />
                        <span>{tab.label}</span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Tab Content */}
                <div className="p-8 md:p-10">
                  {tabs.map((tab) => {
                    const TabIcon = tab.icon;
                    return (
                      <motion.div
                        key={tab.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={
                          activeTab === tab.id
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 10 }
                        }
                        transition={{ duration: 0.3 }}
                        className={activeTab === tab.id ? 'block' : 'hidden'}
                      >
                        <div className="flex items-start gap-6">
                          <div className="hidden md:flex">
                            <div className="text-5xl text-accent/30">
                              <TabIcon size={64} />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-accent mb-4">
                              {tab.label}
                            </h3>
                            <p className="text-gray-700 leading-relaxed text-lg">
                              {tab.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: 'linear', duration: 0.15, delay: 0 }}
                className="mb-12"
              >
                <h3 className="text-2xl font-bold text-accent mb-6">
                  Nos Capacités Techniques
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Scan Laser Faro S70',
                    'Scan Creaform',
                    'Autodesk Inventor',
                    'Solidworks',
                    'AutoCAD',
                    'Modélisation 3D Haute Précision',
                  ].map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08, duration: 0.4 }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: 'rgba(174, 143, 98, 0.1)',
                        borderLeftColor: '#ae8f62',
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="group flex items-center gap-3 p-4 transition-all duration-100 cursor-pointer border-l-2 border-transparent"
                    >
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span className="text-gray-700 group-hover:text-accent transition-colors font-medium">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: 'linear', duration: 0.15, delay: 0.1 }}
              >
                <Link to="/contact" className="inline-flex items-center gap-2">
                  <CTAButton text="Demander une numérisation" />
                </Link>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: 'linear', duration: 0.6 }}
                className="sticky top-24"
              >
                <div className="bg-white shadow-lg p-8 border-t-4 border-accent">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-0.5 w-8 bg-accent" />
                    <h3 className="text-xl font-bold text-gray-900">
                      Services connexes
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {relatedServices.map((service, idx) => (
                      <Link key={service.id} to={service.path}>
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1, duration: 0.4 }}
                          whileHover={{
                            x: 8,
                            backgroundColor: 'rgba(174, 143, 98, 0.15)',
                            borderLeftColor: '#ae8f62',
                          }}
                          whileTap={{ scale: 0.98 }}
                          className="p-4 transition-all duration-100 cursor-pointer group border-l-2 border-transparent"
                        >
                          <p className="text-gray-700 group-hover:text-accent font-medium transition-colors flex items-center justify-between">
                            {service.title}
                            <motion.span
                              initial={{ x: -4, opacity: 0 }}
                              whileHover={{ x: 4, opacity: 1 }}
                              transition={{ ease: 'linear', duration: 0.2 }}
                              className="text-accent"
                            >
                              <FiArrowRight />
                            </motion.span>
                          </p>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mt-8 bg-gradient-to-br from-white to-amber-50 shadow-lg p-8 border-t-4 border-accent">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-0.5 w-8 bg-accent" />
                    <h4 className="text-lg font-bold text-gray-900">
                      Besoin de précision ?
                    </h4>
                  </div>
                  <p className="text-gray-700 text-sm mb-6">
                    Contactez notre équipe d'ingénierie pour discuter de vos
                    besoins en numérisation 3D.
                  </p>
                  <Link to="/contact">
                    <CTAButton text="Nous contacter" variant="full-width" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Engineering3DScanning;
