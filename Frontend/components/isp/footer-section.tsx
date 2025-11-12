import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react"

interface FooterSectionProps {
  theme: "blue" | "red" | "purple" | "green"
  companyName?: string
  phone?: string
  email?: string
  address?: string
}

export function FooterSection({
  theme,
  companyName = "FiberNet",
  phone = "+919643448585",
  email = "amit.ku.ch@gmail.com",
  address = "123 Tech Park, Sector 62, Noida, UP 201301",
}: FooterSectionProps) {
  const themeClasses = {
    blue: {
      bg: "bg-blue-secondary",
      primary: "text-white",
      secondary: "text-blue-100",
      accent: "text-orange-300",
      button: "bg-blue-primary hover:bg-blue-700",
    },
    red: {
      bg: "bg-red-secondary",
      primary: "text-white",
      secondary: "text-gray-300",
      accent: "text-yellow-300",
      button: "bg-red-primary hover:bg-red-700",
    },
    purple: {
      bg: "bg-gray-900",
      primary: "text-white",
      secondary: "text-purple-200",
      accent: "text-orange-300",
      button: "bg-purple-gradient hover:opacity-90",
    },
    green: {
      bg: "bg-green-secondary",
      primary: "text-white",
      secondary: "text-green-100",
      accent: "text-yellow-300",
      button: "bg-green-primary hover:bg-teal-700",
    },
  }

  const styles = themeClasses[theme]

  return (
    <footer className={`${styles.bg} py-12`}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className={`text-2xl font-bold ${styles.primary}`}>{companyName}</h3>
            <p className={`${styles.secondary}`}>
              Leading broadband service provider delivering high-speed internet across India.
            </p>
            <div className="flex space-x-4">
              <Facebook
                className={`w-5 h-5 ${styles.secondary} hover:${styles.primary} cursor-pointer transition-colors`}
              />
              <Twitter
                className={`w-5 h-5 ${styles.secondary} hover:${styles.primary} cursor-pointer transition-colors`}
              />
              <Instagram
                className={`w-5 h-5 ${styles.secondary} hover:${styles.primary} cursor-pointer transition-colors`}
              />
              <Youtube
                className={`w-5 h-5 ${styles.secondary} hover:${styles.primary} cursor-pointer transition-colors`}
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className={`text-lg font-semibold ${styles.primary}`}>Quick Links</h4>
            <ul className="space-y-2">
              {["View Plans", "My Account", "Quick Pay", "Download App", "Locate Us", "Troubleshooting"].map((link) => (
                <li key={link}>
                  <a href="#" className={`${styles.secondary} hover:${styles.primary} transition-colors`}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className={`text-lg font-semibold ${styles.primary}`}>Legal</h4>
            <ul className="space-y-2">
              {[
                "Terms & Conditions",
                "Privacy Policy",
                "Consumer Charter",
                "Appellate Authority",
                "Sitemap",
                "Refund Policy",
              ].map((link) => (
                <li key={link}>
                  <a href="#" className={`${styles.secondary} hover:${styles.primary} transition-colors`}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className={`text-lg font-semibold ${styles.primary}`}>Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className={`w-4 h-4 ${styles.accent}`} />
                <a href={`tel:${phone}`} className={`${styles.secondary} hover:${styles.primary} transition-colors duration-200`}>{phone}</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className={`w-4 h-4 ${styles.accent}`} />
                <a href={`mailto:${email}`} className={`${styles.secondary} hover:${styles.primary} transition-colors duration-200`}>{email}</a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className={`w-4 h-4 ${styles.accent} mt-1`} />
                <span className={`${styles.secondary}`}>{address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-600 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center space-y-4">
            <h4 className={`text-lg font-semibold ${styles.primary}`}>Stay Updated</h4>
            <p className={`${styles.secondary}`}>Get the latest offers and updates delivered to your inbox</p>
            <div className="flex gap-2">
              <Input
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
              />
              <Button className={`${styles.button} text-white`}>Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-600 pt-8 text-center">
          <p className={`${styles.secondary}`}>
            © 2024 {companyName}. All rights reserved. | Designed for professional  services
          </p>
        </div>
      </div>
    </footer>
  )
}
