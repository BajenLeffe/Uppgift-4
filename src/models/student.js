const supabase = require('../config/supabase');

async function createStudent({ name }) {
  const { data, error } = await supabase.from('students').insert([{ name }]).select('*').single();
  if (error) throw error;
  return data;
}

async function listStudents() {
  const { data, error } = await supabase.from('students').select('*').order('name');
  if (error) throw error;
  return data;
}

async function findStudentById(id) {
  const { data, error } = await supabase.from('students').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data;
}

module.exports = { createStudent, listStudents, findStudentById };
