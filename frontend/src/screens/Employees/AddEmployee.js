import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddEmployee = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const positionRef = useRef();
  const salaryRef = useRef();
  const departmentRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    const newEmployee = {
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      email: emailRef.current.value,
      position: positionRef.current.value,
      salary: salaryRef.current.value,
      department: departmentRef.current.value,
      password: passwordRef.current.value,
    };

    if (Object.values(newEmployee).some((field) => !field)) {
      setError('All fields are required.');
      return;
    }

    try {
      await axios.post('http://localhost:3002/api/v1/emp/employees', newEmployee);
      alert('Employee added successfully!');
      navigate('/employees/employeelist');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while adding the employee.');
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <form onSubmit={handleAddEmployee}>
        <label>
          First Name:
          <input type="text" ref={firstNameRef} placeholder="Enter First Name" required />
        </label>
        <label>
          Last Name:
          <input type="text" ref={lastNameRef} placeholder="Enter Last Name" required />
        </label>
        <label>
          Email:
          <input type="email" ref={emailRef} placeholder="Enter Email" required />
        </label>
        <label>
          Position:
          <input type="text" ref={positionRef} placeholder="Enter Position" required />
        </label>
        <label>
          Salary:
          <input type="number" ref={salaryRef} placeholder="Enter Salary" required />
        </label>
        <label>
          Department:
          <input type="text" ref={departmentRef} placeholder="Enter Department" required />
        </label>
        <label>
          Password:
          <input type="password" ref={passwordRef} placeholder="Enter Password" required />
        </label>
        <button type="submit">Add Employee</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default AddEmployee;
