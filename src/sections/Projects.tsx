import { motion } from 'framer-motion';
import { CloudRain, Recycle, ShieldCheck, TreePine, ArrowUpRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { useScrollReveal, useTilt } from '../hooks/useAnimations';

const projects = [
  {
    title: 'Rain Guard: Cloth Automation Sensor',
    description: 'Rain Guard is a hardware-based automatic cloth protection system that detects rainfall and automatically retracts clothes to a sheltered area, protecting them from unexpected weather while reducing manual effort.',
    tech: ['Arduino', 'Sensors', 'Automation', 'dc-motor'],
    icon: CloudRain,
    color: 'from-cyan-400 to-blue-500',
    demoUrl: 'https://drive.google.com/file/d/12pINq6Nk3VmEaVoOs0eBjuPZCnxu16ft/view?usp=sharing',
  },
  {
    title: 'CircularIQ',
    description: 'CircularIQ is an AI-powered B2B circular economy platform that transforms industrial waste into valuable resources through intelligent matching, carbon analytics, and sustainability insights.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React', 'AI'],
    icon: Recycle,
    color: 'from-emerald-400 to-teal-500',
    demoUrl: 'https://circular-iq-umber.vercel.app',
  },
  {
    title: 'Stride with Safety',
    description: 'Stride with Safety is a hardware-based smart shoe designed to enhance personal safety through an integrated emergency alert mechanism, offering a practical and reliable solution for emergency situations.',
    tech: ['Electronics', 'embedded-systems', 'Sensors', 'Wearable Technology'],
    icon: ShieldCheck,
    color: 'from-rose-400 to-orange-500',
    demoUrl: 'https://drive.google.com/file/d/1rpk12QTlbQN9zYQRWVpL3-Jrz7KAwOws/view?usp=sharing',
  },
  {
    title: 'Carbon-Chain',
    description: 'A blockchain-based blue carbon registry system leveraging AI/ML and public environmental datasets to transparently measure, verify, and record carbon credits from coastal ecosystems.',
    tech: ['Blockchain', 'AI/ML', 'TypeScript', 'Environmental Data'],
    icon: TreePine,
    color: 'from-green-400 to-emerald-600',
    demoUrl: 'https://carbon-chain-nine.vercel.app/',
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const { ref, isVisible } = useScrollReveal();
  const tiltRef = useTilt();

  return (
    <div ref={ref} className="h-full">
      <motion.div
        ref={tiltRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.15 }}
        className="relative group h-full"
      >
        <div className="glass rounded-2xl p-6 sm:p-8 h-full flex flex-col relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(34,211,238,0.1)]">
          {/* Animated gradient border */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px] bg-gradient-to-br from-cyan-400 via-indigo-500 to-blue-400"
            style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}
          />

          {/* Icon & glow */}
          <div className="relative mb-6">
            <motion.div
              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center`}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <project.icon className="w-7 h-7 text-white" />
            </motion.div>
            <div className={`absolute -inset-2 rounded-xl bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
          </div>

          <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors mb-4 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              View Demo
              <ArrowUpRight size={16} />
            </a>
          )}

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full text-xs font-medium bg-dark-600 text-gray-300 border border-gray-700/50"
              >
                {t}
              </span>
            ))}
          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading title="Projects" subtitle="What I've Built" />
        <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
