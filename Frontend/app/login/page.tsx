'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, Shield, Star, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import Navigation from '@/components/navigation'
import FooterNew from '@/components/footer-new'

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message || "Login failed");
      } else {
        router.push("/profile");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    { icon: Shield, text: "Secure Account Dashboard" },
    { icon: Star, text: "Manage Your Services" },
    { icon: CheckCircle, text: "Track Your Bookings" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[rgb(var(--star-aqua-mist))]/10 to-white overflow-hidden">
      <Navigation />

      <div className="pt-24 pb-16 px-4">
        <div className="container-star">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Left Side - Welcome Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl lg:text-5xl font-bold text-[rgb(var(--star-charcoal))] mb-4">
                    Welcome to{' '}
                    <span className="font-accent text-[rgb(var(--star-deep-sapphire))]">STAR</span>
                  </h1>
                  <p className="text-xl text-[rgb(var(--star-charcoal))]/80 mb-8 leading-relaxed">
                    Access your account to manage your premium housekeeping services
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[rgb(var(--star-charcoal))] mb-4">
                    Your Account Benefits:
                  </h3>
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-[rgb(var(--star-aqua-mist))]/20"
                    >
                      <div className="p-2 bg-[rgb(var(--star-warm-amber))]/10 rounded-lg">
                        <benefit.icon className="w-5 h-5 text-[rgb(var(--star-warm-amber))]" />
                      </div>
                      <span className="text-[rgb(var(--star-charcoal))]/80 font-medium">
                        {benefit.text}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="p-6 bg-gradient-to-r from-[rgb(var(--star-deep-sapphire))]/5 to-[rgb(var(--star-warm-amber))]/5 rounded-xl border border-[rgb(var(--star-aqua-mist))]/30">
                  <div className="flex items-center space-x-3 mb-3">
                    <Sparkles className="w-6 h-6 text-[rgb(var(--star-warm-amber))]" />
                    <h3 className="text-lg font-bold text-[rgb(var(--star-charcoal))]">
                      Premium Service Access
                    </h3>
                  </div>
                  <p className="text-[rgb(var(--star-charcoal))]/70 leading-relaxed">
                    Get personalized service recommendations, priority booking, and exclusive offers 
                    tailored to your housekeeping needs.
                  </p>
                </div>
              </motion.div>

              {/* Right Side - Login Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full"
              >
                <div className="card-premium p-8">
                  <div className="mb-8 text-center">
                    <div className="p-3 bg-gradient-to-br from-[rgb(var(--star-deep-sapphire))] to-[rgb(var(--star-warm-amber))] rounded-xl w-fit mx-auto mb-4">
                      <Star className="w-8 h-8 text-white fill-current" />
                    </div>
                    <h2 className="text-3xl font-bold text-[rgb(var(--star-charcoal))] mb-2">
                      Sign In
                    </h2>
                    <p className="text-[rgb(var(--star-charcoal))]/70">
                      Welcome back to your STAR account
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-6 border border-red-200/50 text-center">
                      {error}
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[rgb(var(--star-charcoal))] mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[rgb(var(--star-warm-amber))]" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 border border-[rgb(var(--star-aqua-mist))]/50 rounded-lg focus:ring-2 focus:ring-[rgb(var(--star-deep-sapphire))]/20 focus:border-[rgb(var(--star-deep-sapphire))] transition-colors text-[rgb(var(--star-charcoal))] placeholder:text-[rgb(var(--star-charcoal))]/50 bg-white/70"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[rgb(var(--star-charcoal))] mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[rgb(var(--star-warm-amber))]" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-12 pr-12 py-4 border border-[rgb(var(--star-aqua-mist))]/50 rounded-lg focus:ring-2 focus:ring-[rgb(var(--star-deep-sapphire))]/20 focus:border-[rgb(var(--star-deep-sapphire))] transition-colors text-[rgb(var(--star-charcoal))] placeholder:text-[rgb(var(--star-charcoal))]/50 bg-white/70"
                          placeholder="Enter your password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[rgb(var(--star-warm-amber))] hover:text-[rgb(var(--star-deep-sapphire))] transition-colors"
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="mr-3 rounded border-[rgb(var(--star-aqua-mist))]/50 text-[rgb(var(--star-warm-amber))] focus:ring-[rgb(var(--star-deep-sapphire))]/20" 
                        />
                        <span className="text-sm text-[rgb(var(--star-charcoal))]/80">Remember me</span>
                      </label>
                      <Link 
                        href="/forgot-password" 
                        className="text-sm text-[rgb(var(--star-deep-sapphire))] hover:text-[rgb(var(--star-warm-amber))] font-medium transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 group text-lg
                        ${isLoading
                          ? "bg-gray-400 cursor-not-allowed text-white"
                          : "btn-sapphire-glow"
                        }`}
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                    <div className="text-center">
                      <p className="text-[rgb(var(--star-charcoal))]/70">
                        Don't have an account?{' '}
                        <Link 
                          href="/register" 
                          className="text-[rgb(var(--star-deep-sapphire))] hover:text-[rgb(var(--star-warm-amber))] font-medium transition-colors"
                        >
                          Sign Up
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      <FooterNew />
    </div>
  );
}