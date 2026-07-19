import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    const hover = () => setIsHovering(true);
    const unhover = () => setIsHovering(false);
    const leave = () => setIsVisible(false);
    const enter = () => setIsVisible(true);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);

    const interactives = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', hover);
      el.addEventListener('mouseleave', unhover);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', hover);
        el.removeEventListener('mouseleave', unhover);
      });
    };
  }, [isVisible]);

  if (window.innerWidth < 768) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - (isHovering ? 20 : 6),
          y: position.y - (isHovering ? 20 : 6),
          width: isHovering ? 40 : 12,
          height: isHovering ? 40 : 12,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
        style={{
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #22d3ee, #6366f1)',
        }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{
          x: position.x - 24,
          y: position.y - 24,
          opacity: isVisible ? 0.15 : 0,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.3), transparent)',
        }}
      />
    </>
  );
}
