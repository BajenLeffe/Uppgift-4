const { verifyToken, extractToken } = require('../utils/jwt');

/**
 * Middleware to verify JWT token from cookies or Authorization header
 * Populates req.user with decoded token data
 */
function requireJwt(req, res, next) {
  const token = extractToken(req);

  if (!token) {
    return res.redirect('/login');
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    res.clearCookie('token');
    return res.redirect('/login');
  }

  req.user = decoded;
  next();
}

/**
 * Middleware to verify JWT token AND check admin role
 */
function requireJwtAdmin(req, res, next) {
  const token = extractToken(req);

  if (!token) {
    return res.redirect('/login');
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    res.clearCookie('token');
    return res.redirect('/login');
  }

  if (decoded.role !== 'admin') {
    return res.redirect('/attendance/my-attendance');
  }

  req.user = decoded;
  next();
}

/**
 * Middleware to verify JWT token AND check student role
 */
function requireJwtStudent(req, res, next) {
  const token = extractToken(req);

  if (!token) {
    return res.redirect('/login');
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    res.clearCookie('token');
    return res.redirect('/login');
  }

  if (decoded.role !== 'student') {
    return res.redirect('/attendance/register');
  }

  req.user = decoded;
  next();
}

module.exports = {
  requireJwt,
  requireJwtAdmin,
  requireJwtStudent
};
