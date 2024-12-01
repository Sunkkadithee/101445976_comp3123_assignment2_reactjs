import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState({ id: '', name: '' });
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Fetch employees on component load
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch employees from the backend
  const fetchEmployees = () => {
    axios
      .get('http://localhost:3002/api/v1/emp/employees')
      .then((response) => {
        setEmployees(response.data);
        setFilteredEmployees(response.data); // Initialize filtered list
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // Delete employee
  const deleteEmployee = (empId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      axios
        .delete('http://localhost:3002/api/v1/emp/employees', {
          params: { empId },
        })
        .then(() => {
          alert('Employee deleted successfully!');
          fetchEmployees();
        })
        .catch((error) => {
          console.error('Error deleting employee:', error);
          alert('Failed to delete employee. Please try again.');
        });
    }
  };

  // Search functionality for name or ID
  const handleSearch = () => {
    const { id, name } = search;
    const filtered = employees.filter(
      (employee) =>
        (!id || employee._id.toLowerCase().includes(id.toLowerCase())) &&
        (!name || 
          (employee.first_name.toLowerCase().includes(name.toLowerCase()) ||
           employee.last_name.toLowerCase().includes(name.toLowerCase())))
    );
    setFilteredEmployees(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setSearch({ id: '', name: '' });
    setFilteredEmployees(employees);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Employee List</h1>

 {/* Search Section */}
<div className="d-flex justify-content-between mb-4 align-items-center">
  {/* Search Fields */}
  <div className="d-flex align-items-center">
    <input
      type="text"
      className="form-control me-2"
      placeholder="Search by ID"
      value={search.id}
      onChange={(e) => setSearch({ ...search, id: e.target.value })}
      style={{ width: '220px' }}
    />
    <input
      type="text"
      className="form-control me-2"
      placeholder="Search by Name"
      value={search.name}
      onChange={(e) => setSearch({ ...search, name: e.target.value })}
      style={{ width: '220px' }}
    />
    <button className="btn btn-primary me-2" onClick={handleSearch}>
      Search
    </button>
    <button className="btn btn-secondary" onClick={resetFilters}>
      Reset
    </button>
  </div>

  {/* Add Employee Button */}
  <button className="btn btn-success ms-3" onClick={() => navigate('/employees/add')}>
    Add Employee
  </button>
</div>

      {/* Employee Table */}
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee._id}</td>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>
                <button
                  className="btn btn-info btn-sm me-2"
                  onClick={() => setSelectedEmployee(employee)}
                >
                  View
                </button>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/employees/updateEmployee/${employee._id}`)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteEmployee(employee._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Details Modal */}
      {selectedEmployee && (
        <div
          className="modal fade show"
          style={{ display: 'block', background: 'rgba(0, 0, 0, 0.5)' }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Employee Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedEmployee(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>ID: {selectedEmployee._id}</p>
                <p>
                  Name: {selectedEmployee.first_name} {selectedEmployee.last_name}
                </p>
                <p>Email: {selectedEmployee.email}</p>
                <p>Position: {selectedEmployee.position}</p>
                <p>Department: {selectedEmployee.department}</p>
                <p>Salary: {selectedEmployee.salary}</p>
                <p>Date of Joining: {new Date(selectedEmployee.date_of_joining).toLocaleDateString()}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedEmployee(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
