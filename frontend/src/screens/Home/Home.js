import { useNavigate } from "react-router-dom";
import React from "react";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Welcome to our Home page</h1>
      <p>Choose an option to proceed:</p>
      <div className="button-group">
        <button
          className="button"
          onClick={() => {
            navigate("/users");
          }}
        >
          Go to User Page
        </button>

        <button
          className="button"
          onClick={() => {
            navigate("/employees");
          }}
        >
          Go to Employees Page
        </button>
      </div>
    </div>
  );
};

export default Home;
