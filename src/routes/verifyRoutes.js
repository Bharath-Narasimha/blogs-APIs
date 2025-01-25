const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const router = express.Router();

router.get('/verify/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(`Verifying user with ID: ${userId}`); // Debugging log

    // Check if the userId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send('Invalid user ID');
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Proceed with updating the user's verification status
    user.isVerified = true;
    await user.save();

    res.send('Email verified successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error verifying email');
  }
});

module.exports = router;
