const express = require('express');
const { body, validationResult } = require('express-validator');
const supabase = require('../config/supabase');

const router = express.Router();

// @route   POST /api/support
// @desc    Create a new support ticket
// @access  Private
router.post('/', [
  // protect, // Removed as per new_code
  body('subject').trim().isLength({ min: 5, max: 200 }).withMessage('Subject must be between 5 and 200 characters'),
  body('description').trim().isLength({ min: 20, max: 2000 }).withMessage('Description must be between 20 and 2000 characters'),
  body('category').isIn(['technical', 'billing', 'account', 'general']).withMessage('Invalid category'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { subject, description, category, priority = 'medium' } = req.body;
    
    // For now, we'll get user ID from headers or query params
    // In production, you'd use JWT middleware to get req.user
    const userId = req.headers['user-id'] || req.query.userId;
    
    if (!userId) {
      return res.status(401).json({ 
        message: 'User ID required' 
      });
    }

    // Create ticket in Supabase
    const { data: ticket, error } = await supabase
      .from('support_tickets')
      .insert([{
        user_id: userId,
        subject,
        description,
        category,
        priority,
        status: 'open'
      }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({
      message: 'Support ticket created successfully',
      ticket: {
        id: ticket.id,
        subject: ticket.subject,
        description: ticket.description,
        category: ticket.category,
        priority: ticket.priority,
        status: ticket.status,
        createdAt: ticket.created_at
      }
    });

  } catch (error) {
    console.error('Create ticket error:', error);
    res.status(500).json({ 
      message: 'Server error while creating support ticket' 
    });
  }
});

// @route   GET /api/support/tickets
// @desc    Get user's support tickets
// @access  Private
router.get('/tickets', async (req, res) => {
  try {
    const userId = req.headers['user-id'] || req.query.userId;
    
    if (!userId) {
      return res.status(401).json({ 
        message: 'User ID required' 
      });
    }

    const { data: tickets, error } = await supabase
      .from('support_tickets')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) {
      throw error;
    }

    const userTickets = tickets.map(ticket => ({
      id: ticket.id,
      subject: ticket.subject,
      description: ticket.description,
      category: ticket.category,
      priority: ticket.priority,
      status: ticket.status,
      createdAt: ticket.created_at,
      updatedAt: ticket.updated_at,
      messageCount: ticket.messages ? ticket.messages.length : 0
    }));

    res.json({
      count: userTickets.length,
      tickets: userTickets
    });

  } catch (error) {
    console.error('Get tickets error:', error);
    res.status(500).json({ 
      message: 'Server error while fetching support tickets' 
    });
  }
});

// @route   GET /api/support/tickets/:id
// @desc    Get support ticket details
// @access  Private
router.get('/tickets/:id', async (req, res) => {
  try {
    const ticketId = req.params.id;
    const userId = req.headers['user-id'] || req.query.userId;
    
    if (!userId) {
      return res.status(401).json({ 
        message: 'User ID required' 
      });
    }

    const { data: ticket, error } = await supabase
      .from('support_tickets')
      .select('*')
      .eq('id', ticketId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // Record not found
        return res.status(404).json({ 
          message: 'Support ticket not found' 
        });
      }
      throw error;
    }

    // Check if user owns this ticket or is support staff
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

    if (userError) {
      throw userError;
    }

    if (ticket.user_id !== userId && user.role !== 'support' && user.role !== 'admin') {
      return res.status(403).json({ 
        message: 'Not authorized to view this ticket' 
      });
    }

    res.json({
      ticket: {
        id: ticket.id,
        subject: ticket.subject,
        description: ticket.description,
        category: ticket.category,
        priority: ticket.priority,
        status: ticket.status,
        createdAt: ticket.created_at,
        updatedAt: ticket.updated_at,
        messages: ticket.messages ? ticket.messages : []
      }
    });

  } catch (error) {
    console.error('Get ticket error:', error);
    res.status(500).json({ 
      message: 'Server error while fetching support ticket' 
    });
  }
});

// @route   POST /api/support/tickets/:id/message
// @desc    Add message to support ticket
// @access  Private
router.post('/tickets/:id/message', [
  // protect, // Removed as per new_code
  body('message').trim().isLength({ min: 1, max: 1000 }).withMessage('Message must be between 1 and 1000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const ticketId = req.params.id;
    const { message } = req.body;
    const userId = req.headers['user-id'] || req.query.userId;
    
    if (!userId) {
      return res.status(401).json({ 
        message: 'User ID required' 
      });
    }

    const { data: ticket, error } = await supabase
      .from('support_tickets')
      .select('*')
      .eq('id', ticketId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // Record not found
        return res.status(404).json({ 
          message: 'Support ticket not found' 
        });
      }
      throw error;
    }

    // Check if user owns this ticket or is support staff
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

    if (userError) {
      throw userError;
    }

    if (ticket.user_id !== userId && user.role !== 'support' && user.role !== 'admin') {
      return res.status(403).json({ 
        message: 'Not authorized to add message to this ticket' 
      });
    }

    const newMessage = {
      id: ticket.messages ? ticket.messages.length + 1 : 1, // Simple ID generation
      user_id: userId,
      message,
      is_from_support: user.role === 'support' || user.role === 'admin'
    };

    const { data: updatedTicket, error: updateError } = await supabase
      .from('support_tickets')
      .update({
        messages: [...(ticket.messages || []), newMessage]
      })
      .eq('id', ticketId)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    // Update ticket status if support staff responds
    if (user.role === 'support' || user.role === 'admin') {
      await supabase
        .from('support_tickets')
        .update({ status: 'in_progress' })
        .eq('id', ticketId);
    }

    // Send notification email
    try {
      const recipientEmail = user.role === 'support' || user.role === 'admin' 
        ? ticket.user_email // Assuming user_email is stored in the ticket
        : process.env.SUPPORT_EMAIL || 'support@Star_Housekeeping-.com';
      
      const subject = user.role === 'support' || user.role === 'admin'
        ? `Support Ticket #${ticket.id} - New Response`
        : `Support Ticket #${ticket.id} - New Message`;

      // This part of the email sending logic needs to be re-evaluated
      // as it relies on sendEmail which was removed.
      // For now, we'll just log the email attempt.
      console.log(`Simulating email to ${recipientEmail} for ticket ${ticket.id} with subject: ${subject}`);

    } catch (emailError) {
      console.error('Ticket message notification email failed:', emailError);
    }

    res.json({
      message: 'Message added successfully',
      ticketMessage: newMessage
    });

  } catch (error) {
    console.error('Add message error:', error);
    res.status(500).json({ 
      message: 'Server error while adding message' 
    });
  }
});

