import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const CTAButton = ({
  text = 'Click Here',
  onClick,
  className = '',
  height = 'py-3',
  width = 'px-8',
  showArrow = true,
  variant = 'default', // 'default' or 'full-width'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const colorProgress = useMotionValue(0);

  const colorClipPathValue = useTransform(colorProgress, (value) => {
    return `inset(0 0 0 ${Math.max(-0.5, 100 - value)}%)`;
  });

  const BRONZE_GOLD = '#ae8f62';

  // Color fill animation on hover
  useEffect(() => {
    if (isHovered) {
      let animationFrameId;
      const startTime = performance.now();
      const animDuration = 500; // 500ms for smooth fill
      const startProgress = colorProgress.get();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progressRatio = Math.min(elapsed / animDuration, 1);
        const progress = startProgress + (100 - startProgress) * progressRatio;
        colorProgress.set(progress);

        if (progressRatio < 1) {
          animationFrameId = requestAnimationFrame(animate);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [isHovered, colorProgress]);

  // Reverse color animation on hover exit
  useEffect(() => {
    if (!isHovered && colorProgress.get() > 0) {
      let animationFrameId;
      const startTime = performance.now();
      const animDuration = 500;
      const startProgress = colorProgress.get();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progressRatio = Math.min(elapsed / animDuration, 1);
        const currentValue = startProgress * (1 - progressRatio);
        colorProgress.set(Math.max(currentValue, 0));

        if (progressRatio < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          colorProgress.set(0);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [isHovered, colorProgress]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const isButtonAnimating = isHovered || colorProgress.get() > 0;

  // Determine width classes
  const widthClass = variant === 'full-width' ? 'w-full' : '';

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-flex items-center justify-center gap-2 bg-black text-white font-semibold transition-all duration-100 overflow-hidden ${height} ${width} ${widthClass} ${className}`}
      style={{
        boxShadow: isHovered ? '0 20px 40px rgba(174, 143, 98, 0.3)' : 'none',
      }}
    >
      {/* Color fill background overlay */}
      {isButtonAnimating && (
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{
            backgroundColor: BRONZE_GOLD,
            clipPath: colorClipPathValue,
          }}
        />
      )}

      {/* Color fill text overlay - replaces original text during animation */}
      <motion.div
        className="absolute inset-0 z-20 flex items-center justify-center font-semibold gap-2"
        style={{
          color: 'white',
          clipPath: isButtonAnimating
            ? colorClipPathValue
            : 'inset(0 100% 0 0)',
          pointerEvents: 'none',
        }}
      >
        {text}
        {showArrow && <FiArrowRight className="w-4 h-4" />}
      </motion.div>

      {/* Button content - always rendered, shows when not animating */}
      <span className="relative z-10 flex items-center justify-center gap-2 text-white">
        {text}
        {showArrow && <FiArrowRight className="w-4 h-4" />}
      </span>
    </motion.button>
  );
};

export default CTAButton;
