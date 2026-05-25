const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const engine = require('ejs-mate');
const flash = require('connect-flash');
require('dotenv').config();

const routes = require('./routes');
const { verifyToken, extractToken } = require('./utils/jwt');

const app = express();
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));
app.use(flash());

app.use((req, res, next) => {
  // Always initialize messages from flash
  res.locals.messages = req.flash();
  
  // Check JWT token first
  const token = extractToken(req);
  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      res.locals.currentUser = decoded;
      req.user = decoded;
      return next();
    }
  }

  // Fall back to session
  res.locals.currentUser = req.session.user || null;
  next();
});

app.use('/', routes);

// Global error handler to prevent server crash on uncaught errors
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  try {
    req.flash('error', err.message || 'Server error');
    return res.redirect(req.get('Referrer') || '/');
  } catch (e) {
    return res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

module.exports = app;
