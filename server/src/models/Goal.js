const { pool } = require("../config/db");

const mapGoalRow = row => {
  if (!row) return null;
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    targetAmount: Number(row.target_amount || 0),
    progress: Number(row.progress || 0),
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
};

const Goal = {
  async create({ user, title, targetAmount }) {
    const result = await pool.query(
      "INSERT INTO goals (user_id, title, target_amount) VALUES ($1, $2, $3) RETURNING *",
      [user, title, targetAmount]
    );
    return mapGoalRow(result.rows[0]);
  },

  async find({ user }) {
    const result = await pool.query(
      "SELECT * FROM goals WHERE user_id = $1 ORDER BY created_at DESC",
      [user]
    );
    return result.rows.map(mapGoalRow);
  },

  async findOneAndUpdate(filter, update, options = {}) {
    const { _id, user } = filter;
    const { progress } = update;
    const id = parseInt(_id, 10);

    if (Number.isNaN(id)) return null;
    
    const result = await pool.query(
      "UPDATE goals SET progress = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 AND user_id = $3 RETURNING *",
      [progress, id, user]
    );
    return mapGoalRow(result.rows[0]);
  },

  async aggregate(pipeline) {
    const matchStage = pipeline.find(stage => stage.$match);
    if (!matchStage) return [];
    
    const { user } = matchStage.$match;
    const result = await pool.query(
      "SELECT COALESCE(SUM(progress), 0) as total FROM goals WHERE user_id = $1",
      [user]
    );
    
    return result.rows.length > 0 ? [{ total: parseFloat(result.rows[0].total) }] : [];
  }
};

module.exports = Goal;