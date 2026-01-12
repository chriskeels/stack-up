import { authMiddleware } from '@/app/lib/auth';
const Transaction = require('@/app/lib/models/transaction');

export async function PUT(req, { params }) {
  const userId = authMiddleware(req);
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const { id } = params;
  const { type, category, amount, date, note } = await req.json();

  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: id, user: userId },
      { type, category, amount: Number(amount), date, note }
    );

    if (!transaction) {
      return Response.json({ error: 'Transaction not found' }, { status: 404 });
    }

    return Response.json(transaction);
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const userId = authMiddleware(req);
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const { id } = params;

  try {
    const transaction = await Transaction.findOneAndDelete({ _id: id, user: userId });
    if (!transaction) {
      return Response.json({ error: 'Transaction not found' }, { status: 404 });
    }

    return Response.json({ message: 'Transaction deleted', id });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
