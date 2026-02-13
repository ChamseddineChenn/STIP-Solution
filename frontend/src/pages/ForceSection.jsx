import React, { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const ForceSection = () => {
  const [activeValue, setActiveValue] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [particles, setParticles] = useState([]);
  const sectionRef = useRef(null);
  const rotationRef = useRef(0);
  const animFrameRef = useRef(null);

  const values = [
    {
      letter: 'F',
      word: 'Fun',
      desc: 'Favoriser un environnement positif qui stimule la créativité et la productivité.',
      color: '#12a6e0',
      gradient: 'from-cyan-400 to-blue-500',
    },
    {
      letter: 'O',
      word: 'Ouverture',
      desc: 'Adopter de nouvelles idées, méthodes et approches collaboratives.',
      color: '#3d79bd',
      gradient: 'from-blue-400 to-indigo-500',
    },
    {
      letter: 'R',
      word: 'Respect',
      desc: "Valoriser les clients, les membres de l'équipe, la sécurité et chaque projet que nous entreprenons.",
      color: '#ae8f62',
      gradient: 'from-amber-400 to-orange-500',
    },
    {
      letter: 'C',
      word: 'Communication',
      desc: 'Maintenir la clarté et la transparence à chaque phase du projet.',
      color: '#143a8a',
      gradient: 'from-purple-400 to-pink-500',
    },
    {
      letter: 'E',
      word: 'Excellence',
      desc: "Poursuivre les normes les plus élevées dans l'exécution technique et les partenariats.",
      color: '#ae8f62',
      gradient: 'from-amber-400 to-orange-500',
    },
  ];

  // Slow continuous rotation
  useEffect(() => {
    const speed = 0.08; // degrees per frame
    const tick = () => {
      if (!isPaused) {
        rotationRef.current = (rotationRef.current + speed) % 360;
        setRotation(rotationRef.current);
      }
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPaused]);

  // Particle system on hover - random across screen
  useEffect(() => {
    if (activeValue === null) return;
    const interval = setInterval(() => {
      const randY = -60 + Math.random() * 120;
      const randX = -40 + Math.random() * 80;
      setParticles((prev) => [
        ...prev.slice(-30),
        {
          id: Date.now() + Math.random(),
          x: 10 + Math.random() * 80,
          y: 10 + Math.random() * 80,
          color: values[activeValue].color,
          randX,
          randY,
        },
      ]);
    }, 80);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeValue, rotation]);

  // Cleanup particles
  useEffect(() => {
    const cleanup = setInterval(() => {
      setParticles((prev) => prev.slice(-20));
    }, 600);
    return () => clearInterval(cleanup);
  }, []);

  const radius = 220; // px from center for desktop

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-dark-blue relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0">
        {/* Radial pulse from center */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-primary-50/5"
          animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary-50/5"
          animate={{ scale: [1, 1.8, 1], opacity: [0.08, 0, 0.08] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-primary-50/8"
          animate={{ scale: [1, 2, 1], opacity: [0.05, 0, 0.05] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                backgroundColor: p.color,
                boxShadow: `0 0 12px ${p.color}, 0 0 24px ${p.color}`,
              }}
              initial={{ opacity: 1, scale: 1 }}
              animate={{
                opacity: 0,
                scale: 0,
                y: p.randY,
                x: p.randX,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-4"
        >
          <motion.div
            className="h-1 w-20 bg-primary-50 mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter">
            Nos principes directeurs
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            F.O.R.C.E. — Les valeurs qui définissent notre approche pour chaque
            projet et partenariat
          </p>
        </motion.div>

        {/* Orbital Carousel */}
        <div className="relative w-full flex justify-center items-center">
          {/* Desktop: Circular layout */}
          <div className="hidden md:block relative w-[550px] h-[550px]">
            {/* Central rotating ring */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] rounded-full border border-primary-50/10"
              style={{ rotate: rotation }}
            />
            {/* Secondary ring */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[470px] h-[470px] rounded-full border border-dashed border-primary/15"
              style={{ rotate: -rotation * 0.5 }}
            />

            {/* Orbital connection lines to active */}
            {activeValue !== null && (
              <motion.div
                className="absolute top-1/2 left-1/2 w-px origin-top-left"
                style={{
                  height: radius,
                  rotate: (activeValue / 5) * 360 + rotation - 90,
                  background: `linear-gradient(to bottom, transparent, ${values[activeValue].color})`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 0.3 }}
              />
            )}

            {/* Letters orbiting */}
            {values.map((value, idx) => {
              const angle = (idx / 5) * 360 + rotation;
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;
              const isActive = activeValue === idx;

              return (
                <motion.div
                  key={value.letter}
                  className="absolute top-1/2 left-1/2 cursor-pointer z-20"
                  style={{
                    x: x - 48,
                    y: y - 48,
                  }}
                  onMouseEnter={() => {
                    setActiveValue(idx);
                    setIsPaused(true);
                  }}
                  onMouseLeave={() => {
                    setActiveValue(null);
                    setIsPaused(false);
                  }}
                  onClick={() => {
                    setActiveValue(activeValue === idx ? null : idx);
                    setIsPaused(activeValue === idx ? false : true);
                  }}
                >
                  <motion.div
                    className="relative w-24 h-24 flex items-center justify-center"
                    animate={isActive ? { scale: 1.3 } : { scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {/* Glow ring behind */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={
                        isActive
                          ? {
                              boxShadow: `0 0 40px ${value.color}80, 0 0 80px ${value.color}40, 0 0 120px ${value.color}20`,
                              scale: 1.2,
                            }
                          : { boxShadow: 'none', scale: 1 }
                      }
                      transition={{ duration: 0.4 }}
                    />

                    {/* Background circle */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 backdrop-blur-md"
                      animate={
                        isActive
                          ? {
                              borderColor: value.color,
                              backgroundColor: `${value.color}25`,
                            }
                          : {
                              borderColor: 'rgba(255,255,255,0.15)',
                              backgroundColor: 'rgba(30, 41, 59, 0.8)',
                            }
                      }
                      transition={{ duration: 0.3 }}
                    />

                    {/* Spinning accent ring on hover */}
                    {isActive && (
                      <motion.div
                        className="absolute -inset-1.5 rounded-full border-2 border-transparent"
                        style={{
                          borderTopColor: value.color,
                          borderRightColor: 'transparent',
                          borderBottomColor: `${value.color}50`,
                          borderLeftColor: 'transparent',
                        }}
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                    )}

                    {/* Letter */}
                    <motion.span
                      className="relative z-10 text-4xl font-black"
                      animate={
                        isActive
                          ? {
                              color: value.color,
                              textShadow: `0 0 20px ${value.color}`,
                            }
                          : { color: '#f8fafc', textShadow: 'none' }
                      }
                      transition={{ duration: 0.3 }}
                    >
                      {value.letter}
                    </motion.span>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Center content */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-56 z-10">
              <AnimatePresence mode="wait">
                {activeValue !== null ? (
                  <motion.div
                    key={`active-${activeValue}`}
                    initial={{ opacity: 0, scale: 0.8, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.8, filter: 'blur(8px)' }}
                    transition={{ duration: 0.35 }}
                  >
                    <motion.div
                      className="text-5xl font-black mb-2"
                      style={{ color: values[activeValue].color }}
                      animate={{
                        textShadow: [
                          `0 0 20px ${values[activeValue].color}80`,
                          `0 0 40px ${values[activeValue].color}60`,
                          `0 0 20px ${values[activeValue].color}80`,
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {values[activeValue].letter}
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-widest">
                      {values[activeValue].word}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {values[activeValue].desc}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="text-5xl font-black bg-linear-to-r from-primary-50 via-primary-light to-primary bg-clip-text text-transparent mb-3"
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      style={{ backgroundSize: '200% 200%' }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      F.O.R.C.E
                    </motion.div>
                    <p className="text-text-secondary text-xs uppercase tracking-[0.3em]">
                      Survolez pour explorer
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile: Horizontal scroll carousel */}
          <div className="md:hidden w-full">
            {/* Mobile center content */}
            <div className="text-center mb-8 min-h-[120px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {activeValue !== null ? (
                  <motion.div
                    key={`mobile-active-${activeValue}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="px-4"
                  >
                    <h3
                      className="text-2xl font-bold mb-2 uppercase tracking-widest"
                      style={{ color: values[activeValue].color }}
                    >
                      {values[activeValue].word}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {values[activeValue].desc}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="mobile-default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-text-secondary text-sm uppercase tracking-[0.2em]">
                      Appuyez pour explorer
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile letter row */}
            <div className="flex justify-center gap-4">
              {values.map((value, idx) => {
                const isActive = activeValue === idx;
                return (
                  <motion.div
                    key={value.letter}
                    className="cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() =>
                      setActiveValue(activeValue === idx ? null : idx)
                    }
                  >
                    <motion.div
                      className="relative w-16 h-16 flex items-center justify-center rounded-full border-2 backdrop-blur-md"
                      animate={
                        isActive
                          ? {
                              borderColor: value.color,
                              backgroundColor: `${value.color}25`,
                              scale: 1.2,
                              boxShadow: `0 0 30px ${value.color}60`,
                            }
                          : {
                              borderColor: 'rgba(255,255,255,0.15)',
                              backgroundColor: 'rgba(30, 41, 59, 0.8)',
                              scale: 1,
                              boxShadow: 'none',
                            }
                      }
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      {isActive && (
                        <motion.div
                          className="absolute -inset-1 rounded-full border-2 border-transparent"
                          style={{
                            borderTopColor: value.color,
                            borderBottomColor: `${value.color}50`,
                          }}
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        />
                      )}
                      <motion.span
                        className="text-2xl font-black relative z-10"
                        animate={
                          isActive
                            ? { color: value.color }
                            : { color: '#f8fafc' }
                        }
                      >
                        {value.letter}
                      </motion.span>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForceSection;
