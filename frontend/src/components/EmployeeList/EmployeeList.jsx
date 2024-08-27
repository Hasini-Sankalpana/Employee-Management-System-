import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filterBy, setFilterBy] = useState('name'); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const navigate = useNavigate();


  useEffect(() => {
    axios.get('http://localhost:5000/api/employees')
      .then(res => {
        console.log(res.data); // Log the API response to check the structure
        if (Array.isArray(res.data)) {
          setEmployees(res.data.reverse());
        } else if (res.data && Array.isArray(res.data.employees)) {
          setEmployees(res.data.employees); // Adjust based on actual response structure
        } else {
          console.error('Unexpected response structure:', res.data);
        }
      })
      .catch(err => console.error('Error fetching employees:', err));
  }, []);

  const filteredEmployees = employees.filter(employee => {
    const employeeSkills = Array.isArray(employee.skills) ? employee.skills : [];

    switch (filterBy) {
      case 'name':
        return employee.name.toLowerCase().includes(searchTerm.toLowerCase());
      case 'skills':
        return employeeSkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      case 'salary':
        const salary = parseFloat(searchTerm);
        return (!isNaN(salary) && employee.salary === salary);
      case 'contractType':
        return employee.contractType.toLowerCase() === searchTerm.toLowerCase();
      default:
        return true;
    }
  });

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/employees/${id}`)
      .then(() => {
        setEmployees(employees.filter(employee => employee._id !== id));
      })
      .catch(err => console.error('Error deleting employee:', err));
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Adjust this if you're using a different mechanism for authentication
    navigate('/login');
  };



  return (
    <div>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    <div className="employee-list">
      <h1>Employee List</h1>
      <div className="btns">
        <Link to="/add" className="add-button">Add Employee</Link>
        <Link to="/report" className="view-reports-button">View Reports</Link>
        
      </div>
      <div className="filters">
        <input 
          type="text" 
          placeholder={`Search by ${filterBy}`} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <select onChange={(e) => setFilterBy(e.target.value)}>
          <option value="name">Name</option>
          <option value="skills">Skills</option>
          <option value="salary">Salary</option>
          <option value="contractType">Contract Type</option>
        </select>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Employee Number</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Skills</th>
              <th>Date Joined</th>
              <th>Contract Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(employee => (
              <tr key={employee._id}>
                <td>{employee.employeeNumber}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                <td>{employee.salary}</td>
                <td>{employee.skills.join(', ')}</td>
                <td>{new Date(employee.dateJoined).toLocaleDateString()}</td>
                <td>{employee.contractType}</td>
                <td>
                  <div className="employee-actions">
                    <Link to={`/edit/${employee._id}`} className="edit-link">Edit</Link>
                    <Link to="#" onClick={() => handleDelete(employee._id)} className="delete-link">Delete</Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default EmployeeList;
