import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3002/api/v1/user/signup",
        { username, email, password }
      );
      alert(response.data.message);
      navigate("/users");
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };
  return (
    <div className="form-container">
      <h1>Sign up</h1>

      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" ref={usernameRef} required />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" ref={emailRef} required />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input type="password" ref={passwordRef} required />
        </div>
        {error && <p className="error">{error}</p>}

        <button>Sign up</button>
      </form>

      <p>
        Do not have an account? {""}
        <button onClick={() => navigate("/users")} className="link-button">
          Login
        </button>
      </p>
    </div>
  );
};

export default Signup;
