const Student = require('../models/student');

async function listStudents(req, res) {
  try {
    const students = await Student.listStudents();
    res.render('students', { students });
  } catch (err) {
    console.error('List students error:', err);
    req.flash('error', err.message || 'Could not load students');
    res.redirect('/');
  }
}

function showNewStudent(req, res) {
  res.render('new_student');
}

async function createStudent(req, res) {
  try {
    const { name } = req.body;
    await Student.createStudent({ name });
    req.flash('success', 'Student added');
    res.redirect('/students');
  } catch (err) {
    console.error('Create student error:', err);
    req.flash('error', err.message || 'Could not add student');
    res.redirect('/students/new');
  }
}

module.exports = { listStudents, showNewStudent, createStudent };
