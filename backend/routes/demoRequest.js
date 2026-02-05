const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const DemoRequest = require('../models/DemoRequest');
const emailService = require('../services/emailService');

// Validation rules
const validateDemoRequest = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  
  body('companyName')
    .trim()
    .notEmpty().withMessage('Company name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Company name must be between 2 and 100 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('phoneNumber')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[+]?[\d\s-()]{7,20}$/).withMessage('Please provide a valid phone number'),
  
  body('businessType')
    .trim()
    .notEmpty().withMessage('Business type is required')
    .isLength({ max: 100 }).withMessage('Business type must not exceed 100 characters'),
  
  body('numCameras')
    .trim()
    .notEmpty().withMessage('Number of cameras is required')
    .isLength({ max: 50 }).withMessage('Number of cameras must not exceed 50 characters'),
  
  body('businessHours')
    .trim()
    .notEmpty().withMessage('Business hours are required')
    .isLength({ max: 100 }).withMessage('Business hours must not exceed 100 characters'),
  
  body('description')
    .trim()
    .optional()
    .isLength({ max: 1000 }).withMessage('Description must not exceed 1000 characters')
];

// POST /api/demo-request
router.post('/', validateDemoRequest, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const {
      name,
      companyName,
      email,
      phoneNumber,
      businessType,
      numCameras,
      businessHours,
      description
    } = req.body;

    // Create new demo request in database
    const demoRequest = new DemoRequest({
      name,
      companyName,
      email,
      phoneNumber,
      businessType,
      numCameras,
      businessHours,
      description,
      status: 'pending',
      emailSent: false
    });

    // Save to database
    const savedRequest = await demoRequest.save();
    console.log('✅ Demo request saved to database:', savedRequest._id);

    // Send email notification
    const emailSent = await emailService.sendDemoRequestEmail({
      name,
      companyName,
      email,
      phoneNumber,
      businessType,
      numCameras,
      businessHours,
      description
    });

    // Update emailSent status
    if (emailSent) {
      savedRequest.emailSent = true;
      await savedRequest.save();
      console.log('✅ Email sent and status updated');
    } else {
      console.warn('⚠️ Email failed to send, but request saved to database');
    }

    res.status(200).json({
      success: true,
      message: 'Thank you! Your demo request has been submitted successfully. We will contact you soon.',
      requestId: savedRequest._id
    });

  } catch (error) {
    console.error('Error processing demo request:', error);
    
    // Check if it's a MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A request with this email already exists.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request. Please try again later.'
    });
  }
});

// GET /api/demo-request - Get all demo requests (optional, for admin)
router.get('/', async (req, res) => {
  try {
    const { status, limit = 50, skip = 0 } = req.query;
    
    const query = status ? { status } : {};
    
    const requests = await DemoRequest.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const total = await DemoRequest.countDocuments(query);

    res.status(200).json({
      success: true,
      count: requests.length,
      total,
      data: requests
    });
  } catch (error) {
    console.error('Error fetching demo requests:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch demo requests'
    });
  }
});

// GET /api/demo-request/:id - Get single demo request by ID
router.get('/:id', async (req, res) => {
  try {
    const request = await DemoRequest.findById(req.params.id);
    
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Demo request not found'
      });
    }

    res.status(200).json({
      success: true,
      data: request
    });
  } catch (error) {
    console.error('Error fetching demo request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch demo request'
    });
  }
});

// PATCH /api/demo-request/:id - Update demo request status
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'contacted', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be: pending, contacted, completed, or cancelled'
      });
    }

    const request = await DemoRequest.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Demo request not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      data: request
    });
  } catch (error) {
    console.error('Error updating demo request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update demo request'
    });
  }
});

module.exports = router;