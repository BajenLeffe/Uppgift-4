const Student = require('../models/student');
const StudentAttendance = require('../models/studentAttendance');

async function showRegister(req, res) {
  try {
    const students = await Student.listStudents();
    res.render('attendance_register', { students });
  } catch (err) {
    console.error('Show register error:', err);
    req.flash('error', 'Could not load attendance register');
    res.redirect('/');
  }
}

async function mark(req, res) {
  try {
    const { student_id, status, date, delay_minutes } = req.body;
    await StudentAttendance.markForStudent({ 
      student_id: Number(student_id), 
      status, 
      date,
      delay_minutes: status === 'Försenad' ? Number(delay_minutes) || 0 : null
    });
    req.flash('success', 'Attendance recorded');
    res.redirect('/attendance/register');
  } catch (err) {
    console.error('Mark student attendance error:', err);
    req.flash('error', err.message || 'Could not record attendance');
    res.redirect('/attendance/register');
  }
}

async function history(req, res) {
  try {
    const students = await Student.listStudents();
    const recent = await StudentAttendance.recentAttendance(100);
    res.render('attendance_history', { students, recent });
  } catch (err) {
    console.error('Attendance history error:', err);
    req.flash('error', 'Could not load attendance history');
    res.redirect('/');
  }
}

async function myAttendance(req, res) {
  try {
    // Students can only view their own attendance
    // Find the student record for this user (by name match)
    const students = await Student.listStudents();
    const myStudent = students.find(s => s.name.toLowerCase() === req.user.name.toLowerCase());
    
    if (!myStudent) {
      req.flash('info', 'No attendance records found for you yet');
      return res.render('my_attendance', { attendance: [] });
    }
    
    const attendance = await StudentAttendance.historyForStudent(myStudent.id);
    res.render('my_attendance', { attendance, studentName: req.user.name });
  } catch (err) {
    console.error('My attendance error:', err);
    req.flash('error', 'Could not load your attendance');
    res.redirect('/');
  }
}

module.exports = { showRegister, mark, history, myAttendance };
