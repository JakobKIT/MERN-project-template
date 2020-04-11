const Post = require('../models/Post');

// @route   GET api/posts
// @desc    Get All Posts
// @access  Public
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    return res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};


// @route   POST api/posts
// @desc    Create A Post
// @access  Private
exports.createPost = async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      text: req.body.text,
    });

    await newPost.save();

    return res.status(201).json({
      success: true,
      data: newPost,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    }
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};


// @route   DELETE api/posts/:id
// @desc    Deletes A Post
// @access  Private
exports.deletePost = async (req, res) => {
  try {
    const postToDelete = await Post.findById(req.params.id);

    if (!postToDelete) {
      return res.status(404).json({
        success: false,
        error: 'No item found',
      });
    }

    await postToDelete.remove();
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};
