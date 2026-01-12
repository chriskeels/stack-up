'use client';

import React, { useContext } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import Link from 'next/link';

const About = () => {
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
        <h1>Understanding the Problem</h1>
        
        <div className="problem-overview">
          <h2>The Challenge: Financial Literacy Gap for Teens</h2>
          <p className="intro-text">
            Many Philadelphia students grow up without being taught how money really works. It's not because they don't care — it's because of real, systemic challenges that make financial education hard to access and hard to understand.
          </p>

          <h3>What's the Problem?</h3>
          <p>
            Teens today face a disconnect: they have access to money (paychecks, allowances, cash apps) but lack the knowledge to manage it effectively. This creates stress, poor decisions, and habits that can follow them into adulthood.
          </p>

          <h3>How This Shows Up in Real Life</h3>
          <div className="real-life-example">
            <h4>📖 A Real Example:</h4>
            <p>
              Meet <strong>Jordan</strong>, a 16-year-old from Philadelphia. He got his first job at a fast-food restaurant, earning $15/hour. Within two weeks, he spent his entire first paycheck ($300) on:
              <ul style={{ marginTop: '10px' }}>
                <li>$50 on a video game</li>
                <li>$80 on eating out 4 times</li>
                <li>$100 on new shoes</li>
                <li>$70 on various subscriptions he forgot about</li>
              </ul>
            </p>
            <p>
              He didn't have a plan. No one taught him how to track spending or set aside money for emergencies. When his mom asked where it went, he couldn't even explain it — the spending felt invisible because each purchase seemed small.
            </p>
          </div>

          <h3>Why Is This Hard to Solve?</h3>
          <ul className="constraints-list">
            <li>
              <strong>Time:</strong> Schools are packed with required curricula; financial literacy often gets cut
            </li>
            <li>
              <strong>Experience:</strong> Teachers may not have real-world money experience to teach from
            </li>
            <li>
              <strong>Engagement:</strong> Traditional money lessons feel boring — teens need interactive tools
            </li>
            <li>
              <strong>Access:</strong> Quality financial tools cost money or are too complex for beginners
            </li>
          </ul>

          <h3>What Happens If We Don't Solve This?</h3>
          <div className="consequences">
            <div className="consequence-item">
              <h4>💳 Debt Early in Life</h4>
              <p>Without budgeting skills, teens rack up credit card debt, overdraft fees, or "buy now, pay later" trap</p>
            </div>
            <div className="consequence-item">
              <h4>😰 Lifelong Financial Stress</h4>
              <p>Poor money habits compound — they carry this stress into college, career, and adulthood</p>
            </div>
            <div className="consequence-item">
              <h4>🚫 Missed Opportunities</h4>
              <p>Can't afford college, travel, or start a business because they never learned to save</p>
            </div>
            <div className="consequence-item">
              <h4>🔁 Repeating the Cycle</h4>
              <p>Without intervention, they'll teach their own kids the same poor habits they learned</p>
            </div>
          </div>

          <h3>What Already Exists?</h3>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Existing App</th>
                <th>What Works</th>
                <th>What Doesn't</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Mint</strong></td>
                <td>Automatic tracking, alerts, charts</td>
                <td>Too complex for teens, requires bank linking, no gamification</td>
              </tr>
              <tr>
                <td><strong>YNAB</strong></td>
                <td>Powerful budgeting system</td>
                <td>Complex for beginners, expensive subscription ($14.99/month)</td>
              </tr>
              <tr>
                <td><strong>PocketGuard</strong></td>
                <td>Shows how much you can spend</td>
                <td>Short-term focus, limited goal-setting, not teen-focused</td>
              </tr>
            </tbody>
          </table>

          <p className="gap-statement">
            <strong>The Gap:</strong> There's no free, simple, engaging app built specifically for teens that combines tracking, goals, and AI guidance.
          </p>
        </div>
      </section>

      <footer className="marketing-footer">
        <p>&copy; 2026 Stack Up. Built to help teens build better financial futures.</p>
      </footer>
    </div>
  );
};

export default About;
