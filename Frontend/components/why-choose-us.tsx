"use client";

import { motion } from 'framer-motion';
import { Star, Clock, DollarSign, Shield, Users, Award } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    title: 'On-Time Every Time',
    description: 'We value your time and space. Our staff arrives promptly and completes work efficiently.',
    icon: <Clock className="w-8 h-8 text-[rgb(var(--star-deep-sapphire))]" />,
    stat: '99%',
    statLabel: 'Punctuality'
  },
  {
    title: '24x7 Support',
    description: 'Round-the-clock customer support for emergencies, queries, or additional service requests.',
    icon: <Users className="w-8 h-8 text-[rgb(var(--star-warm-amber))]" />,
    stat: '24x7',
    statLabel: 'Available'
  },
  {
    title: 'Customer Satisfaction',
    description: 'Consistently rated 5-star by families and businesses across Mumbai for quality service.',
    icon: <Star className="w-8 h-8 text-[rgb(var(--star-deep-sapphire))]" fill="currentColor" />,
    stat: '4.9★',
    statLabel: 'Rating'
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-[rgb(var(--star-aqua-mist))]/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-[rgb(var(--star-warm-amber))]/10 rounded-full blur-2xl" />
      
      <div className="container-star">
        {/* Section Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-heading-star mb-6 text-[rgb(var(--star-charcoal))]">
            <span className="font-accent text-[rgb(var(--star-deep-sapphire))]">Why Choose</span>{' '}
            <span className="font-accent text-[rgb(var(--star-warm-amber))]">STAR</span>{' '}
            <span className="font-accent text-[rgb(var(--star-deep-sapphire))]">Housekeeping?</span>
          </h2>
          <p className="text-subtitle-star max-w-4xl mx-auto">
            We bring hotel-level care to every home and office, combining professional expertise 
            with genuine warmth and reliability that Mumbai families trust.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card-floating group relative"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--star-aqua-mist))]/10 to-[rgb(var(--star-deep-sapphire))]/5 opacity-50 group-hover:opacity-70 transition-opacity duration-300 rounded-2xl" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon and Stat */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-white/60 rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    {feature.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[rgb(var(--star-deep-sapphire))]">
                      {feature.stat}
                    </div>
                    <div className="text-xs text-[rgb(var(--star-charcoal))/0.6]">
                      {feature.statLabel}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[rgb(var(--star-charcoal))] mb-3 group-hover:text-[rgb(var(--star-deep-sapphire))] transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-[rgb(var(--star-charcoal))/0.8] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 rounded-2xl bg-gradient-contact relative overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-8 h-8 border border-white/20 rounded-full" />
            <div className="absolute top-8 right-8 w-6 h-6 border border-white/20 rounded-full" />
            <div className="absolute bottom-6 left-1/3 w-4 h-4 border border-white/20 rounded-full" />
            <div className="absolute bottom-4 right-1/4 w-12 h-12 border border-white/20 rounded-full" />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-4 font-accent">
              Ready to Experience the STAR Difference?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Join hundreds of satisfied customers who trust STAR Housekeeping for their cleaning needs. 
              Get your free quote today and see why we're Mumbai's preferred choice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="tel:918652229992">
              <button className="btn-secondary text-lg px-6 py-3">
                Call Now
              </button>
              </Link>
              <Link href="https://wa.me/918652229992" target="_blank" rel="noopener noreferrer">
              <button className="btn-amber-glow text-lg px-6 py-3 bg-white/20 text-white border border-white/30 hover:bg-white hover:text-[rgb(var(--star-deep-sapphire))]">
                Chat on WhatsApp
              </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;