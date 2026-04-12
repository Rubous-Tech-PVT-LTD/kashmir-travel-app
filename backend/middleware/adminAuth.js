const crypto = require('crypto');

const ADMIN_TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET;
const ADMIN_TOKEN_TTL_MS = Number(process.env.ADMIN_TOKEN_TTL_MS || 8 * 60 * 60 * 1000); // 8h
const ADMIN_COOKIE_NAME = process.env.ADMIN_COOKIE_NAME || 'ktt_admin_session';

if (!ADMIN_TOKEN_SECRET) {
  throw new Error('ADMIN_TOKEN_SECRET environment variable is not set');
}

const toBase64Url = (value) => Buffer.from(value, 'utf8').toString('base64url');
const fromBase64Url = (value) => Buffer.from(value, 'base64url').toString('utf8');

const sign = (payloadBase64) => {
  return crypto.createHmac('sha256', ADMIN_TOKEN_SECRET).update(payloadBase64).digest('base64url');
};

const createAdminToken = (username) => {
  const now = Date.now();
  const payload = {
    username,
    iat: now,
    exp: now + ADMIN_TOKEN_TTL_MS,
    role: 'admin',
  };

  const payloadBase64 = toBase64Url(JSON.stringify(payload));
  const signature = sign(payloadBase64);
  return `${payloadBase64}.${signature}`;
};

const verifyAdminToken = (token) => {
  if (!token || typeof token !== 'string' || !token.includes('.')) {
    return { valid: false, reason: 'Invalid token format' };
  }

  const [payloadBase64, signature] = token.split('.');
  if (!payloadBase64 || !signature) {
    return { valid: false, reason: 'Invalid token format' };
  }

  const expectedSignature = sign(payloadBase64);
  if (signature.length !== expectedSignature.length) {
    return { valid: false, reason: 'Invalid token signature' };
  }

  const matches = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));

  if (!matches) {
    return { valid: false, reason: 'Invalid token signature' };
  }

  try {
    const payload = JSON.parse(fromBase64Url(payloadBase64));

    if (!payload.exp || Date.now() > payload.exp) {
      return { valid: false, reason: 'Token expired' };
    }

    if (payload.role !== 'admin') {
      return { valid: false, reason: 'Invalid token role' };
    }

    return { valid: true, payload };
  } catch (error) {
    return { valid: false, reason: 'Invalid token payload' };
  }
};

const readCookieToken = (req) => {
  const cookieHeader = req.headers.cookie || '';
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(';').map((entry) => entry.trim());
  const match = cookies.find((entry) => entry.startsWith(`${ADMIN_COOKIE_NAME}=`));
  if (!match) {
    return null;
  }

  return decodeURIComponent(match.slice(ADMIN_COOKIE_NAME.length + 1));
};

const requireAdminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const cookieToken = readCookieToken(req);
  const token = bearerToken || cookieToken;

  const verification = verifyAdminToken(token);
  if (!verification.valid) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized admin request',
      error: verification.reason,
    });
  }

  req.admin = verification.payload;
  next();
};

module.exports = {
  createAdminToken,
  ADMIN_COOKIE_NAME,
  requireAdminAuth,
};
