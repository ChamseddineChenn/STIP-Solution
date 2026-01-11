import React, { useState } from 'react';
import { RiDeleteBinLine, RiDraggable } from 'react-icons/ri';

const BlogTitle = ({
  content,
  onChange,
  onDelete,
  placeholder = 'Entrez le titre...',
  color = '#1f2937',
  onColorChange,
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [textColor, setTextColor] = useState(color);

  const colors = [
    { name: 'Gris foncé', value: '#1f2937' },
    { name: 'Bleu foncé', value: '#104377' },
    { name: 'Bleu primaire', value: '#12a6e0' },
    { name: 'Noir', value: '#000000' },
    { name: 'Gris', value: '#6b7280' },
    { name: 'Blanc', value: '#ffffff' },
  ];

  const handleColorChange = (colorValue) => {
    setTextColor(colorValue);
    if (onColorChange) {
      onColorChange(colorValue);
    }
    setShowColorPicker(false);
  };

  return (
    <div className="group relative bg-white border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200">
      {/* Drag handle and delete button */}
      <div className="absolute -left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <RiDraggable className="w-5 h-5 text-gray-400 cursor-grab" />
      </div>

      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-primary-50 uppercase tracking-wide">
              Titre
            </span>
            <div className="relative">
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="flex items-center gap-2 px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded transition-colors"
              >
                <div
                  className="w-4 h-4 rounded border border-gray-300"
                  style={{ backgroundColor: textColor }}
                />
                Couleur
              </button>
              {showColorPicker && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 w-56">
                  <div className="space-y-2">
                    {colors.map((colorOption) => (
                      <button
                        key={colorOption.value}
                        onClick={() => handleColorChange(colorOption.value)}
                        className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded text-sm transition-colors"
                      >
                        <div
                          className="w-6 h-6 rounded border-2 border-gray-300 flex-shrink-0"
                          style={{ backgroundColor: colorOption.value }}
                        />
                        <span>{colorOption.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <input
            type="text"
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full text-2xl font-bold border-none outline-none bg-transparent placeholder-gray-300 focus:ring-0"
            style={{ color: textColor }}
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

export default BlogTitle;
