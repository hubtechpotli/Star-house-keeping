

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Wifi, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-950 to-blue-950 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 text-white transition-colors duration-500">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 py-6 sm:py-8 lg:py-12 px-4 lg:px-0">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-16 h-12 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/logo.jpg"
                  alt="Star Housekeeping Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold bg-white  bg-clip-text text-transparent">Star Housekeeping</span>
            </div>
            <p className="text-gray-300 dark:text-cyan-100/80 text-sm leading-relaxed">
              Star Housekeeping <br/>
              Service Industry: Renting a bus
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 dark:hover:text-cyan-300 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 dark:hover:text-cyan-300 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 dark:hover:text-cyan-300 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 dark:hover:text-cyan-300 transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 dark:hover:text-cyan-300 transition-colors duration-200">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  Plans
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  Fiber Internet
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  Business Solutions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  OTT Bundles
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  Installation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  Support
                </a>
              </li>
            </ul>
          </div>

           {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-gray-300 text-sm">Mobile No.</p>
                  <a href="tel:9996484027" className="text-white font-medium hover:text-blue-300 transition-colors duration-200">9996484027</a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-gray-300 text-sm">Email</p>
                  <a href="mailto:sharee@gmail.com" className="text-white font-medium hover:text-blue-300 transition-colors duration-200">sharee@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-gray-300 text-sm">Address</p>
                  <p className="text-white font-medium text-sm leading-relaxed">C52A, Kalkaji, New Delhi, 110019</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-blue-400 rounded mt-0.5 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">C</span>
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Company</p>
                  <p className="text-white font-medium text-sm">Star Housekeeping</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 dark:border-cyan-900 py-6 px-4 lg:px-0">
          <div className="flex flex-col items-center space-y-6">
            {/* Copyright and Policy Links */}
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 w-full">
              <p className="text-gray-400 dark:text-cyan-200/70 text-sm text-center md:text-left">
                © {currentYear} Star Housekeeping . All rights reserved.
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
                <Link href="#" className="text-gray-400 dark:text-cyan-200/70 hover:text-blue-400 dark:hover:text-cyan-300 transition-colors duration-200 text-center">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-gray-400 dark:text-cyan-200/70 hover:text-blue-400 dark:hover:text-cyan-300 transition-colors duration-200 text-center">
                  Terms of Service
                </Link>
                <Link href="#" className="text-gray-400 dark:text-cyan-200/70 hover:text-blue-400 dark:hover:text-cyan-300 transition-colors duration-200 text-center">
                  Refund Policy
                </Link>
              </div>
            </div>
            {/* Powered by TechPotli */}
            <div className="flex flex-col items-center space-y-3">
              <p className="text-gray-400 dark:text-cyan-200/70 text-sm">Powered by</p>
              <a 
                href="https://techpotli.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200 group"
              >
                <img 
                  src="/New_Techpotli_Logo.png" 
                  alt="TechPotli" 
                  className="h-8 lg:h-10 w-auto filter brightness-0 invert opacity-90 group-hover:opacity-100 transition-all duration-200"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
