import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { RiDeleteBinLine, RiDraggable } from 'react-icons/ri';

const BlogParagraph = ({ content, onChange, onDelete }) => {
  // Removed color, background, and align - they cause inline styles that break mobile layout
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean'],
    ],
  };

  // Only allow formats that don't add inline styles
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'link',
  ];

  // Aggressively sanitize content - strip ALL inline styles and problematic attributes
  const sanitizeContent = (html) => {
    if (!html) return '';

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Remove ALL style attributes, classes, and width/height from all elements
    const allElements = tempDiv.querySelectorAll('*');
    allElements.forEach((el) => {
      el.removeAttribute('style');
      el.removeAttribute('width');
      el.removeAttribute('height');
      // Remove Quill-specific classes that might cause layout issues
      const classes = Array.from(el.classList);
      classes.forEach((cls) => {
        if (cls.startsWith('ql-')) {
          el.classList.remove(cls);
        }
      });
    });

    return tempDiv.innerHTML;
  };

  const handleChange = (newContent) => {
    const sanitized = sanitizeContent(newContent);
    onChange(sanitized);
  };

  return (
    <div className="group relative bg-white border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200">
      {/* Drag handle */}
      <div className="absolute -left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <RiDraggable className="w-5 h-5 text-gray-400 cursor-grab" />
      </div>

      <div className="flex items-start gap-3">
        <div className="flex-1">
          <span className="text-xs font-medium text-primary-50 uppercase tracking-wide mb-2 block">
            Paragraphe
          </span>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleChange}
            modules={modules}
            formats={formats}
            placeholder="Écrivez votre contenu ici..."
            className="blog-editor"
          />
        </div>

        <button
          onClick={onDelete}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 cursor-pointer"
          title="Supprimer"
        >
          <RiDeleteBinLine className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default BlogParagraph;
