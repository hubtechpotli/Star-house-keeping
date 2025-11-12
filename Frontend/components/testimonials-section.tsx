'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Link from 'next/link';

const testimonials = [
  {
    id: 1,
    name: 'Mrs. Priya Sharma',
    role: 'Homemaker',
    location: 'Bandra, Mumbai',
    feedback: 'The best cleaning service we\'ve had in Mumbai — polite, punctual, and detail-oriented. Our home has never been this spotless!',
    avatar: '/testimonial-1.jpg',
    rating: 5,
  },
  {
    id: 2,
    name: 'Mr. Rajesh Gupta',
    role: 'Business Owner',
    location: 'Andheri, Mumbai',
    feedback: 'STAR Housekeeping transformed our office environment. Professional staff and consistent quality service. Highly recommend!',
    avatar: '/testimonial-2.jpg',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ms. Neha Patel',
    role: 'Working Professional',
    location: 'Powai, Mumbai',
    feedback: 'Reliable and trustworthy service. They handle everything with care and their staff is well-trained. Worth every rupee!',
    avatar: '/testimonial-3.jpg',
    rating: 5,
  },
  {
    id: 4,
    name: 'Dr. Suresh Kumar',
    role: 'Medical Practitioner',
    location: 'Chembur, Mumbai',
    feedback: 'Exceptional deep cleaning service for our clinic. They maintain the highest hygiene standards. Truly professional!',
    avatar: '/testimonial-4.jpg',
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-[rgb(var(--star-aqua-mist))]/10 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-[rgb(var(--star-warm-amber))]/10 rounded-full blur-2xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-[rgb(var(--star-deep-sapphire))]/5 rounded-full blur-3xl" />

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
            <span className="font-accent text-[rgb(var(--star-deep-sapphire))]">What Our</span>{' '}
            <span className="font-accent text-[rgb(var(--star-warm-amber))]">Customers</span>{' '}
            <span className="font-accent text-[rgb(var(--star-deep-sapphire))]">Say</span>
          </h2>
          <p className="text-subtitle-star max-w-3xl mx-auto">
            Don't just take our word for it. Here's what families and businesses
            across Mumbai say about STAR Housekeeping Services.
          </p>
        </motion.div>

        {/* Testimonials Carousel/Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="card-premium group relative overflow-hidden"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-[rgb(var(--star-warm-amber))]/20 group-hover:text-[rgb(var(--star-warm-amber))]/40 transition-colors duration-300">
                <Quote className="w-8 h-8" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Stars */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-[rgb(var(--star-warm-amber))] relative"
                      fill="currentColor"
                    >
                      {/* Micro-glow effect */}
                      <div className="absolute inset-0 bg-[rgb(var(--star-warm-amber))] blur-sm opacity-30 animate-pulse" />
                    </Star>
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-[rgb(var(--star-charcoal))/0.9] text-lg leading-relaxed mb-6 italic">
                  "{testimonial.feedback}"
                </blockquote>

                {/* Customer Info */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[rgb(var(--star-deep-sapphire))]/20 to-[rgb(var(--star-warm-amber))]/20 rounded-full flex items-center justify-center">
                    <span className="text-[rgb(var(--star-deep-sapphire))] font-bold text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[rgb(var(--star-charcoal))] text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-[rgb(var(--star-charcoal))/0.7] text-sm">
                      {testimonial.role}
                    </p>
                    <p className="text-[rgb(var(--star-deep-sapphire))] text-xs font-medium">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--star-aqua-mist))]/10 to-[rgb(var(--star-deep-sapphire))]/5 opacity-50 group-hover:opacity-70 transition-opacity duration-300 -z-10" />
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[rgb(var(--star-aqua-mist))]/30"
        >
          {[
            { number: 'Many', label: 'Happy Families', color: 'text-[rgb(var(--star-warm-amber))]' },
            { number: 'Many', label: 'Business Clients', color: 'text-[rgb(var(--star-deep-sapphire))]' },
            { number: '4.9★', label: 'Average Rating', color: 'text-[rgb(var(--star-warm-amber))]' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                {stat.number}
              </div>
              <div className="text-sm text-[rgb(var(--star-charcoal))/0.7]">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 card-premium"
        >
          <h3 className="text-2xl font-bold text-[rgb(var(--star-charcoal))] mb-4 font-accent">
            Join Our Happy Customers
          </h3>
          <p className="text-[rgb(var(--star-charcoal))/0.8] mb-6 max-w-2xl mx-auto">
            Experience the STAR difference for yourself. Book a service today and see why
            Mumbai families trust us for all their housekeeping needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={'/services'} className="btn-amber-glow text-lg px-6 py-3">
              Services
            </Link>
            <Link href={'/contact'} className="btn-outline-sapphire text-lg px-6 py-3">
              Get Quote
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;