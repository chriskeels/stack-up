const { pool } = require("../config/db");

const Goal = {
  async create({ user, title, targetAmount }) {
    const result = await pool.query(
      "INSERT INTO goals (user_id, title, target_amount) VALUES ($1, $2, $3) RETURNING *",
      [user, title, targetAmount]
    );
    return result.rows[0];
  },

  async find({ user }) {
    const result = await pool.query(
      "SELECT * FROM goals WHERE user_id = $1 ORDER BY created_at DESC",
      [user]
    );
    return result.rows;
  },

  async findOneAndUpdate(filter, update, options = {}) {
    const { _id, user } = filter;
    const { progress } = update;
    
    const result = await pool.query(
      "UPDATE goals SET progress = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 AND user_id = $3 RETURNING *",
      [progress, _id, user]
    );
    return result.rows[0];
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