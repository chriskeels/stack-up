// Quick script to check users in database
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function checkUsers() {
  try {
    const result = await pool.query(
      "SELECT id, name, email, password_hash FROM users WHERE email = 'lpuser1@launchpadphilly.org'"
    );
    
    if (result.rows.length === 0) {
      console.log('❌ No user found with that email');
    } else {
      const user = result.rows[0];
      console.log('✅ User found:');
      console.log(`   ID: ${user.id}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Name: ${user.name}`);
      console.log(`   Password hash exists: ${user.password_hash ? 'Yes' : 'No'}`);
      console.log(`   Hash (first 20 chars): ${user.password_hash?.substring(0, 20)}...`);
    }
    
    // Also show all users
    const allUsers = await pool.query('SELECT id, name, email FROM users');
    console.log(`\nTotal users in DB: ${allUsers.rows.length}`);
    allUsers.rows.forEach(u => {
      console.log(`  - ${u.email} (${u.name})`);
    });
    
    await pool.end();
  } catch (err) {
    console.error('Database error:', err.message);
  }
}

checkUsers();
