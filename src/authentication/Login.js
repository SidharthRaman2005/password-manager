

import React, { useState } from "react";
import './Login.css';
import { useNavigate } from 'react-router-dom';
import CryptoJS from "crypto-js";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const allUsers = JSON.parse(localStorage.getItem("users")) || {};

    const storedUser = allUsers[username];

    if (!storedUser) {
      alert("No account found with this username. Please sign up first.");
      navigate("/");
      return;

    }

    // 🔐 Hash the entered password
    const enteredHashed = CryptoJS.SHA256(password).toString();

    if (enteredHashed === storedUser.password) {
      alert("Login successful!");
      localStorage.setItem("currentUser", username);

      // Store original password (or hash) temporarily in sessionStorage for AES key derivation
      sessionStorage.setItem("userPassword", password); // or use enteredHashed if preferred

      navigate("/main");
    } else {
      alert("Invalid credentials.");
    }
  };

  return (
    <div className="container">
      <h1>LOG IN</h1>
      <div className="box">
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="box">
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn" onClick={handleLogin}>Enter</button>
    </div>
  );
}
