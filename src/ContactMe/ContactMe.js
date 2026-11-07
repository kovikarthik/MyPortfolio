import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

export default function ContactMe() {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    subject: '',
  });

  const [emailStatus, setEmailStatus] = useState('SEND TRANSMISSION');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://platform.linkedin.com/badges/js/profile.js';
    script.async = true;
    script.defer = true;
    script.type = 'text/javascript';

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSuccess = () => {
    setLoading(false);
    toast.success(
      <span style={{ textAlign: 'center' }}>
        Transmission received! <br /> I’ll get back to you shortly. 🚀
      </span>
    );
    setTimeout(() => {
      setEmailStatus('SEND TRANSMISSION');
    }, 1000);
    setForm({
      name: '',
      email: '',
      message: '',
      subject: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setEmailStatus('TRANSMITTING...');

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      name: form.name,
      email: form.email,
      user_name: form.name,
      user_email: form.email,
      reply_to: form.email,
      to_name: 'Karthik Kovi',
      to_email: 'karthikkovik@gmail.com',
      subject: form.subject,
      message: form.message,
      page_url: window.location.href,
      submitted_at: new Date().toLocaleString('en-US', {
        timeZone: 'America/Los_Angeles',
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      year: new Date().getFullYear(),
    };

    try {
      // Primary credentials attempt
      await emailjs.send(
        'service_znyy4xo',
        'template_98y4ahf',
        templateParams,
        'EtOer1HulMBDZD3bi'
      );
      handleSuccess();
    } catch (primaryErr) {
      console.warn('Primary EmailJS service failed, trying fallback...', primaryErr);
      try {
        // Fallback credentials attempt
        await emailjs.send(
          'service_kez1h7i',
          'template_uxz9xbf',
          templateParams,
          'jz9yQYm-QSbfpTR9D'
        );
        handleSuccess();
      } catch (fallbackErr) {
        setLoading(false);
        setEmailStatus('SEND TRANSMISSION');
        const errMsg = fallbackErr?.text || primaryErr?.text || fallbackErr?.message || primaryErr?.message || '';
        
        toast.warn(`EmailJS API Notice: ${errMsg || 'Service unavailable'}. Launching mail client...`, { autoClose: 4000 });
        
        // Launch mailto fallback prefilled with form data
        const mailtoSubject = encodeURIComponent(form.subject || 'Portfolio Contact Form Transmission');
        const mailtoBody = encodeURIComponent(
          `Sender Name: ${form.name}\nSender Email: ${form.email}\n\nMessage:\n${form.message}`
        );
        window.location.href = `mailto:karthikkovik@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
      }
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full text-white font-sans py-24 sm:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden selection:bg-indigo-500 selection:text-white"
    >
      {/* Glow Backdrop */}
      <div className="absolute top-1/3 left-1/3 w-[34rem] h-[34rem] bg-indigo-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mb-6"
        >
          <span className="text-[11px] font-semibold tracking-[0.35em] uppercase text-indigo-400 font-montserrat">
            05 / GET IN TOUCH
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-indigo-500 via-sky-400 to-transparent" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 className="text-5xl sm:text-7xl font-black uppercase tracking-tight text-white">
            LET'S BUILD SOMETHING <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">EXTRAORDINARY</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 font-light max-w-2xl mt-2">
            Available for full-time engineering roles, technical architecture consulting, and high-impact software projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-slate-900/60 border border-indigo-500/30 rounded-3xl p-8 space-y-6 shadow-2xl backdrop-blur-2xl">
              <div className="flex items-center space-x-3 border-b border-indigo-500/20 pb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span className="text-xs font-montserrat text-indigo-400 font-bold tracking-widest uppercase">
                  DIRECT CONTACT CHANNELS
                </span>
              </div>

              <div className="space-y-4">
                <a
                  href="mailto:karthikkovik@gmail.com"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-black/40 border border-indigo-500/20 hover:border-indigo-400 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                    <i className="bx bx-envelope text-xl" />
                  </div>
                  <div>
                    <div className="text-[10px] font-montserrat text-gray-400 uppercase tracking-widest">EMAIL</div>
                    <div className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">
                      karthikkovik@gmail.com
                    </div>
                  </div>
                </a>

                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-black/40 border border-indigo-500/20">
                  <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <i className="bx bx-map text-xl" />
                  </div>
                  <div>
                    <div className="text-[10px] font-montserrat text-gray-400 uppercase tracking-widest">LOCATION</div>
                    <div className="text-sm font-semibold text-white">Long Beach, California, USA</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Network Cards */}
            <div className="bg-slate-900/60 border border-indigo-500/30 rounded-3xl p-8 space-y-4 backdrop-blur-2xl">
              <span className="text-xs font-montserrat text-indigo-400 font-bold tracking-widest uppercase block mb-2">
                CONNECT & FOLLOW
              </span>
              <div className="flex space-x-4">
                {[
                  { icon: 'bxl-linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/karthikkovi/' },
                  { icon: 'bxl-github', label: 'GitHub', href: 'https://github.com/kovikarthik' },
                  { icon: 'bx-envelope', label: 'Email', href: 'mailto:karthikkovik@gmail.com' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 rounded-full bg-black/40 border border-indigo-500/30 flex items-center justify-center text-indigo-400 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-sky-500 hover:text-white hover:scale-110 transition-all shadow-md"
                    title={s.label}
                  >
                    <i className={`bx ${s.icon} text-xl`} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Contact Form (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-indigo-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6 backdrop-blur-2xl">
            <h3 className="text-3xl font-black text-white uppercase tracking-wide">
              SEND DIRECT <span className="text-indigo-400">TRANSMISSION</span>
            </h3>

            <form ref={formRef} className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[10px] font-montserrat text-gray-400 uppercase tracking-widest mb-1.5 font-bold">
                  YOUR NAME
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  type="text"
                  required
                  className="w-full p-4 rounded-xl bg-black/40 border border-indigo-500/20 text-white placeholder-gray-500 focus:border-indigo-400 focus:outline-none transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-montserrat text-gray-400 uppercase tracking-widest mb-1.5 font-bold">
                  EMAIL ADDRESS
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  type="email"
                  required
                  className="w-full p-4 rounded-xl bg-black/40 border border-indigo-500/20 text-white placeholder-gray-500 focus:border-indigo-400 focus:outline-none transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-montserrat text-gray-400 uppercase tracking-widest mb-1.5 font-bold">
                  SUBJECT
                </label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject of message"
                  type="text"
                  required
                  className="w-full p-4 rounded-xl bg-black/40 border border-indigo-500/20 text-white placeholder-gray-500 focus:border-indigo-400 focus:outline-none transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-montserrat text-gray-400 uppercase tracking-widest mb-1.5 font-bold">
                  MESSAGE
                </label>
                <textarea
                  rows={5}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your message details..."
                  required
                  className="w-full p-4 rounded-xl bg-black/40 border border-indigo-500/20 text-white placeholder-gray-500 focus:border-indigo-400 focus:outline-none transition-colors text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={!form.subject || !form.name || !form.email || !form.message || loading}
                className={`w-full py-4 rounded-full font-montserrat font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                  !form.subject || !form.name || !form.email || !form.message || loading
                    ? 'bg-gray-800 text-gray-500 border border-white/10 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 text-white hover:scale-105 shadow-lg shadow-indigo-500/30'
                }`}
              >
                <span>{emailStatus}</span>
              </button>
            </form>
          </div>
        </div>

        <div className="badge-base LI-profile-badge container mx-auto px-6 flex justify-center mt-12" data-locale="en_US" data-size="large" data-theme="light" data-type="HORIZONTAL" data-vanity="karthikkovi" data-version="v1">
          <a className="badge-base__link LI-simple-link" aria-label="Karthik Kovi LinkedIn Profile" href="https://www.linkedin.com/in/karthikkovi/"></a>
        </div>
      </div>
    </section>
  );
}
