const mongoose = require('mongoose');

const Product = mongoose.model('Product', {
  title: {
    type: String,
    required: true,
    minlenght: 1,
    trim: true,
  },
  subtitle: {
    type: String,
    trim: true,
  },
  price: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
});

module.exports = {
  Product,
};
