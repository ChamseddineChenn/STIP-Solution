import React from 'react';
import { createPortal } from 'react-dom';
import { FiX, FiCalendar, FiUser } from 'react-icons/fi';

const BlogPreview = ({ blog, onClose }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getFirstImage = (contentBlocks) => {
    const imageBlock = contentBlocks?.find((block) => block.type === 'image');
    return imageBlock?.content || 'https://picsum.photos/1200/600?grayscale';
  };

  const renderContentBlock = (block, index) => {
    switch (block.type) {
      case 'title':
        return (
          <h2
            key={index}
            className="text-2xl md:text-3xl font-bold mt-12 mb-6 pt-8 border-t-2 border-primary break-normal w-full"
            style={{ color: block.color || '#1f2937' }}
          >
            {block.content}
          </h2>
        );
      case 'paragraph':
        return (
          <div
            key={index}
            className="text-sm md:text-base text-gray-700 leading-relaxed break-normal w-full"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        );
      case 'image':
        return (
          <figure key={index} className="my-8">
            <img
              src={block.content}
              alt="Blog image"
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
          <FiX
            style={{ width: '1.5rem', height: '1.5rem', color: '#4b5563' }}
          />
        </button>

        {/* Hero Section */}
        <section className="relative w-full bg-dark-blue">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${getFirstImage(blog.contentBlocks)})`,
            }}
          >
            <div className="absolute inset-0 bg-dark-blue/60" />
          </div>

          <div className="relative w-full max-w-full px-4 md:px-8 pt-32 pb-16">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight break-words">
                {blog.mainTitle}
              </h1>

              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-gray-200">
                <span className="inline-block px-4 py-2 bg-primary text-white text-sm font-semibold rounded-full w-fit">
                  {blog.category}
                </span>
                <div className="flex items-center">
                  <FiUser className="w-5 h-5 mr-2" />
                  <span className="text-sm md:text-base">
                    {blog.author || 'STIP Solutions'}
                  </span>
                </div>
                <div className="flex items-center">
                  <FiCalendar className="w-5 h-5 mr-2" />
                  <span className="text-sm md:text-base">
                    {formatDate(blog.createdAt || new Date())}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="w-full py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <article className="max-w-none">
              <div className="text-gray-700 leading-relaxed space-y-8 overflow-hidden">
                {blog.contentBlocks
                  ?.sort((a, b) => a.order - b.order)
                  .map(renderContentBlock)}
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default BlogPreview;
