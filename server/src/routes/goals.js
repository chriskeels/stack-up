const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goalController");
const auth = require("../middleware/auth");

// POST /api/goals → create new goal
router.post("/", auth, goalController.createGoal);

// GET /api/goals → get all goals
router.get("/", auth, goalController.getGoals);

// PUT /api/goals/:id → update progress
router.put("/:id", auth, goalController.updateGoal);

module.exports = router;