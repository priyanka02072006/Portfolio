import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ExternalLink, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  const [text, setText] = useState('');
  const [subText, setSubText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Hi, I'm Priyanka";
  const fullSubText = "B.Tech CSBS Student | Web Developer | AI Enthusiast";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
        let j = 0;
        const subTimer = setInterval(() => {
          if (j <= fullSubText.length) {
            setSubText(fullSubText.slice(0, j));
            j++;
          } else {
            clearInterval(subTimer);
            setTimeout(() => setShowCursor(false), 2000);
          }
        }, 30);
      }
    }, 60);
    return () => clearInterval();
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 z-[1]" />

      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl z-[1] opacity-20"
        style={{ backgroundColor: 'var(--primary)' }}
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl z-[1] opacity-10"
        style={{ backgroundColor: 'var(--primary-light)' }}
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <motion.div
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full p-1"
              style={{
                background: `linear-gradient(135deg, var(--primary), var(--primary-light), var(--primary-dark))`,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center dark:bg-dark-900 overflow-hidden">
                <img
                  src="/profile.jpeg"
                  alt="Priyanka"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </motion.div>
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  `0 0 20px color-mix(in srgb, var(--primary) 30%, transparent), 0 0 60px color-mix(in srgb, var(--primary) 10%, transparent)`,
                  `0 0 40px color-mix(in srgb, var(--primary) 50%, transparent), 0 0 100px color-mix(in srgb, var(--primary) 20%, transparent)`,
                  `0 0 20px color-mix(in srgb, var(--primary) 30%, transparent), 0 0 60px color-mix(in srgb, var(--primary) 10%, transparent)`,
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
            <span className="text-slate-900 dark:text-white">{text}</span>
            {showCursor && (
              <motion.span
                style={{ color: 'var(--primary)' }}
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                |
              </motion.span>
            )}
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-slate-500 dark:text-gray-400 font-mono mb-2">
            <span>{subText}</span>
            {!showCursor && text.length === fullText.length && subText.length < fullSubText.length && (
              <motion.span
                style={{ color: 'var(--primary)' }}
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                |
              </motion.span>
            )}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
        >
          <motion.a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-3.5 rounded-full text-white dark:text-white font-semibold text-sm sm:text-base overflow-hidden"
            style={{
              background: `linear-gradient(135deg, var(--primary), var(--primary-dark))`,
            }}
          >
            <span className="relative z-10 flex items-center gap-2 justify-center">
              <ExternalLink size={18} /> View Projects
            </span>
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.8 }}
          className="flex gap-4 justify-center mt-10"
        >
          {[
            { icon: Linkedin, href: 'https://www.linkedin.com/in/priyankamohan02', label: 'LinkedIn' },
            { icon: Github, href: 'https://github.com/priyanka02072006', label: 'GitHub' },
            { icon: Mail, href: 'https://mail.google.com/mail/?view=cm&fs=1&to=priyankamohan2706@gmail.com', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-slate-500 dark:text-gray-400 transition-colors"
              style={{
                ['--hover-color' as string]: 'var(--primary)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '')}
              aria-label={label}
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-slate-400 dark:text-gray-500"
        >
          <span className="text-xs font-mono tracking-widest">SCROLL</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
