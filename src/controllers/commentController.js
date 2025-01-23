const Comment = require('../models/Comment');

// Add a comment to a blog
exports.addComment = async (req, res) => {
  const { blogId, content } = req.body;

  try {
    const comment = new Comment({
      blog: blogId,
      content,
      createdBy: req.user._id,
    });

    await comment.save();
    res.status(201).send({ message: 'Comment added successfully', comment });
  } catch (err) {
    res.status(500).send({ message: 'Error adding comment', error: err });
  }
};

// Get comments for a specific blog
exports.getCommentsByBlog = async (req, res) => {
  const { blogId } = req.params;

  try {
    const comments = await Comment.find({ blog: blogId }).populate('createdBy', 'name email');
    res.status(200).send(comments);
  } catch (err) {
    res.status(500).send({ message: 'Error retrieving comments', error: err });
  }
};

// Delete a user's own comment
exports.deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).send({ message: 'Comment not found' });

    // Only allow the user who created the comment to delete it
    if (comment.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).send({ message: 'You can only delete your own comments' });
    }

    await Comment.findByIdAndDelete(id);
    res.status(200).send({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error deleting comment', error: err });
  }
};
