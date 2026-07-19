import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useAnimations';

interface SectionHeadingProps {
  title: string;
  subtitle: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div ref={ref} className="text-center mb-16">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3"
      >
        {subtitle}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isVisible ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-4 mx-auto w-24 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-blue-400 rounded-full"
      />
    </div>
  );
}
