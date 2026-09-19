import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      if (target) {
        const isInteractive =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('interactive');
        setIsHovered(!!isInteractive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible || cursorPos.x < 0) return null;

  return (
    <>
      {/* Outer Indigo Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-indigo-400/60 flex items-center justify-center backdrop-blur-[1px] shadow-[0_0_20px_rgba(99,102,241,0.35)]"
        animate={{
          x: cursorPos.x - (isHovered ? 26 : 8),
          y: cursorPos.y - (isHovered ? 26 : 8),
          width: isHovered ? 52 : 16,
          height: isHovered ? 52 : 16,
          backgroundColor: isHovered ? 'rgba(99, 102, 241, 0.18)' : 'rgba(99, 102, 241, 0.06)',
          borderColor: isHovered ? 'rgba(56, 189, 248, 0.9)' : 'rgba(99, 102, 241, 0.5)',
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 320, mass: 0.4 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]"
        animate={{
          x: cursorPos.x - 2,
          y: cursorPos.y - 2,
          width: isHovered ? 6 : 4,
          height: isHovered ? 6 : 4,
          opacity: isHovered ? 1 : 0.8,
        }}
        transition={{ type: 'spring', damping: 35, stiffness: 400, mass: 0.1 }}
      />
    </>
  );
};

export default CustomCursor;
