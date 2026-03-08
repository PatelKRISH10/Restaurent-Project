import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const signup = () => {
    setError("");

    fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          navigate("/login");
        } else {
          setError("Signup failed. Try again.");
        }
      })
      .catch(() => setError("Server error. Please try again."));
  };

  return (
    <div className="signup-wrapper">
  
      <div className="signup-image"></div>

      <div className="signup-card">
        <h2 className="signup-title">Create Account</h2>
        <p className="signup-subtitle">
          Join Shree Umiya Bhojnalaya
        </p>

        <input
          className="signup-input"
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="signup-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="signup-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="signup-error">{error}</p>}

        <button className="signup-btn" onClick={signup}>
          Sign Up
        </button>

        <p className="signup-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
