'use client';

import React, { useContext } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import Link from 'next/link';

const WhyStackUp = () => {
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
        <h1>Why Stack Up?</h1>

        <div className="solution-section">
          <h2>The Solution: A Money App Built for Teens</h2>
          <p>
            Stack Up is a free, teen-friendly budgeting app that makes managing money feel simple, visual, and rewarding — not scary or boring.
          </p>
          <p>
            Instead of complex charts and finance jargon, Stack Up shows you:
            <ul>
              <li>Where your money actually goes</li>
              <li>How much you're saving toward your goals</li>
              <li>Personalized tips from AI that understand your spending</li>
            </ul>
          </p>

          <h3>Core Features</h3>
          <div className="features-breakdown">
            <div className="feature-card">
              <h4>💰 Track Transactions</h4>
              <p>Log income and expenses in seconds. Organize by category. See exactly where your money goes.</p>
            </div>
            <div className="feature-card">
              <h4>🎯 Set Savings Goals</h4>
              <p>Create goals (new phone, college, trip) with target amounts. Watch progress bars fill up as you save.</p>
            </div>
            <div className="feature-card">
              <h4>📊 Dashboard Overview</h4>
              <p>See your balance, total spent, total saved, and recent activity at a glance. No overwhelming charts.</p>
            </div>
            <div className="feature-card">
              <h4>🤖 AI Spending Insights</h4>
              <p>Get personalized tips based on your income, expenses, and goals. Real advice, not generic lectures.</p>
            </div>
            <div className="feature-card">
              <h4>⚡ Quick Actions</h4>
              <p>Buttons for common transactions (Deposit, Transfer, Withdraw, Cards) to speed up logging.</p>
            </div>
            <div className="feature-card">
              <h4>🔐 Secure Authentication</h4>
              <p>Your data is private and protected with JWT tokens and bcryptjs password hashing.</p>
            </div>
          </div>

          <h3>Why Choose Stack Up Over Others?</h3>
          <div className="comparison">
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Mint</th>
                  <th>YNAB</th>
                  <th>Stack Up</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Cost</strong></td>
                  <td>Free (limited)</td>
                  <td>$14.99/month</td>
                  <td>Free</td>
                </tr>
                <tr>
                  <td><strong>Teen-Friendly</strong></td>
                  <td>❌ Too complex</td>
                  <td>❌ Too complex</td>
                  <td>✅ Built for teens</td>
                </tr>
                <tr>
                  <td><strong>Savings Goals</strong></td>
                  <td>⚠️ Basic</td>
                  <td>✅ Strong</td>
                  <td>✅ Gamified</td>
                </tr>
                <tr>
                  <td><strong>AI Guidance</strong></td>
                  <td>❌ No</td>
                  <td>❌ No</td>
                  <td>✅ Personalized</td>
                </tr>
                <tr>
                  <td><strong>Visual Design</strong></td>
                  <td>⚠️ Outdated</td>
                  <td>⚠️ Dense</td>
                  <td>✅ Modern & clean</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Expected Challenges & How We Handle Them</h3>
          <div className="challenges">
            <div className="challenge">
              <h4>🚀 Challenge: Getting teens to actually use it</h4>
              <p><strong>Solution:</strong> Gamified goals with progress bars, quick-action buttons, and celebratory feedback make tracking feel rewarding, not like a chore.</p>
            </div>
            <div className="challenge">
              <h4>📡 Challenge: Keeping data accurate</h4>
              <p><strong>Solution:</strong> Manual entry (not automatic) forces awareness. Users learn their spending patterns by physically logging transactions.</p>
            </div>
            <div className="challenge">
              <h4>🔑 Challenge: Ensuring privacy & security</h4>
              <p><strong>Solution:</strong> JWT authentication, bcryptjs hashing, and secure database connection (PostgreSQL) protect user data.</p>
            </div>
            <div className="challenge">
              <h4>💡 Challenge: Making AI tips actually helpful</h4>
              <p><strong>Solution:</strong> AI analyzes *actual* user data (income, expenses, goals) to generate personalized, actionable advice — not generic platitudes.</p>
            </div>
          </div>

          <h3>Project Plan</h3>
          <p>Stack Up was built in phases:</p>
          <ul className="project-phases">
            <li><strong>Sprint 1:</strong> Auth system (register, login, JWT) + Database schema</li>
            <li><strong>Sprint 2:</strong> Dashboard & Transaction CRUD (add, edit, delete)</li>
            <li><strong>Sprint 3:</strong> Savings Goals with progress tracking</li>
            <li><strong>Sprint 4:</strong> AI Spending Insights integration (OpenAI)</li>
            <li><strong>Sprint 5:</strong> Next.js migration + Full-stack unification</li>
            <li><strong>Sprint 6:</strong> Marketing pages & Rubric evidence documentation</li>
          </ul>

          <p className="development-note">
            <em>Note: Development included a week-long pause due to relocation, which delayed progress but allowed for thoughtful architecture planning.</em>
          </p>
        </div>
      </section>

      <footer className="marketing-footer">
        <p>&copy; 2026 Stack Up. Built to help teens build better financial futures.</p>
      </footer>
    </div>
  );
};

export default WhyStackUp;
