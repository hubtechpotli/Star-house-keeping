import Link from 'next/link';
import { Phone, Mail, MapPin, Star, Instagram, Facebook, MessageCircle } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[rgb(var(--star-deep-sapphire))] text-white relative overflow-hidden">
            {/* Moving gradient line animation */}
            <div className="moving-gradient-line absolute top-0 left-0 w-full h-1"></div>

            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-8 left-8 w-16 h-16 border border-white/20 rounded-full" />
                <div className="absolute top-16 right-16 w-12 h-12 border border-white/20 rounded-full" />
                <div className="absolute bottom-12 left-1/3 w-8 h-8 border border-white/20 rounded-full" />
                <div className="absolute bottom-8 right-1/4 w-20 h-20 border border-white/20 rounded-full" />
            </div>

            <div className="container-star pt-16 pb-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

                    {/* Company Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center space-x-3">
                            <Star className="w-8 h-8 text-[rgb(var(--star-warm-amber))] animate-star-morph" fill="currentColor" />
                            <div>
                                <div className="text-xl font-bold font-accent text-white">STAR HOUSEKEEPING SERVICES</div>
                                <div className="text-sm text-white/80">Part Time & Full Time</div>
                            </div>
                        </div>

                        <p className="text-white/90 text-lg leading-relaxed max-w-md">
                            Founded by <strong>Dinesh Piliger</strong>, STAR Housekeeping has been a trusted name
                            for over a decade in delivering professional part-time and full-time domestic and
                            commercial cleaning services across Mumbai.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-[rgb(var(--star-warm-amber))] mt-0.5" />
                                <div className="text-white/90">
                                    <div className="font-medium">154, Shahaji Nagar, Aziz Baug,</div>
                                    <div>R.C. Marg, Chembur, Mumbai - 400074</div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-[rgb(var(--star-warm-amber))]" />
                                <div className="text-white/90">
                                    <a href="tel:+918652229992" className="hover:text-[rgb(var(--star-warm-amber))] transition-colors">
                                        86522 29992
                                    </a> /
                                    <a href="tel:+918097144114" className="hover:text-[rgb(var(--star-warm-amber))] transition-colors ml-1">
                                        80971 44114
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold font-accent text-white">Quick Links</h3>
                        <ul className="space-y-3">
                            {[
                                { name: 'Home', href: '/' },
                                { name: 'Services', href: '/services' },
                                { name: 'About', href: '/about' },
                                { name: 'Contact', href: '/contact' }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-white/80 hover:text-[rgb(var(--star-warm-amber))] transition-colors duration-300 flex items-center space-x-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 bg-[rgb(var(--star-warm-amber))] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                        <span>{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold font-accent text-white">Our Services</h3>
                        <ul className="space-y-3">
                            {[
                                'Residential Cleaning',
                                'Office Cleaning',
                                'Deep Cleaning',
                                'Laundry & Utility',
                                'Garden Care',
                                'Staff Placement',
                            ].map((service) => (
                                <li key={service}>
                                    <span className="text-white/80 hover:text-[rgb(var(--star-warm-amber))] transition-colors duration-300 cursor-pointer flex items-center space-x-2 group">
                                        <span className="w-1.5 h-1.5 bg-[rgb(var(--star-warm-amber))] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                        <span>{service}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Social Links & Bottom Bar */}
                <div className="border-t border-white/20 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

                        {/* Social Links */}
                        <div className="flex items-center space-x-6">
                            <span className="text-white/60 text-sm">Connect with us:</span>
                            <div className="flex space-x-4">
                                <a
                                    href="#"
                                    className="text-white/60 hover:text-[rgb(var(--star-warm-amber))] transition-colors duration-300 p-2 hover:bg-white/10 rounded-full"
                                    aria-label="WhatsApp"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                </a>
                                <a
                                    href="#"
                                    className="text-white/60 hover:text-[rgb(var(--star-warm-amber))] transition-colors duration-300 p-2 hover:bg-white/10 rounded-full"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a
                                    href="#"
                                    className="text-white/60 hover:text-[rgb(var(--star-warm-amber))] transition-colors duration-300 p-2 hover:bg-white/10 rounded-full"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        {/* Copyright */}
                        <div className="text-white/60 text-sm text-center md:text-right">
                            <p>© {currentYear} STAR Housekeeping Services. All Rights Reserved.</p>
                            <p className="mt-1 text-xs">
                                Designed with care for Mumbai families
                            </p>
                        </div>
                    </div>
                    {/* Designed by TechPotli */}
                    <div className="flex flex-col items-center space-y-3">
                        <p className="text-gray-400 dark:text-cyan-200/70 text-sm">Designed by</p>
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
        </footer>
    );
};

export default Footer;