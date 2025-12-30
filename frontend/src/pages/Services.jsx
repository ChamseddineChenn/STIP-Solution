import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { assets } from '../assets/assets';
import CTAButton from '../components/CTAButton';

const Services = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const servicesData = [
    {
      id: 1,
      title: 'Custom Manufacturing & Repair',
      shortDesc:
        'Precision manufacturing and repair solutions for industrial equipment',
      image: assets.industrial_workers_image,
      path: '/services/custom-manufacturing',
    },
    {
      id: 2,
      title: 'Engineering & 3D Scanning',
      shortDesc: 'Advanced digital engineering and 3D scanning services',
      image: assets.laser_welding_machine,
      path: '/services/engineering-3d-scanning',
    },
    {
      id: 3,
      title: 'Welding & Assembly',
      shortDesc:
        'Professional welding and assembly services for structural components',
      image: assets.welding_image,
      path: '/services/welding-assembly',
    },
    {
      id: 4,
      title: 'Industrial Cleaning',
      shortDesc: 'Comprehensive industrial cleaning and degreasing services',
      image: assets.Industrial_Maintenance_Image,
      path: '/services/industrial-cleaning',
    },
    {
      id: 5,
      title: 'Industrial Maintenance',
      shortDesc: '24/7 maintenance services to minimize operational downtime',
      image: assets.industrial_workers_image,
      path: '/services/industrial-maintenance',
    },
    {
      id: 6,
      title: 'Painting & Sandblasting',
      shortDesc:
        'Professional surface preparation and industrial coating services',
      image: assets.welding_image,
      path: '/services/painting-sandblasting',
    },
    {
      id: 7,
      title: 'Mobile Welding',
      shortDesc:
        'On-site mobile welding services for emergency and remote locations',
      image: assets.laser_welding_machine,
      path: '/services/mobile-welding',
    },
    {
      id: 8,
      title: 'Labor Rental',
      shortDesc: 'Skilled industrial labor for short or long-term projects',
      image: assets.Industrial_Maintenance_Image,
      path: '/services/labor-rental',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.15, ease: 'linear' },
    },
    hover: {
      y: -8,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section ref={sectionRef} className="section-white py-20 md:py-28 sharp">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ ease: 'linear', duration: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Comprehensive industrial solutions tailored to meet your unique
            needs. From custom manufacturing to emergency repairs, we deliver
            excellence across every service.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {servicesData.map((service) => (
            <Link key={service.id} to={service.path}>
              <motion.div
                variants={cardVariants}
                whileHover={{
                  y: -12,
                  boxShadow: '0 30px 60px rgba(174, 143, 98, 0.25)',
                }}
                className="group cursor-pointer h-full"
              >
                <div className="relative h-80 rounded-xl overflow-hidden sharp bg-white transition-all duration-300 h-full flex flex-col justify-between">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black opacity-50" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
                  </div>

                  {/* Content */}
                  <div className="relative p-6 flex flex-col justify-end h-full">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4">
                      {service.shortDesc}
                    </p>
                    <div className="flex items-center gap-2 text-accent text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                      Learn More
                      <FiArrowRight />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ ease: 'linear', duration: 0.4, delay: 0.2 }}
          className="mt-20 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to Partner With STIP?
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Whether you need emergency repairs or long-term industrial
            solutions, we are your trusted partner across Quebec and New
            Brunswick.
          </p>
          <Link to="/contact">
            <CTAButton text="Get in Touch" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
