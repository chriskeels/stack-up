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
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl font-bold hover:text-blue-200">
          Stack Up
        </Link>
        
        <div className="flex gap-6 items-center">
          <Link to="/dashboard" className="hover:text-blue-200 transition">
            Dashboard
          </Link>
          <Link to="/transactions" className="hover:text-blue-200 transition">
            Transactions
          </Link>
          <Link to="/goals" className="hover:text-blue-200 transition">
            Goals
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
