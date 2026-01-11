import React from 'react';
import { createPortal } from 'react-dom';
import { FiX, FiMapPin, FiBriefcase, FiClock, FiDollarSign } from 'react-icons/fi';

const JobPreview = ({ job, onClose }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const renderContentBlock = (block, index) => {
    switch (block.type) {
      case 'title':
        return (
          <h2
            key={index}
            className="text-2xl md:text-3xl font-bold mt-12 mb-6 pt-8 border-t-2 border-primary break-words overflow-hidden"
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

  const modalContent = (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          maxWidth: '56rem',
          width: '100%',
          maxHeight: '95vh',
          overflowY: 'auto',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            padding: '0.5rem',
            backgroundColor: 'white',
            borderRadius: '9999px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            zIndex: 50,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <FiX style={{ width: '1.5rem', height: '1.5rem', color: '#4b5563' }} />
        </button>

        {/* Hero Section */}
        <section className="relative w-full bg-dark-blue px-4 md:px-8 pt-16 pb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight break-words">
              {job.title}
            </h1>

            {/* Job meta */}
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

            {/* Department badge */}
            <span className="inline-block px-4 py-2 bg-primary text-white text-sm font-semibold rounded-full">
              {job.department}
            </span>

            {/* Salary if available */}
            {job.salaryRange?.min && (
              <div className="mt-4 flex items-center gap-2 text-gray-200">
                <FiDollarSign className="w-5 h-5" />
                <span>
                  {job.salaryRange.min.toLocaleString()} - {job.salaryRange.max?.toLocaleString() || '+'} {job.salaryRange.currency}/{job.salaryRange.period}
                </span>
              </div>
            )}

            <div className="mt-4 text-gray-300 text-sm">
              Publié le {formatDate(job.createdAt || new Date())}
            </div>
          </div>
        </section>

        {/* Short Description */}
        {job.shortDescription && (
          <section className="px-4 md:px-8 py-8 bg-gray-50 border-b border-gray-200">
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed">
                {job.shortDescription}
              </p>
            </div>
          </section>
        )}

        {/* Content Section */}
        <section className="w-full py-12 md:py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <article className="max-w-none">
              <div className="text-gray-700 leading-relaxed space-y-8 overflow-hidden">
                {job.contentBlocks
                  ?.sort((a, b) => a.order - b.order)
                  .map(renderContentBlock)}
              </div>
            </article>
          </div>
        </section>

        {/* Apply CTA */}
        <section className="px-4 md:px-8 py-8 bg-primary/10 border-t border-primary/20">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Intéressé par ce poste?
            </h3>
            <p className="text-gray-600 mb-4">
              Cette section contiendra le formulaire de candidature sur le site public.
            </p>
          </div>
        </section>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default JobPreview;
