const express = require('express');
const { createBlog, getAllBlogs, editBlog, deleteBlog } = require('../controllers/blogController');
const authenticate = require('../middlewares/auth');
const authorize = require('../middlewares/role');

const router = express.Router();

// Admin-only routes
router.post('/', authenticate, authorize('Admin'), createBlog);
router.delete('/:id', authenticate, authorize('Admin'), deleteBlog);

// Admin and Editor routes
router.put('/:id', authenticate, authorize('Admin', 'Editor'), editBlog);

// Public route
router.get('/', authenticate, getAllBlogs);

module.exports = router;
