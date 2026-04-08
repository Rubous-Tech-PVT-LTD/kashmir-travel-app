const { createAdminToken, ADMIN_COOKIE_NAME } = require('../middleware/adminAuth');

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const cookieMaxAgeMs = Number(process.env.ADMIN_TOKEN_TTL_MS || 8 * 60 * 60 * 1000);

const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.ADMIN_COOKIE_SAMESITE || 'lax',
  maxAge: cookieMaxAgeMs,
  path: '/',
  ...(process.env.ADMIN_COOKIE_DOMAIN ? { domain: process.env.ADMIN_COOKIE_DOMAIN } : {}),
});

exports.login = async (req, res) => {
  try {
    if (!ADMIN_USERNAME || !ADMIN_PASSWORD || !process.env.ADMIN_TOKEN_SECRET) {
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

    const isValid = username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
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

exports.logout = async (req, res) => {
  res.clearCookie(ADMIN_COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.ADMIN_COOKIE_SAMESITE || 'lax',
    path: '/',
    ...(process.env.ADMIN_COOKIE_DOMAIN ? { domain: process.env.ADMIN_COOKIE_DOMAIN } : {}),
  });

  return res.json({
    success: true,
    message: 'Admin logout successful',
  });
};

exports.getProfile = async (req, res) => {
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
