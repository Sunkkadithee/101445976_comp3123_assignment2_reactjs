import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles.css";

const Users = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post("http://localhost:3002/api/v1/user/login", {
        email,
        password,
      });

      console.log("Login response:", response.data); 
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username); 

      alert(response.data.message);
      navigate("/employees");
    } catch (error) {
      console.log(error)
      setError(error.response?.data?.message || "an error occured");
    }
  };

  
  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" placeholder="Email" ref={emailRef} required />

          <label>Password:</label>
          <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            required
          />
          {error && <p className="error">{error}</p>}
          <button className="login-button" type="submit">
            Login
          </button>
        </div>
      </form>
      <p>
        Don't have an account?{" "}
        <button
          className="link-button"
          onClick={() => navigate("/users/signup")}
        >
          Signup
        </button>
      </p>
    </div>
  );
};

export default Users;
