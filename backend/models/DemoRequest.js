const mongoose = require('mongoose');

const demoRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  businessType: {
    type: String,
    required: true,
    trim: true
  },
  numCameras: {
    type: String,
    required: true,
    trim: true
  },
  businessHours: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'completed', 'cancelled'],
    default: 'pending'
  },
  emailSent: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Automatically manages createdAt and updatedAt
});

// Index for faster queries
demoRequestSchema.index({ email: 1, createdAt: -1 });
demoRequestSchema.index({ status: 1 });

// Virtual for formatted date
demoRequestSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

const DemoRequest = mongoose.model('DemoRequest', demoRequestSchema);

module.exports = DemoRequest;
