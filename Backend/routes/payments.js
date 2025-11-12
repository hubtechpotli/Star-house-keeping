const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { body, validationResult } = require('express-validator');
const supabase = require('../config/supabase');

const router = express.Router();

// @route   POST /api/payments/create-payment-intent
// @desc    Create Stripe payment intent
// @access  Private
router.post('/create-payment-intent', [
  // protect, // Removed as per new_code
  body('planId').notEmpty().withMessage('Plan ID is required'),
  body('billingCycle').isIn(['monthly', 'yearly']).withMessage('Billing cycle must be monthly or yearly'),
  body('setupFee').optional().isNumeric().withMessage('Setup fee must be a number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { planId, billingCycle, setupFee = 0 } = req.body;

    // Get plan details from Supabase
    const { data: plan, error: planError } = await supabase
      .from('plans')
      .select('*')
      .eq('id', planId)
      .eq('is_available', true)
      .single();

    if (planError || !plan) {
      return res.status(404).json({ 
        message: 'Plan not found or inactive' 
      });
    }

    // Calculate amount (using plan.price as base)
    const baseAmount = plan.price;
    const totalAmount = baseAmount + setupFee;

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        planId: planId,
        billingCycle: billingCycle,
        setupFee: setupFee.toString()
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      amount: totalAmount,
      plan: {
        id: plan.id,
        name: plan.name,
        description: plan.description,
        speed: plan.speed,
        price: plan.price,
        features: plan.features
      }
    });

  } catch (error) {
    console.error('Create payment intent error:', error);
    res.status(500).json({ 
      message: 'Server error while creating payment intent' 
    });
  }
});

// @route   POST /api/payments/confirm
// @desc    Confirm payment and create subscription
// @access  Private
router.post('/confirm', [
  // protect, // Removed as per new_code
  body('paymentIntentId').notEmpty().withMessage('Payment intent ID is required'),
  body('planId').notEmpty().withMessage('Plan ID is required'),
  body('billingCycle').isIn(['monthly', 'yearly']).withMessage('Billing cycle must be monthly or yearly')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { paymentIntentId, planId, billingCycle } = req.body;

    // Verify payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ 
        message: 'Payment not completed' 
      });
    }

    // Get plan details from Supabase
    const { data: plan, error: planError } = await supabase
      .from('plans')
      .select('*')
      .eq('id', planId)
      .eq('is_available', true)
      .single();

    if (planError || !plan) {
      return res.status(404).json({ 
        message: 'Plan not found or inactive' 
      });
    }

    // Calculate next billing date
    const nextBillingDate = new Date();
    if (billingCycle === 'yearly') {
      nextBillingDate.setFullYear(nextBillingDate.getFullYear() + 1);
    } else {
      nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
    }

    // Create payment record in Supabase
    const { data: paymentData, error: paymentError } = await supabase
      .from('payments')
      .insert({
        user_id: req.user.id, // Assuming req.user.id is available from middleware
        plan_id: planId,
        amount: billingCycle === 'yearly' ? plan.price : plan.price, // Use plan.price directly
        payment_method: 'stripe',
        payment_status: 'completed',
        stripe_payment_intent_id: paymentIntentId,
        billing_cycle: billingCycle,
        next_billing_date: nextBillingDate,
        setup_fee: plan.setup_fee || 0,
        total_amount: paymentIntent.amount / 100,
        created_at: new Date()
      })
      .select()
      .single();

    if (paymentError) {
      console.error('Error creating payment record:', paymentError);
      return res.status(500).json({ 
        message: 'Server error while confirming payment' 
      });
    }

    // Update user subscription status in Supabase
    const { error: userError } = await supabase
      .from('users')
      .update({
        current_plan: planId,
        subscription_status: 'active'
      })
      .eq('id', req.user.id);

    if (userError) {
      console.error('Error updating user subscription:', userError);
      return res.status(500).json({ 
        message: 'Server error while confirming payment' 
      });
    }

    res.json({
      message: 'Payment confirmed successfully',
      payment: {
        id: paymentData.id,
        amount: paymentData.amount,
        paymentMethod: paymentData.payment_method,
        paymentStatus: paymentData.payment_status,
        stripePaymentIntentId: paymentData.stripe_payment_intent_id,
        billingCycle: paymentData.billing_cycle,
        nextBillingDate: paymentData.next_billing_date,
        setupFee: paymentData.setup_fee,
        totalAmount: paymentData.total_amount,
        createdAt: paymentData.created_at
      },
      subscription: {
        plan: {
          id: plan.id,
          name: plan.name,
          description: plan.description,
          speed: plan.speed,
          price: plan.price,
          features: plan.features
        },
        nextBillingDate: paymentData.next_billing_date,
        status: 'active'
      }
    });

  } catch (error) {
    console.error('Confirm payment error:', error);
    res.status(500).json({ 
      message: 'Server error while confirming payment' 
    });
  }
});

