const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Verification route
router.get('/verify/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by the ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Verify the user's email
    user.isVerified = true; // Assuming you have this field
    await user.save();

    res.send('Email verified successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error verifying email');
  }
});

module.exports = router;
