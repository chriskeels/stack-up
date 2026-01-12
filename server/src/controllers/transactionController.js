const Transaction = require("../models/Transaction");

// ADD TRANSACTION
exports.addTransaction = async (req, res) => {
  const userId = req.userId;
  const { type, category, amount, date, note } = req.body;

  try {
    const transaction = await Transaction.create({
      user: userId,
      type,
      category,
      amount,
      date,
      note
    });

    res.json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET ALL TRANSACTIONS (optional for this feature)
exports.getTransactions = async (req, res) => {
  const userId = req.userId;

  try {
    const transactions = await Transaction.find({ user: userId }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// EDIT TRANSACTION
exports.updateTransaction = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;
  const { type, category, amount, date, note } = req.body;

  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: id, user: userId },
      { type, category, amount, date, note },
      { new: true }
    );

    if (!transaction) return res.status(404).json({ error: "Transaction not found" });

    res.json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE TRANSACTION
exports.deleteTransaction = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;

  try {
    const transaction = await Transaction.findOneAndDelete({ _id: id, user: userId });
    if (!transaction) return res.status(404).json({ error: "Transaction not found" });

    res.json({ message: "Transaction deleted", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};