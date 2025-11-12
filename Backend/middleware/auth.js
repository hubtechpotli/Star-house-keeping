const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes
const protect = async (req, res, next) => {
  try {
    let token;

    // Check if token exists in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ 
        message: 'Access denied. No token provided.' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from token
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        message: 'Token is not valid. User not found.' 
      });
    }

    // Check if user is active
    if (user.subscriptionStatus === 'suspended') {
      return res.status(403).json({ 
        message: 'Account is suspended. Please contact support.' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ 
      message: 'Token is not valid.' 
    });
  }
};

// Middleware to check if user is admin
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ 
      message: 'Access denied. Admin role required.' 
    });
  }
};

// Middleware to check if user is support staff
const support = (req, res, next) => {
  if (req.user && (req.user.role === 'support' || req.user.role === 'admin')) {
    next();
  } else {
    return res.status(403).json({ 
      message: 'Access denied. Support role required.' 
      });
  }
};

// Middleware to check if user owns the resource or is admin
const authorize = (resourceUserId) => {
  return (req, res, next) => {
    if (req.user.role === 'admin' || req.user._id.toString() === resourceUserId) {
      next();
    } else {
      return res.status(403).json({ 
        message: 'Access denied. Not authorized to access this resource.' 
      });
    }
  };
};

// Middleware to check if user has active subscription
const requireActiveSubscription = (req, res, next) => {
  if (req.user.subscriptionStatus === 'active') {
    next();
  } else {
    return res.status(403).json({ 
      message: 'Active subscription required to access this feature.' 
    });
  }
};

module.exports = {
  protect,
  admin,
  support,
  authorize,
  requireActiveSubscription
};
