import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const API = "http://localhost:3000/api/ai/insights";

const AiTips = () => {
  const { token } = useContext(AuthContext);
  const [tips, setTips] = useState([]);

  useEffect(() => {
    fetch(API, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setTips(data.tips || []))
      .catch(console.error);
  }, [token]);

  return (
    <div className="tips-card">
      <h2>AI Spending Tips</h2>
      <ul>
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default AiTips;