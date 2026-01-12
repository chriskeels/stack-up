'use client';

import React, { useContext } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import Link from 'next/link';

const Home = () => {
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

      <section className="hero">
        <div className="hero-content">
          <h1>Stack Up 💰</h1>
          <p className="tagline">Take control of your money. Build better financial habits.</p>
          <p className="subtitle">Stack Up helps teens understand, track, and improve their finances with simple visuals, clear guidance, and AI-powered insights.</p>
          
          <div className="hero-cta">
            {token ? (
              <Link href="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
            ) : (
              <>
                <Link href="/login" className="btn btn-primary">Get Started</Link>
                <Link href="/about" className="btn btn-secondary">Learn More</Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="who-benefits">
        <h2>Who Benefits Most?</h2>
        <div className="benefit-cards">
          <div className="card">
            <div className="card-icon">👤</div>
            <h3>Teens (13-19)</h3>
            <p>Learning to manage their first paychecks and understand spending habits</p>
          </div>
          <div className="card">
            <div className="card-icon">👨‍👩‍👧</div>
            <h3>Parents</h3>
            <p>Wanting to teach kids financial responsibility without constant monitoring</p>
          </div>
          <div className="card">
            <div className="card-icon">🎓</div>
            <h3>Educators</h3>
            <p>Teaching financial literacy with a tool students actually want to use</p>
          </div>
        </div>
      </section>

      <section className="why-stackup-preview">
        <h2>Why Stack Up?</h2>
        <ul className="feature-list">
          <li>✅ <strong>Simple, not scary</strong> — No complex charts or confusing terminology</li>
          <li>✅ <strong>Visual progress</strong> — See where your money goes and your savings grow</li>
          <li>✅ <strong>Gamified goals</strong> — Track savings goals with progress bars and achievements</li>
          <li>✅ <strong>AI-powered tips</strong> — Get personalized financial advice based on your spending</li>
          <li>✅ <strong>Built for teens</strong> — By someone who understands the challenges you face</li>
        </ul>
      </section>

      <footer className="marketing-footer">
        <p>&copy; 2026 Stack Up. Built to help teens build better financial futures.</p>
      </footer>
    </div>
  );
};

export default Home;
