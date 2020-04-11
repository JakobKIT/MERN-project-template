/* eslint-disable no-console */
const Post = require('../models/Post');

const initializeTestPosts = async () => {

  const testPosts = [
    new Post({
      title: 'First Example Post',
      text: 'This is just an example Post for testing purposes',
    }),
    new Post({
      title: 'Second Example Post',
      text: 'This is yet another example Post for testing purposes',
    }),
  ];

  try {
    const posts = await Post.find().sort({ date: -1 });
    posts.forEach(async (post) => {
      await post.remove();
    });
    testPosts.forEach(async (post) => {
      await post.save();
    });
  } catch (err) {
    console.log(`${err}`.red.bold);
  }
};

module.exports = initializeTestPosts;
