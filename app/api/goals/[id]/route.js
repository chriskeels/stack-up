import { authMiddleware } from '@/app/lib/auth';
const Goal = require('@/app/lib/models/goal');

export async function PUT(req, { params }) {
  const userId = authMiddleware(req);
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const { id } = await params;
  const { progress } = await req.json();

  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: id, user: userId },
      { progress }
    );

    if (!goal) {
      return Response.json({ error: 'Goal not found' }, { status: 404 });
    }

    return Response.json(goal);
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
