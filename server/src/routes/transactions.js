const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const auth = require("../middleware/auth");

// POST /api/transactions → Add income/expense
router.post("/", auth, transactionController.addTransaction);

// GET /api/transactions → List transactions
router.get("/", auth, transactionController.getTransactions);

// PUT /api/transactions/:id → Edit transaction
router.put("/:id", auth, transactionController.updateTransaction);

// DELETE /api/transactions/:id → Delete transaction
router.delete("/:id", auth, transactionController.deleteTransaction);

module.exports = router;