import React from 'react';

const MobileOverlay = ({ isVisible, onClick }) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fadeIn"
      onClick={onClick}
      aria-hidden="true"
    />
  );
};

export default MobileOverlay;
