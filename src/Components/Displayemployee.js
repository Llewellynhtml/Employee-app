import React, { useState, useEffect } from 'react';
import Editemployee from './Editemployee';

function Displayemployee({ removeEmployee, updateEmployee }) {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchID, setSearchID] = useState('');
  const [activeTab, setActiveTab] = useState('list');

  useEffect(() => {
    // Retrieve employees from local storage when the component mounts
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(storedEmployees);
  }, []);

  const filterEmployee = () => {
    // Retrieve employees from local storage
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    const selectedEmployee = storedEmployees.find(employee => employee.id === searchID);

    if (selectedEmployee) {
      setSelectedEmployee(selectedEmployee);
      setActiveTab('edit');
    } else {
      alert("Employee not found!");
    }
  };

  const clearSelectedEmployee = () => {
    setSelectedEmployee(null);
    setSearchID('');
    setActiveTab('list');
  };

  const handleUpdateEmployee = (updatedEmployee) => {
    const updatedEmployees = employees.map(employee =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    );
    
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees)); // Update local storage
    clearSelectedEmployee();
  };

  const handleRemoveEmployee = (id) => {
    const updatedEmployees = employees.filter(employee => employee.id !== id);
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees)); // Update local storage
    alert("Employee deleted successfully!"); // Feedback message
  };

  return (
    <div>
      <h1>Employee History</h1>
      <div className="tabs">
        <button onClick={() => setActiveTab('list')} className={activeTab === 'list' ? 'active' : ''}>Employee List</button>
        <button onClick={() => setActiveTab('edit')} className={activeTab === 'edit' ? 'active' : ''}>Edit Employee</button>
      </div>
      {activeTab === 'list' && (
        <div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter Employee ID"
              value={searchID}
              onChange={(e) => setSearchID(e.target.value)}
            />
            <button onClick={filterEmployee}>Search</button>
          </div>
          <div className="employee-list">
            {employees.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Number</th>
                    <th>Image</th>
                    <th>Position</th>
                    <th>ID</th>
                    <th>Gender</th>
                    <th>City</th>
                    <th>Province</th>
                    <th>ZipCode</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.name}</td>
                      <td>{employee.email}</td>
                      <td>{employee.number}</td>
                      <td><img src={employee.image} alt="Employee" style={{ width: '50px', height: '50px' }} /></td>
                      <td>{employee.position}</td>
                      <td>{employee.id}</td>
                      <td>{employee.gender}</td>
                      <td>{employee.city}</td>
                      <td>{employee.province}</td>
                      <td>{employee.zipCode}</td>
                      <td>
                        <div>
                          <button onClick={() => { setSelectedEmployee(employee); setActiveTab('edit'); }}>Edit</button>
                          <button onClick={() => handleRemoveEmployee(employee.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No employees found.</p>
            )}
          </div>
        </div>
      )}
      {activeTab === 'edit' && selectedEmployee && (
        <Editemployee
          selectedEmployee={selectedEmployee}
          updateEmployee={handleUpdateEmployee}
          clearSelectedEmployee={clearSelectedEmployee}
        />
      )}
    </div>
  );
}

export default Displayemployee;
