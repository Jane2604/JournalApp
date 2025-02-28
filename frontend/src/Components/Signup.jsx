import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Signup.css";

function Signup({ onLogin }) {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        userData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Signup successful:", response.data);

      localStorage.setItem("token", response.data.token);
      onLogin(response.data.token); 

      navigate("/journal"); 
    } catch (error) {
      console.error("Signup error:", error.response);
      setError(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-heading">Sign Up</h2>
      <div className="signup-box">
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;


