import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navigation = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!token) return null;

  return (
    <nav className="nav-bar">
      <div className="nav-content">
        <Link to="/dashboard" className="nav-brand">
          Stack Up
        </Link>
        <div className="nav-links">
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link to="/transactions" className="nav-link">
            Transactions
          </Link>
          <Link to="/goals" className="nav-link">
            Goals
          </Link>
          <button onClick={handleLogout} className="nav-logout">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
