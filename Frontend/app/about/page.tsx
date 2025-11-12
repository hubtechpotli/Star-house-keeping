"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Award, 
  Users, 
  Shield, 
  Clock, 
  Heart,
  CheckCircle,
  Target,
  Sparkles,
  Home,
  Building,
  TreePine,
  Phone
} from 'lucide-react';
import Navigation from '@/components/navigation';
import FooterNew from '@/components/footer-new';

export default function AboutPage() {
  const stats = [
    {
      number: 'Many',
      label: 'Happy Customers',
      icon: Users,
      color: 'text-[rgb(var(--star-warm-amber))]'
    },
    {
      number: '24x7',
      label: 'Service Available',
      icon: Clock,
      color: 'text-[rgb(var(--star-warm-amber))]'
    },
    {
      number: '100%',
      label: 'Satisfaction Rate',
      icon: Star,
      color: 'text-[rgb(var(--star-deep-sapphire))]'
    }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Trust & Reliability',
      description: 'Background-verified professionals you can trust in your home and office.',
      gradient: 'from-[rgb(var(--star-deep-sapphire))]/10 to-[rgb(var(--star-aqua-mist))]/20'
    },
    {
      icon: Sparkles,
      title: 'Excellence in Service',
      description: 'Premium quality cleaning with attention to every detail and corner.',
      gradient: 'from-[rgb(var(--star-warm-amber))]/10 to-[rgb(var(--star-aqua-mist))]/15'
    },
    {
      icon: Heart,
      title: 'Customer Care',
      description: 'Your satisfaction is our priority with personalized service solutions.',
      gradient: 'from-[rgb(var(--star-aqua-mist))]/20 to-[rgb(var(--star-deep-sapphire))]/10'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Modern cleaning techniques and eco-friendly products for best results.',
      gradient: 'from-[rgb(var(--star-deep-sapphire))]/8 to-[rgb(var(--star-warm-amber))]/8'
    }
  ];

  const services = [
    {
      icon: Home,
      title: 'Residential Cleaning',
      description: 'Complete home cleaning for apartments and houses'
    },
    {
      icon: Building,
      title: 'Commercial Spaces',
      description: 'Professional office and business cleaning'
    },
    {
      icon: Sparkles,
      title: 'Deep Cleaning',
      description: 'Intensive cleaning for special occasions'
    },
    {
      icon: TreePine,
      title: 'Garden Care',
      description: 'Outdoor space maintenance and care'
    }
  ];

  const achievements = [
    'ISO 9001:2015 Quality Management Certified',
    'Mumbai Municipal Corporation Approved',
    'Member of Indian Cleaning Association',
    'Eco-Friendly Cleaning Practices Certified',
    'Staff Training & Development Programs',
    '24x7 Emergency Response Team'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[rgb(var(--star-aqua-mist))]/10 to-white overflow-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container-star">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-heading-star mb-6 text-[rgb(var(--star-charcoal))]">
              About{' '}
              <span className="font-accent text-[rgb(var(--star-deep-sapphire))]">STAR</span>{' '}
              <span className="font-accent text-[rgb(var(--star-warm-amber))]">Housekeeping</span>
            </h1>
            <p className="text-subtitle-star max-w-4xl mx-auto">
              Mumbai's trusted housekeeping service provider, delivering premium cleaning solutions 
              with integrity, excellence, and care since 2019.
              <span className="block mt-4 text-[rgb(var(--star-deep-sapphire))] font-medium">
                Founded by Dinesh Piliger • Serving Many Satisfied Customers
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[rgb(var(--star-aqua-mist))]/20 to-[rgb(var(--star-aqua-mist))]/10">
        <div className="container-star">
          <div className="grid grid-col-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg w-fit mx-auto mb-4 group-hover:shadow-xl transition-shadow duration-300">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-[rgb(var(--star-charcoal))] mb-2">
                  {stat.number}
                </div>
                <div className="text-[rgb(var(--star-charcoal))]/70 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4">
        <div className="container-star">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Story */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-[rgb(var(--star-charcoal))] mb-6">
                Our <span className="text-[rgb(var(--star-warm-amber))]">Journey</span>
              </h2>
              
              <div className="space-y-6 text-[rgb(var(--star-charcoal))]/80 leading-relaxed">
                <p>
                  Starting from <strong>Chembur, Mumbai</strong>, we recognized the growing need 
                  for quality housekeeping services in the bustling metropolis. What began as a small team 
                  of dedicated professionals has grown into Mumbai's most trusted cleaning service provider.
                </p>
                
                <p>
                  Today, we proudly serve over <strong className="text-[rgb(var(--star-warm-amber))]">Many satisfied customers</strong> across 
                  Mumbai, from cozy apartments to large commercial spaces. Our commitment to excellence, 
                  integrity, and customer satisfaction remains unchanged.
                </p>
              </div>
            </motion.div>

            {/* Right Side - Image/Founder Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card-premium p-8"
            >
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-[rgb(var(--star-deep-sapphire))] to-[rgb(var(--star-warm-amber))] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Star className="w-12 h-12 text-white fill-current" />
                </div>
                <h3 className="text-2xl font-bold text-[rgb(var(--star-charcoal))] mb-2">
                  Dinesh Piliger
                </h3>
                <p className="text-[rgb(var(--star-deep-sapphire))] font-medium mb-4">
                  Founder & CEO
                </p>
              </div>

              <div className="space-y-4 text-sm text-[rgb(var(--star-charcoal))]/80">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-[rgb(var(--star-warm-amber))]" />
                  <span>Cleaning industry</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-[rgb(var(--star-warm-amber))]" />
                  <span>Hospitality management background</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-[rgb(var(--star-warm-amber))]" />
                  <span>Customer service excellence advocate</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-[rgb(var(--star-warm-amber))]" />
                  <span>Mumbai local community supporter</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[rgb(var(--star-aqua-mist))]/30">
                <div className="flex items-center space-x-2 text-[rgb(var(--star-deep-sapphire))]">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">86522 29992</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 bg-gradient-to-br from-[rgb(var(--star-aqua-mist))]/15 to-white">
        <div className="container-star">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-[rgb(var(--star-charcoal))] mb-4">
              Our <span className="text-[rgb(var(--star-warm-amber))]">Core Values</span>
            </h2>
            <p className="text-subtitle-star max-w-3xl mx-auto">
              The principles that guide every aspect of our service delivery and customer relationships.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-premium group text-center relative overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} group-hover:opacity-80 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative z-10 p-6">
                  <div className="p-4 bg-white/50 rounded-xl shadow-md w-fit mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-[rgb(var(--star-warm-amber))]" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-[rgb(var(--star-charcoal))] mb-3">
                    {value.title}
                  </h3>
                  
                  <p className="text-[rgb(var(--star-charcoal))]/70 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 px-4">
        <div className="container-star">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-[rgb(var(--star-charcoal))] mb-4">
              What We <span className="text-[rgb(var(--star-warm-amber))]">Offer</span>
            </h2>
            <p className="text-subtitle-star max-w-3xl mx-auto">
              Comprehensive cleaning solutions tailored for homes, offices, and special requirements.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="p-4 bg-[rgb(var(--star-aqua-mist))]/20 rounded-xl w-fit mx-auto mb-4 group-hover:bg-[rgb(var(--star-warm-amber))]/10 transition-colors duration-300">
                  <service.icon className="w-8 h-8 text-[rgb(var(--star-deep-sapphire))]" />
                </div>
                <h3 className="text-lg font-bold text-[rgb(var(--star-charcoal))] mb-2">
                  {service.title}
                </h3>
                <p className="text-[rgb(var(--star-charcoal))]/70 text-sm">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <a 
              href="/services" 
              className="btn-sapphire-glow inline-flex items-center space-x-2 px-8 py-3"
            >
              <span>View All Services</span>
              <Sparkles className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Achievements & Certifications */}
      <section className="py-16 px-4 bg-gradient-to-r from-[rgb(var(--star-deep-sapphire))]/5 to-[rgb(var(--star-aqua-mist))]/20">
        <div className="container-star">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Achievements */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-[rgb(var(--star-charcoal))] mb-8">
                Our <span className="text-[rgb(var(--star-warm-amber))]">Achievements</span>
              </h2>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/20 transition-colors duration-300"
                  >
                    <div className="p-1 bg-[rgb(var(--star-warm-amber))]/20 rounded-full mt-1">
                      <Award className="w-4 h-4 text-[rgb(var(--star-warm-amber))]" />
                    </div>
                    <span className="text-[rgb(var(--star-charcoal))]/80 leading-relaxed">
                      {achievement}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card-premium p-8"
            >
              <h3 className="text-2xl font-bold text-[rgb(var(--star-charcoal))] mb-6">
                Ready to Experience <span className="text-[rgb(var(--star-warm-amber))]">STAR</span> Service?
              </h3>
              
              <p className="text-[rgb(var(--star-charcoal))]/70 mb-6 leading-relaxed">
                Join hundreds of satisfied customers across Mumbai who trust STAR Housekeeping 
                for their cleaning needs.
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-[rgb(var(--star-warm-amber))]" />
                  <div>
                    <p className="font-medium text-[rgb(var(--star-charcoal))]">Call Us Now</p>
                    <p className="text-[rgb(var(--star-deep-sapphire))] font-medium">86522 29992</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-[rgb(var(--star-warm-amber))]" />
                  <div>
                    <p className="font-medium text-[rgb(var(--star-charcoal))]">Service Hours</p>
                    <p className="text-[rgb(var(--star-charcoal))]/70">24x7 Available</p>
                  </div>
                </div>
              </div>

              <a 
                href="/contact" 
                className="btn-amber-glow w-full text-center py-3 inline-block"
              >
                Get Free Quote Today
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <FooterNew />
    </div>
  );
}
