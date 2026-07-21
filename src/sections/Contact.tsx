import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, Linkedin, Github, MapPin, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { useScrollReveal } from '../hooks/useAnimations';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const { ref, isVisible } = useScrollReveal();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMsg('Please fill in all fields.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || `Request failed (${response.status})`);
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'priyankamohan2706@gmail.com', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=priyankamohan2706@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 9952776031', href: 'https://wa.me/919952776031' },
    { icon: Linkedin, label: 'LinkedIn', value: 'priyankamohan02', href: 'https://www.linkedin.com/in/priyankamohan02' },
    { icon: Github, label: 'GitHub', value: 'priyanka02072006', href: 'https://github.com/priyanka02072006' },
  ];

  const isDisabled = status === 'loading' || status === 'success';

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeading title="Contact" subtitle="Get In Touch" />

        <div ref={ref} className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <span className="text-gray-300">Chennai, India</span>
            </div>

            {contactInfo.map((info) => (
              <motion.a
                key={info.label}
                href={info.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5, boxShadow: '0 0 20px rgba(34, 211, 238, 0.1)' }}
                className="glass rounded-xl p-4 flex items-center gap-4 group cursor-pointer block"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center group-hover:border-cyan-400/40 transition-colors">
                  <info.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs">{info.label}</p>
                  <p className="text-white text-sm font-medium">{info.value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form */}
         <motion.div
  initial={{ opacity: 0, x: 30 }}
  animate={isVisible ? { opacity: 1, x: 0 } : {}}
  transition={{ duration: 0.7, delay: 0.2 }}
  className="lg:col-span-3 flex items-center justify-center"
>
  <div className="glass rounded-2xl p-6 max-w-md mx-auto min-h-[220px] flex flex-col justify-center">
    <h3 className="text-4xl font-bold text-yellow-400 mb-6">
      LET'S CONNECT
    </h3>

    <p className="text-gray-300 text-lg leading-8">
      I'm always open to discussing projects, internships,
      collaborations, or new opportunities.
    </p>
  </div>
</motion.div>
        </div>
      </div>
    </section>
  );
}
