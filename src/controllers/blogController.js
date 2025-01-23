const Blog = require('../models/Blog');

// Create a new blog (Admin only)
exports.createBlog = async (req, res) => {
  const { title, content } = req.body;

  try {
    const blog = new Blog({ title, content, createdBy: req.user._id });
    await blog.save();
    res.status(201).send({ message: 'Blog created successfully', blog });
  } catch (err) {
    res.status(500).send({ message: 'Error creating blog', error: err });
  }
};

// Get all blogs (Accessible to all users)
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('createdBy', 'name email');
    res.status(200).send(blogs);
  } catch (err) {
    res.status(500).send({ message: 'Error retrieving blogs', error: err });
  }
};

// Edit a blog (Admin or Editor)
exports.editBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).send({ message: 'Blog not found' });

    // Check permissions: Admin or Editor assigned to the blog
    if (req.user.role !== 'Admin' && blog.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).send({ message: 'You are not authorized to edit this blog' });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    await blog.save();

    res.status(200).send({ message: 'Blog updated successfully', blog });
  } catch (err) {
    res.status(500).send({ message: 'Error editing blog', error: err });
  }
};

// Delete a blog (Admin only)
exports.deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return res.status(404).send({ message: 'Blog not found' });

    res.status(200).send({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error deleting blog', error: err });
  }
};
