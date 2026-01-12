import { authMiddleware } from '@/app/lib/auth';
const Goal = require('@/app/lib/models/goal');

export async function POST(req) {
  const userId = authMiddleware(req);
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const { title, targetAmount } = await req.json();

  try {
    const goal = await Goal.create({ user: userId, title, targetAmount });
    return Response.json(goal);
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET(req) {
  const userId = authMiddleware(req);
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const goals = await Goal.find({ user: userId });
    return Response.json(goals);
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
