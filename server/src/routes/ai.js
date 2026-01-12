const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Transaction = require("../models/Transaction");
const OpenAI = require("openai");

// OpenAI client (new SDK)
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// GET /api/ai/insights → personalized tips
router.get("/insights", auth, async (req, res) => {
  const userId = req.userId;

  try {
    // Fetch last 30 days of transactions
    const transactions = await Transaction.find({ user: userId, date: { $gte: new Date(Date.now() - 30*24*60*60*1000) } });

    const summary = transactions.map(tx => `${tx.type} ${tx.amount} on ${tx.category}`).join("\n");

    const prompt = `
You are a friendly money coach for teens. 
Here is a summary of their last 30 days of spending:
${summary}

Give 3 short, actionable tips for this teen to save money, in teen-friendly language.
`;

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
      temperature: 0.7,
      max_output_tokens: 200
    });

    const tipsText = response.output_text || "";
    const tips = tipsText.split("\n").map(t => t.trim()).filter(Boolean);

    res.json({ tips });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate insights" });
  }
});

module.exports = router;