import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const API = "http://localhost:5000/api/transactions";

const AddTransactionForm = ({ onAdd }) => {
  const { token } = useContext(AuthContext);

  const [form, setForm] = useState({
    type: "expense",
    category: "",
    amount: "",
    date: "",
    note: ""
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    if (res.ok) {
      onAdd(data);
      setForm({ type: "expense", category: "", amount: "", date: "", note: "" });
    } else {
      alert(data.error || "Failed to add transaction");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded space-y-2">
      <select name="type" value={form.type} onChange={handleChange} className="w-full p-2 border rounded">
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full p-2 border rounded" />
      <input name="amount" type="number" value={form.amount} onChange={handleChange} placeholder="Amount" className="w-full p-2 border rounded" />
      <input name="date" type="date" value={form.date} onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="note" value={form.note} onChange={handleChange} placeholder="Note (optional)" className="w-full p-2 border rounded" />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Add Transaction</button>
    </form>
  );
};

export default AddTransactionForm;