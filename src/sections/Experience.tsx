import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { useScrollReveal } from '../hooks/useAnimations';

const experiences = [
  {
    company: 'InternPe',
    role: 'Web Development Intern',
    period: 'June 2025',
    location: 'Virtual',
    logo: 'https://user-images.githubusercontent.com/73993775/227628899-c44dd6c1-dc56-4852-b515-2d3261dbff6f.jpg',
    description: 'Worked on projects including calculator, to-do app, e-commerce website, and Connect 4 game using HTML, CSS, and JavaScript.',
    skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    color: 'indigo',
  },
  {
    company: 'DLK Software Solutions',
    role: 'Data Science Intern',
    period: 'June 2026',
    location: 'On-Site',
    logo: 'https://media.glassdoor.com/sqll/755175/dlk-technologies-squarelogo-1502891676679.png',
    description: 'Gained hands-on experience in data analysis, machine learning, and solving real-world business problems.',
    skills: ['Machine Learning', 'Visualization', 'Data Analysis'],
    color: 'emerald',
  },
];

function ExperienceCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const { ref, isVisible } = useScrollReveal();
  const colorMap: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
    indigo: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/20', gradient: 'from-cyan-400 via-indigo-500 to-blue-400' },
    emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', gradient: 'from-emerald-400 via-teal-500 to-green-400' },
  };
  const c = colorMap[exp.color];

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.15 }}
        whileHover={{ y: -5, boxShadow: '0 0 40px rgba(34, 211, 238, 0.15)' }}
        className="glass rounded-xl p-8 relative overflow-hidden group"
      >
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${c.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <motion.div
            className={`w-16 h-16 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center shrink-0 overflow-hidden`}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {exp.logo ? (
              <img src={exp.logo} alt={exp.company} className="w-full h-full object-cover rounded-xl" />
            ) : (
              <span className={`text-lg font-bold ${c.text}`}>{exp.company.slice(0, 2).toUpperCase()}</span>
            )}
          </motion.div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
              <h3 className="text-white dark:text-white text-xl font-semibold">{exp.role}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-cyan-400" />
                  {exp.period}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-cyan-400" />
                  {exp.location}
                </span>
              </div>
            </div>

            <div className={`inline-block px-3 py-1 rounded-full ${c.bg} border ${c.border} ${c.text} text-xs font-semibold mb-4`}>
              {exp.company}
            </div>

            <p className="text-gray-400 leading-relaxed mb-4">{exp.description}</p>

            <div className="flex flex-wrap gap-2">
              {exp.skills.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-dark-600 text-gray-300 border border-gray-700/50"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeading title="Experience" subtitle="Where I've Worked" />

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
