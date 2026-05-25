const User = require('../models/user');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

function showLogin(req, res) {
  res.render('login');
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findByUsername(username);
    if (!user) {
      req.flash('error', 'Invalid credentials');
      return res.redirect('/login');
    }
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      req.flash('error', 'Invalid credentials');
      return res.redirect('/login');
    }
    
    const userData = { id: user.id, username: user.username, name: user.name, role: user.role };
    
    // Set session (for backward compatibility)
    req.session.user = userData;
    
    // Generate and set JWT token in secure cookie
    const token = generateToken(userData);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    
    // Redirect based on role
    if (user.role === 'admin') {
      return res.redirect('/attendance/register');
    } else {
      return res.redirect('/attendance/my-attendance');
    }
  } catch (err) {
    console.error('Login error:', err);
    req.flash('error', err.message || 'Login failed');
    return res.redirect('/login');
  }
}

function logout(req, res) {
  // Clear session
  req.session.destroy(() => {
    // Clear JWT cookie
    res.clearCookie('token');
    res.redirect('/');
  });
}

module.exports = { showLogin, login, logout };
