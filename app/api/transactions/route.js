import { authMiddleware } from '@/app/lib/auth';
const Transaction = require('@/app/lib/models/transaction');

export async function POST(req) {
  const userId = authMiddleware(req);
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const { type, category, amount, date, note } = await req.json();

  try {
    const transaction = await Transaction.create({
      user: userId,
      type,
      category,
      amount: Number(amount),
      date,
      note,
    });

    return Response.json(transaction);
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
    const transactions = await Transaction.find({ user: userId });
    return Response.json(transactions);
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
