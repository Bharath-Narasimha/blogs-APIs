const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Verification route
router.get('/verify/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(`Verifying user with ID: ${userId}`); // Debugging log

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    user.isVerified = true;
    await user.save();

    res.send('Email verified successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error verifying email');
  }
});


module.exports = router;
