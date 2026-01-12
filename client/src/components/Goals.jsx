import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const API = "http://localhost:5000/api/goals";

const Goals = () => {
  const { token } = useContext(AuthContext);
  const [goals, setGoals] = useState([]);
  const [form, setForm] = useState({ title: "", targetAmount: "" });

  useEffect(() => {
    fetch(API, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(setGoals)
      .catch(console.error);
  }, [token]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title: form.title, targetAmount: Number(form.targetAmount) })
    });
    const data = await res.json();
    if (res.ok) {
      setGoals([...goals, data]);
      setForm({ title: "", targetAmount: "" });
    } else {
      alert(data.error || "Failed to add goal");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Savings Goals</h1>
      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Goal Name" className="w-full p-2 border rounded" />
        <input name="targetAmount" type="number" value={form.targetAmount} onChange={handleChange} placeholder="Target Amount" className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Add Goal</button>
      </form>

      <ul className="space-y-2">
        {goals.map(goal => (
          <li key={goal._id} className="p-4 border rounded">
            <div className="flex justify-between">
              <span>{goal.title}</span>
              <span>${goal.progress} / ${goal.targetAmount}</span>
            </div>
            <div className="w-full bg-gray-200 h-2 mt-2 rounded">
              <div className="bg-green-500 h-2 rounded" style={{ width: `${(goal.progress / goal.targetAmount) * 100}%` }}></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Goals;