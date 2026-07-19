import { motion } from 'framer-motion';
import { Trophy, Medal, Presentation, Users, Code } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { useScrollReveal } from '../hooks/useAnimations';

const achievements = [
  {
    icon: Trophy,
    title: 'NPTEL Elite Certificate',
    description: 'Achieved elite certification in NPTEL course demonstrating exceptional academic performance.',
    color: 'from-yellow-400 to-amber-500',
  },
  {
    icon: Code,
    title: 'Hackathons',
    description: 'Participated in multiple hackathons, building innovative solutions under time constraints.',
    color: 'from-cyan-400 to-blue-500',
  },
  {
    icon: Presentation,
    title: 'Paper Presentations',
    description: 'Presented research papers at conferences, showcasing analytical and communication skills.',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    icon: Users,
    title: 'Symposium Participation',
    description: 'Active participant in technical symposiums and college events, engaging with the tech community.',
    color: 'from-rose-400 to-pink-500',
  },
  {
    icon: Medal,
    title: 'Coding Competitions',
    description: 'Competed in coding challenges on various platforms, continuously sharpening problem-solving abilities.',
    color: 'from-indigo-400 to-violet-500',
  },
];

function AchievementCard({ achievement, index }: { achievement: typeof achievements[0]; index: number }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -5, boxShadow: '0 0 30px rgba(34, 211, 238, 0.15)' }}
        className="glass rounded-xl p-6 h-full group relative overflow-hidden"
      >
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${achievement.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        <div className="flex items-start gap-4">
          <motion.div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center shrink-0`}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <achievement.icon className="w-6 h-6 text-white" />
          </motion.div>

          <div>
            <h3 className="text-white font-semibold text-base mb-1">{achievement.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{achievement.description}</p>
          </div>
        </div>

        <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-5 blur-2xl rounded-full transition-opacity duration-700`} />
      </motion.div>
    </div>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeading title="Achievements" subtitle="Milestones" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((a, i) => (
            <AchievementCard key={a.title} achievement={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
