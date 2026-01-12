const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('@/app/lib/models/user');

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return Response.json({ error: 'Email and password required' }, { status: 400 });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.error('User not found:', email);
      return Response.json({ error: 'Invalid credentials' }, { status: 400 });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      console.error('Password mismatch for user:', email);
      return Response.json({ error: 'Invalid credentials' }, { status: 400 });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET);

    return Response.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    console.error('Login error:', err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
