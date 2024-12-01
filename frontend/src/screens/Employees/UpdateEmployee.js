import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateEmployee = () => {
  const { empId } = useParams(); // Get the empId from the URL
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    position: "",
    salary: "",
    department: "",
  });
  const [error, setError] = useState("");

  // Fetch employee details when the component mounts
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/api/v1/emp/employees/${empId}`
        );
        setEmployeeData(response.data); // Assume response contains employee data
      } catch (err) {
        setError("Failed to fetch employee data.");
      }
    };

    fetchEmployeeData();
  }, [empId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:3002/api/v1/emp/employees/${empId}`,
        employeeData
      );
      alert("Employee updated successfully!")
      setError("");
      navigate("/employees");
    } catch (err) {
      setError("Failed to update employee. Ensure the Employee ID is correct.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Update Employee</h2>
      <form onSubmit={handleUpdate}>
        <label>
          First Name:
          <input
            type="text"
            name="first_name"
            value={employeeData.first_name}
            onChange={handleInputChange}
            placeholder="Enter First Name"
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            value={employeeData.last_name}
            onChange={handleInputChange}
            placeholder="Enter Last Name"
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={employeeData.email}
            onChange={handleInputChange}
            placeholder="Enter Email"
          />
        </label>
        <label>
          Position:
          <input
            type="text"
            name="position"
            value={employeeData.position}
            onChange={handleInputChange}
            placeholder="Enter Position"
          />
        </label>
        <label>
          Salary:
          <input
            type="number"
            name="salary"
            value={employeeData.salary}
            onChange={handleInputChange}
            placeholder="Enter Salary"
          />
        </label>
        <label>
          Department:
          <input
            type="text"
            name="department"
            value={employeeData.department}
            onChange={handleInputChange}
            placeholder="Enter Department"
          />
        </label>
        <button type="submit">Update Employee</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default UpdateEmployee;
