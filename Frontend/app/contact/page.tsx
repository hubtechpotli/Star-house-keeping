"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Star, Send, CheckCircle } from 'lucide-react';
import Navigation from '@/components/navigation';
import FooterNew from '@/components/footer-new';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    serviceType: '',
    message: ''
  });

  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      title: '24/7 Service Hotline',
      details: ['86522 29992', '80971 44114'],
      color: 'from-[rgb(var(--star-warm-amber))] to-[rgb(var(--star-warm-amber))]/80',
      description: 'Call us anytime for immediate assistance'
    },
    {
      icon: MapPin,
      title: 'Head Office',
      details: ['154, Shahaji Nagar, Aziz Baug,', 'R.C. Marg, Chembur, Mumbai - 400074'],
      color: 'from-[rgb(var(--star-warm-amber))] to-[rgb(var(--star-deep-sapphire))]',
      description: 'Visit us for in-person consultation'
    },
    {
      icon: Clock,
      title: 'Service Hours',
      details: ['24x7 Service Available', 'Emergency Support: Anytime'],
      color: 'from-[rgb(var(--star-deep-sapphire))] to-[rgb(var(--star-warm-amber))]',
      description: 'We are always ready to serve you'
    }
  ];

  const serviceTypes = [
    { value: 'residential', label: 'Residential Cleaning' },
    { value: 'office', label: 'Office Cleaning' },
    { value: 'deep', label: 'Deep Cleaning' },
    { value: 'laundry', label: 'Laundry Services' },
    { value: 'garden', label: 'Garden Care' },
    { value: 'staff', label: 'Staff Placement' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowPopup(true);

    // Auto-close popup and reset form
    setTimeout(() => {
      setShowPopup(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        serviceType: '',
        message: ''
      });
    }, 3000);
  };

  const handleWhatsAppContact = () => {
    const whatsappNumber = '+918652229992';
    const serviceName = serviceTypes.find(s => s.value === formData.serviceType)?.label || 'General Inquiry';
    
    const whatsappMessage = `🏠 *STAR Housekeeping - Service Inquiry*

Hello STAR Housekeeping Team,

I would like to book the following service:

👤 *Name:* ${formData.firstName} ${formData.lastName || ''}
📞 *Phone:* ${formData.mobile || '[Phone Number]'}
📧 *Email:* ${formData.email || '[Email Address]'}
🧹 *Service Type:* ${serviceName}
💬 *Message:* ${formData.message || '[Additional Information]'}

Please provide details about pricing, availability, and schedule.

Thank you! 🙏`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber.replace('+', '')}&text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleQuickWhatsApp = () => {
    const whatsappNumber = '+918652229992';
    const quickMessage = `🏠 *STAR Housekeeping Services*

Hello! I need information about your housekeeping services in Mumbai.

Please let me know about availability and rates.

Thank you! 🙏`;

    const encodedMessage = encodeURIComponent(quickMessage);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber.replace('+', '')}&text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

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
              <span className="font-accent text-[rgb(var(--star-deep-sapphire))]">Get in</span>{' '}
              <span className="font-accent text-[rgb(var(--star-warm-amber))]">Touch</span>
            </h1>
            <p className="text-subtitle-star max-w-3xl mx-auto">
              Ready to experience premium housekeeping services? Contact us today for a free consultation.
              <span className="block mt-2 text-[rgb(var(--star-deep-sapphire))] font-medium">
                Your satisfaction is our commitment.
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4 bg-gradient-to-r from-[rgb(var(--star-aqua-mist))]/20 to-[rgb(var(--star-aqua-mist))]/10">
        <div className="container-star">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-premium group text-center relative overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />

                {/* Content */}
                <div className="relative z-10">
                  <div className="p-4 bg-white/50 rounded-xl shadow-md w-fit mx-auto mb-4 group-hover:shadow-lg transition-shadow duration-300">
                    <info.icon className="w-8 h-8 text-[rgb(var(--star-warm-amber))]" />
                  </div>

                  <h3 className="text-lg font-bold text-[rgb(var(--star-charcoal))] mb-2">
                    {info.title}
                  </h3>

                  <p className="text-sm text-[rgb(var(--star-charcoal))]/70 mb-4">
                    {info.description}
                  </p>

                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-[rgb(var(--star-deep-sapphire))] font-medium">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4">
        <div className="container-star">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card-premium"
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold text-[rgb(var(--star-charcoal))] mb-2">
                  Request a <span className="text-[rgb(var(--star-warm-amber))]">Free Quote</span>
                </h2>
                <p className="text-[rgb(var(--star-charcoal))]/70 mb-8">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[rgb(var(--star-charcoal))] mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-[rgb(var(--star-aqua-mist))]/50 rounded-lg focus:ring-2 focus:ring-[rgb(var(--star-deep-sapphire))]/20 focus:border-[rgb(var(--star-deep-sapphire))] transition-colors"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[rgb(var(--star-charcoal))] mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-[rgb(var(--star-aqua-mist))]/50 rounded-lg focus:ring-2 focus:ring-[rgb(var(--star-deep-sapphire))]/20 focus:border-[rgb(var(--star-deep-sapphire))] transition-colors"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  {/* Email & Mobile */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[rgb(var(--star-charcoal))] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-[rgb(var(--star-aqua-mist))]/50 rounded-lg focus:ring-2 focus:ring-[rgb(var(--star-deep-sapphire))]/20 focus:border-[rgb(var(--star-deep-sapphire))] transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[rgb(var(--star-charcoal))] mb-2">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-[rgb(var(--star-aqua-mist))]/50 rounded-lg focus:ring-2 focus:ring-[rgb(var(--star-deep-sapphire))]/20 focus:border-[rgb(var(--star-deep-sapphire))] transition-colors"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  {/* Service Type */}
                  <div>
                    <label className="block text-sm font-medium text-[rgb(var(--star-charcoal))] mb-2">
                      Service Required *
                    </label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[rgb(var(--star-aqua-mist))]/50 rounded-lg focus:ring-2 focus:ring-[rgb(var(--star-deep-sapphire))]/20 focus:border-[rgb(var(--star-deep-sapphire))] transition-colors bg-white"
                    >
                      <option value="">Select a service...</option>
                      {serviceTypes.map((service) => (
                        <option key={service.value} value={service.value}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-[rgb(var(--star-charcoal))] mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-[rgb(var(--star-aqua-mist))]/50 rounded-lg focus:ring-2 focus:ring-[rgb(var(--star-deep-sapphire))]/20 focus:border-[rgb(var(--star-deep-sapphire))] transition-colors resize-none"
                      placeholder="Tell us about your specific requirements, property size, preferred timings, or any special instructions..."
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    {/* WhatsApp Button */}
                    <button
                      type="button"
                      onClick={handleWhatsAppContact}
                      className="w-full btn-outline-sapphire py-4 text-lg font-medium flex items-center justify-center space-x-3"
                    >
                      <Phone className="w-5 h-5" />
                      <span>Send via WhatsApp</span>
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Right Side - Why Choose Us */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="card-premium p-8">
                <h3 className="text-2xl font-bold text-[rgb(var(--star-charcoal))] mb-6">
                  Why Choose <span className="text-[rgb(var(--star-warm-amber))]">STAR</span> Housekeeping?
                </h3>

                <div className="space-y-4">
                  {[
                    'Trusted by Many satisfied customers across Mumbai',
                    'Professional, trained, and background-verified staff',
                    '24x7 customer support and emergency services',
                    'Eco-friendly cleaning products and techniques',
                    'Flexible scheduling to suit your lifestyle',
                    'Competitive pricing with transparent billing',
                    '100% satisfaction guarantee on all services'
                  ].map((point, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="p-1 bg-[rgb(var(--star-warm-amber))]/10 rounded-full mt-1">
                        <CheckCircle className="w-4 h-4 text-[rgb(var(--star-warm-amber))]" />
                      </div>
                      <span className="text-[rgb(var(--star-charcoal))]/80 leading-relaxed">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp Quick Contact */}
              <div className="card-premium p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[rgb(var(--star-charcoal))]">
                      Instant WhatsApp Support
                    </h3>
                    <p className="text-sm text-[rgb(var(--star-charcoal))]/60">
                      Get immediate assistance
                    </p>
                  </div>
                </div>
                
                <p className="text-[rgb(var(--star-charcoal))]/80 mb-4 leading-relaxed">
                  Need quick help or have urgent cleaning requirements? Connect with us instantly on WhatsApp for immediate assistance.
                </p>

                <button
                  onClick={handleQuickWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 font-medium"
                >
                  <Phone className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </button>

                <p className="text-xs text-[rgb(var(--star-charcoal))]/50 text-center mt-2">
                  Available 24x7 • Response within minutes
                </p>
              </div>

              {/* Customer Testimonial */}
              <div className="card-premium p-8 bg-gradient-to-br from-[rgb(var(--star-deep-sapphire))]/5 to-[rgb(var(--star-warm-amber))]/5">
                <div className="flex items-center space-x-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-[rgb(var(--star-warm-amber))] fill-current" />
                  ))}
                </div>

                <p className="text-[rgb(var(--star-charcoal))]/80 italic mb-4 leading-relaxed">
                  "STAR Housekeeping has been a lifesaver for our busy family. Their attention to detail is impeccable,
                  and the staff is incredibly professional. Highly recommended!"
                </p>

                <div className="text-sm">
                  <p className="font-medium text-[rgb(var(--star-charcoal))]">- Priya Sharma</p>
                  <p className="text-[rgb(var(--star-charcoal))]/60">Residential Customer, Chembur</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Popup */}
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
          >
            <div className="p-4 bg-[rgb(var(--star-warm-amber))]/10 rounded-full w-fit mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-[rgb(var(--star-warm-amber))]" />
            </div>

            <h3 className="text-2xl font-bold text-[rgb(var(--star-charcoal))] mb-4">
              Message Sent Successfully!
            </h3>

            <p className="text-[rgb(var(--star-charcoal))]/70 mb-6 leading-relaxed">
              Thank you for reaching out to STAR Housekeeping. Our team will contact you within 24 hours to discuss your requirements.
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="btn-outline-sapphire px-6 py-2"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}

      <FooterNew />
    </div>
  );
}
