const jwt = require('jsonwebtoken');


const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  // Check for token
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
    });
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user from payload
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: 'Token is not valid',
    });
  }
};

module.exports = auth;
