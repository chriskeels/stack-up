'use client';

import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import AddTransactionForm from '@/app/components/AddTransactionForm';

const API = '/api/transactions';

const Transactions = () => {
  const { token } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);

  const formatCurrency = (value = 0) => `$${Number(value || 0).toFixed(2)}`;

  useEffect(() => {
    fetch(API, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTransactions(data);
        } else {
          console.error('Invalid response:', data);
          setTransactions([]);
        }
      })
      .catch(console.error);
  }, [token]);

  const handleDelete = async (id) => {
    const res = await fetch(`${API}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) setTransactions(transactions.filter((tx) => tx.id !== id));
    else alert(data.error || 'Failed to delete');
  };

  const handleEdit = async (tx) => {
    const newAmount = prompt('Enter new amount', tx.amount);
    if (!newAmount) return;

    const res = await fetch(`${API}/${tx.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...tx, amount: Number(newAmount) }),
    });

    const data = await res.json();
    if (res.ok) {
      setTransactions(transactions.map((t) => (t.id === tx.id ? data : t)));
    } else {
      alert(data.error || 'Failed to edit transaction');
    }
  };

  return (
    <ProtectedRoute>
      <div className="page">
        <h1 className="section-title" style={{ marginTop: 0 }}>All Transactions</h1>
        {transactions.length === 0 && (
          <div className="empty-state">
            <div className="hero-sub">No transactions yet. Add your first one below.</div>
          </div>
        )}
        <AddTransactionForm onAdd={(tx) => setTransactions([tx, ...transactions])} />
        <ul className="list">
          {transactions.map((tx) => (
            <li key={tx.id} className="list-item">
              <div>
                <div className="stat-label">{new Date(tx.date).toLocaleDateString()}</div>
                <div className="meta">{tx.category} • {tx.type}</div>
                {tx.note && <div className="meta">{tx.note}</div>}
              </div>
              <div className="button-row">
                <span className={tx.type === 'income' ? 'amount-positive' : 'amount-negative'}>
                  {tx.type === 'income' ? '+' : '-'}
                  {formatCurrency(tx.amount)}
                </span>
                <button onClick={() => handleEdit(tx)} className="btn btn-secondary">
                  Edit
                </button>
                <button onClick={() => handleDelete(tx.id)} className="btn btn-ghost">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ProtectedRoute>
  );
};

export default Transactions;
