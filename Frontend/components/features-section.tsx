"use client";

import { motion } from 'framer-motion';

// World-class, abstract SVG icons

// Artistic travel-themed SVG icons
const icons = [
  () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M20 5 L25 20 L20 35 L15 20 Z" fill="#E5E1DA" stroke="#C2B280" strokeWidth="2.5" /><circle cx="20" cy="20" r="6" fill="#C2B280" /><path d="M20 20 L20 10" stroke="#232323" strokeWidth="2" /></svg>
  ),
  () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><ellipse cx="20" cy="20" rx="15" ry="8" stroke="#C2B280" strokeWidth="2.5" /><circle cx="20" cy="20" r="4" fill="#C2B280" /><path d="M20 20 L32 20" stroke="#232323" strokeWidth="2" /></svg>
  ),
  () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="10" y="10" width="20" height="12" rx="6" fill="#E5E1DA" stroke="#C2B280" strokeWidth="2.5" /><circle cx="20" cy="16" r="4" fill="#C2B280" /><path d="M20 16 L20 10" stroke="#232323" strokeWidth="2" /></svg>
  ),
  () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M10 30 Q20 10 30 30" stroke="#C2B280" strokeWidth="2.5" fill="none" /><circle cx="20" cy="20" r="5" fill="#C2B280" /><path d="M20 20 L10 30" stroke="#232323" strokeWidth="2" /></svg>
  ),
  () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="12" y="12" width="16" height="16" rx="8" fill="#E5E1DA" stroke="#C2B280" strokeWidth="2.5" /><circle cx="20" cy="20" r="6" fill="#C2B280" /><path d="M20 20 L28 28" stroke="#232323" strokeWidth="2" /></svg>
  ),
  () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><ellipse cx="20" cy="20" rx="15" ry="10" stroke="#C2B280" strokeWidth="2.5" /><circle cx="20" cy="20" r="4" fill="#C2B280" /><path d="M20 20 L20 30" stroke="#232323" strokeWidth="2" /></svg>
  ),
];

const features = [
  {
    title: 'Curated Destinations',
    description: 'Handpicked journeys to the world’s most inspiring places.',
  },
  {
    title: 'Artful Experiences',
    description: 'Travel meets creativity—immersive tours, workshops, and local artistry.',
  },
  {
    title: 'Signature Guides',
    description: 'Expert guides with a passion for storytelling and discovery.',
  },
  {
    title: 'Elegant Stays',
    description: 'Boutique hotels and unique lodgings for every adventure.',
  },
  {
    title: 'Seamless Planning',
    description: 'Personalized itineraries, easy Renting, and 24/7 support.',
  },
  {
    title: 'Memorable Moments',
    description: 'Capture memories with exclusive events and photo experiences.',
  },
];

const stats = [
  { number: '80+', label: 'Destinations' },
  { number: '25+', label: 'Countries' },
  { number: '10K+', label: 'Happy Travelers' },
  { number: 'Many', label: 'Artful Journeys' },
];

const FeaturesSection = () => {
  return (
    <section className="relative py-28 px-4 bg-gradient-to-br from-[#F8F6F0] via-[#E5E1DA]/70 to-[#C2B280]/30 overflow-x-hidden transition-colors duration-500">
      {/* Decorative abstract shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#C2B280]/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#232323]/10 rounded-full blur-2xl -z-10" />
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-5xl md:text-6xl font-bold text-center mb-20 text-[#232323] drop-shadow-lg tracking-tight">
          Artistic Features for Travelers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 mb-20">
          {features.map((feature, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative rounded-2xl p-12 shadow-xl border border-[#C2B280]/30 bg-white/80 backdrop-blur-xl flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
              >
                <div className="mb-6 p-6 rounded-full bg-[#C2B280]/20 shadow-lg animate-bounce-slow group-hover:scale-110 transition-transform duration-300">
                  <Icon />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-3 text-[#232323] group-hover:text-[#C2B280] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="font-sans text-[#232323]/80 text-base font-medium leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-10 mt-12"
        >
          {stats.map(({ number, label }, i) => (
            <div key={label} className="flex flex-col items-center bg-white/90 backdrop-blur-lg rounded-2xl px-10 py-8 shadow border border-[#C2B280]/20 min-w-[180px] transition-colors duration-700 hover:bg-[#C2B280]/10">
              <span className="text-3xl font-black text-[#232323] mb-2 font-sans">{number}</span>
              <span className="text-[#232323]/70 text-lg font-semibold font-sans">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;