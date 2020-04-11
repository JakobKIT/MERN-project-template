const express = require('express');

const router = express.Router();

// Controller Methods
const { registerUser, validateUser } = require('../controllers/authController');

router.route('/')
  .post(validateUser);

router.route('/register')
  .post(registerUser);

module.exports = router;
