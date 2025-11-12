"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Star, Home } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Premium Background System */}
      <div className="absolute inset-0">
        {/* Hero Background Image - Main Focus */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('/hero.webp')",
          }}
        />
        
        {/* Subtle Professional Overlay - Maintains Image Visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
        
        {/* Premium Accent Elements */}
        <div className="absolute top-20 right-20 w-24 h-24 border border-[rgb(var(--star-warm-amber))]/30 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-32 left-20 w-16 h-16 border-2 border-white/20 rotate-45 animate-float-reverse"></div>
        
        {/* Elegant Floating Particles */}
        <div className="absolute top-1/4 left-1/5 w-2 h-2 bg-[rgb(var(--star-warm-amber))] rounded-full animate-floating-sparks opacity-80 shadow-lg shadow-[rgb(var(--star-warm-amber))]/50" />
        <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-white rounded-full animate-floating-sparks opacity-60" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-1/3 left-2/3 w-2.5 h-2.5 bg-[rgb(var(--star-warm-amber))] rounded-full animate-floating-sparks opacity-70" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative z-10 container-star pt-24 pb-16 text-center">
        
        {/* Award-Winning Hero Content */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          
          {/* Premium Logo with Glow */}
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="mb-12 flex justify-center"
          >
            <div className="relative group">
              {/* Glowing Background */}
              <div className="absolute inset-0 w-20 h-20 -m-2 bg-[rgb(var(--star-warm-amber))]/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              
              <Star 
                className="relative w-16 h-16 text-[rgb(var(--star-warm-amber))] drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-300" 
                fill="currentColor" 
              />
              <Home 
                className="absolute inset-0 w-8 h-8 m-4 text-white drop-shadow-lg animate-pulse" 
              />
              
              {/* Orbiting Ring */}
              <motion.div
                className="absolute -inset-4 w-24 h-24 border border-white/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>

          {/* Headline with Premium Typography */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-accent font-bold leading-tight tracking-tight">
              <span className="block text-white drop-shadow-2xl">Your Space,</span>
              <span className="block text-[rgb(var(--star-warm-amber))] drop-shadow-2xl mt-2">Our Care.</span>
            </h1>
          </motion.div>

          {/* Elegant Subtitle */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            className="mb-12"
          >
            <p className="text-xl md:text-2xl text-white/90 font-medium leading-relaxed max-w-3xl mx-auto">
              Professional Housekeeping Services for Homes & Businesses
            </p>
            <p className="text-lg md:text-xl text-[rgb(var(--star-warm-amber))] font-semibold mt-3">
              Trusted • Reliable • Always at your service
            </p>
          </motion.div>

          {/* Premium CTA Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <motion.div 
              whileHover={{ scale: 1.05, y: -3 }} 
              whileTap={{ scale: 0.98 }}
              className="group"
            >
              <Link
                href="/contact"
                className="relative inline-flex items-center gap-3 px-10 py-5 bg-[rgb(var(--star-deep-sapphire))] text-white font-semibold text-lg rounded-2xl shadow-2xl shadow-[rgb(var(--star-deep-sapphire))]/30 hover:shadow-[rgb(var(--star-deep-sapphire))]/50 transition-all duration-300 overflow-hidden group"
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                
                <span className="relative z-10">Contact Us</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05, y: -3 }} 
              whileTap={{ scale: 0.98 }}
              className="group"
            >
              <Link
                href="/services"
                className="relative inline-flex items-center gap-3 px-10 py-5 bg-[rgb(var(--star-warm-amber))] text-[rgb(var(--star-deep-sapphire))] font-semibold text-lg rounded-2xl shadow-2xl shadow-[rgb(var(--star-warm-amber))]/30 hover:shadow-[rgb(var(--star-warm-amber))]/50 transition-all duration-300 overflow-hidden group"
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                
                <span className="relative z-10 font-bold">View Services</span>
                <Sparkles className="relative z-10 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1 }}
            className="flex flex-wrap justify-center items-center gap-8"
          >
            <motion.div 
              className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 hover:bg-white/15 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-3 h-3 bg-[rgb(var(--star-warm-amber))] rounded-full shadow-lg shadow-[rgb(var(--star-warm-amber))]/50"></div>
              <span className="font-medium">24x7 Service</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 hover:bg-white/15 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-3 h-3 bg-white rounded-full shadow-lg"></div>
              <span className="font-medium">Verified Staff</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 hover:bg-white/15 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-3 h-3 bg-[rgb(var(--star-warm-amber))] rounded-full shadow-lg shadow-[rgb(var(--star-warm-amber))]/50"></div>
              <span className="font-medium">Mumbai Based</span>
            </motion.div>
          </motion.div>
          
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-[rgb(var(--star-deep-sapphire))]/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[rgb(var(--star-deep-sapphire))]/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;