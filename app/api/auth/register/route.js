const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('@/app/lib/models/user');

export async function POST(req) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return Response.json({ error: 'Name, email, and password required' }, { status: 400 });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return Response.json({ error: 'Email already exists' }, { status: 400 });
    }

    const hash = await bcrypt.hash(password, 10);
    console.log('Creating user with:', { name, email, hashLength: hash.length });
    
    const created = await User.create({ name, email, passwordHash: hash });
    console.log('User created:', created);

    return Response.json({ message: 'Account created', user: created });
  } catch (err) {
    console.error('Registration error:', err);
    return Response.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
