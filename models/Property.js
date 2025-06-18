const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  rent: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  area: {
    type: Number,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  city: {
    type: String,
    required: true
  },
  sector: {
    type: String,
    required: true
  },
  image: {
    type: String, // URL pública en Storj
    required: true
  },
  advisorWhatsapp: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Property', propertySchema);
