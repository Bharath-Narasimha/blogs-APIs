const nodemailer = require('nodemailer');

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

// Function to send a verification email
exports.sendVerificationEmail = (user) => {
  // Base URL for email verification (uses the deployed URL or a fallback for local testing)
  const baseURL = process.env.BASE_URL || 'http://localhost:3000';

  // Construct the email verification link
  const verificationLink = `${baseURL}/verify/${user._id}`;

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email
    to: user.email, // Recipient's email
    subject: 'Verify your email', // Subject
    text: `Welcome to our platform! Please click the link to verify your email: ${verificationLink}`, // Plain text content
  };

  // Send the email
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email:', err.message);
    } else {
      console.log('Verification email sent successfully:', info.response);
    }
  });
};

