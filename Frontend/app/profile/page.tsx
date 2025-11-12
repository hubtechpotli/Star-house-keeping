'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Navigation from '../../components/navigation'
import Footer from '../../components/footer'
import { User, Wifi, CreditCard, Calendar, Download, Settings, Bell, Shield, LogOut, Edit } from 'lucide-react'

export default function ProfilePage() {
  const { user, signOut, loading } = useAuth()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  // Mock data for demonstration (in real app, this would come from user's actual data)
  const currentPlan = {
    name: 'Premium Plan',
    speed: '300 Mbps',
    price: '₹799',
    data: 'Unlimited',
    ott: ['Netflix Premium', 'Prime Video', 'Disney+'],
    router: 'WiFi 6 Router',
    nextBilling: '15 December 2024',
    status: 'Active'
  }

  const billingHistory = [
    {
      id: 'INV001',
      date: '15 November 2024',
      amount: '₹799',
      status: 'Paid',
      plan: 'Premium Plan'
    },
    {
      id: 'INV002',
      date: '15 October 2024',
      amount: '₹799',
      status: 'Paid',
      plan: 'Premium Plan'
    },
    {
      id: 'INV003',
      date: '15 September 2024',
      amount: '₹799',
      status: 'Paid',
      plan: 'Premium Plan'
    }
  ]

  const quickActions = [
    { name: 'Quick Pay', icon: CreditCard, href: '#', color: 'blue' },
    { name: 'Download Bill', icon: Download, href: '#', color: 'green' },
    { name: 'Change Plan', icon: Wifi, href: '#', color: 'orange' },
    { name: 'Support', icon: Bell, href: '/contact', color: 'purple' }
  ]

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await signOut()
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!user) {
    router.push('/login')
    return null
  }

  return (
    <>
      <main 
        className="min-h-screen relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bg-img.avif')"
        }}
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-blue-200/80 z-0"></div>
        
        {/* Content */}
        <div className="relative z-10">
          <Navigation />
          
          <div className="container-custom py-8">
        {/* Page Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
            <p className="text-gray-600">Manage your Star_Housekeeping  account and services</p>
          </div>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {isLoggingOut ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <LogOut className="h-4 w-4" />
            )}
            <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - User Info & Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Profile Card */}
            <div className="card">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="h-12 w-12 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{user.user_metadata?.full_name || 'User'}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Wifi className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Customer ID</p>
                    <p className="font-medium text-gray-900">{user.id?.slice(0, 8) || 'N/A'}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium text-gray-900">{new Date(user.created_at).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="font-medium text-gray-900 capitalize">{user.user_metadata?.role || 'customer'}</p>
                  </div>
                </div>
              </div>

              {/* Edit Profile Button */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {quickActions.map((action) => (
                  <a
                    key={action.name}
                    href={action.href}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className={`p-2 rounded-lg bg-${action.color}-100`}>
                      <action.icon className={`h-5 w-5 text-${action.color}-600`} />
                    </div>
                    <span className="text-gray-700 font-medium">{action.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Plan Details & Billing */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Plan */}
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {currentPlan.status}
                </span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{currentPlan.name}</h4>
                  <p className="text-gray-600 mb-4">High-speed internet with premium features</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Wifi className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">{currentPlan.speed}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">{currentPlan.price}/month</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Download className="h-5 w-5 text-purple-600" />
                      <span className="text-gray-700">{currentPlan.data}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Included Services</h5>
                  <div className="space-y-2">
                    {currentPlan.ott.map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">{service}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Next billing:</strong> {currentPlan.nextBilling}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing History */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing History</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Invoice</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Date</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Amount</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billingHistory.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-gray-100">
                        <td className="py-3 text-sm font-medium text-gray-900">{invoice.id}</td>
                        <td className="py-3 text-sm text-gray-600">{invoice.date}</td>
                        <td className="py-3 text-sm text-gray-900">{invoice.amount}</td>
                        <td className="py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            {invoice.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
      </main>
      
      <Footer />
    </>
  )
}
