import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const res = await register(form);
      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Get started with smarter saving</p>

        {error && <div className="alert error">{error}</div>}
        {success && <div className="alert success">Account created! Redirecting to login...</div>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="field"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="field"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            minLength={6}
            className="field"
          />
          <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
            Register
          </button>
        </form>

        <p className="footer-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
