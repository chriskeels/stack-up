const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// SIGN UP
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ error: "Email already exists" });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash: hash });

  res.json({ message: "Account created" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  res.json({ token });
});

module.exports = router;