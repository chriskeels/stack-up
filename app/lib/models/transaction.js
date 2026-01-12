const prisma = require('@/app/lib/prisma');

const Transaction = {
  async create({ user, type, category, amount, date, note }) {
    const tx = await prisma.transactions.create({
      data: {
        user_id: user,
        type,
        category,
        amount: Number(amount),
        date: date ? new Date(date) : undefined,
        note,
      },
    });
    return tx;
  },

  async find(query) {
    const { user } = query;
    const rows = await prisma.transactions.findMany({
      where: { user_id: user },
      orderBy: { date: 'desc' },
    });
    return rows;
  },

  async findOneAndUpdate(filter, update) {
    const { _id, user } = filter;
    const id = parseInt(_id, 10);
    if (Number.isNaN(id)) return null;
    try {
      const updated = await prisma.transactions.update({
        where: { id },
        data: {
          type: update.type,
          category: update.category,
          amount: Number(update.amount),
          date: update.date ? new Date(update.date) : undefined,
          note: update.note,
          updated_at: new Date(),
        },
      });
      // Ensure user_id matches (security check)
      if (updated.user_id !== user) return null;
      return updated;
    } catch {
      return null;
    }
  },

  async findOneAndDelete(filter) {
    const { _id, user } = filter;
    const id = parseInt(_id, 10);
    if (Number.isNaN(id)) return null;
    try {
      // First, fetch to check user_id
      const tx = await prisma.transactions.findUnique({ where: { id } });
      if (!tx || tx.user_id !== user) return null;
      await prisma.transactions.delete({ where: { id } });
      return { id };
    } catch {
      return null;
    }
  },

  async aggregate(pipeline) {
    const matchStage = pipeline.find((stage) => stage.$match);
    const groupStage = pipeline.find((stage) => stage.$group);
    if (!matchStage || !groupStage) return [];

    const { user, type } = matchStage.$match;
    const rows = await prisma.transactions.aggregate({
      _sum: { amount: true },
      where: { user_id: user, type },
    });
    // Prisma Decimal: convert to string then number to avoid NaN
    const total = rows._sum.amount ? parseFloat(String(rows._sum.amount)) : 0;
    return [{ total }];
  },
};

module.exports = Transaction;
