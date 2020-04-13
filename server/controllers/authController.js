const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route   POST api/auth
// @desc    Auth a user (e.g. login)
// @access  Public
exports.validateUser = async (req, res) => {
  const { userName, email, password } = req.body;

  // Simple validation
  if ((!userName && !email) || !password) {
    return res.status(400).json({
      success: false,
      error: 'Please enter all fields',
    });
  }
  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.findOne({ userName });
      if (!user) {
        return res.status(400).json({
          success: false,
          error: 'User does not exist',
        });
      }
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    const token = jwt.sign(
      // eslint-disable-next-line no-underscore-dangle
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
    );

    return res.status(201).json({
      success: true,
      token,
      data: {
        // eslint-disable-next-line no-underscore-dangle
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
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


// @route   POST api/auth/register
// @desc    Register new user
// @access  Public
exports.registerUser = async (req, res) => {
  const { userName,
    email,
    password,
    password2,
  } = req.body;

  // Simple validation
  if (!userName || !email || !password || !password2) {
    return res.status(400).json({
      success: false,
      error: 'Please enter all fields',
    });
  }

  if (password !== password2) {
    return res.status(400).json({
      success: false,
      error: 'Passwords have to be identical',
    });
  }
  try {
    const userEmail = await User.findOne({ email });
    const userUserName = await User.findOne({ userName });
    if (userEmail || userUserName) {
      return res.status(400).json({
        success: false,
        error: 'User already exists',
      });
    }

    const salt = await bcrypt.genSalt(10);
    if (!salt) {
      return res.status(400).json({
        success: false,
        error: 'Server Error',
      });
    }

    const hash = await bcrypt.hash(password, salt);
    if (!hash) {
      return res.status(400).json({
        success: false,
        error: 'Server Error',
      });
    }

    const newUser = new User({
      userName,
      email,
      password: hash,
    });

    const createdUser = await newUser.save();
    if (!createdUser) {
      return res.status(400).json({
        success: false,
        error: 'Server Error',
      });
    }
    const token = jwt.sign(
      // eslint-disable-next-line
      { id: createdUser._id },
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
    );
    if (!token) {
      return res.status(400).json({
        success: false,
        error: 'Server Error',
      });
    }

    return res.status(201).json({
      success: true,
      token,
      data: {
        // eslint-disable-next-line
        id: createdUser._id,
        name: createdUser.userName,
        email: createdUser.email,
      },
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

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};
