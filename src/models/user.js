const supabase = require('../config/supabase');
const bcrypt = require('bcrypt');

async function createUser({ username, name, password, role = 'student' }) {
  const hash = await bcrypt.hash(password, 10);
  const { data, error } = await supabase.from('users').insert([
    { username, name, password_hash: hash, role }
  ]).select('id, username, name, role').single();
  if (error) throw error;
  return data;
}

async function findByUsername(username) {
  const { data, error } = await supabase.from('users').select('*').eq('username', username).maybeSingle();
  if (error) throw error;
  return data;
}

async function findById(id) {
  const { data, error } = await supabase.from('users').select('id, username, name, role').eq('id', id).maybeSingle();
  if (error) throw error;
  return data;
}

module.exports = { createUser, findByUsername, findById };
