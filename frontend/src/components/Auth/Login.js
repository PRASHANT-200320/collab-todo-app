import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import API from "../../api";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; 



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });

      const token = res.data.token;
      const user = res.data.user;

      if (!token || !user) {
        alert("Invalid server response");
        return;
      }

      login(user, token); 
      navigate("/board"); 
    } catch (err) {
      console.error("Login failed", err.response?.data || err.message);
      alert("Login failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        New user? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