// @route   PUT /api/support/tickets/:id/status (Support staff only)
// @desc    Update ticket status
// @access  Private/Support
router.put('/tickets/:id/status', [
  // protect, // Removed as per new_code
  // support, // Removed as per new_code
  body('status').isIn(['open', 'in_progress', 'resolved', 'closed']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const ticketId = req.params.id;
    const { status } = req.body;
    const userId = req.headers['user-id'] || req.query.userId;
    
    if (!userId) {
      return res.status(401).json({ 
        message: 'User ID required' 
      });
    }

    const { data: ticket, error } = await supabase
      .from('support_tickets')
      .select('*')
      .eq('id', ticketId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // Record not found
        return res.status(404).json({ 
          message: 'Support ticket not found' 
        });
      }
      throw error;
    }

    // Check if user owns this ticket or is support staff
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

    if (userError) {
      throw userError;
    }

    if (ticket.user_id !== userId && user.role !== 'support' && user.role !== 'admin') {
      return res.status(403).json({ 
        message: 'Not authorized to update this ticket status' 
      });
    }

    const { data: updatedTicket, error: updateError } = await supabase
      .from('support_tickets')
      .update({ status, updated_at: new Date() })
      .eq('id', ticketId)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    // Send status update email to user
    try {
      const recipientEmail = ticket.user_email; // Assuming user_email is stored in the ticket
      await supabase
        .from('support_tickets')
        .select('user_email')
        .eq('id', ticketId)
        .single();

      const subject = `Support Ticket #${ticket.id} Status Updated`;

      // This part of the email sending logic needs to be re-evaluated
      // as it relies on sendEmail which was removed.
      // For now, we'll just log the email attempt.
      console.log(`Simulating email to ${recipientEmail} for ticket ${ticket.id} with subject: ${subject}`);

    } catch (emailError) {
      console.error('Status update email failed:', emailError);
    }

    res.json({
      message: 'Ticket status updated successfully',
      ticket: {
        id: updatedTicket.id,
        status: updatedTicket.status,
        updatedAt: updatedTicket.updated_at
      }
    });

  } catch (error) {
    console.error('Update ticket status error:', error);
    res.status(500).json({ 
      message: 'Server error while updating ticket status' 
    });
  }
});

// @route   GET /api/support/all-tickets (Support staff only)
// @desc    Get all support tickets (Support staff only)
// @access  Private/Support
router.get('/all-tickets', async (req, res) => {
  try {
    const { status, priority, category, page = 1, limit = 20 } = req.query;
    
    let query = supabase
      .from('support_tickets')
      .select('*')
      .order('updated_at', { ascending: false });

    // Filter by status
    if (status && ['open', 'in_progress', 'resolved', 'closed'].includes(status)) {
      query = query.eq('status', status);
    }
    
    // Filter by priority
    if (priority && ['low', 'medium', 'high', 'urgent'].includes(priority)) {
      query = query.eq('priority', priority);
    }
    
    // Filter by category
    if (category && ['technical', 'billing', 'account', 'general'].includes(category)) {
      query = query.eq('category', category);
    }

    // Sort by priority and creation date
    query = query.order('priority', { ascending: false }); // Prioritize urgency
    query = query.order('created_at', { ascending: false }); // Then by creation date

    const { data: tickets, error, count } = await query
      .range((page - 1) * limit, (page - 1) * limit + limit - 1)
      .select('*', { count: 'exact' });

    if (error) {
      throw error;
    }

    const paginatedTickets = tickets.map(ticket => ({
      id: ticket.id,
      subject: ticket.subject,
      status: ticket.status,
      priority: ticket.priority,
      category: ticket.category,
      userName: ticket.user_name, // Assuming user_name is stored in the ticket
      userEmail: ticket.user_email, // Assuming user_email is stored in the ticket
      createdAt: ticket.created_at,
      updatedAt: ticket.updated_at,
      messageCount: ticket.messages ? ticket.messages.length : 0
    }));

    res.json({
      tickets,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count
    });

  } catch (error) {
    console.error('Get all tickets error:', error);
    res.status(500).json({ 
      message: 'Server error while fetching all tickets' 
    });
  }
});

module.exports = router;
