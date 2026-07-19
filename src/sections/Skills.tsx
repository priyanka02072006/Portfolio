import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import { useScrollReveal, useTilt } from '../hooks/useAnimations';

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Programming',
    skills: ['Java', 'Python', 'JavaScript'],
  },
  {
    title: 'Web Development',
    skills: ['HTML', 'CSS', 'React'],
  },
  {
    title: 'Tools & Database',
    skills: ['Git/GitHub', 'MySQL', 'UI/UX Design'],
  },
  {
    title: 'Soft Skills',
    skills: ['Leadership', 'Communication', 'Analytical Thinking'],
  },
];

function SkillChip({ name, delay, isVisible }: { name: string; delay: number; isVisible: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      whileHover={{ y: -2 }}
      className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-200 bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:text-cyan-300 transition-colors"
    >
      {name}
    </motion.span>
  );
}

function SkillCard({ category, index }: { category: SkillCategory; index: number }) {
  const { ref, isVisible } = useScrollReveal();
  const tiltRef = useTilt();

  return (
    <div ref={ref} className="h-full">
      <motion.div
        ref={tiltRef}
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ boxShadow: '0 0 40px rgba(34, 211, 238, 0.15)' }}
        className="glass rounded-xl p-6 h-full flex flex-col transition-all duration-300"
      >
        <h3 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          {category.title}
        </h3>
        <div className="flex flex-wrap gap-2.5 content-start flex-1">
          {category.skills.map((name, i) => (
            <SkillChip
              key={name}
              name={name}
              delay={index * 0.1 + i * 0.08}
              isVisible={isVisible}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading title="Skills" subtitle="What I Know" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {skillCategories.map((category, i) => (
            <SkillCard key={category.title} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
