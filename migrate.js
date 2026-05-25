const fs = require('fs');

async function runMigrations() {
  try {
    const sql = fs.readFileSync('./migrations/init.sql', 'utf8');
    console.log('Migration SQL (copy and paste into Supabase SQL Editor):');
    console.log('='.repeat(60));
    console.log(sql);
    console.log('='.repeat(60));
    console.log('\n✓ Instructions: Go to Supabase Dashboard > SQL Editor > Create new query');
    console.log('✓ Paste the above SQL and click "Run"');
    process.exit(0);
  } catch (err) {
    console.error('Error reading migrations:', err);
    process.exit(1);
  }
}

runMigrations();
