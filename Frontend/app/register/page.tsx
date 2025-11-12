'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/components/ui/simple-toast'
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, ArrowRight, Sparkles, Shield, Star, Gift } from 'lucide-react'
import { motion } from 'framer-motion'
import Navigation from '@/components/navigation'
import FooterNew from '@/components/footer-new'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { signUp } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const { error } = await signUp(formData.email, formData.password, {
        full_name: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zipCode
      })

      if (error) {
        setError(error.message || 'Registration failed')
      } else {
        toast({
          title: "Registration successful!",
          description: "Please check your email for verification link.",
        })
        router.push('/login')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const benefits = [
    { icon: Shield, text: 'Secure Account Management', color: 'from-[rgb(var(--star-deep-sapphire))] to-[rgb(var(--star-aqua-mist))]' },
    { icon: Star, text: 'Priority Customer Support', color: 'from-[rgb(var(--star-warm-amber))] to-[rgb(var(--star-aqua-mist))]' },
    { icon: Gift, text: 'Exclusive Member Discounts', color: 'from-[rgb(var(--star-deep-sapphire))] to-[rgb(var(--star-warm-amber))]' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[rgb(var(--star-aqua-mist))]/10 to-white overflow-hidden">
      <Navigation />
      <div className="pt-24 pb-16 px-4">
        <div className="container-star">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              
              {/* Left Side - Welcome Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl lg:text-5xl font-bold text-[rgb(var(--star-charcoal))] mb-4">
                    Join{' '}
                    <span className="font-accent text-[rgb(var(--star-deep-sapphire))]">STAR</span>{' '}
                    <span className="font-accent text-[rgb(var(--star-warm-amber))]">Family</span>
                  </h1>
                  <p className="text-xl text-[rgb(var(--star-charcoal))]/80 mb-8 leading-relaxed">
                    Create your account and experience premium housekeeping services tailored just for you
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[rgb(var(--star-charcoal))] mb-4">
                    Member Benefits:
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
                      Welcome Bonus
                    </h3>
                  </div>
                  <p className="text-[rgb(var(--star-charcoal))]/70 leading-relaxed">
                    Get 20% off your first housekeeping service when you complete your registration. 
                    Plus, enjoy priority booking and personalized service recommendations.
                  </p>
                </div>
              </motion.div>

              {/* Right Side - Registration Form */}
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
                      Create Account
                    </h2>
                    <p className="text-[rgb(var(--star-charcoal))]/70">
                      Sign up today and get connected to premium services
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-6 border border-red-200/50 text-center">
                      {error}
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-[rgb(var(--star-charcoal))] mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[rgb(var(--star-warm-amber))]" />
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-4 border border-[rgb(var(--star-aqua-mist))]/50 rounded-lg focus:ring-2 focus:ring-[rgb(var(--star-deep-sapphire))]/20 focus:border-[rgb(var(--star-deep-sapphire))] transition-colors text-[rgb(var(--star-charcoal))] placeholder:text-[rgb(var(--star-charcoal))]/50 bg-white/70"
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-[rgb(var(--star-charcoal))] mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[rgb(var(--star-warm-amber))]" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-4 border border-[rgb(var(--star-aqua-mist))]/50 rounded-lg focus:ring-2 focus:ring-[rgb(var(--star-deep-sapphire))]/20 focus:border-[rgb(var(--star-deep-sapphire))] transition-colors text-[rgb(var(--star-charcoal))] placeholder:text-[rgb(var(--star-charcoal))]/50 bg-white/70"
                            placeholder="Enter your phone number"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[rgb(var(--star-charcoal))] mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[rgb(var(--star-warm-amber))]" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 border border-[rgb(var(--star-aqua-mist))]/50 rounded-lg focus:ring-2 focus:ring-[rgb(var(--star-deep-sapphire))]/20 focus:border-[rgb(var(--star-deep-sapphire))] transition-colors text-[rgb(var(--star-charcoal))] placeholder:text-[rgb(var(--star-charcoal))]/50 bg-white/70"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[rgb(var(--star-charcoal))] mb-2">
                        Address
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-4 h-5 w-5 text-[rgb(var(--star-warm-amber))]" />
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 border border-[rgb(var(--star-aqua-mist))]/50 rounded-lg focus:ring-2 focus:ring-[rgb(var(--star-deep-sapphire))]/20 focus:border-[rgb(var(--star-deep-sapphire))] transition-colors text-[rgb(var(--star-charcoal))] placeholder:text-[rgb(var(--star-charcoal))]/50 bg-white/70"
                          placeholder="Enter your address"
                          required
                        />
                      </div>
                    </div>

                    {/* City, State, ZIP */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-[rgb(var(--star-charcoal))] mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border border-[rgb(var(--star-aqua-mist))]/50 rounded-lg focus:ring-2 focus:ring-[rgb(var(--star-deep-sapphire))]/20 focus:border-[rgb(var(--star-deep-sapphire))] transition-colors text-[rgb(var(--star-charcoal))] placeholder:text-[rgb(var(--star-charcoal))]/50 bg-white/70"
                          placeholder="City"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-[rgb(var(--star-charcoal))] mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border border-[rgb(var(--star-aqua-mist))]/50 rounded-lg focus:ring-2 focus:ring-[rgb(var(--star-deep-sapphire))]/20 focus:border-[rgb(var(--star-deep-sapphire))] transition-colors text-[rgb(var(--star-charcoal))] placeholder:text-[rgb(var(--star-charcoal))]/50 bg-white/70"
                          placeholder="State"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-[rgb(var(--star-charcoal))] mb-2">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border border-[rgb(var(--star-aqua-mist))]/50 rounded-lg focus:ring-2 focus:ring-[rgb(var(--star-deep-sapphire))]/20 focus:border-[rgb(var(--star-deep-sapphire))] transition-colors text-[rgb(var(--star-charcoal))] placeholder:text-[rgb(var(--star-charcoal))]/50 bg-white/70"
                          placeholder="ZIP"
                          required
                        />
                      </div>
                    </div>

                    {/* Password Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-[rgb(var(--star-charcoal))] mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[rgb(var(--star-warm-amber))]" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-12 py-4 border border-[rgb(var(--star-aqua-mist))]/50 rounded-lg focus:ring-2 focus:ring-[rgb(var(--star-deep-sapphire))]/20 focus:border-[rgb(var(--star-deep-sapphire))] transition-colors text-[rgb(var(--star-charcoal))] placeholder:text-[rgb(var(--star-charcoal))]/50 bg-white/70"
                            placeholder="Create password"
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

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-[rgb(var(--star-charcoal))] mb-2">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[rgb(var(--star-warm-amber))]" />
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-12 py-4 border border-[rgb(var(--star-aqua-mist))]/50 rounded-lg focus:ring-2 focus:ring-[rgb(var(--star-deep-sapphire))]/20 focus:border-[rgb(var(--star-deep-sapphire))] transition-colors text-[rgb(var(--star-charcoal))] placeholder:text-[rgb(var(--star-charcoal))]/50 bg-white/70"
                            placeholder="Confirm password"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[rgb(var(--star-warm-amber))] hover:text-[rgb(var(--star-deep-sapphire))] transition-colors"
                          >
                            {showConfirmPassword ? <EyeOff /> : <Eye />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="mr-3 rounded border-[rgb(var(--star-aqua-mist))]/50 text-[rgb(var(--star-warm-amber))] focus:ring-[rgb(var(--star-deep-sapphire))]/20" 
                        required 
                      />
                      <span className="text-sm text-[rgb(var(--star-charcoal))]/80">
                        I agree to the{' '}
                        <Link 
                          href="/terms" 
                          className="text-[rgb(var(--star-deep-sapphire))] hover:text-[rgb(var(--star-warm-amber))] font-medium transition-colors"
                        >
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link 
                          href="/privacy" 
                          className="text-[rgb(var(--star-deep-sapphire))] hover:text-[rgb(var(--star-warm-amber))] font-medium transition-colors"
                        >
                          Privacy Policy
                        </Link>
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 group text-lg
                        ${isLoading
                          ? "bg-gray-400 cursor-not-allowed text-white"
                          : "btn-amber-glow"
                        }`}
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      ) : (
                        <>
                          Create Account
                          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                    <div className="text-center">
                      <p className="text-[rgb(var(--star-charcoal))]/70">
                        Already have an account?{' '}
                        <Link 
                          href="/login" 
                          className="text-[rgb(var(--star-deep-sapphire))] hover:text-[rgb(var(--star-warm-amber))] font-medium transition-colors"
                        >
                          Sign In
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