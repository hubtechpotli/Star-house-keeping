const express = require('express');
const { body, validationResult } = require('express-validator');
const supabase = require('../config/supabase');

const router = express.Router();

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('subject').trim().isLength({ min: 5, max: 200 }).withMessage('Subject must be between 5 and 200 characters'),
  body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters'),
  body('department').isIn(['sales', 'support', 'billing', 'general']).withMessage('Invalid department'),
  body('phone').optional().trim().isLength({ min: 10, max: 20 }).withMessage('Phone number must be between 10 and 20 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { name, email, subject, message, department, phone } = req.body;

    // Create contact inquiry in Supabase
    const { data: inquiry, error } = await supabase
      .from('contact_inquiries')
      .insert([{
        name,
        email,
        subject,
        message,
        department,
        phone: phone || null,
        status: 'new'
      }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({
      message: 'Contact form submitted successfully',
      inquiry: {
        id: inquiry.id,
        name: inquiry.name,
        email: inquiry.email,
        subject: inquiry.subject,
        department: inquiry.department,
        status: inquiry.status,
        createdAt: inquiry.created_at
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      message: 'Server error while submitting contact form' 
    });
  }
});

// @route   POST /api/contact/feedback
// @desc    Submit customer feedback
// @access  Public
router.post('/feedback', [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('category').isIn(['service', 'website', 'support', 'pricing', 'overall']).withMessage('Invalid feedback category'),
  body('message').trim().isLength({ min: 10, max: 1000 }).withMessage('Message must be between 10 and 1000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { name, email, rating, category, message } = req.body;

    // Send feedback email
    try {
      await sendEmail({
        to: process.env.FEEDBACK_EMAIL || 'feedback@Star_Housekeeping-.com',
        subject: `Customer Feedback - ${category} (${rating}/5)`,
        template: 'customer-feedback',
        data: {
          name,
          email,
          rating,
          category,
          message,
          timestamp: new Date().toISOString()
        }
      });

      // Send thank you email to user
      await sendEmail({
        to: email,
        subject: 'Thank you for your feedback!',
        template: 'feedback-thanks',
        data: {
          name,
          rating,
          category
        }
      });

      res.json({
        message: 'Feedback submitted successfully. Thank you for your input!'
      });

    } catch (emailError) {
      console.error('Feedback email failed:', emailError);
      res.status(500).json({ 
        message: 'Failed to submit feedback. Please try again later.' 
      });
    }

  } catch (error) {
    console.error('Submit feedback error:', error);
    res.status(500).json({ 
      message: 'Server error while submitting feedback' 
    });
  }
});

// @route   POST /api/contact/availability-check
// @desc    Check service availability in an area
// @access  Public
router.post('/availability-check', [
  body('firstName').trim().isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),
  body('lastName').trim().isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('phone').matches(/^[\+]?[1-9][\d]{0,15}$/).withMessage('Please provide a valid phone number'),
  body('address.street').notEmpty().withMessage('Street address is required'),
  body('address.city').notEmpty().withMessage('City is required'),
  body('address.state').notEmpty().withMessage('State is required'),
  body('address.zipCode').notEmpty().withMessage('ZIP code is required'),
  body('currentProvider').optional().trim().isString().withMessage('Current provider must be a string'),
  body('moveInDate').optional().isISO8601().withMessage('Move-in date must be a valid date')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      address, 
      currentProvider, 
      moveInDate 
    } = req.body;

    // Send availability check email
    try {
      await sendEmail({
        to: process.env.SALES_EMAIL || 'sales@Star_Housekeeping-.com',
        subject: `Service Availability Check - ${address.zipCode}`,
        template: 'availability-check',
        data: {
          firstName,
          lastName,
          email,
          phone,
          address,
          currentProvider: currentProvider || 'Not specified',
          moveInDate: moveInDate || 'Not specified',
          timestamp: new Date().toISOString()
        }
      });

      // Send confirmation email to user
      await sendEmail({
        to: email,
        subject: 'Service Availability Check Submitted',
        template: 'availability-confirmation',
        data: {
          firstName,
          address: `${address.street}, ${address.city}, ${address.state} ${address.zipCode}`,
          message: 'We will check service availability in your area and contact you within 24 hours with the results.'
        }
      });

      res.json({
        message: 'Availability check submitted successfully. We will contact you within 24 hours!'
      });

    } catch (emailError) {
      console.error('Availability check email failed:', emailError);
      res.status(500).json({ 
        message: 'Failed to submit availability check. Please try again later.' 
      });
    }

  } catch (error) {
    console.error('Submit availability check error:', error);
    res.status(500).json({ 
      message: 'Server error while submitting availability check' 
    });
  }
});

// @route   GET /api/contact/departments
// @desc    Get contact information for different departments
// @access  Public
router.get('/departments', (req, res) => {
  const departments = {
    general: {
      name: 'General Inquiries',
      email: process.env.CONTACT_EMAIL || 'contact@Star_Housekeeping-.com',
      phone: process.env.CONTACT_PHONE || '+1-800-Star_Housekeeping',
      responseTime: '24-48 hours'
    },
    sales: {
      name: 'Sales & New Service',
      email: process.env.SALES_EMAIL || 'sales@Star_Housekeeping-.com',
      phone: process.env.SALES_PHONE || '+1-800-Star_Housekeeping',
      responseTime: '2-4 hours'
    },
    technical: {
      name: 'Technical Support',
      email: process.env.TECH_EMAIL || 'tech@Star_Housekeeping-.com',
      phone: process.env.TECH_PHONE || '+1-800-Star_Housekeeping',
      responseTime: '1-2 hours'
    },
    billing: {
      name: 'Billing & Payments',
      email: process.env.BILLING_EMAIL || 'billing@Star_Housekeeping-.com',
      phone: process.env.BILLING_PHONE || '+1-800-Star_Housekeeping',
      responseTime: '4-8 hours'
    },
    support: {
      name: 'Customer Support',
      email: process.env.SUPPORT_EMAIL || 'support@Star_Housekeeping-.com',
      phone: process.env.SUPPORT_PHONE || '+1-800-Star_Housekeeping',
      responseTime: '2-4 hours'
    }
  };

  res.json({
    departments,
    businessHours: {
      monday: '8:00 AM - 8:00 PM',
      tuesday: '8:00 AM - 8:00 PM',
      wednesday: '8:00 AM - 8:00 PM',
      thursday: '8:00 AM - 8:00 PM',
      friday: '8:00 AM - 6:00 PM',
      saturday: '9:00 AM - 5:00 PM',
      sunday: 'Closed'
    },
    emergencySupport: {
      available: true,
      phone: process.env.EMERGENCY_PHONE || '+1-800-Star_Housekeeping',
      hours: '24/7 for critical issues'
    }
  });
});

module.exports = router;
