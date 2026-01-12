'use client';

import React, { useContext } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import Link from 'next/link';

const Features = () => {
  const { token } = useContext(AuthContext);

  return (
    <div className="page marketing-page">
      <nav className="marketing-nav">
        <div className="logo">Stack Up</div>
        <ul className="nav-links">
          <li><Link href="/home">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/why-stackup">Why Stack Up?</Link></li>
          <li><Link href="/features">Features</Link></li>
          <li><Link href="/product">Product</Link></li>
          {token && <li><Link href="/rubric-evidence">Evidence</Link></li>}
          <li>{token ? <Link href="/dashboard">App</Link> : <Link href="/login">Login</Link>}</li>
        </ul>
      </nav>

      <section className="content-section">
        <h1>Features in Action</h1>

        <div className="features-showcase">
          <h2>Core Features That Help You Win With Money</h2>

          <div className="feature-spotlight">
            <h3>💳 Transaction Tracker</h3>
            <p>
              Log every dollar spent or earned. Categorize transactions (Food, Transport, Gifts, etc.) and add notes for context. See patterns in where your money actually goes.
            </p>
            <div className="feature-highlight">
              <p><strong>Why it matters:</strong> Awareness is the first step. Most teens have no idea where their money goes until they see it tracked and categorized.</p>
            </div>
          </div>

          <div className="feature-spotlight">
            <h3>🎯 Savings Goals</h3>
            <p>
              Set goals with target amounts and deadlines. Watch progress bars fill as you save. Get encouragement as you get closer to your goal.
            </p>
            <div className="feature-highlight">
              <p><strong>Why it matters:</strong> Goals make saving concrete and visible. Instead of vague "save money" advice, you're working toward something real (new phone, laptop, trip).</p>
            </div>
          </div>

          <div className="feature-spotlight">
            <h3>📊 Dashboard Overview</h3>
            <p>
              One-screen view of your financial snapshot: total balance, total spent, total saved, recent transactions, and AI tips. No information overload.
            </p>
            <div className="feature-highlight">
              <p><strong>Why it matters:</strong> Simplicity matters. Teens need to see the big picture at a glance without getting lost in complex charts.</p>
            </div>
          </div>

          <div className="feature-spotlight">
            <h3>🤖 AI Spending Insights</h3>
            <p>
              Get personalized tips from AI that analyzes your actual income, expenses, and goals. Advice like "You're saving 40% of your income—great job!" or "Consider meal planning to cut food costs."
            </p>
            <div className="feature-highlight">
              <p><strong>Why it matters:</strong> Generic advice doesn't stick. AI makes guidance personal and relevant to *your* situation.</p>
            </div>
          </div>

          <div className="feature-spotlight">
            <h3>⚡ Quick Actions</h3>
            <p>
              Pre-filled buttons (Deposit, Transfer, Withdraw, Cards) that speed up logging common transactions. No repetitive typing.
            </p>
            <div className="feature-highlight">
              <p><strong>Why it matters:</strong> Friction kills adoption. Quick actions make logging so easy that you'll actually do it.</p>
            </div>
          </div>

          <h2>Why Stack Up Wins</h2>
          <div className="why-stackup-wins">
            <div className="win">
              <h4>✅ Teen-First Design</h4>
              <p>Built by someone who understands the challenges teens face with money. Clean interface, no jargon, gamified progress.</p>
            </div>
            <div className="win">
              <h4>✅ Free & Simple</h4>
              <p>No subscriptions, no bank linking required, no overwhelming features. Just the essentials done well.</p>
            </div>
            <div className="win">
              <h4>✅ AI That Actually Helps</h4>
              <p>Not just tracking — you get actionable insights personalized to your spending and goals.</p>
            </div>
            <div className="win">
              <h4>✅ Awareness + Action</h4>
              <p>Tracking shows where money goes (awareness). Goals show where it should go (action). Together, they build better habits.</p>
            </div>
          </div>

          <h2>How AI Solves Your Problem</h2>
          <div className="ai-value">
            <p>
              <strong>The Problem:</strong> Teens get generic advice ("save more money") that doesn't apply to them.
            </p>
            <p>
              <strong>The AI Solution:</strong> Stack Up's AI analyzes your specific data:
            </p>
            <ul>
              <li>How much you're actually earning</li>
              <li>Where you're really spending</li>
              <li>What goals you're working toward</li>
            </ul>
            <p>
              Then it generates tips like:
            </p>
            <ul className="ai-tips-example">
              <li>🎯 "You're 60% toward your laptop goal. Keep it up!"</li>
              <li>🍔 "You spent $60 on food last week. Try meal prep to save $15/week."</li>
              <li>💪 "You're saving 30% of your income. That's above average for your age!"</li>
            </ul>
            <p>
              <strong>Result:</strong> Advice that feels personal, achievable, and motivating.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Take Control?</h2>
        <p>Try Stack Up and start building better money habits today.</p>
        {token ? (
          <Link href="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
        ) : (
          <Link href="/login" className="btn btn-primary">Get Started Free</Link>
        )}
      </section>

      <footer className="marketing-footer">
        <p>&copy; 2026 Stack Up. Built to help teens build better financial futures.</p>
      </footer>
    </div>
  );
};

export default Features;
