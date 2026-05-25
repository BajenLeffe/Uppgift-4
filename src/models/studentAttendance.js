const supabase = require('../config/supabase');

async function markForStudent({ student_id, status, date, delay_minutes }) {
  const { data, error } = await supabase.from('attendance').insert([
    { student_id, status, date: date || new Date().toISOString().split('T')[0], delay_minutes }
  ]).select('*').single();
  if (error) throw error;
  return data;
}

async function historyForStudent(student_id) {
  const { data, error } = await supabase.from('attendance').select('*').eq('student_id', student_id).order('date', { ascending: false });
  if (error) throw error;
  return data;
}

async function recentAttendance(limit = 50) {
  const { data, error } = await supabase.from('attendance').select('*,students(*)').order('date', { ascending: false }).limit(limit);
  if (error) throw error;
  return data;
}

module.exports = { markForStudent, historyForStudent, recentAttendance };
