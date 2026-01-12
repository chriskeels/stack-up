import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AddTransactionForm from "../components/AddTransactionForm";
import AiTips from "../components/AiTips";

const API = "http://localhost:5000/api/dashboard";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(API, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, [token]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-green-100 rounded">Balance: ${data.balance}</div>
        <div className="p-4 bg-red-100 rounded">Spent: ${data.totalSpent}</div>
        <div className="p-4 bg-blue-100 rounded col-span-2">Saved: ${data.totalSaved}</div>
      </div>

      <AddTransactionForm onAdd={tx => setData(prev => ({
        ...prev,
        recentTransactions: [tx, ...prev.recentTransactions],
        balance: prev.balance + (tx.type === "income" ? tx.amount : -tx.amount),
        totalSpent: prev.totalSpent + (tx.type === "expense" ? tx.amount : 0)
      }))} />

      <AiTips />

      <h2 className="text-xl font-semibold mb-2">Recent Transactions</h2>
      <ul className="space-y-2">
        {data.recentTransactions.map(tx => (
          <li key={tx._id} className="p-2 border rounded flex justify-between">
            <span>{tx.category}: ${tx.amount}</span>
            <span>{new Date(tx.date).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;