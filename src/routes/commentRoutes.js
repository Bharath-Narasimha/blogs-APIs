const express = require('express');
const { addComment, getCommentsByBlog, deleteComment } = require('../controllers/commentController');
const authenticate = require('../middlewares/auth');

const router = express.Router();

// Add a comment
router.post('/', authenticate, addComment);

// Get all comments for a blog
router.get('/:blogId', authenticate, getCommentsByBlog);

// Delete a user's own comment
router.delete('/:id', authenticate, deleteComment);

module.exports = router;
