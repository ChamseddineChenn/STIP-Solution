import React, { useState } from 'react';
import {
  RiDeleteBinLine,
  RiDraggable,
  RiUploadCloud2Line,
  RiLoader4Line,
} from 'react-icons/ri';
import { blogAPI } from '../../services/api';

const BlogImage = ({ content, publicId, onChange, onDelete }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
    ];
    if (!validTypes.includes(file.type)) {
      setError('Format non supporté. Utilisez JPG, PNG, GIF ou WebP.');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("L'image ne doit pas dépasser 5 Mo.");
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await blogAPI.uploadImage(formData);

      if (response.data.success) {
        onChange({
          url: response.data.data.url,
          publicId: response.data.data.publicId,
        });
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('Erreur lors du téléchargement. Veuillez réessayer.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    // If image was uploaded, delete from Cloudinary
    if (publicId) {
      try {
        await blogAPI.deleteImage(publicId);
      } catch (err) {
        console.error('Error deleting image from Cloudinary:', err);
      }
    }
    onDelete();
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
            Image
          </span>

          {!content ? (
            // Upload area
            <label className="block cursor-pointer">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                  isUploading
                    ? 'border-primary-50 bg-primary-50/5'
                    : 'border-gray-300 hover:border-primary-50 hover:bg-gray-50'
                }`}
              >
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <RiLoader4Line className="w-10 h-10 text-primary-50 animate-spin" />
                    <p className="mt-2 text-sm text-gray-500">
                      Téléchargement en cours...
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <RiUploadCloud2Line className="w-10 h-10 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Cliquez pour télécharger une image
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      JPG, PNG, GIF ou WebP (max. 5 Mo)
                    </p>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isUploading}
              />
            </label>
          ) : (
            // Image preview
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={content}
                alt="Uploaded"
                className="w-full h-auto max-h-96 object-contain bg-gray-100 rounded-lg"
              />
              <button
                onClick={() => onChange({ url: null, publicId: null })}
                className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white text-gray-600 hover:text-red-500 rounded-lg shadow-md transition-all duration-200 cursor-pointer"
                title="Changer l'image"
              >
                <RiUploadCloud2Line className="w-5 h-5" />
              </button>
            </div>
          )}

          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>

        <button
          onClick={handleDelete}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 cursor-pointer"
          title="Supprimer"
        >
          <RiDeleteBinLine className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default BlogImage;
