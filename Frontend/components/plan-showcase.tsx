"use client";

import Link from 'next/link';
import { Home, Building, Sparkles, Shirt, TreePine, Users, Clock, Shield, Star, Phone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

function ServicesShowcase() {
  const handleWhatsAppContact = (type: string, name: string) => {
    const whatsappNumber = '+918652229992';

    const whatsappMessage = 
      `*${type} Inquiry* 🏠

Hello STAR Housekeeping Team,
I am interested in the following service:

✅ ${name}

Please share more details about the packages, pricing, and availability.

Looking forward to professional housekeeping service!

Thanks & Regards`;

      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber.replace('+', '')}&text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank');
  };

  const services = [
    {
      id: 1,
      name: 'Residential Cleaning',
      tagline: 'Spotless homes. Peaceful living.',
      description: 'Comprehensive home cleaning services for apartments, bungalows, and residential complexes across Mumbai.',
      features: ['Daily/Weekly/Monthly', 'Deep Cleaning', 'Kitchen & Bathroom', 'Dusting & Mopping', 'Eco-Friendly Products'],
      icon: <Home className="w-8 h-8 text-[rgb(var(--star-warm-amber))]" />,
      popular: false,
      gradient: 'from-[rgb(var(--star-aqua-mist))]/20 to-[rgb(var(--star-deep-sapphire))]/5'
    },
    {
      id: 2,
      name: 'Office Cleaning',
      tagline: 'Productivity begins with hygiene.',
      description: 'Professional commercial cleaning for offices, coworking spaces, and business establishments.',
      features: ['Corporate Standards', 'Night Shift Available', 'Sanitization', 'Restroom Maintenance', 'Waste Management'],
      icon: <Building className="w-8 h-8 text-[rgb(var(--star-deep-sapphire))]" />,
      popular: true,
      gradient: 'from-[rgb(var(--star-deep-sapphire))]/10 to-[rgb(var(--star-warm-amber))]/5'
    },
    {
      id: 3,
      name: 'Deep Cleaning',
      tagline: 'From corners to ceilings, perfection.',
      description: 'Intensive cleaning service for move-ins, festivals, post-renovation, and special occasions.',
      features: ['Complete Sanitization', 'Appliance Cleaning', 'Wall & Ceiling', 'Pest Control Ready', 'Post-Construction'],
      icon: <Sparkles className="w-8 h-8 text-[rgb(var(--star-warm-amber))]" />,
      popular: false,
      gradient: 'from-[rgb(var(--star-warm-amber))]/10 to-[rgb(var(--star-aqua-mist))]/20'
    },
    {
      id: 4,
      name: 'Laundry & Utility',
      tagline: 'Freshness, delivered.',
      description: 'Professional laundry services, ironing, and utility maintenance for homes and offices.',
      features: ['Wash & Fold', 'Ironing Service', 'Dry Cleaning', 'Pickup & Delivery', 'Fabric Care'],
      icon: <Shirt className="w-8 h-8 text-[rgb(var(--star-deep-sapphire))]" />,
      popular: false,
      gradient: 'from-[rgb(var(--star-aqua-mist))]/15 to-[rgb(var(--star-deep-sapphire))]/10'
    },
    {
      id: 5,
      name: 'Garden & Outdoor Care',
      tagline: 'Eco-friendly green maintenance.',
      description: 'Maintenance of gardens, terraces, and outdoor spaces with environmentally conscious practices.',
      features: ['Garden Maintenance', 'Plant Care', 'Terrace Cleaning', 'Pressure Washing', 'Seasonal Care'],
      icon: <TreePine className="w-8 h-8 text-[rgb(var(--star-warm-amber))]" />,
      popular: false,
      gradient: 'from-[rgb(var(--star-warm-amber))]/5 to-[rgb(var(--star-aqua-mist))]/25'
    },
    {
      id: 6,
      name: 'Part-Time / Full-Time Staff',
      tagline: 'Trusted professionals for every need.',
      description: 'Verified and trained domestic staff for part-time or full-time housekeeping requirements.',
      features: ['Background Verified', 'Trained Professionals', 'Flexible Timings', 'Replacement Guarantee', 'Ongoing Support'],
      icon: <Users className="w-8 h-8 text-[rgb(var(--star-deep-sapphire))]" />,
      popular: false,
      gradient: 'from-[rgb(var(--star-deep-sapphire))]/8 to-[rgb(var(--star-warm-amber))]/8'
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-white to-[rgb(var(--star-aqua-mist))]/20 overflow-hidden">
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
            <span className="font-accent text-[rgb(var(--star-deep-sapphire))]">Premium</span>{' '}
            <span className="font-accent text-[rgb(var(--star-warm-amber))]">Housekeeping</span>{' '}
            <span className="font-accent text-[rgb(var(--star-deep-sapphire))]">Services</span>
          </h2>
          <p className="text-subtitle-star max-w-3xl mx-auto">
            Professional cleaning and housekeeping services designed to give you more time for what matters most.
            <span className="block mt-2 text-[rgb(var(--star-deep-sapphire))] font-medium">
              Trusted by hundreds of families and businesses across Mumbai.
            </span>
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`card-premium group relative overflow-hidden ${service.popular ? 'ring-2 ring-[rgb(var(--star-warm-amber))]/50' : ''}`}
            >

              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-50 group-hover:opacity-70 transition-opacity duration-300`} />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon & Title */}
                <div className="flex items-start space-x-4 mb-4">
                  <div className="p-3 bg-white/50 rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[rgb(var(--star-charcoal))] mb-1">
                      {service.name}
                    </h3>
                    <p className="text-sm font-medium text-[rgb(var(--star-deep-sapphire))]">
                      {service.tagline}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[rgb(var(--star-charcoal))/0.8] mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-[rgb(var(--star-warm-amber))] rounded-full" />
                      <span className="text-sm text-[rgb(var(--star-charcoal))/0.8]">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => handleWhatsAppContact("Service", service.name)}
                    className="flex-1 btn-amber-glow text-sm flex items-center justify-center space-x-2 group"
                  >
                    <span>Service Now</span>
                  </button>
                  <Link 
                    href="/contact"
                    className="flex-1 btn-outline-sapphire group-hover:bg-[rgb(var(--star-deep-sapphire))] group-hover:text-white text-sm flex items-center justify-center space-x-2"
                  >
                    <span>Contact</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-[rgb(var(--star-aqua-mist))]/30"
        >
          {[
            { icon: <Clock className="w-6 h-6" />, number: '24x7', label: 'Service Available' },
            { icon: <Shield className="w-6 h-6" />, number: 'Many', label: 'Happy Clients' },
            { icon: <Users className="w-6 h-6" />, number: 'Years', label: 'Of Experience' },
            { icon: <Star className="w-6 h-6" fill="currentColor" />, number: '4.9', label: 'Rating' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-2 text-[rgb(var(--star-warm-amber))]">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-[rgb(var(--star-deep-sapphire))] mb-1">
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
          className="text-center mt-16"
        >
          <Link
            href="/contact"
            className="btn-amber-glow text-lg px-8 py-4 inline-flex items-center space-x-3 group"
          >
            <span>Get Free Quote</span>
            <Sparkles className="w-5 h-5 group-hover:animate-spin" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesShowcase;
