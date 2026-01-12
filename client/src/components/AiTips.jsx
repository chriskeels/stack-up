import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const API = "http://localhost:5000/api/ai/insights";

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
    <div className="p-4 bg-yellow-100 rounded mt-4">
      <h2 className="text-xl font-bold mb-2">AI Spending Tips</h2>
      <ul className="list-disc pl-5 space-y-1">
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default AiTips;