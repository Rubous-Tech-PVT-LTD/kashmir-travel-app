const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const { createAdminToken, ADMIN_COOKIE_NAME } = require('../middleware/adminAuth');

const cookieMaxAgeMs = Number(process.env.ADMIN_TOKEN_TTL_MS || 8 * 60 * 60 * 1000);

const getCookieOptions = () => {
  const isProd = process.env.NODE_ENV === 'production';
  const sameSite = process.env.ADMIN_COOKIE_SAMESITE || (isProd ? 'none' : 'lax');
  
  const options = {
    httpOnly: true,
    secure: isProd || sameSite === 'none',
    sameSite: sameSite,
    maxAge: cookieMaxAgeMs,
    path: '/',
  };

  if (process.env.ADMIN_COOKIE_DOMAIN) {
    options.domain = process.env.ADMIN_COOKIE_DOMAIN;
  }

  return options;
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required',
      });
    }

    // Lookup admin in database
    const admin = await Admin.findOne({ username: username.toLowerCase().trim() });
    
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials',
      });
    }

    // Verify password using the method on Admin model
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials',
      });
    }

    const token = createAdminToken(admin.username);

    const cookieOptions = getCookieOptions();
    res.cookie(ADMIN_COOKIE_NAME, token, cookieOptions);

    return res.json({
      success: true,
      message: 'Admin login successful',
      data: {
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error logging in admin',
      error: error.message,
    });
  }
};

exports.logout = (req, res) => {
  const options = getCookieOptions();
  // Remove maxAge for clearCookie
  delete options.maxAge;
  
  res.clearCookie(ADMIN_COOKIE_NAME, options);

  return res.json({
    success: true,
    message: 'Admin logout successful',
  });
};

exports.getProfile = (req, res) => {
  return res.json({
    success: true,
    data: {
      username: req.admin.username,
      role: req.admin.role,
      issuedAt: req.admin.iat,
      expiresAt: req.admin.exp,
    },
  });
};
