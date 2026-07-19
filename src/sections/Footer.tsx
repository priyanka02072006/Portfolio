import { motion } from 'framer-motion';
import { Linkedin, Github, Mail } from 'lucide-react';

export default function Footer() {
  const socials = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/priyankamohan02', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/priyanka02072006', label: 'GitHub' },
    { icon: Mail, href: 'https://mail.google.com/mail/?view=cm&fs=1&to=priyankamohan2706@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="relative py-12 border-t border-gray-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '5rem' }}
            transition={{ duration: 0.8 }}
            className="h-0.5 rounded-full"
            style={{ background: 'linear-gradient(to right, var(--primary), var(--primary-light))' }}
          />

          <div className="flex gap-4">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label={label}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>

          <p className="text-gray-500 text-sm">
            Copyrights &copy; 2026 by Priyanka M
          </p>
        </div>
      </div>
    </footer>
  );
}
