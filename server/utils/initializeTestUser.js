/* eslint-disable no-console */
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const initializeTestUser = async () => {
  try {
    const user = await User.findOne({ email: 'test@example.com' });
    if (user) {
      console.log(`Example User created: Username: ${user.userName}, Password: Start123!, Email: ${user.email}`.grey.underline);
      return;
    }
    // Generate Salt
    const salt = await bcrypt.genSalt(10);
    // Hash testpassword
    const hash = await bcrypt.hash('Start123!', salt);
    // Create new User
    const newUser = new User({
      userName: 'TestUser',
      email: 'test@example.com',
      password: hash,
    });

    await newUser.save();
    console.log(`Example User created: Username: ${newUser.userName}, Password: Start123!, Email: ${newUser.email}`.grey.underline);
  } catch (err) {
    console.log(`${err}`.red.bold);
  }
};

module.exports = initializeTestUser;
