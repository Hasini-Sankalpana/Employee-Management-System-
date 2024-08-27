import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EmployeeList from './components/EmployeeList/EmployeeList';
import AddEmployee from './components/AddEmployee/AddEmployee';
import EditEmployee from './components/EditEmployee/EditEmployee';
import Reports from './components/Report/Reports';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';



const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<EmployeeList />} />
      <Route path="/add" element={<AddEmployee />} />
      <Route path="/edit/:id" element={<EditEmployee />} />
      <Route path="/report" element={<Reports />} />
       
    </Routes>
  );
};

export default App;
