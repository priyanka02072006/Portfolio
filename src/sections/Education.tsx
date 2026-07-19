import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Award } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { useScrollReveal } from '../hooks/useAnimations';

const education = [
  {
    degree: 'B.Tech Computer Science and Business Systems',
    institution: 'R.M.D Engineering College',
    period: '2022 - 2026',
    score: 'CGPA: 8.22',
    icon: GraduationCap,
    details: ['Specialization in CSBS', 'Focus on AI & Web Technologies'],
  },
  {
    degree: 'HSC (Higher Secondary Certificate)',
    institution: 'Higher Secondary School',
    period: '2021 - 2022',
    score: '82.5%',
    icon: BookOpen,
    details: ['Computer Science stream', 'Strong academic performance'],
  },
  {
    degree: 'SSLC (Secondary School Leaving Certificate)',
    institution: 'Secondary School',
    period: '2019 - 2020',
    score: '93.6%',
    icon: Award,
    details: ['Outstanding academic achievement', 'All-round excellence'],
  },
];

function TimelineItem({ item, index }: { item: typeof education[0]; index: number }) {
  const { ref, isVisible } = useScrollReveal();
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-center mb-12 last:mb-0">
      {/* Center line & dot */}
      <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 flex flex-col items-center z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={isVisible ? { scale: 1 } : {}}
          transition={{ duration: 0.5, type: 'spring' }}
          className="w-10 h-10 rounded-full bg-dark-900 border-2 border-cyan-400 flex items-center justify-center neon-glow"
        >
          <item.icon className="w-5 h-5 text-cyan-400" />
        </motion.div>
        {index < education.length - 1 && (
          <motion.div
            initial={{ height: 0 }}
            animate={isVisible ? { height: '100%' } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-0.5 bg-gradient-to-b from-cyan-400/50 to-indigo-500/50 min-h-[80px]"
          />
        )}
      </div>

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        whileHover={{ y: -3, boxShadow: '0 0 30px rgba(34, 211, 238, 0.15)' }}
        className={`ml-16 sm:ml-0 sm:w-5/12 ${isLeft ? 'sm:mr-auto sm:pr-8' : 'sm:ml-auto sm:pl-8'}`}
      >
        <div className="glass rounded-xl p-6 group">
          <span className="text-cyan-400 font-mono text-xs tracking-wider">{item.period}</span>
          <h3 className="text-white font-semibold text-lg mt-2 mb-1">{item.degree}</h3>
          <p className="text-gray-400 text-sm mb-3">{item.institution}</p>
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-sm font-semibold">
            {item.score}
          </div>
          <ul className="mt-3 space-y-1">
            {item.details.map((d) => (
              <li key={d} className="text-gray-500 text-xs flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-cyan-400" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

export default function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeading title="Education" subtitle="My Journey" />
        <div className="relative">
          {/* Vertical center line for desktop */}
          <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400/20 via-indigo-500/20 to-transparent" />
          {education.map((item, i) => (
            <TimelineItem key={item.degree} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
