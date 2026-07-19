import { motion } from 'framer-motion';
import { Code2, Brain, Palette, Zap } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { useEffect } from 'react';
import { useScrollReveal, useCountUp } from '../hooks/useAnimations';

function StatCard({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const { ref, isVisible } = useScrollReveal();
  const { count, trigger } = useCountUp(value, 2000);

  useEffect(() => {
    if (isVisible) trigger();
  }, [isVisible, trigger]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="glass rounded-xl p-6 text-center hover:neon-glow transition-shadow duration-500"
    >
      <p className="text-3xl sm:text-4xl font-bold gradient-text">
        {count}{suffix}
      </p>
      <p className="text-gray-400 text-sm mt-2">{label}</p>
    </motion.div>
  );
}

export default function About() {
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal();

  const cards = [
    { icon: Code2, title: 'Web Development', desc: 'Building responsive and interactive web applications with modern frameworks and best practices.' },
    { icon: Brain, title: 'AI Solutions', desc: 'Exploring artificial intelligence and machine learning to create intelligent, data-driven solutions.' },
    { icon: Palette, title: 'UI/UX Design', desc: 'Crafting intuitive and aesthetically pleasing user experiences with attention to detail.' },
    { icon: Zap, title: 'Performance', desc: 'Optimizing applications for speed and efficiency to deliver seamless user experiences.' },
  ];

  const stats = [
    { value: 3, suffix: '+', label: 'Projects' },
    { value: 9, suffix: '+', label: 'Certifications' },
    { value: 3, suffix: '+', label: 'Hackathons' },
    { value: 8, suffix: '.22', label: 'CGPA' },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading title="About Me" subtitle="Who I Am" />

        <div ref={contentRef} className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={contentVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Priyanka M is a B.Tech CSBS student passionate about software development,
              AI-driven solutions, frontend engineering, and UI/UX experiences. Skilled in
              Java, Python, JavaScript, React, GitHub, and frontend technologies.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Driven by curiosity and a commitment to continuous learning, I thrive on
              transforming complex problems into elegant, user-centric solutions. My journey
              in tech is fueled by the desire to bridge the gap between innovative technology
              and real-world business applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={contentVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 0 30px rgba(34, 211, 238, 0.15)' }}
                className="glass rounded-xl p-5 group cursor-default"
              >
                <card.icon className="w-8 h-8 text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold text-sm mb-1">{card.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
