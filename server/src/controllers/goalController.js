const Goal = require("../models/Goal");

// CREATE GOAL
exports.createGoal = async (req, res) => {
  const userId = req.userId;
  const { title, targetAmount } = req.body;

  try {
    const goal = await Goal.create({ user: userId, title, targetAmount });
    res.json(goal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET GOALS
exports.getGoals = async (req, res) => {
  const userId = req.userId;
  try {
    const goals = await Goal.find({ user: userId });
    res.json(goals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// UPDATE PROGRESS (optional for MVP)
exports.updateGoal = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;
  const { progress } = req.body;

  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: id, user: userId },
      { progress },
      { new: true }
    );
    if (!goal) return res.status(404).json({ error: "Goal not found" });
    res.json(goal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};