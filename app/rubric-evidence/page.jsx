'use client';

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const RubricEvidence = () => {
  const { token } = useContext(AuthContext);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'rob@launchpadphilly.org';

  useEffect(() => {
    const validateAdmin = async () => {
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        // Decode JWT to get user info (simple decoding - in production, verify on backend)
        const tokenParts = token.split('.');
        if (tokenParts.length !== 3) throw new Error('Invalid token');
        
        const decoded = JSON.parse(atob(tokenParts[1]));
        setUser(decoded);

        // Check if user email matches admin email
        if (decoded.email !== ADMIN_EMAIL) {
          setError(`Access denied. Only ${ADMIN_EMAIL} can view this page.`);
          setLoading(false);
          return;
        }

        setLoading(false);
      } catch (err) {
        console.error('Auth error:', err);
        router.push('/login');
      }
    };

    validateAdmin();
  }, [token, router]);

  if (loading) return <div className="page"><div className="loading">Loading...</div></div>;
  if (error) {
    return (
      <div className="page">
        <nav className="marketing-nav">
          <div className="logo">Stack Up</div>
          <Link href="/" className="nav-link">Back to Home</Link>
        </nav>
        <section className="content-section">
          <div className="error-box">{error}</div>
          <Link href="/dashboard" className="btn btn-secondary">Go to Dashboard</Link>
        </section>
      </div>
    );
  }

  return (
    <div className="page marketing-page">
      <nav className="marketing-nav">
        <div className="logo">Stack Up</div>
        <ul className="nav-links">
          <li><Link href="/home">Home</Link></li>
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/login">Logout</Link></li>
        </ul>
      </nav>

      <section className="content-section rubric-section">
        <h1>📋 Rubric Evidence - Stack Up Project</h1>
        <p className="admin-note">Instructor View: {user?.email}</p>

        <div className="rubric-criteria">
          <div className="criteria-box">
            <h2>CCC.1.1: Understand a Real Problem</h2>
            <p className="criteria-description">Demonstrating understanding of the real-world problem that the solution addresses.</p>

            <div className="evidence">
              <h3>Where to See It:</h3>
              <ul>
                <li><strong><Link href="/about" target="_blank">About Page →</Link></strong>
                  <ul>
                    <li>Problem Overview: Explains financial literacy gap for teens</li>
                    <li>Real Example: Story of "Jordan" spending his paycheck without tracking</li>
                    <li>Real-Life Impact: How poor money habits show up in teens' lives</li>
                    <li>Constraints: Explains why the problem is hard to solve (time, experience, engagement, access)</li>
                    <li>Consequences: Lists what happens without intervention (debt, stress, missed opportunities)</li>
                  </ul>
                </li>
                <li><strong>Problem Statement:</strong> <a href="/problem.md" target="_blank">problem.md file</a>
                  <ul>
                    <li>Research-backed explanation of financial education gap</li>
                    <li>Real Philadelphia context (students growing up without money skills)</li>
                  </ul>
                </li>
              </ul>

              <div className="evidence-summary">
                <h4>Summary:</h4>
                <p>
                  The problem is well-defined: Philadelphia teens lack financial education and struggle to manage money, leading to poor spending habits, debt, and stress. This is evidenced by real examples, constraints, and consequences outlined in the About page.
                </p>
              </div>
            </div>
          </div>

          <div className="criteria-box">
            <h2>CCC.1.2: Plan a Smart Solution</h2>
            <p className="criteria-description">Demonstrating a thoughtful plan and solution design.</p>

            <div className="evidence">
              <h3>Where to See It:</h3>
              <ul>
                <li><strong><Link href="/why-stackup" target="_blank">Why Stack Up? Page →</Link></strong>
                  <ul>
                    <li>Solution Idea: Explains what Stack Up is and why it was built</li>
                    <li>Core Features List: 6 key features with descriptions</li>
                    <li>Competitive Analysis: Comparison table vs. Mint, YNAB, PocketGuard</li>
                    <li>Why Choose Stack Up: Clear advantages (free, teen-friendly, gamified, AI-powered)</li>
                    <li>Expected Challenges & Solutions: 4 challenges + mitigation strategies</li>
                    <li>Project Plan: 6 sprints outlining development phases</li>
                  </ul>
                </li>
                <li><strong>Technical Architecture:</strong>
                  <ul>
                    <li>Full-stack Next.js 15 with React 19 (app directory)</li>
                    <li>PostgreSQL database (Neon) with proper schema (users, transactions, goals)</li>
                    <li>JWT authentication + bcryptjs password hashing for security</li>
                    <li>OpenAI API integration for AI spending insights</li>
                  </ul>
                </li>
                <li><strong>Design System:</strong>
                  <ul>
                    <li>Custom CSS (no framework): Clean, teen-friendly UI</li>
                    <li>Color scheme: Purple primary (#6f4bff), simple and modern</li>
                    <li>Component-based architecture for reusability</li>
                  </ul>
                </li>
              </ul>

              <div className="evidence-summary">
                <h4>Summary:</h4>
                <p>
                  Stack Up's solution is thoughtfully planned with clear features, competitive positioning, and realistic challenge mitigation. The tech stack is modern (Next.js, PostgreSQL, JWT, AI) and the development plan is realistic (6 sprints). The design prioritizes teen accessibility over complexity.
                </p>
              </div>
            </div>
          </div>

          <div className="criteria-box">
            <h2>CCC.1.3: Build a Working App</h2>
            <p className="criteria-description">Demonstrating a functional MVP or complete product.</p>

            <div className="evidence">
              <h3>Where to See It:</h3>
              <ul>
                <li><strong><Link href="/product" target="_blank">Product Page →</Link></strong>
                  <p>Live, working dashboard with full functionality</p>
                </li>
                <li><strong><Link href="/dashboard" target="_blank">Dashboard (Working Features) →</Link></strong>
                  <ul>
                    <li>✅ Hero card showing total balance</li>
                    <li>✅ Stat cards for Total Saved, Total Spent, Recent Activity</li>
                    <li>✅ Add Transaction form with type, category, amount, date, note</li>
                    <li>✅ Recent transactions list with ability to view, edit, delete</li>
                    <li>✅ AI Spending Tips (personalized via OpenAI)</li>
                  </ul>
                </li>
                <li><strong><Link href="/transactions" target="_blank">Transactions Page (Working Features) →</Link></strong>
                  <ul>
                    <li>✅ Full transaction list with filtering by category</li>
                    <li>✅ Edit transaction (change amount, category, date, note)</li>
                    <li>✅ Delete transaction</li>
                    <li>✅ Add new transactions</li>
                  </ul>
                </li>
                <li><strong><Link href="/goals" target="_blank">Goals Page (Working Features) →</Link></strong>
                  <ul>
                    <li>✅ Create new savings goals</li>
                    <li>✅ View all goals with progress bars</li>
                    <li>✅ Update goal progress (add money saved)</li>
                    <li>✅ Delete goals</li>
                    <li>✅ Calculate progress percentage</li>
                  </ul>
                </li>
                <li><strong><Link href="/login" target="_blank">Auth Pages (Working Features) →</Link></strong>
                  <ul>
                    <li>✅ User registration with email validation</li>
                    <li>✅ Secure login with JWT tokens</li>
                    <li>✅ Password hashing with bcryptjs</li>
                    <li>✅ Protected routes (dashboard, transactions, goals)</li>
                    <li>✅ Token-based session management</li>
                  </ul>
                </li>
              </ul>

              <h3>Core Features Implemented:</h3>
              <table className="features-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Status</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>User Authentication</strong></td>
                    <td>✅ Complete</td>
                    <td>Registration, login, JWT tokens, password hashing, session management</td>
                  </tr>
                  <tr>
                    <td><strong>Transaction Tracking</strong></td>
                    <td>✅ Complete</td>
                    <td>Add, view, edit, delete transactions with categories and notes</td>
                  </tr>
                  <tr>
                    <td><strong>Savings Goals</strong></td>
                    <td>✅ Complete</td>
                    <td>Create goals, track progress, update progress, visual progress bars</td>
                  </tr>
                  <tr>
                    <td><strong>Dashboard Analytics</strong></td>
                    <td>✅ Complete</td>
                    <td>Balance calculation, income/expense aggregation, recent transactions</td>
                  </tr>
                  <tr>
                    <td><strong>AI Insights</strong></td>
                    <td>✅ Complete</td>
                    <td>OpenAI integration, personalized tips based on user data, caching</td>
                  </tr>
                  <tr>
                    <td><strong>Database</strong></td>
                    <td>✅ Complete</td>
                    <td>PostgreSQL with users, transactions, goals tables + proper indexes</td>
                  </tr>
                </tbody>
              </table>

              <div className="evidence-summary">
                <h4>Summary:</h4>
                <p>
                  Stack Up is a fully functional app with 5 working pages, all core features operational, secure authentication, and real data persistence. Users can register, log in, track transactions, set savings goals, and receive AI-powered financial insights. The MVP is complete and usable.
                </p>
              </div>
            </div>
          </div>

          <div className="criteria-box">
            <h2>🔐 TS.3.2: Manage Authentication</h2>
            <p className="criteria-description">Implementing secure user authentication and authorization.</p>

            <div className="evidence">
              <h3>Implementation Details:</h3>
              <ul>
                <li><strong>JWT Tokens:</strong> Stateless authentication with jsonwebtoken library</li>
                <li><strong>Password Security:</strong> bcryptjs hashing with salt rounds</li>
                <li><strong>Protected Routes:</strong> Client-side protection with useContext + useEffect redirects</li>
                <li><strong>API Middleware:</strong> authMiddleware validates JWT on all protected endpoints</li>
                <li><strong>Secure Storage:</strong> Tokens stored in localStorage with Bearer scheme</li>
                <li><strong>Session Management:</strong> Token refresh logic in AuthContext</li>
              </ul>

              <h3>Where to See It:</h3>
              <ul>
                <li><strong>[app/lib/auth.js]</strong>: JWT verification middleware</li>
                <li><strong>[app/context/AuthContext.jsx]</strong>: Token management, login/logout</li>
                <li><strong>[app/api/auth/register/route.js]</strong>: User registration with password hashing</li>
                <li><strong>[app/api/auth/login/route.js]</strong>: Login with JWT token generation</li>
              </ul>
            </div>
          </div>

          <div className="criteria-box">
            <h2>🤖 TS.6.3: Integrate AI Tools</h2>
            <p className="criteria-description">Implementing AI to solve a real problem in the app.</p>

            <div className="evidence">
              <h3>Implementation Details:</h3>
              <ul>
                <li><strong>OpenAI Integration:</strong> Uses GPT-3.5-turbo for spending analysis</li>
                <li><strong>Data Analysis:</strong> AI analyzes user's actual income, expenses, and savings goals</li>
                <li><strong>Personalized Output:</strong> Generates custom tips relevant to user's spending patterns</li>
                <li><strong>Caching Strategy:</strong> 1-hour cache to prevent API rate limiting</li>
                <li><strong>Error Handling:</strong> Graceful fallback to hardcoded tips if API fails</li>
              </ul>

              <h3>Where to See It:</h3>
              <ul>
                <li><strong>[app/api/ai/insights/route.js]</strong>: OpenAI API integration
                  <ul>
                    <li>Fetches user transactions and goals</li>
                    <li>Calculates totals (income, expenses, savings)</li>
                    <li>Sends contextualized prompt to OpenAI</li>
                    <li>Returns personalized tips array</li>
                  </ul>
                </li>
                <li><strong>[app/components/AiTips.jsx]</strong>: Client-side caching + display
                  <ul>
                    <li>localStorage caching for 1 hour</li>
                    <li>Prevents duplicate API calls</li>
                    <li>Displays tips with personalized context</li>
                  </ul>
                </li>
              </ul>

              <h3>Example Output:</h3>
              <p>
                If user has $500 income, $200 expenses, and a "New Laptop" goal at 40% progress, OpenAI might generate:
              </p>
              <ul>
                <li>"You're saving 60% of your income—excellent! Keep this up to reach your laptop goal faster."</li>
                <li>"Consider setting a weekly meal budget to keep food spending under $30."</li>
                <li>"You're on track for your laptop goal at current savings rate. You'll reach it in ~2 months!"</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="submission-info">
          <h2>📝 Submission Summary</h2>
          <table className="submission-table">
            <tbody>
              <tr>
                <td><strong>Project Name:</strong></td>
                <td>Stack Up</td>
              </tr>
              <tr>
                <td><strong>Project Type:</strong></td>
                <td>Full-Stack Teen Finance Management App</td>
              </tr>
              <tr>
                <td><strong>Tech Stack:</strong></td>
                <td>Next.js 15, React 19, PostgreSQL, OpenAI API, JWT, bcryptjs</td>
              </tr>
              <tr>
                <td><strong>Criteria CCC.1.1:</strong></td>
                <td><Link href="/about">About Page</Link> + problem.md</td>
              </tr>
              <tr>
                <td><strong>Criteria CCC.1.2:</strong></td>
                <td><Link href="/why-stackup">Why Stack Up? Page</Link> + Technical Architecture</td>
              </tr>
              <tr>
                <td><strong>Criteria CCC.1.3:</strong></td>
                <td><Link href="/product">Product Page</Link> + Live Dashboard</td>
              </tr>
              <tr>
                <td><strong>Criteria TS.3.2:</strong></td>
                <td>JWT + bcryptjs in app/lib/auth.js</td>
              </tr>
              <tr>
                <td><strong>Criteria TS.6.3:</strong></td>
                <td>OpenAI Integration in app/api/ai/insights</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <footer className="marketing-footer">
        <p>&copy; 2026 Stack Up. Rubric Evidence Page - Instructor View Only</p>
      </footer>
    </div>
  );
};

export default RubricEvidence;
