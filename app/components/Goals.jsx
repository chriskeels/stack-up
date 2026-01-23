'use client';

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/app/context/AuthContext';

const API = '/api/goals';

const Goals = () => {
  const { token } = useContext(AuthContext);
  const [goals, setGoals] = useState([]);
  const [form, setForm] = useState({ title: '', targetAmount: '' });
  const [editingId, setEditingId] = useState(null);
  const [addAmount, setAddAmount] = useState('');

  const formatCurrency = (value = 0) => `$${Number(value || 0).toFixed(2)}`;

  useEffect(() => {
    fetch(API, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setGoals(data);
        } else {
          console.error('Invalid response:', data);
          setGoals([]);
        }
      })
      .catch(console.error);
  }, [token]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddProgress = async (goalId, currentProgress) => {
    if (!addAmount || Number(addAmount) <= 0) {
      alert('Enter a valid amount');
      return;
    }

    const newProgress = Number(currentProgress || 0) + Number(addAmount);
    const res = await fetch(`${API}/${goalId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ progress: newProgress }),
    });

    if (res.ok) {
      const updated = await res.json();
      setGoals(goals.map((g) => (g.id === goalId ? updated : g)));
      setEditingId(null);
      setAddAmount('');
    } else {
      alert('Failed to update progress');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: form.title, targetAmount: Number(form.targetAmount) }),
    });
    const data = await res.json();
    if (res.ok) {
      setGoals([...goals, data]);
      setForm({ title: '', targetAmount: '' });
    } else {
      alert(data.error || 'Failed to add goal');
    }
  };

  return (
    <div className="page">
      <h1 className="section-title" style={{ marginTop: 0 }}>Savings Goals</h1>
      <form onSubmit={handleSubmit} className="form-card">
        <div className="section-title" style={{ marginTop: 0 }}>Create a Goal</div>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Goal Name"
          className="field"
        />
        <input
          name="targetAmount"
          type="number"
          value={form.targetAmount}
          onChange={handleChange}
          placeholder="Target Amount"
          className="field"
        />
        <div className="button-row" style={{ marginTop: 10 }}>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Add Goal
          </button>
        </div>
      </form>

      <ul className="list">
        {goals.map((goal) => {
          const progress = Number(goal.progress || 0);
          const target = Number(goal.targetAmount || 1);
          const pct = Math.min(100, Math.max(0, (progress / target) * 100));
          const isEditing = editingId === goal.id;

          return (
            <li key={goal.id} className="list-item" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div className="stat-label">{goal.title}</div>
                  <div className="meta">
                    {formatCurrency(progress)} / {formatCurrency(goal.targetAmount)}
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
                <div className="amount-positive" style={{ marginLeft: 12 }}>{pct.toFixed(0)}%</div>
              </div>

              {isEditing ? (
                <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                  <input
                    type="number"
                    value={addAmount}
                    onChange={(e) => setAddAmount(e.target.value)}
                    placeholder="Amount to add"
                    className="field"
                    style={{ flex: 1 }}
                  />
                  <button className="btn btn-primary" onClick={() => handleAddProgress(goal.id, progress)}>
                    Add
                  </button>
                  <button
                    className="btn btn-ghost"
                    onClick={() => {
                      setEditingId(null);
                      setAddAmount('');
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditingId(goal.id)}
                  style={{ marginTop: 10 }}
                >
                  Add Money
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Goals;
