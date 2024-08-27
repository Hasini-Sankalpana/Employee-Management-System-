import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; 
import './AddEmployee.css';

const AddEmployee = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [salary, setSalary] = useState('');
  const [skills, setSkills] = useState([]);
  const [dateJoined, setDateJoined] = useState('');
  const [contractType, setContractType] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const toggleSkill = (skill) => {
    setSkills(prevSkills =>
      prevSkills.includes(skill)
        ? prevSkills.filter(s => s !== skill)
        : [...prevSkills, skill]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/employees', {
      name, email, position, employeeNumber, salary, skills, dateJoined, contractType
    })
    .then(() => navigate('/'))
    .catch(err => {
      console.error('Error adding employee:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.message : 'An error occurred');
    });
  };

  return (
    <div className="add-employee">
       <FaArrowLeft className="back-icon" onClick={() => navigate('/')} />
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex">
      <div className="flex1">
        <label>Employee Number:</label>
        <input type="text" value={employeeNumber} onChange={(e) => setEmployeeNumber(e.target.value)} required />
        
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
  
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
  
        <label>Position:</label>
        <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
  
        <label>Salary:</label>
        <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} required />
  
        <label>Skills:</label>
        <div className="skills-container">
          <label>
            <input type="checkbox" checked={skills.includes('Tattoo Artist')} onChange={() => toggleSkill('Tattoo Artist')} />
            Tattoo Artist
          </label>
          <label>
            <input type="checkbox" checked={skills.includes('Piercing')} onChange={() => toggleSkill('Piercing')} />
            Piercing
          </label>
          <label>
            <input type="checkbox" checked={skills.includes('Body Piercing')} onChange={() => toggleSkill('Body Piercing')} />
            Body Piercing
          </label>
          <label>
            <input type="checkbox" checked={skills.includes('Tattoo Aftercare')} onChange={() => toggleSkill('Tattoo Aftercare')} />
            Tattoo Aftercare
          </label>
          <label>
            <input type="checkbox" checked={skills.includes('Custom Designs')} onChange={() => toggleSkill('Custom Designs')} />
            Custom Designs
          </label>
          <label>
            <input type="checkbox" checked={skills.includes('Flash Art')} onChange={() => toggleSkill('Flash Art')} />
            Flash Art
          </label>
          <label>
            <input type="checkbox" checked={skills.includes('Tattoo Removal')} onChange={() => toggleSkill('Tattoo Removal')} />
            Tattoo Removal
          </label>
        </div>
        </div>

         <div className="flex2">
        <label>Date Joined:</label>
        <input type="date" value={dateJoined} onChange={(e) => setDateJoined(e.target.value)} required />
  
        <label>Contract Type:</label>
        <select value={contractType} onChange={(e) => setContractType(e.target.value)} required>
          <option value="">Select Contract Type</option>
          <option value="Permanent">Permanent</option>
          <option value="Temporary">Temporary</option>
          <option value="Freelance">Freelance</option>
        </select>
        </div>
        </div>
  
        <button type="submit">Add Employee</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default AddEmployee;
