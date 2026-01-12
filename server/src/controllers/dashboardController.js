const Transaction = require("../models/Transaction");
const Goal = require("../models/Goal");

exports.getDashboard = async (req, res) => {
  const userId = req.userId;

  try {
    const transactions = await Transaction.find({ user: userId }).sort({ date: -1 }).limit(5);

    const totalIncome = await Transaction.aggregate([
      { $match: { user: userId, type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const totalExpenses = await Transaction.aggregate([
      { $match: { user: userId, type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const totalSaved = await Goal.aggregate([
      { $match: { user: userId } },
      { $group: { _id: null, total: { $sum: "$progress" } } }
    ]);

    res.json({
      balance: (totalIncome[0]?.total || 0) - (totalExpenses[0]?.total || 0),
      totalSpent: totalExpenses[0]?.total || 0,
      totalSaved: totalSaved[0]?.total || 0,
      recentTransactions: transactions
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};