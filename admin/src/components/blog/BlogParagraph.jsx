import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { RiDeleteBinLine, RiDraggable } from 'react-icons/ri';

const BlogParagraph = ({ content, onChange, onDelete }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'list',
    'align',
    'link',
  ];

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
            onChange={onChange}
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
