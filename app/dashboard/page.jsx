'use client';

import React, { useEffect, useState, useContext, useRef } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import AddTransactionForm from '@/app/components/AddTransactionForm';
import AiTips from '@/app/components/AiTips';
import ProtectedRoute from '@/app/components/ProtectedRoute';

const API = '/api/dashboard';

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const formRef = useRef(null);

  const formatCurrency = (value = 0) => `$${Number(value || 0).toFixed(2)}`;

  const handleQuickAction = (type, category) => {
    const today = new Date().toISOString().slice(0, 10);
    formRef.current?.preset({ type, category, date: today, amount: '' });
    document.getElementById('add-transaction-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (!token) return; // Don't fetch if no token yet
    
    fetch(API, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          setData(data);
        } else {
          console.error('Invalid response:', data);
          setData(null);
        }
      })
      .catch(console.error);
  }, [token]);

  if (!data) return <div className="page">Loading...</div>;

  const recent = (data.recentTransactions || data.transactions || []);

  return (
    <ProtectedRoute>
      <div className="page">
        <div className="hero-card">
          <div className="hero-top">
            <div>
              <div className="eyebrow">Total Balance</div>
              <div className="hero-amount">{formatCurrency(data.balance)}</div>
            </div>
            <div className="quick-actions">
              <button className="quick-action" onClick={() => handleQuickAction('income', 'Deposit')}>
                Deposit
              </button>
              <button className="quick-action" onClick={() => handleQuickAction('expense', 'Transfer')}>
                Transfer
              </button>
              <button className="quick-action" onClick={() => handleQuickAction('expense', 'Withdraw')}>
                Withdraw
              </button>
              <button className="quick-action" onClick={() => handleQuickAction('expense', 'Card Payment')}>
                Cards
              </button>
            </div>
          </div>
          <div className="hero-sub">Track your cash flow and savings at a glance.</div>
        </div>

        <div className="stat-grid">
          <div className="stat-card primary">
            <div className="stat-label">Total Saved</div>
            <div className="stat-value">{formatCurrency(data.totalSaved)}</div>
          </div>
          <div className="stat-card danger">
            <div className="stat-label">Total Spent</div>
            <div className="stat-value">{formatCurrency(data.totalSpent)}</div>
          </div>
          <div className="stat-card success" style={{ gridColumn: '1 / -1' }}>
            <div className="stat-label">Recent Activity</div>
            <div className="stat-value">{(data.recentTransactions || data.transactions || []).length} transactions</div>
          </div>
        </div>

        <AddTransactionForm
          ref={formRef}
          onAdd={(tx) =>
            setData((prev) => ({
              ...prev,
              recentTransactions: [tx, ...(prev.recentTransactions || [])],
              balance: prev.balance + (tx.type === 'income' ? tx.amount : -tx.amount),
              totalSpent: prev.totalSpent + (tx.type === 'expense' ? tx.amount : 0),
            }))
          }
        />

        <AiTips />

        <h2 className="section-title">Recent Transactions</h2>
        <ul className="list">
          {recent.map((tx) => (
            <li key={tx.id} className="list-item">
              <div>
                <div className="stat-label">{new Date(tx.date).toLocaleDateString()}</div>
                <div className="meta">{tx.category}</div>
              </div>
              <div className={tx.type === 'income' ? 'amount-positive' : 'amount-negative'}>
                {tx.type === 'income' ? '+' : '-'}
                {formatCurrency(tx.amount)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
