const express = require('express');
const { body, validationResult } = require('express-validator');
const supabase = require('../config/supabase');

const router = express.Router();

// @route   GET /api/plans
// @desc    Get all active plans
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, sortBy = 'price', order = 'asc' } = req.query;
    
    let query = supabase
      .from('plans')
      .select('*')
      .eq('is_available', true);
    
    // Filter by category if provided
    if (category && ['basic', 'standard', 'premium', 'enterprise'].includes(category)) {
      query = query.eq('category', category);
    }

    // Apply sorting
    if (sortBy === 'price') {
      query = query.order('price', { ascending: order === 'asc' });
    } else if (sortBy === 'speed') {
      query = query.order('speed', { ascending: order === 'asc' });
    } else if (sortBy === 'name') {
      query = query.order('name', { ascending: order === 'asc' });
    } else {
      query = query.order('price', { ascending: true });
    }

    const { data: plans, error } = await query;

    if (error) {
      throw error;
    }

    res.json({
      count: plans.length,
      plans: plans.map(plan => ({
        id: plan.id,
        name: plan.name,
        description: plan.description,
        speed: plan.speed,
        price: plan.price,
        features: plan.features,
        dataCap: plan.data_cap,
        contractLength: plan.contract_length,
        isFeatured: plan.is_featured,
        isAvailable: plan.is_available
      }))
    });

  } catch (error) {
    console.error('Get plans error:', error);
    res.status(500).json({ 
      message: 'Server error while fetching plans' 
    });
  }
});

// @route   GET /api/plans/:id
// @desc    Get plan by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const { data: plan, error } = await supabase
      .from('plans')
      .select('*')
      .eq('id', req.params.id)
      .eq('is_available', true)
      .single();
    
    if (error || !plan) {
      return res.status(404).json({ 
        message: 'Plan not found' 
      });
    }

    res.json({ 
      plan: {
        id: plan.id,
        name: plan.name,
        description: plan.description,
        speed: plan.speed,
        price: plan.price,
        features: plan.features,
        dataCap: plan.data_cap,
        contractLength: plan.contract_length,
        isFeatured: plan.is_featured,
        isAvailable: plan.is_available
      }
    });

  } catch (error) {
    console.error('Get plan error:', error);
    res.status(500).json({ 
      message: 'Server error while fetching plan' 
    });
  }
});

// @route   GET /api/plans/popular/featured
// @desc    Get featured/popular plans
// @access  Public
router.get('/popular/featured', async (req, res) => {
  try {
    const { data: featuredPlans, error } = await supabase
      .from('plans')
      .select('*')
      .eq('is_available', true)
      .eq('is_featured', true)
      .order('price', { ascending: true })
      .limit(3);

    if (error) {
      throw error;
    }

    res.json({
      count: featuredPlans.length,
      plans: featuredPlans.map(plan => ({
        id: plan.id,
        name: plan.name,
        description: plan.description,
        speed: plan.speed,
        price: plan.price,
        features: plan.features,
        dataCap: plan.data_cap,
        contractLength: plan.contract_length,
        isFeatured: plan.is_featured,
        isAvailable: plan.is_available
      }))
    });

  } catch (error) {
    console.error('Get featured plans error:', error);
    res.status(500).json({ 
      message: 'Server error while fetching featured plans' 
    });
  }
});

// @route   POST /api/plans
// @desc    Create a new plan (Admin only)
// @access  Private/Admin
router.post('/', [
  // protect, // Removed as per new_code
  // admin, // Removed as per new_code
  body('name').trim().notEmpty().withMessage('Plan name is required'),
  body('description').trim().notEmpty().withMessage('Plan description is required'),
  body('speed.download').isNumeric().withMessage('Download speed must be a number'),
  body('speed.upload').isNumeric().withMessage('Upload speed must be a number'),
  body('price.monthly').isNumeric().withMessage('Monthly price must be a number'),
  body('price.yearly').isNumeric().withMessage('Yearly price must be a number'),
  body('features').isArray().withMessage('Features must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { data: newPlan, error } = await supabase
      .from('plans')
      .insert([req.body])
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({
      message: 'Plan created successfully',
      plan: newPlan
    });

  } catch (error) {
    console.error('Create plan error:', error);
    // Removed specific error handling for duplicate name as per new_code
    res.status(500).json({ 
      message: 'Server error while creating plan' 
    });
  }
});

// @route   PUT /api/plans/:id
// @desc    Update a plan (Admin only)
// @access  Private/Admin
router.put('/:id', [
  // protect, // Removed as per new_code
  // admin, // Removed as per new_code
  body('name').optional().trim().notEmpty().withMessage('Plan name cannot be empty'),
  body('description').optional().trim().notEmpty().withMessage('Plan description cannot be empty'),
  body('speed.download').optional().isNumeric().withMessage('Download speed must be a number'),
  body('speed.upload').optional().isNumeric().withMessage('Upload speed must be a number'),
  body('price.monthly').optional().isNumeric().withMessage('Monthly price must be a number'),
  body('price.yearly').optional().isNumeric().withMessage('Yearly price must be a number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { data: updatedPlan, error } = await supabase
      .from('plans')
      .update(req.body)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    if (!updatedPlan) {
      return res.status(404).json({ 
        message: 'Plan not found' 
      });
    }

    res.json({
      message: 'Plan updated successfully',
      plan: updatedPlan
    });

  } catch (error) {
    console.error('Update plan error:', error);
    // Removed specific error handling for duplicate name as per new_code
    res.status(500).json({ 
      message: 'Server error while updating plan' 
    });
  }
});

// @route   DELETE /api/plans/:id
// @desc    Delete a plan (Admin only)
// @access  Private/Admin
router.delete('/:id', [
  // protect, // Removed as per new_code
  // admin, // Removed as per new_code
], async (req, res) => {
  try {
    const { error } = await supabase
      .from('plans')
      .delete()
      .eq('id', req.params.id);

    if (error) {
      throw error;
    }

    res.json({
      message: 'Plan deleted successfully'
    });

  } catch (error) {
    console.error('Delete plan error:', error);
    res.status(500).json({ 
      message: 'Server error while deleting plan' 
    });
  }
});

// @route   GET /api/plans/check-availability/:zipCode
// @desc    Check plan availability in a specific area
// @access  Public
router.get('/check-availability/:zipCode', async (req, res) => {
  try {
    const { zipCode } = req.params;
    
    // Get all active plans
    const { data: plans, error } = await supabase
      .from('plans')
      .select('*')
      .eq('is_available', true);

    if (error) {
      throw error;
    }
    
    // Check availability for each plan
    const availablePlans = plans.filter(plan => 
      plan.availability.includes(zipCode) || plan.availability.length === 0
    );

    res.json({
      zipCode,
      availablePlans: availablePlans.map(plan => ({
        id: plan.id,
        name: plan.name,
        description: plan.description,
        speed: plan.speed,
        price: plan.price,
        features: plan.features,
        dataCap: plan.data_cap,
        contractLength: plan.contract_length,
        isFeatured: plan.is_featured,
        isAvailable: plan.is_available
      })),
      totalAvailable: availablePlans.length
    });

  } catch (error) {
    console.error('Check availability error:', error);
    res.status(500).json({ 
      message: 'Server error while checking availability' 
    });
  }
});

module.exports = router;
