import { authMiddleware } from '@/app/lib/auth';
const Transaction = require('@/app/lib/models/transaction');
const Goal = require('@/app/lib/models/goal');

export async function GET(req) {
  const userId = authMiddleware(req);
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    // Fetch user's transactions and goals
    const transactions = await Transaction.find({ user: userId });
    const goals = await Goal.find({ user: userId });

    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + Number(t.amount || 0), 0);
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount || 0), 0);
    const savings = totalIncome - totalExpenses;

    return Response.json({
      totalIncome,
      totalExpenses,
      savings,
      goals: goals.map(g => ({
        title: g.title,
        progress: g.progress,
        targetAmount: g.targetAmount
      }))
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to fetch user summary' }), { status: 500 });
  }
}
