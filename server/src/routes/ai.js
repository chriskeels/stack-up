const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Transaction = require("../models/Transaction");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

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

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 150,
      temperature: 0.7
    });

    res.json({ tips: response.data.choices[0].text.trim().split("\n").filter(Boolean) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate insights" });
  }
});

module.exports = router;