import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion'; // eslint-disable-line no-unused-vars

const Button = ({ text = 'Scan Now' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const colorProgress = useMotionValue(0);

  // Clip path for color sweep (right to left)
  const colorClipPathValue = useTransform(colorProgress, (value) => {
    return `inset(0 0 0 ${Math.max(-8, 100 - value)}%)`;
  });

  // Colors
  const BRONZE_GOLD = '#ae8f62';
  const LASER_CYAN = '#00d9ff';
  const LASER_BLUE = '#0099ff';
  const GLOW_COLOR = '#00d9ff';
  const BG_COLOR = 'transparent';

  // Color fill animation on hover
  useEffect(() => {
    if (isHovered && !isClicked) {
      let animationFrameId;
      const startTime = performance.now();
      const animDuration = 600; // 0.6 seconds in ms
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
  }, [isHovered, isClicked, colorProgress]);

  // Reverse color animation on hover exit
  useEffect(() => {
    if (!isHovered && !isClicked && colorProgress.get() > 0) {
      let animationFrameId;
      const startTime = performance.now();
      const animDuration = 600; // 0.6 seconds in ms
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
  }, [isHovered, isClicked, colorProgress]);

  const handleMouseEnter = () => {
    if (!isClicked) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isClicked) {
      setIsHovered(false);
    }
  };

  const handleClick = () => {
    setIsClicked(true);
    setIsHovered(false);

    // Auto-reset after 2.5 seconds
    setTimeout(() => {
      setIsClicked(false);
    }, 2500);
  };

  return (
    <motion.button
      className="relative px-8 py-3 text-white font-semibold text-lg overflow-hidden border border-current transition-colors"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileTap={{ scale: 0.98 }}
      disabled={isClicked}
      style={{
        backgroundColor: BG_COLOR,
        borderColor: BRONZE_GOLD,
        borderWidth: '2px',
        borderRadius: '4px',
        color: 'white',
      }}
    >
      {/* Background fill container */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Color fill overlay - bronze/gold background (right to left) */}
        {!isClicked && (isHovered || colorProgress.get() > 0) && (
          <motion.div
            className="absolute inset-0 overflow-hidden"
            style={{
              backgroundColor: BRONZE_GOLD,
              clipPath: colorClipPathValue,
              boxShadow: 'inset 0 0 0 2px ' + BRONZE_GOLD,
            }}
          />
        )}

        {/* Color fill text overlay - bronze/gold text (right to left) */}
        {!isClicked && (isHovered || colorProgress.get() > 0) && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center font-semibold text-lg pointer-events-none overflow-hidden"
            style={{
              color: BRONZE_GOLD,
              clipPath: colorClipPathValue,
            }}
          >
            {text}
          </motion.div>
        )}

        {/* Pulsing fill effect on click */}
        {isClicked && (
          <>
            {/* Background fill */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at center, ${LASER_CYAN}1a, ${LASER_BLUE}0d)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.6, 0] }}
              transition={{
                duration: 1.2,
                times: [0, 0.15, 0.5, 1],
                ease: 'easeOut',
              }}
            />

            {/* Grid pattern lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              style={{ pointerEvents: 'none' }}
            >
              <defs>
                <linearGradient
                  id="gridGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor={LASER_CYAN} stopOpacity="0" />
                  <stop offset="50%" stopColor={LASER_CYAN} stopOpacity="0.8" />
                  <stop offset="100%" stopColor={LASER_CYAN} stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Vertical grid lines */}
              {[0.2, 0.4, 0.6, 0.8].map((pos, idx) => (
                <motion.line
                  key={`v-${idx}`}
                  x1={`${pos * 100}%`}
                  y1="0%"
                  x2={`${pos * 100}%`}
                  y2="100%"
                  stroke="url(#gridGradient)"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: [0, 1, 1, 0] }}
                  transition={{
                    delay: idx * 0.08,
                    duration: 1.0,
                    times: [0, 0.2, 0.7, 1],
                    ease: 'easeOut',
                  }}
                />
              ))}

              {/* Horizontal grid lines */}
              {[0.3, 0.7].map((pos, idx) => (
                <motion.line
                  key={`h-${idx}`}
                  x1="0%"
                  y1={`${pos * 100}%`}
                  x2="100%"
                  y2={`${pos * 100}%`}
                  stroke="url(#gridGradient)"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: [0, 1, 1, 0] }}
                  transition={{
                    delay: (idx + 4) * 0.08,
                    duration: 1.0,
                    times: [0, 0.2, 0.7, 1],
                    ease: 'easeOut',
                  }}
                />
              ))}
            </svg>

            {/* Corner scan points */}
            {[
              { x: '10%', y: '10%' },
              { x: '90%', y: '10%' },
              { x: '10%', y: '90%' },
              { x: '90%', y: '90%' },
            ].map((pos, idx) => (
              <motion.div
                key={`corner-${idx}`}
                className="absolute w-1 h-1"
                style={{
                  left: pos.x,
                  top: pos.y,
                  background: LASER_CYAN,
                  filter: `drop-shadow(0 0 2px ${GLOW_COLOR})`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
                transition={{
                  delay: 0.2 + idx * 0.08,
                  duration: 0.6,
                  ease: 'easeOut',
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* Text with subtle glow effect */}
      <motion.span
        className="relative z-10 block"
        animate={
          isClicked
            ? { textShadow: `0 0 4px ${GLOW_COLOR}66` }
            : { textShadow: 'none' }
        }
        transition={{ duration: 0.2 }}
      >
        {text}
      </motion.span>
    </motion.button>
  );
};

export default Button;
