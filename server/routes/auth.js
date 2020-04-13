const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

// Controller Methods
const { registerUser, validateUser, getUser } = require('../controllers/authController');

router.route('/')
  .post(validateUser);

router.route('/register')
  .post(registerUser);

router.route('/user')
  .get(auth, getUser);

module.exports = router;
