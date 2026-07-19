import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { useScrollReveal } from '../hooks/useAnimations';

const certifications = [
  'Microsoft Azure Cognitive Services',
  'IBM Cybersecurity Fundamentals',
  'IBM UX Design',
  'Oracle AI Foundations',
  'OCI Generative AI',
  'Google LLM Introduction',
  'NPTEL Soft Skills',
  'Tata Data Visualization',
  'Forage Data Science Simulation',
];

function CertCard({ name, index }: { name: string; index: number }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        whileHover={{ y: -5, boxShadow: '0 0 25px rgba(34, 211, 238, 0.15)' }}
        className="glass rounded-xl p-5 h-full group cursor-default"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shrink-0 group-hover:border-cyan-400/40 transition-colors">
            <Award className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium leading-snug">{name}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading title="Certifications" subtitle="My Credentials" />

        {/* Marquee */}
        <div className="overflow-hidden mb-12 mask-both">
          <motion.div
            className="flex gap-6 whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            {[...certifications, ...certifications].map((cert, i) => (
              <div
                key={`${cert}-${i}`}
                className="glass rounded-full px-6 py-2.5 inline-flex items-center gap-2 shrink-0"
              >
                <Award size={14} className="text-cyan-400" />
                <span className="text-gray-300 text-sm">{cert}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, i) => (
            <CertCard key={cert} name={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
