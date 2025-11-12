"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Star, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/about" }
  ];

  return (
    <nav className="fixed top-0 w-full nav-glass z-50 shadow-lg">
      <div className="container-star">
        <div className="flex justify-between items-center py-4">
          {/* STAR Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div 
              className="relative w-10 h-10 text-[rgb(var(--star-warm-amber))]"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Star className="w-full h-full animate-star-morph" fill="currentColor" />
              <div className="absolute inset-0 bg-[rgb(var(--star-warm-amber))] rounded-full blur-lg opacity-20 animate-floating-sparks"></div>
            </motion.div>
            <div className="flex flex-col">
              <span className="font-bold font-accent text-xl text-[rgb(var(--star-deep-sapphire))] leading-tight">
                STAR
              </span>
              <span className="font-bold font-accent text-sm text-[rgb(var(--star-deep-sapphire))] leading-tight">
                HOUSEKEEPING SERVICES
              </span>
              <span className="mt-1 text-xs font-medium italic text-[rgb(var(--star-charcoal))/0.7] leading-none">
                Part Time & Full Time
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[rgb(var(--star-charcoal))] text-lg font-medium relative group px-3 py-2 transition-colors duration-300 hover:text-[rgb(var(--star-deep-sapphire))] gradient-underline"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-[rgb(var(--star-charcoal))] font-medium px-4 py-2 hover:text-[rgb(var(--star-deep-sapphire))] transition-colors duration-300"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="btn-amber-glow btn-ripple group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>Register</span>
                <Sparkles className="w-4 h-4 group-hover:animate-spin" />
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-[rgb(var(--star-charcoal))] hover:bg-[rgb(var(--star-aqua-mist))]/20 rounded-xl border border-[rgb(var(--star-aqua-mist))]/30 shadow-md backdrop-blur-sm"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden nav-glass border-t border-[rgb(var(--star-aqua-mist))]/40"
          >
            <div className="container-star py-6">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-[rgb(var(--star-charcoal))] font-medium px-4 py-2 hover:text-[rgb(var(--star-deep-sapphire))] hover:bg-[rgb(var(--star-aqua-mist))]/20 rounded-xl transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-[rgb(var(--star-aqua-mist))]/30 space-y-3">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="block text-[rgb(var(--star-charcoal))] font-medium px-4 py-2 hover:text-[rgb(var(--star-deep-sapphire))] hover:bg-[rgb(var(--star-aqua-mist))]/20 rounded-xl transition-colors duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="btn-amber-glow w-full text-center justify-center flex items-center space-x-2"
                  >
                    <span>Register</span>
                    <Sparkles className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;