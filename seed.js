const supabase = require('./src/config/supabase');
const bcrypt = require('bcrypt');

async function seedDatabase() {
  try {
    // Hash passwords
    const adminHash = await bcrypt.hash('123', 10);
    const studentHash = await bcrypt.hash('321', 10);

    // Insert admin account
    const { error: adminError } = await supabase.from('users').insert([
      { username: 'admin', name: 'Admin User', password_hash: adminHash, role: 'admin' }
    ]);
    if (!adminError) {
      console.log('✓ Admin account created (username: admin, password: 123)');
    } else if (adminError.code === '23505') {
      console.log('✓ Admin account already exists');
    } else {
      throw adminError;
    }

    // Insert student account
    const { error: studentError } = await supabase.from('users').insert([
      { username: 'student', name: 'Student User', password_hash: studentHash, role: 'student' }
    ]);
    if (!studentError) {
      console.log('✓ Student account created (username: student, password: 321)');
    } else if (studentError.code === '23505') {
      console.log('✓ Student account already exists');
    } else {
      throw studentError;
    }

    console.log('\nDatabase seeding completed!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err.message);
    process.exit(1);
  }
}

seedDatabase();
