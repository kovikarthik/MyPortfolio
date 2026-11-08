import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function AboutMe() {
  const cardRef = useRef(null);
  const [isCardHovered, setIsCardHovered] = useState(false);

  // Motion Values for 3D Tilt & Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useMotionValue(200);
  const spotlightY = useMotionValue(200);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), { damping: 18, stiffness: 220 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), { damping: 18, stiffness: 220 });

  const spotlightBg = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) => `radial-gradient(circle 260px at ${x}px ${y}px, rgba(99, 102, 241, 0.25), transparent 80%)`
  );

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => setIsCardHovered(true);

  const handleMouseLeave = () => {
    setIsCardHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="about"
      className="relative w-full min-h-screen text-white font-sans py-24 sm:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden flex items-center selection:bg-indigo-500 selection:text-white"
    >
      {/* Background Ambient Lighting */}
      <div className="absolute top-1/3 left-1/6 w-[32rem] h-[32rem] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/6 w-[28rem] h-[28rem] bg-sky-500/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mb-10"
        >
          <span className="text-[11px] font-semibold tracking-[0.35em] uppercase text-indigo-400 font-montserrat">
            01 / ABOUT ME
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-indigo-500 via-sky-400 to-transparent" />
        </motion.div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Content (7 Cols) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <motion.div variants={fadeUpVariants} className="mb-6">
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.9] text-white">
                ENGINEERING WITH <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">PRECISION & IMPACT</span>
              </h2>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="space-y-6 text-gray-300 text-base sm:text-lg font-light leading-relaxed mb-8">
              <p>
                I'm an <strong className="text-indigo-400 font-semibold">SDE @ Amazon</strong> and Full Stack & Mobile Developer pursuing my Master's in Computer Science at <strong className="text-white font-semibold">California State University, Long Beach</strong> (<span className="text-sky-400 font-bold">3.778 GPA</span>).
              </p>
              <p>
                My experience spans building cloud systems at <strong className="text-white">Amazon</strong> (AWS Lambda, DynamoDB, SQS, AWS CDK), enterprise-grade multi-tenant platforms, scalable React Native mobile apps, and high-throughput GraphQL microservices. I've led engineering teams to launch production apps impacting over <strong className="text-indigo-400 font-semibold">30,000 active users</strong>.
              </p>
              <p>
                Recognized as an award-winning innovator with the <strong className="text-white">ISTE AP Best Student Innovator Gold Medal</strong> and a <strong className="text-white">Smart India Hackathon National Finalist</strong>, I thrive at the intersection of complex algorithms, seamless UI design, and scalable system architecture.
              </p>
            </motion.div>

            {/* Achievement Badges */}
            <motion.div variants={fadeUpVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-indigo-500/20">
              {[
                { label: 'ISTE GOLD MEDAL', detail: 'Best Innovator 2023' },
                { label: 'SIH NATIONAL', detail: 'Finalist 2022' },
                { label: 'HACKERRANK', detail: 'Top 5% Problem Solver' },
                { label: 'GPA', detail: '3.778 / 4.0 MS CS' },
              ].map((badge) => (
                <div key={badge.label} className="p-3 bg-white/5 rounded-xl border border-indigo-500/25 backdrop-blur-md">
                  <div className="text-[10px] font-montserrat text-indigo-400 tracking-widest font-semibold">{badge.label}</div>
                  <div className="text-xs text-gray-300 mt-1">{badge.detail}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right 3D Interactive Spotlight Card (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="perspective-1000 w-full max-w-md">
              <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                className="relative rounded-3xl p-8 bg-slate-900/60 border border-indigo-500/30 shadow-[0_0_40px_rgba(99,102,241,0.15)] backdrop-blur-2xl overflow-hidden group cursor-pointer"
              >
                {/* Dynamic Mouse Spotlight Overlay */}
                <motion.div
                  className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-3xl"
                  style={{
                    background: spotlightBg,
                    opacity: isCardHovered ? 1 : 0,
                  }}
                />

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between border-b border-indigo-500/20 pb-4">
                    <span className="text-xs font-montserrat tracking-[0.25em] text-indigo-400 font-bold uppercase">
                      STATISTICAL HIGHLIGHTS
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-2">
                    {[
                      { label: 'PROJECTS DELIVERED', value: '25+' },
                      { label: 'USERS IMPACTED', value: '42K+' },
                      { label: 'TECH STACK', value: '20+' },
                      { label: 'EXPERIENCE', value: '3+ YRS' },
                    ].map((stat) => (
                      <div key={stat.label} className="p-4 bg-black/50 rounded-2xl border border-indigo-500/20">
                        <div className="text-3xl font-black bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent tracking-wide">{stat.value}</div>
                        <div className="text-[10px] font-montserrat text-gray-400 tracking-wider uppercase mt-1">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-5 bg-gradient-to-r from-indigo-500/10 via-sky-500/10 to-transparent rounded-2xl border border-indigo-500/30">
                    <div className="text-xs font-montserrat text-indigo-400 font-semibold tracking-wider uppercase mb-1">
                      FEATURED ROLES
                    </div>
                    <div className="text-sm font-semibold text-white">SDE @ Amazon</div>
                    <div className="text-xs text-gray-300 mt-1">AWS Lambda, DynamoDB, SQS, AWS CDK, CI/CD & AI Automations.</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
