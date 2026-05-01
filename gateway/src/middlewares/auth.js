const jwt = require('jsonwebtoken');

const PUBLIC_PATHS = [
  { method: 'POST', path: '/auth/login' },
  { method: 'POST', path: '/auth/register' },
  { method: 'POST', path: '/auth/refresh' },
  { method: 'GET',  path: '/auth/google' },
  { method: 'GET',  path: '/auth/google/callback' },
  { method: 'GET',  path: '/auth/login-failed' },
];

const isPublic = (req) => {
  if (PUBLIC_PATHS.some(p => p.method === req.method && req.path === p.path)) {
    return true;
  }
  if (req.method === 'GET' && (
    req.path === '/properties' ||
    req.path.match(/^\/properties\/\d+$/) ||
    req.path === '/rooms' ||
    req.path.match(/^\/rooms\/\d+$/)
  )) {
    return true;
  }
  return false;
};

const authMiddleware = (req, res, next) => {
  if (isPublic(req)) return next();

  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access token required' });
  }

  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired access token' });
  }
};

module.exports = authMiddleware;
