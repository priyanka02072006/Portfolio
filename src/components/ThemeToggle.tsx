import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Palette, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const colors = [
  { name: 'cyan', label: 'Cyan' },
  { name: 'purple', label: 'Purple' },
  { name: 'emerald', label: 'Emerald' },
  { name: 'rose', label: 'Rose' },
  { name: 'amber', label: 'Amber' },
] as const;

export default function ThemeToggle() {
  const { theme, colorScheme, toggleTheme, setColorScheme } = useTheme();
  const [showPalette, setShowPalette] = useState(false);

  return (
    <div className="relative flex items-center gap-2">
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait">
          {theme === 'dark' ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <div className="relative">
        <motion.button
          onClick={() => setShowPalette(!showPalette)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          aria-label="Color scheme"
        >
          <Palette size={20} />
        </motion.button>

        <AnimatePresence>
          {showPalette && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 p-3 rounded-xl glass-strong shadow-xl z-50"
            >
              <div className="grid grid-cols-5 gap-2">
                {colors.map((color) => (
                  <motion.button
                    key={color.name}
                    onClick={() => {
                      setColorScheme(color.name);
                      setShowPalette(false);
                    }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-8 h-8 rounded-full relative transition-all ${
                      colorScheme === color.name ? 'ring-2 ring-white ring-offset-2 ring-offset-dark-900' : ''
                    }`}
                    style={{
                      backgroundColor: `var(--${color.name}-primary)`,
                    }}
                    aria-label={color.label}
                  >
                    {colorScheme === color.name && (
                      <Check size={14} className="absolute inset-0 m-auto text-white" />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
