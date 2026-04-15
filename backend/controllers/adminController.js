const bcrypt = require('bcryptjs');
const { createAdminToken, ADMIN_COOKIE_NAME } = require('../middleware/adminAuth');

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

const cookieMaxAgeMs = Number(process.env.ADMIN_TOKEN_TTL_MS || 8 * 60 * 60 * 1000);

const getCookieOptions = () => {
  const isProd = process.env.NODE_ENV === 'production';
  const sameSite = process.env.ADMIN_COOKIE_SAMESITE || (isProd ? 'none' : 'lax');
  
  return {
    httpOnly: true,
    secure: isProd || sameSite === 'none',
    sameSite: sameSite,
    maxAge: cookieMaxAgeMs,
    path: '/',
    ...(process.env.ADMIN_COOKIE_DOMAIN ? { domain: process.env.ADMIN_COOKIE_DOMAIN } : {}),
  };
};

exports.login = async (req, res) => {
  try {
    if (!ADMIN_USERNAME || !ADMIN_PASSWORD_HASH || !process.env.ADMIN_TOKEN_SECRET) {
      return res.status(500).json({
        success: false,
        message: 'Admin auth is not configured on server',
      });
    }

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required',
      });
    }

    const isUsernameValid = username === ADMIN_USERNAME;
    const isPasswordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    const isValid = isUsernameValid && isPasswordValid;
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials',
      });
    }

    const token = createAdminToken(username);

    res.cookie(ADMIN_COOKIE_NAME, token, getCookieOptions());

    return res.json({
      success: true,
      message: 'Admin login successful',
      data: {
        username,
        role: 'admin',
      },
    });
  } catch (error) {
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
