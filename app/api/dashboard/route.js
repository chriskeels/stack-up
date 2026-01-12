import { authMiddleware } from '@/app/lib/auth';
const prisma = require('@/app/lib/prisma');
const Transaction = require('@/app/lib/models/transaction');
const Goal = require('@/app/lib/models/goal');

export async function GET(req) {
  const userId = authMiddleware(req);
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const transactions = await prisma.transactions.findMany({
      where: { user_id: userId },
      orderBy: { date: 'desc' },
      take: 5,
    });

    const totalIncome = await Transaction.aggregate([
      { $match: { user: userId, type: 'income' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const totalExpenses = await Transaction.aggregate([
      { $match: { user: userId, type: 'expense' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const totalSaved = await Goal.aggregate([
      { $match: { user: userId } },
      { $group: { _id: null, total: { $sum: '$progress' } } },
    ]);

    return Response.json({
      balance: (totalIncome[0]?.total || 0) - (totalExpenses[0]?.total || 0),
      totalSpent: totalExpenses[0]?.total || 0,
      totalSaved: totalSaved[0]?.total || 0,
      recentTransactions: transactions,
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
