const prisma = require('@/app/lib/prisma');

const mapGoalRow = (row) => {
  if (!row) return null;
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    targetAmount: Number(row.target_amount || 0),
    progress: Number(row.progress || 0),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
};

const Goal = {
  async create({ user, title, targetAmount }) {
    const created = await prisma.goals.create({
      data: { user_id: user, title, target_amount: targetAmount },
    });
    return mapGoalRow(created);
  },

  async find({ user }) {
    const rows = await prisma.goals.findMany({
      where: { user_id: user },
      orderBy: { created_at: 'desc' },
    });
    return rows.map(mapGoalRow);
  },

  async findOneAndUpdate(filter, update) {
    const { _id, user } = filter;
    const id = parseInt(_id, 10);
    if (Number.isNaN(id)) return null;
    try {
      const row = await prisma.goals.update({
        where: { id },
        data: { progress: Number(update.progress), updated_at: new Date() },
      });
      // Ensure user_id matches (security check)
      if (row.user_id !== user) return null;
      return mapGoalRow(row);
    } catch {
      return null;
    }
  },

  async aggregate(pipeline) {
    const matchStage = pipeline.find((stage) => stage.$match);
    if (!matchStage) return [];
    const { user } = matchStage.$match;
    const res = await prisma.goals.aggregate({ _sum: { progress: true }, where: { user_id: user } });
    // Prisma Decimal: convert to string then number to avoid NaN
    const total = res._sum.progress ? parseFloat(String(res._sum.progress)) : 0;
    return [{ total }];
  },
};

module.exports = Goal;
