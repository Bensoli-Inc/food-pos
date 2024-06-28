const express = require('express');
const router = express.Router();
const Sales = require('../models/Sales');

// Mock Payment Processing
router.post('/pay', async (req, res) => {
  const { method, amount } = req.body;
  try {
    // Integrate with actual payment API
    if (method === 'mobile') {
      // Process mobile money payment
    } else if (method === 'cash') {
      // Process cash payment
    }
    // Record the sale
    const newSale = new Sales({
        items: req.body.items, // Ensure items are passed in the request
        total: amount,
        paymentMethod: method
      });
      await newSale.save();
      
    res.status(200).json({ message: 'Payment successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
