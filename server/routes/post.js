const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// Controller Methods
const { getPosts, deletePost, createPost } = require('../controllers/postsController');

router.route('/')
  .get(getPosts)
  .post(auth, createPost);

router.route('/:id')
  .delete(auth, deletePost);

module.exports = router;
