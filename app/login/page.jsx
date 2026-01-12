'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useContext } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import { login } from '@/app/services/authService';

const Login = () => {
  const router = useRouter();
  const { login: setToken } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await login(form);
      const data = await res.json();

      if (res.ok) {
        setToken(data.token);
        router.push('/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Stack Up</h1>
        <p className="auth-subtitle">Sign in to track your finances</p>

        {error && <div className="alert error">{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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
            className="field"
          />
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Login
          </button>
        </form>

        <p className="footer-text">
          Don't have an account? <Link href="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
