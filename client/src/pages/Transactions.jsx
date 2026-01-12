import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const API = "http://localhost:3000/api/transactions";

const Transactions = () => {
  const { token } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);

  const formatCurrency = (value = 0) => `$${Number(value || 0).toFixed(2)}`;

  useEffect(() => {
    fetch(API, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setTransactions)
      .catch(console.error);
  }, [token]);

  const handleDelete = async (id) => {
    const res = await fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (res.ok) setTransactions(transactions.filter(tx => tx._id !== id));
    else alert(data.error || "Failed to delete");
  };

  const handleEdit = async (tx) => {
    const newAmount = prompt("Enter new amount", tx.amount);
    if (!newAmount) return;

    const res = await fetch(`${API}/${tx._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ ...tx, amount: Number(newAmount) })
    });

    const data = await res.json();
    if (res.ok) {
      setTransactions(transactions.map(t => t._id === tx._id ? data : t));
    } else {
      alert(data.error || "Failed to edit transaction");
    }
  };

  return (
    <div className="page">
      <h1 className="section-title" style={{ marginTop: 0 }}>All Transactions</h1>
      <ul className="list">
        {transactions.map(tx => (
          <li key={tx._id || tx.id} className="list-item">
            <div>
              <div className="stat-label">{new Date(tx.date).toLocaleDateString()}</div>
              <div className="meta">{tx.category} • {tx.type}</div>
              {tx.note && <div className="meta">{tx.note}</div>}
            </div>
            <div className="button-row">
              <span className={tx.type === "income" ? "amount-positive" : "amount-negative"}>
                {tx.type === "income" ? "+" : "-"}
                {formatCurrency(tx.amount)}
              </span>
              <button onClick={() => handleEdit(tx)} className="btn btn-secondary">
                Edit
              </button>
              <button onClick={() => handleDelete(tx._id || tx.id)} className="btn btn-ghost">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;