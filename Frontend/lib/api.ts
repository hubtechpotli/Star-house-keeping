// API service functions for Star_Housekeeping  Frontend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Generic API request function
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Authentication API functions
export const authAPI = {
  // Register new user
  register: async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  }) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Login user
  login: async (credentials: { email: string; password: string }) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Get current user profile
  getProfile: async (token: string) => {
    return apiRequest('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Forgot password
  forgotPassword: async (email: string) => {
    return apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  // Reset password
  resetPassword: async (token: string, password: string) => {
    return apiRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });
  },

  // Logout user
  logout: async (token: string) => {
    return apiRequest('/auth/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

// Plans API functions
export const plansAPI = {
  // Get all plans
  getAll: async (filters?: {
    category?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
  }) => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.order) params.append('order', filters.order);
    
    const queryString = params.toString();
    const endpoint = queryString ? `/plans?${queryString}` : '/services';
    
    return apiRequest(endpoint);
  },

  // Get plan by ID
  getById: async (id: string) => {
    return apiRequest(`/plans/${id}`);
  },

  // Get featured plans
  getFeatured: async () => {
    return apiRequest('/plans/popular/featured');
  },

  // Check availability
  checkAvailability: async (zipCode: string) => {
    return apiRequest(`/plans/check-availability/${zipCode}`);
  },
};

// User API functions
export const userAPI = {
  // Get user profile
  getProfile: async (token: string) => {
    return apiRequest('/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Update user profile
  updateProfile: async (token: string, profileData: any) => {
    return apiRequest('/users/profile', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
  },

  // Change password
  changePassword: async (token: string, passwordData: {
    currentPassword: string;
    newPassword: string;
  }) => {
    return apiRequest('/users/change-password', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(passwordData),
    });
  },

  // Get subscription details
  getSubscription: async (token: string) => {
    return apiRequest('/users/subscription', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

// Payment API functions
export const paymentAPI = {
  // Create payment intent
  createPaymentIntent: async (token: string, paymentData: {
    planId: string;
    billingCycle: 'monthly' | 'yearly';
    setupFee?: number;
  }) => {
    return apiRequest('/payments/create-payment-intent', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(paymentData),
    });
  },

  // Confirm payment
  confirmPayment: async (token: string, confirmationData: {
    paymentIntentId: string;
    planId: string;
    billingCycle: 'monthly' | 'yearly';
  }) => {
    return apiRequest('/payments/confirm', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(confirmationData),
    });
  },

  // Get payment history
  getPaymentHistory: async (token: string) => {
    return apiRequest('/payments/history', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Cancel subscription
  cancelSubscription: async (token: string) => {
    return apiRequest('/payments/cancel-subscription', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

// Support API functions
export const supportAPI = {
  // Create support ticket
  createTicket: async (token: string, ticketData: {
    subject: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    category: 'technical' | 'billing' | 'account' | 'general';
  }) => {
    return apiRequest('/support/ticket', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ticketData),
    });
  },

  // Get user's tickets
  getUserTickets: async (token: string) => {
    return apiRequest('/support/tickets', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Get ticket details
  getTicketDetails: async (token: string, ticketId: string) => {
    return apiRequest(`/support/tickets/${ticketId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Add message to ticket
  addMessage: async (token: string, ticketId: string, message: string) => {
    return apiRequest(`/support/tickets/${ticketId}/message`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
    });
  },
};

// Contact API functions
export const contactAPI = {
  // Submit general inquiry
  submitInquiry: async (inquiryData: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    inquiryType: 'general' | 'sales' | 'technical' | 'billing' | 'partnership';
  }) => {
    return apiRequest('/contact/inquiry', {
      method: 'POST',
      body: JSON.stringify(inquiryData),
    });
  },

  // Submit feedback
  submitFeedback: async (feedbackData: {
    name: string;
    email: string;
    rating: number;
    category: 'service' | 'website' | 'support' | 'pricing' | 'overall';
    message: string;
  }) => {
    return apiRequest('/contact/feedback', {
      method: 'POST',
      body: JSON.stringify(feedbackData),
    });
  },

  // Check service availability
  checkAvailability: async (availabilityData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
    currentProvider?: string;
    moveInDate?: string;
  }) => {
    return apiRequest('/contact/availability-check', {
      method: 'POST',
      body: JSON.stringify(availabilityData),
    });
  },

  // Get department information
  getDepartments: async () => {
    return apiRequest('/contact/departments');
  },
};

// Health check
export const healthCheck = async () => {
  return apiRequest('/health');
};

// Export all API functions
export default {
  auth: authAPI,
  plans: plansAPI,
  user: userAPI,
  payment: paymentAPI,
  support: supportAPI,
  contact: contactAPI,
  healthCheck,
};
