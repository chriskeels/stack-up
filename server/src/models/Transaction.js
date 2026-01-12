const { pool } = require("../config/db");

const Transaction = {
  async create({ user, type, category, amount, date, note }) {
    const result = await pool.query(
      "INSERT INTO transactions (user_id, type, category, amount, date, note) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [user, type, category, amount, date || new Date(), note]
    );
    return result.rows[0];
  },

  async find(query) {
    const { user, type, date } = query;
    let queryStr = "SELECT * FROM transactions WHERE user_id = $1";
    const params = [user];
    
    if (type) {
      params.push(type);
      queryStr += ` AND type = $${params.length}`;
    }
    
    if (date && date.$gte) {
      params.push(date.$gte);
      queryStr += ` AND date >= $${params.length}`;
    }
    
    queryStr += " ORDER BY date DESC";
    
    const result = await pool.query(queryStr, params);
    return result.rows;
  },

  async findOneAndUpdate(filter, update, options = {}) {
    const { _id, user } = filter;
    const { type, category, amount, date, note } = update;
    
    const result = await pool.query(
      "UPDATE transactions SET type = $1, category = $2, amount = $3, date = $4, note = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 AND user_id = $7 RETURNING *",
      [type, category, amount, date, note, _id, user]
    );
    return result.rows[0];
  },

  async findOneAndDelete(filter) {
    const { _id, user } = filter;
    const result = await pool.query(
      "DELETE FROM transactions WHERE id = $1 AND user_id = $2 RETURNING *",
      [_id, user]
    );
    return result.rows[0];
  },

  async aggregate(pipeline) {
    const matchStage = pipeline.find(stage => stage.$match);
    const groupStage = pipeline.find(stage => stage.$group);
    
    if (!matchStage || !groupStage) return [];
    
    const { user, type } = matchStage.$match;
    const result = await pool.query(
      "SELECT COALESCE(SUM(amount), 0) as total FROM transactions WHERE user_id = $1 AND type = $2",
      [user, type]
    );
    
    return result.rows.length > 0 ? [{ total: parseFloat(result.rows[0].total) }] : [];
  }
};

module.exports = Transaction;