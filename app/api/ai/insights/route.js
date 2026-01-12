import { authMiddleware } from '@/app/lib/auth';
const Transaction = require('@/app/lib/models/transaction');
const Goal = require('@/app/lib/models/goal');

export async function GET(req) {
  const userId = authMiddleware(req);
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    // Fetch user's transactions and goals
    const transactions = await Transaction.find({ user: userId });
    const goals = await Goal.find({ user: userId });
    
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + Number(t.amount || 0), 0);
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount || 0), 0);
    const savings = totalIncome - totalExpenses;
    
    // Calculate goal progress
    let goalSummary = '';
    if (goals.length > 0) {
      const goalsInfo = goals.map(g => {
        const progress = parseFloat(g.progress || 0);
        const target = parseFloat(g.targetAmount || 0);
        const percent = target > 0 ? Math.round((progress / target) * 100) : 0;
        return `${g.title}: $${progress}/$${target} (${percent}%)`;
      }).join('\n');
      goalSummary = `\n\nSavings Goals:\n${goalsInfo}`;
    }
    
    const prompt = `You are a friendly financial advisor for teens. Based on this spending summary, give 3-4 short, actionable money tips:\n- Total Income: $${totalIncome}\n- Total Expenses: $${totalExpenses}\n- Current Savings: $${savings}${goalSummary}\n\nKeep tips concise, motivating, and age-appropriate for teens. Reference specific goals if they exist. Format as a JSON array of strings.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Try to parse JSON array from response
    let tips = [];
    try {
      tips = JSON.parse(content);
      if (!Array.isArray(tips) || tips.length === 0) throw new Error('No tips');
    } catch {
      // Fallback: split by newlines if JSON parse fails
      tips = content.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('[') && !line.startsWith(']'));
    }
    // Final fallback if still empty
    if (!Array.isArray(tips) || tips.length === 0) {
      tips = [
        '💡 Track every transaction to understand your spending habits.',
        '💰 Set realistic savings goals and check progress weekly.',
        '🎯 Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings.'
      ];
    }
    return Response.json({ tips: tips.slice(0, 4) });
  } catch (err) {
    console.error('AI error:', err);
    // Fallback tips if API fails
    const defaultTips = [
      '💡 Track every transaction to understand your spending habits.',
      '💰 Set realistic savings goals and check progress weekly.',
      '🎯 Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings.',
    ];
    // Always ensure a non-empty array is returned
    if (!Array.isArray(defaultTips) || defaultTips.length === 0) {
      return Response.json({ tips: [
        '💡 Track every transaction to understand your spending habits.',
        '💰 Set realistic savings goals and check progress weekly.',
        '🎯 Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings.'
      ] });
    }
    return Response.json({ tips: defaultTips });
  }
}
