import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; 
import './EditEmployee.css';

const EditEmployee = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [salary, setSalary] = useState('');
  const [skills, setSkills] = useState([]);
  const [dateJoined, setDateJoined] = useState('');
  const [contractType, setContractType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/employees/${id}`)
      .then(res => {
        const employee = res.data;
        setName(employee.name);
        setEmail(employee.email);
        setPosition(employee.position);
        setEmployeeNumber(employee.employeeNumber);
        setSalary(employee.salary);
        setSkills(employee.skills);
        setDateJoined(employee.dateJoined);
        setContractType(employee.contractType);
      })
      .catch(err => console.error('Error fetching employee:', err));
  }, [id]);

  const toggleSkill = (skill) => {
    setSkills(prevSkills =>
      prevSkills.includes(skill)
        ? prevSkills.filter(s => s !== skill)
        : [...prevSkills, skill]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/employees/${id}`, {
      name, email, position, employeeNumber, salary, skills, dateJoined, contractType
    })
    .then(() => navigate('/'))
    .catch(err => console.error('Error updating employee:', err));
  };

  return (
    <div className="edit-employee">
      <FaArrowLeft className="back-icon" onClick={() => navigate('/')} />
      <h1>Edit Employee</h1>
      <form onSubmit={handleSubmit}>
      <div className="flex">
      <div className="flex1">
        <label>Employee Number:  </label>
          <input type="text" value={employeeNumber} onChange={(e) => setEmployeeNumber(e.target.value)} required />
      
        <label>Name: </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
       
        <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        
        <label>Position:  </label>
          <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
      
        
        
          
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
<label>Salary:</label>
<input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} required />
        <label>Contract Type:
          <select value={contractType} onChange={(e) => setContractType(e.target.value)} required>
            <option value="Permanent">Permanent</option>
            <option value="Temporary">Temporary</option>
            <option value="Freelance">Freelance</option>
          </select>
        </label>
        </div>
        </div>

        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;
