'use client';

import React, { useContext } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import Link from 'next/link';
import ProtectedRoute from '@/app/components/ProtectedRoute';

const Product = () => {
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
        <h1>The Product</h1>
        
        <div className="product-section">
          <p className="intro-text">
            This is where the magic happens. The live, interactive Stack Up dashboard is where you manage your money in real-time.
          </p>

          {token ? (
            <ProtectedRoute>
              <div className="product-access">
                <h2>Your Personal Finance Dashboard</h2>
                <p>
                  Click below to access your dashboard. Here you can:
                </p>
                <ul>
                  <li>✅ Track every transaction (income & expenses)</li>
                  <li>✅ Set and monitor savings goals with live progress</li>
                  <li>✅ See your balance, spending patterns, and savings rate</li>
                  <li>✅ Get personalized AI insights based on your spending</li>
                  <li>✅ Edit or delete transactions as needed</li>
                </ul>
                
                <Link href="/dashboard" className="btn btn-primary large">
                  Go to Your Dashboard →
                </Link>
                
                <div className="feature-list-grid">
                  <div className="feature-box">
                    <h4>Transaction Management</h4>
                    <p>Add, edit, delete income and expenses with categories and notes</p>
                  </div>
                  <div className="feature-box">
                    <h4>Savings Goals</h4>
                    <p>Create multiple goals and watch your progress with visual bars</p>
                  </div>
                  <div className="feature-box">
                    <h4>Dashboard Analytics</h4>
                    <p>See balance, total saved, total spent, and recent transactions at a glance</p>
                  </div>
                  <div className="feature-box">
                    <h4>AI Spending Tips</h4>
                    <p>Get personalized insights based on your actual spending patterns</p>
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          ) : (
            <div className="product-locked">
              <h2>Sign In to Use Stack Up</h2>
              <p>
                Stack Up is a personal finance app, so you'll need an account to access your dashboard and start tracking your money.
              </p>
              
              <div className="auth-options">
                <Link href="/login" className="btn btn-primary large">Sign In</Link>
                <Link href="/register" className="btn btn-secondary large">Create Account</Link>
              </div>

              <div className="feature-preview">
                <h3>What You'll See in the Dashboard:</h3>
                <ul>
                  <li>💰 Your total balance at a glance</li>
                  <li>📊 Money saved vs. spent this month</li>
                  <li>🎯 Progress on your savings goals</li>
                  <li>📜 Recent transactions with details</li>
                  <li>➕ Easy form to add new transactions</li>
                  <li>🤖 AI-powered spending tips</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      <footer className="marketing-footer">
        <p>&copy; 2026 Stack Up. Built to help teens build better financial futures.</p>
      </footer>
    </div>
  );
};

export default Product;
