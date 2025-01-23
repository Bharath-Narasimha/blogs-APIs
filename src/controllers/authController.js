const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendVerificationEmail } = require('../utils/email');

exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const user = new User({ name, email, password, role });
    await user.save();

    sendVerificationEmail(user); // Send verification email

    res.status(201).send({ message: 'User registered successfully. Verify your email to proceed.' });
  } catch (err) {
    res.status(400).send({ message: 'Error registering user', error: err });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send({ message: 'Invalid credentials' });

    if (!user.isVerified) return res.status(403).send({ message: 'Verify your email first.' });

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.send({ token });
  } catch (err) {
    res.status(500).send({ message: 'Error logging in', error: err });
  }
};
