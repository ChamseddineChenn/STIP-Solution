import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { createPortal } from 'react-dom';

const CustomSelect = ({ value, onChange, options, placeholder = 'Sélectionner...', label, Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

  // Update dropdown position and close when clicking outside
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width,
      });
    }

    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  const dropdownContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            top: `${dropdownPos.top}px`,
            left: `${dropdownPos.left}px`,
            width: `${dropdownPos.width}px`,
            zIndex: 9999,
          }}
          className="bg-white border-2 border-primary-50/40 rounded-xl shadow-2xl overflow-hidden"
        >
          {options.map((option, index) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left font-medium transition-all duration-200 ${
                value === option.value
                  ? 'bg-primary-50/20 text-primary'
                  : 'text-dark-blue hover:bg-primary-50/10'
              } ${index === 0 ? 'rounded-t-lg' : ''} ${
                index === options.length - 1 ? 'rounded-b-lg' : ''
              }`}
            >
              {option.label}
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-medium text-primary-50 uppercase tracking-wide mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full pl-4 pr-10 py-3 border-2 border-primary-50/40 rounded-xl bg-white text-dark-blue font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-300 cursor-pointer hover:border-primary-50/60 text-left flex items-center justify-between"
        >
          <span className={value === '' ? 'text-gray-500' : 'text-dark-blue'}>
            {displayText}
          </span>
        </button>
        <FiChevronDown
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-primary-50 w-5 h-5 pointer-events-none transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>
      {createPortal(dropdownContent, document.body)}
    </div>
  );
};

export default CustomSelect;
