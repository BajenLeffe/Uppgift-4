const express = require('express');
const router = express.Router();

const auth = require('../controllers/authController');
const studentCtrl = require('../controllers/studentController');
const studentAttendance = require('../controllers/studentAttendanceController');
const { requireJwt, requireJwtAdmin, requireJwtStudent } = require('../middleware/authJwt');

router.get('/', (req, res) => {
  if (req.user) {
    if (req.user.role === 'admin') {
      return res.redirect('/attendance/register');
    } else {
      return res.redirect('/attendance/my-attendance');
    }
  }
  res.render('index');
});

router.get('/login', auth.showLogin);
router.post('/login', auth.login);
router.post('/logout', auth.logout);

// Redirect /events to attendance register
router.get('/events', requireJwt, (req, res) => {
  res.redirect('/attendance/register');
});

// Students management (admin only)
router.get('/students', requireJwtAdmin, studentCtrl.listStudents);
router.get('/students/new', requireJwtAdmin, studentCtrl.showNewStudent);
router.post('/students', requireJwtAdmin, studentCtrl.createStudent);

// Student attendance (admin registration)
router.get('/attendance/register', requireJwtAdmin, studentAttendance.showRegister);
router.post('/attendance/register', requireJwtAdmin, studentAttendance.mark);

// Attendance history (admin view all)
router.get('/attendance/history', requireJwtAdmin, studentAttendance.history);

// Student personal attendance (students can see only their own)
router.get('/attendance/my-attendance', requireJwt, studentAttendance.myAttendance);

module.exports = router;
