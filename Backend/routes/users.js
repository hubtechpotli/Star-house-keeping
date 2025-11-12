const express = require('express');
const { body, validationResult } = require('express-validator');
const supabase = require('../config/supabase');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', async (req, res) => {
  try {
    // For now, we'll get user from query params or headers
    // In production, you'd use JWT middleware to get req.user
    const userId = req.query.userId || req.headers['user-id'];
    
    if (!userId) {
      return res.status(401).json({ 
        message: 'User ID required' 
      });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        phone: user.phone,
        address: user.address,
        city: user.city,
        state: user.state,
        zipCode: user.zip_code,
        subscriptionStatus: user.subscription_status,
        role: user.role,
        createdAt: user.created_at,
        updatedAt: user.updated_at
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      message: 'Server error while fetching profile' 
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update current user profile
// @access  Private
router.put('/profile', [
  // protect, // Removed protect middleware
  body('firstName').optional().trim().isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),
  body('lastName').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters'),
  body('phone').optional().matches(/^[\+]?[1-9][\d]{0,15}$/).withMessage('Please provide a valid phone number'),
  body('address.street').optional().notEmpty().withMessage('Street address cannot be empty'),
  body('address.city').optional().notEmpty().withMessage('City cannot be empty'),
  body('address.state').optional().notEmpty().withMessage('State cannot be empty'),
  body('address.zipCode').optional().notEmpty().withMessage('ZIP code cannot be empty')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const userId = req.headers['user-id']; // Get user ID from headers
    if (!userId) {
      return res.status(401).json({ 
        message: 'User ID required for profile update' 
      });
    }

    const { data: user, error } = await supabase
      .from('users')
      .update({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zipCode
      })
      .eq('id', userId)
      .select()
      .single();

    if (error || !user) {
      return res.status(404).json({ 
        message: 'User not found or update failed' 
      });
    }

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        phone: user.phone,
        address: user.address,
        city: user.city,
        state: user.state,
        zipCode: user.zip_code,
        subscriptionStatus: user.subscription_status,
        role: user.role,
        createdAt: user.created_at,
        updatedAt: user.updated_at
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      message: 'Server error while updating profile' 
    });
  }
});

// @route   PUT /api/users/change-password
// @desc    Change user password
// @access  Private
router.put('/change-password', [
  // protect, // Removed protect middleware
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const userId = req.headers['user-id']; // Get user ID from headers
    if (!userId) {
      return res.status(401).json({ 
        message: 'User ID required for password change' 
      });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('password') // Select password for comparison
      .eq('id', userId)
      .single();

    if (error || !user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    const isMatch = user.password === req.body.currentPassword; // Compare with stored password
    if (!isMatch) {
      return res.status(400).json({ 
        message: 'Current password is incorrect' 
      });
    }

    const { error: updateError } = await supabase
      .from('users')
      .update({ password: req.body.newPassword })
      .eq('id', userId);

    if (updateError) {
      return res.status(500).json({ 
        message: 'Server error while changing password' 
      });
    }

    res.json({
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ 
      message: 'Server error while changing password' 
    });
  }
});

// @route   GET /api/users/subscription
// @desc    Get user subscription details
// @access  Private
router.get('/subscription', async (req, res) => {
  try {
    const userId = req.headers['user-id']; // Get user ID from headers
    if (!userId) {
      return res.status(401).json({ 
        message: 'User ID required for subscription details' 
      });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('subscription_status, current_plan, created_at')
      .eq('id', userId)
      .single();

    if (error || !user) {
      return res.status(404).json({ 
        message: 'User not found or no subscription found' 
      });
    }

    res.json({
      subscription: {
        status: user.subscription_status,
        plan: user.current_plan,
        userSince: user.created_at
      }
    });

  } catch (error) {
    console.error('Get subscription error:', error);
    res.status(500).json({ 
      message: 'Server error while fetching subscription' 
    });
  }
});

// @route   GET /api/users (Admin only)
// @desc    Get all users (Admin only)
// @access  Private/Admin
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, role } = req.query;
    
    let query = {};
    
    // Filter by subscription status
    if (status && ['active', 'inactive', 'suspended', 'pending'].includes(status)) {
      query.subscription_status = status;
    }
    
    // Filter by role
    if (role && ['customer', 'admin', 'support'].includes(role)) {
      query.role = role;
    }

    const { data: users, error, count } = await supabase
      .from('users')
      .select('*', { count: 'exact' })
      .eq('role', 'admin') // Assuming admin role is 'admin'
      .range((page - 1) * limit, page * limit - 1);

    if (error) {
      return res.status(500).json({ 
        message: 'Server error while fetching users' 
      });
    }

    res.json({
      users: users.map(user => ({
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        phone: user.phone,
        address: user.address,
        city: user.city,
        state: user.state,
        zipCode: user.zip_code,
        subscriptionStatus: user.subscription_status,
        role: user.role,
        createdAt: user.created_at,
        updatedAt: user.updated_at
      })),
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ 
      message: 'Server error while fetching users' 
    });
  }
});

// @route   GET /api/users/:id (Admin only)
// @desc    Get user by ID (Admin only)
// @access  Private/Admin
router.get('/:id', async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error || !user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        phone: user.phone,
        address: user.address,
        city: user.city,
        state: user.state,
        zipCode: user.zip_code,
        subscriptionStatus: user.subscription_status,
        role: user.role,
        createdAt: user.created_at,
        updatedAt: user.updated_at
      }
    });

  } catch (error) {
    console.error('Get user error:', error);
    if (error.code === 'PGRST116') { // Supabase error code for no rows found
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }
    res.status(500).json({ 
      message: 'Server error while fetching user' 
    });
  }
});

// @route   PUT /api/users/:id/status (Admin only)
// @desc    Update user subscription status (Admin only)
// @access  Private/Admin
router.put('/:id/status', [
  // protect, // Removed protect middleware
  // admin, // Removed admin middleware
  body('subscriptionStatus').isIn(['active', 'inactive', 'suspended', 'pending']).withMessage('Invalid subscription status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const userId = req.params.id; // Get user ID from params
    const { subscriptionStatus } = req.body;

    const { error: updateError } = await supabase
      .from('users')
      .update({ subscription_status: subscriptionStatus })
      .eq('id', userId);

    if (updateError) {
      return res.status(500).json({ 
        message: 'Server error while updating user status' 
      });
    }

    const { data: user, error: getError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (getError || !user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    res.json({
      message: 'User status updated successfully',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        phone: user.phone,
        address: user.address,
        city: user.city,
        state: user.state,
        zipCode: user.zip_code,
        subscriptionStatus: user.subscription_status,
        role: user.role,
        createdAt: user.created_at,
        updatedAt: user.updated_at
      }
    });

  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({ 
      message: 'Server error while updating user status' 
    });
  }
});

// @route   DELETE /api/users/:id (Admin only)
// @desc    Delete user (Admin only)
// @access  Private/Admin
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id; // Get user ID from params

    const { error: deleteError } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);

    if (deleteError) {
      return res.status(500).json({ 
        message: 'Server error while deleting user' 
      });
    }

    res.json({
      message: 'User suspended successfully'
    });

  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ 
      message: 'Server error while deleting user' 
    });
  }
});

module.exports = router;
