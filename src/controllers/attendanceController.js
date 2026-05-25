const Attendance = require('../models/attendance');

async function mark(req, res) {
  try {
    if (!req.session.user) return res.status(403).send('unauthorized');
    const event_id = req.params.id;
    await Attendance.markAttendance({ user_id: req.session.user.id, event_id });
    req.flash('success', 'Attendance recorded');
    res.redirect(`/events/${event_id}`);
  } catch (err) {
    console.error('Mark attendance error:', err);
    req.flash('error', err.message || 'Could not record attendance');
    res.redirect(`/events/${req.params.id}`);
  }
}

module.exports = { mark };