// @route   GET /api/payments/history
// @desc    Get user payment history
// @access  Private
router.get('/history', async (req, res) => {
  try {
    const { data: payments, error: paymentsError } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', req.user.id) // Assuming req.user.id is available from middleware
      .order('created_at', { ascending: false });

    if (paymentsError) {
      console.error('Error fetching payment history:', paymentsError);
      return res.status(500).json({ 
        message: 'Server error while fetching payment history' 
      });
    }

    res.json({
      count: payments.length,
      payments: payments.map(payment => ({
        id: payment.id,
        amount: payment.amount,
        paymentMethod: payment.payment_method,
        paymentStatus: payment.payment_status,
        stripePaymentIntentId: payment.stripe_payment_intent_id,
        billingCycle: payment.billing_cycle,
        nextBillingDate: payment.next_billing_date,
        setupFee: payment.setup_fee,
        totalAmount: payment.total_amount,
        createdAt: payment.created_at
      }))
    });

  } catch (error) {
    console.error('Get payment history error:', error);
    res.status(500).json({ 
      message: 'Server error while fetching payment history' 
    });
  }
});

// @route   GET /api/payments/:id
// @desc    Get payment details by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (paymentError || !payment) {
      return res.status(404).json({ 
        message: 'Payment not found' 
      });
    }

    // Check if user owns this payment or is admin
    if (payment.user_id.toString() !== req.user.id.toString() && req.user.role !== 'admin') { // Assuming req.user.id and req.user.role are available from middleware
      return res.status(403).json({ 
        message: 'Not authorized to view this payment' 
      });
    }

    res.json({
      id: payment.id,
      amount: payment.amount,
      paymentMethod: payment.payment_method,
      paymentStatus: payment.payment_status,
      stripePaymentIntentId: payment.stripe_payment_intent_id,
      billingCycle: payment.billing_cycle,
      nextBillingDate: payment.next_billing_date,
      setupFee: payment.setup_fee,
      totalAmount: payment.total_amount,
      createdAt: payment.created_at
    });

  } catch (error) {
    console.error('Get payment error:', error);
    if (error.code === 'PGRST116') { // Supabase error for no rows found
      return res.status(404).json({ 
        message: 'Payment not found' 
      });
    }
    res.status(500).json({ 
      message: 'Server error while fetching payment' 
    });
  }
});

// @route   POST /api/payments/cancel-subscription
// @desc    Cancel user subscription
// @access  Private
router.post('/cancel-subscription', async (req, res) => {
  try {
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', req.user.id) // Assuming req.user.id is available from middleware
      .single();

    if (userError || !user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }
    
    if (!user.current_plan) {
      return res.status(400).json({ 
        message: 'No active subscription to cancel' 
      });
    }

    // Update user subscription status in Supabase
    const { error: updateUserError } = await supabase
      .from('users')
      .update({
        subscription_status: 'inactive'
      })
      .eq('id', req.user.id);

    if (updateUserError) {
      console.error('Error updating user subscription status:', updateUserError);
      return res.status(500).json({ 
        message: 'Server error while cancelling subscription' 
      });
    }

    res.json({
      message: 'Subscription cancelled successfully',
      subscription: {
        status: 'cancelled',
        cancelledAt: new Date()
      }
    });

  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(500).json({ 
      message: 'Server error while cancelling subscription' 
    });
  }
});

// @route   POST /api/payments/webhook
// @desc    Handle Stripe webhooks
// @access  Public
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        // Handle successful payment
        console.log('Payment succeeded:', event.data.object.id);
        break;
      
      case 'payment_intent.payment_failed':
        // Handle failed payment
        console.log('Payment failed:', event.data.object.id);
        break;
      
      case 'invoice.payment_succeeded':
        // Handle recurring payment success
        console.log('Recurring payment succeeded:', event.data.object.id);
        break;
      
      case 'invoice.payment_failed':
        // Handle recurring payment failure
        console.log('Recurring payment failed:', event.data.object.id);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    res.status(500).json({ 
      message: 'Webhook handler error' 
    });
  }
});

module.exports = router;
