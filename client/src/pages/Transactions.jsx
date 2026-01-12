import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const API = "http://localhost:5000/api/transactions";

const Transactions = () => {
  const { token } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Transactions</h1>
      <ul className="space-y-2">
        {transactions.map(tx => (
          <li key={tx._id} className="p-4 border rounded flex justify-between items-center">
            <div>
              <strong>{tx.category}</strong> ({tx.type})
              <div className="text-gray-600 text-sm">{new Date(tx.date).toLocaleDateString()}</div>
              {tx.note && <div className="text-gray-500 text-sm italic">{tx.note}</div>}
            </div>
            <div className="flex items-center space-x-2">
              <span className={tx.type === "income" ? "text-green-600" : "text-red-600"}>${tx.amount}</span>
              <button onClick={() => handleEdit(tx)} className="text-blue-500">Edit</button>
              <button onClick={() => handleDelete(tx._id)} className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;