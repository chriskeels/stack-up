import React, { useState, useContext, forwardRef, useImperativeHandle } from "react";
import { AuthContext } from "../context/AuthContext";

const API = "http://localhost:3000/api/transactions";

const AddTransactionForm = forwardRef(({ onAdd }, ref) => {
  const { token } = useContext(AuthContext);

  const [form, setForm] = useState({
    type: "expense",
    category: "",
    amount: "",
    date: "",
    note: ""
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  useImperativeHandle(ref, () => ({
    preset: values => {
      const today = new Date().toISOString().slice(0, 10);
      setForm(prev => ({
        ...prev,
        ...values,
        date: values.date || prev.date || today
      }));
    }
  }));

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
    <form id="add-transaction-form" onSubmit={handleSubmit} className="form-card">
      <div className="section-title" style={{ marginTop: 0 }}>Add Transaction</div>
      <div className="select-row">
        <select name="type" value={form.type} onChange={handleChange} className="field">
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="field"
        />
      </div>
      <div className="select-row">
        <input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="field"
        />
        <input name="date" type="date" value={form.date} onChange={handleChange} className="field" />
      </div>
      <input
        name="note"
        value={form.note}
        onChange={handleChange}
        placeholder="Note (optional)"
        className="field"
      />
      <div className="button-row" style={{ marginTop: 10 }}>
        <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
          Add Transaction
        </button>
      </div>
    </form>
  );
});

export default AddTransactionForm;